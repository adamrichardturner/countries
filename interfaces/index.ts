export interface NativeName {
  official: string
  common: string
}

export interface CountryName {
  common: string
  official: string
  nativeName: { [languageCode: string]: NativeName }
}

export interface CountryFlags {
  svg: string
  png: string
}

export interface Country {
  name: CountryName
  flags: CountryFlags
  population: number
  region: string
  capital: string[]
  cca2: string
  cca3: string
  nativeName: { [languageCode: string]: NativeName }
  subRegion: string
  tld: string[]
  currencies: { [currencyCode: string]: { name: string; symbol: string } }
  languages: { [languageCode: string]: string }
  borders?: string[]
  borderCountries?: {
    name: string
    code: string
  }[]
}

export interface CountryCardProps {
  country: Country
}

export interface CountryDetailProps {
  country: Country
}

export interface FetchCountriesParams {
  page: number
  pageSize: number
}

export interface FetchCountriesByNameParams extends FetchCountriesParams {
  searchTerm: string
}

export interface FetchCountryParams {
  countryId: string
}

export interface FetchByRegionParams {
  region: string
}

export interface SearchComponentProps {
  searchTerm: string
  onSearchTermChange: (searchTerm: string) => void
}

export interface FilterComponentProps {
  selectedRegion: string
  onRegionChange: (region: string) => void
}
