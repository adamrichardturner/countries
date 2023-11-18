import { Country } from '@/interfaces'

interface CountryName {
  common: string
  official: string
}

interface CountryFlags {
  svg: string
  png: string
}

interface FetchCountriesParams {
  page: number
  pageSize: number
}

interface FetchCountriesByNameParams {
  searchTerm: string
  page: number
  pageSize: number
}

interface FetchCountryParams {
  countryId: string
}

interface FetchByRegionParams {
  region: string
}

const baseUrl = `https://restcountries.com/v3.1/`
const query = `?fields=name,flags,nativeName,population,region,subRegion,capital,tld,currencies,languages,borderCountries,cca3`

export interface CountryDetail {
  name: CountryName
  flags: CountryFlags
  nativeName: string
  population: number
  region: string
  subRegion: string
  capital: string
  tld: string
  currencies: string[]
  languages: string[]
  borderCountries: string[]
}

async function fetchAllCountries() {
  const response = await fetch(`${baseUrl}all${query}`)
  const data = (await response.json()) as Country[]
  return { data }
}

async function fetchCountries({ params }: { params: FetchCountriesParams }) {
  const page = params.page || 1
  const pageSize = params.pageSize
  const response = await fetch(
    `${baseUrl}all?limit=${pageSize}&start=${(page - 1) * pageSize}${query}`
  )
  const data = (await response.json()) as Country[]
  return { data }
}

export async function fetchCountriesByName({
  params
}: {
  params: FetchCountriesByNameParams
}) {
  const searchTerm = params.searchTerm
  const page = params.page || 1
  const pageSize = params.pageSize
  const response = await fetch(
    `${baseUrl}name/${searchTerm}?limit=${pageSize}&offset=${
      (page - 1) * pageSize
    }${query}`
  )
  const data = (await response.json()) as Country[]
  return { data }
}

export async function fetchCountry({ params }: { params: FetchCountryParams }) {
  const countryId = params.countryId
  const response = await fetch(`${baseUrl}alpha/${countryId}${query}`)
  const data = (await response.json()) as Country
  return { data }
}

export async function fetchByRegion({
  params
}: {
  params: FetchByRegionParams
}) {
  const region = params.region
  const response = await fetch(`${baseUrl}region/${region}${query}`)
  const data = (await response.json()) as Country[]
  return { data }
}

export default {
  fetchAllCountries,
  fetchCountries,
  fetchCountriesByName,
  fetchCountry,
  fetchByRegion
}
