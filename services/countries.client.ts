import {
  CountriesListResponse,
  Country,
  FetchByRegionParams,
  FetchCountriesByNameParams,
  FetchCountriesParams,
  FetchCountryParams,
} from '@/interfaces'

const parseErrorMessage = async (response: Response): Promise<string> => {
  try {
    const payload = (await response.json()) as {
      error?: string
      message?: string
    }
    return payload.error ?? payload.message ?? response.statusText
  } catch {
    return response.statusText || 'Request failed'
  }
}

const requestJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response))
  }

  return (await response.json()) as T
}

const toSearchParams = (
  params: Record<string, string | number | undefined>
): string => {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === '') {
      continue
    }

    searchParams.set(key, String(value))
  }

  const query = searchParams.toString()
  return query ? `?${query}` : ''
}

export async function fetchAllCountries(): Promise<CountriesListResponse> {
  return requestJson<CountriesListResponse>('/api/countries?all=1')
}

export async function fetchCountries(
  params: FetchCountriesParams
): Promise<CountriesListResponse> {
  const page = params.page ?? 1

  return requestJson<CountriesListResponse>(
    `/api/countries${toSearchParams({
      page,
      pageSize: params.pageSize,
      q: params.q,
      region: params.region,
    })}`
  )
}

export async function fetchCountriesByName(
  params: FetchCountriesByNameParams
): Promise<CountriesListResponse> {
  const page = params.page ?? 1

  return requestJson<CountriesListResponse>(
    `/api/countries/search${toSearchParams({
      q: params.searchTerm,
      page,
      pageSize: params.pageSize,
    })}`
  )
}

export async function fetchByRegion(
  params: FetchByRegionParams
): Promise<CountriesListResponse> {
  const page = params.page ?? 1
  const pageSize = params.pageSize ?? 100

  return requestJson<CountriesListResponse>(
    `/api/countries/region/${encodeURIComponent(params.region)}${toSearchParams(
      {
        page,
        pageSize,
      }
    )}`
  )
}

export async function fetchCountry(
  params: FetchCountryParams
): Promise<Country> {
  return requestJson<Country>(
    `/api/countries/${encodeURIComponent(params.countryId)}`
  )
}
