export type RestCountriesErrorResponse = {
  errors?: Array<{
    message: string
  }>
}

export type RestCountriesMeta = {
  total: number
  count: number
  limit: number
  offset: number
  more: boolean
  request_id?: string
}

export type RestCountriesNameForms = {
  common: string
  official: string
}

export type RestCountriesApiCountry = {
  names: {
    common: string
    official: string
    native?: Record<string, RestCountriesNameForms>
    alternates?: string[]
  }
  codes: {
    alpha_2: string
    alpha_3: string
  }
  capitals?: Array<{
    name: string
  }>
  flag?: {
    url_svg?: string
    url_png?: string
    description?: string
  }
  region?: string
  subregion?: string
  population?: number
  tlds?: string[]
  currencies?: Array<{
    code: string
    name: string
    symbol: string
  }>
  languages?: Array<{
    name: string
    iso639_1?: string
    native_name?: string
  }>
  borders?: string[]
}

export type RestCountriesListResponse = {
  data: {
    objects: RestCountriesApiCountry[]
    meta: RestCountriesMeta
  }
}
