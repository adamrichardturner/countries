export interface CountryNameForms {
  common: string
  official: string
}

export interface CountryNames {
  common: string
  official: string
  native: Record<string, CountryNameForms>
}

export interface CountryCodes {
  alpha_2: string
  alpha_3: string
}

export interface CountryCapital {
  name: string
}

export interface CountryFlag {
  url_svg: string
  url_png: string
  description?: string
}

export interface CountryCurrency {
  code: string
  name: string
  symbol: string
}

export interface CountryLanguage {
  name: string
  iso639_1?: string
  native_name?: string
}

export interface BorderCountry {
  name: string
  code: string
}

export interface Country {
  names: CountryNames
  codes: CountryCodes
  flag: CountryFlag
  population: number
  region: string
  subregion: string
  capitals: CountryCapital[]
  tlds: string[]
  currencies: CountryCurrency[]
  languages: CountryLanguage[]
  borders?: string[]
  borderCountries?: BorderCountry[]
}

export interface CountriesListMeta {
  total: number
  count: number
  limit: number
  offset: number
  more: boolean
}

export interface CountriesListResponse {
  data: Country[]
  meta?: CountriesListMeta
}

export interface CountryCardProps {
  country: Country
}

export interface CountryDetailProps {
  country: Country
}

export interface FetchCountriesParams {
  page?: number
  pageSize: number
  q?: string
  region?: string
}

export interface FetchCountriesByNameParams {
  searchTerm: string
  page?: number
  pageSize: number
}

export interface FetchCountryParams {
  countryId: string
}

export interface FetchByRegionParams {
  region: string
  page?: number
  pageSize?: number
}

export interface SearchComponentProps {
  searchTerm: string
  onSearchTermChange: (searchTerm: string) => void
}

export interface FilterComponentProps {
  selectedRegion: string
  onRegionChange: (region: string) => void
}

export interface FallbackLanguage {
  iso639_1: string
  name: string
}

export interface FallbackCurrency {
  code: string
  name: string
  symbol: string
}

export interface FallbackCountry {
  name: string
  flag: string
  population: number
  region: string
  capital: string
  alpha2Code: string
  alpha3Code: string
  languages?: FallbackLanguage[]
  subregion: string
  topLevelDomain: string[]
  currencies?: FallbackCurrency[]
  borders?: string[]
}
