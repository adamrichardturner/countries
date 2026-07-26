import 'server-only'

import {
  RestCountriesErrorResponse,
  RestCountriesListResponse,
} from '@/lib/rest-countries/types'

const BASE_URL = 'https://api.restcountries.com/countries/v5'

const getApiKey = (): string => {
  const apiKey = process.env.NEXT_REST_COUNTRIES_API_KEY

  if (!apiKey) {
    throw new Error(
      'Missing NEXT_REST_COUNTRIES_API_KEY. Add it to your environment to query the REST Countries API.'
    )
  }

  return apiKey
}

const buildUrl = (
  path: string,
  searchParams?: Record<string, string | number | undefined>
): string => {
  const url = new URL(`${BASE_URL}${path}`)

  if (!searchParams) {
    return url.toString()
  }

  for (const [key, value] of Object.entries(searchParams)) {
    if (value === undefined || value === '') {
      continue
    }

    url.searchParams.set(key, String(value))
  }

  return url.toString()
}

export const restCountriesFetch = async (
  path: string,
  searchParams?: Record<string, string | number | undefined>,
  timeoutMs = 15000
): Promise<RestCountriesListResponse> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, timeoutMs)

  try {
    const response = await fetch(buildUrl(path, searchParams), {
      headers: {
        Authorization: `Bearer ${getApiKey()}`,
        Accept: 'application/json',
      },
      signal: controller.signal,
      next: {
        revalidate: 60 * 60,
      },
    })

    const payload = (await response.json()) as
      | RestCountriesListResponse
      | RestCountriesErrorResponse

    if (!response.ok) {
      const message =
        'errors' in payload && payload.errors?.[0]?.message
          ? payload.errors[0].message
          : `REST Countries request failed with status ${response.status}`
      throw new Error(message)
    }

    if (!('data' in payload) || !payload.data?.objects) {
      throw new Error('Unexpected REST Countries response shape')
    }

    return payload
  } finally {
    clearTimeout(timeoutId)
  }
}
