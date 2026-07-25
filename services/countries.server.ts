import 'server-only'

import { Country, CountriesListMeta, CountriesListResponse } from '@/interfaces'
import { restCountriesFetch } from '@/lib/rest-countries/client'
import { RestCountriesApiCountry } from '@/lib/rest-countries/types'

const LIST_RESPONSE_FIELDS = [
  'names.common',
  'names.official',
  'names.native',
  'codes.alpha_2',
  'codes.alpha_3',
  'flag.url_svg',
  'flag.url_png',
  'flag.description',
  'population',
  'region',
  'subregion',
  'capitals',
  'tlds',
  'currencies',
  'languages',
  'borders',
].join(',')

const DETAIL_RESPONSE_FIELDS_OMIT = 'names.translations,leaders,economy,assets'

const MAX_PAGE_SIZE = 100

const mapApiCountry = (country: RestCountriesApiCountry): Country => {
  return {
    names: {
      common: country.names.common,
      official: country.names.official,
      native: country.names.native ?? {},
    },
    codes: {
      alpha_2: country.codes.alpha_2,
      alpha_3: country.codes.alpha_3,
    },
    flag: {
      url_svg: country.flag?.url_svg ?? '',
      url_png: country.flag?.url_png ?? '',
      description: country.flag?.description,
    },
    population: country.population ?? 0,
    region: country.region ?? '',
    subregion: country.subregion ?? '',
    capitals: (country.capitals ?? []).map((capital) => {
      return { name: capital.name }
    }),
    tlds: country.tlds ?? [],
    currencies: country.currencies ?? [],
    languages: country.languages ?? [],
    borders: country.borders ?? [],
  }
}

const emptyMeta = (): CountriesListMeta => {
  return {
    total: 0,
    count: 0,
    limit: 0,
    offset: 0,
    more: false,
  }
}

export async function fetchCountriesPage(params: {
  page?: number
  pageSize: number
  q?: string
  region?: string
}): Promise<CountriesListResponse> {
  const page = params.page ?? 1
  const pageSize = Math.min(params.pageSize, MAX_PAGE_SIZE)
  const offset = (page - 1) * pageSize

  const response = await restCountriesFetch('', {
    limit: pageSize,
    offset,
    q: params.q,
    region:
      params.region && params.region !== 'All' ? params.region : undefined,
    response_fields: LIST_RESPONSE_FIELDS,
  })

  const data = response.data.objects.map(mapApiCountry).filter((country) => {
    return Boolean(country.codes.alpha_3)
  })

  return {
    data,
    meta: response.data.meta ?? emptyMeta(),
  }
}

export async function fetchAllCountries(): Promise<CountriesListResponse> {
  const firstPage = await fetchCountriesPage({
    page: 1,
    pageSize: MAX_PAGE_SIZE,
  })

  const countries = [...firstPage.data]
  let meta = firstPage.meta ?? emptyMeta()
  let page = 2

  while (meta.more) {
    const nextPage = await fetchCountriesPage({
      page,
      pageSize: MAX_PAGE_SIZE,
    })

    for (const country of nextPage.data) {
      countries.push(country)
    }

    meta = nextPage.meta ?? emptyMeta()
    page += 1
  }

  return {
    data: countries,
    meta: {
      ...meta,
      count: countries.length,
      total: countries.length,
      more: false,
      offset: 0,
      limit: countries.length,
    },
  }
}

export async function fetchCountriesByName(params: {
  searchTerm: string
  page?: number
  pageSize: number
}): Promise<CountriesListResponse> {
  const page = params.page ?? 1
  const pageSize = Math.min(params.pageSize, MAX_PAGE_SIZE)
  const offset = (page - 1) * pageSize

  const response = await restCountriesFetch('/name', {
    q: params.searchTerm,
    limit: pageSize,
    offset,
    response_fields: LIST_RESPONSE_FIELDS,
  })

  return {
    data: response.data.objects.map(mapApiCountry).filter((country) => {
      return Boolean(country.codes.alpha_3)
    }),
    meta: response.data.meta ?? emptyMeta(),
  }
}

export async function fetchByRegion(params: {
  region: string
  page?: number
  pageSize?: number
}): Promise<CountriesListResponse> {
  const page = params.page ?? 1
  const pageSize = Math.min(params.pageSize ?? MAX_PAGE_SIZE, MAX_PAGE_SIZE)
  const offset = (page - 1) * pageSize

  const response = await restCountriesFetch(
    `/region/${encodeURIComponent(params.region)}`,
    {
      limit: pageSize,
      offset,
      response_fields: LIST_RESPONSE_FIELDS,
    }
  )

  return {
    data: response.data.objects.map(mapApiCountry).filter((country) => {
      return Boolean(country.codes.alpha_3)
    }),
    meta: response.data.meta ?? emptyMeta(),
  }
}

const fetchCountryNameByCode = async (countryCode: string): Promise<string> => {
  const response = await restCountriesFetch(
    `/codes.alpha_3/${encodeURIComponent(countryCode)}`,
    {
      response_fields: 'names.common,codes.alpha_3',
      limit: 1,
    }
  )

  const country = response.data.objects[0]
  if (!country) {
    return countryCode
  }

  return country.names.common
}

export async function fetchCountry(params: {
  countryId: string
}): Promise<Country> {
  const response = await restCountriesFetch(
    `/codes.alpha_3/${encodeURIComponent(params.countryId)}`,
    {
      response_fields_omit: DETAIL_RESPONSE_FIELDS_OMIT,
      limit: 1,
    }
  )

  const apiCountry = response.data.objects[0]
  if (!apiCountry) {
    throw new Error(`Country not found for code ${params.countryId}`)
  }

  const country = mapApiCountry(apiCountry)

  if (!country.borders?.length) {
    return country
  }

  const borderCountries = await Promise.all(
    country.borders.map(async (borderCode) => {
      const borderCountryName = await fetchCountryNameByCode(borderCode)
      return { name: borderCountryName, code: borderCode }
    })
  )

  return {
    ...country,
    borderCountries,
  }
}
