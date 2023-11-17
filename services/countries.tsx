import { Country } from '@/interfaces'

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

async function fetchAllCountries() {
  const response = await fetch('https://restcountries.com/v3.1/all')
  const data = (await response.json()) as Country[]
  return { data }
}

async function fetchCountries({ params }: { params: FetchCountriesParams }) {
  const page = params.page || 1
  const pageSize = params.pageSize
  const response = await fetch(
    `https://restcountries.com/v3.1/all?limit=${pageSize}&start=${
      (page - 1) * pageSize
    }`
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
    `https://restcountries.com/v3.1/name/${searchTerm}?limit=${pageSize}&offset=${
      (page - 1) * pageSize
    }`
  )
  const data = (await response.json()) as Country[]
  return { data }
}

export async function fetchCountry({ params }: { params: FetchCountryParams }) {
  const cca2 = params.cca2
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca2}`)
  const data = (await response.json()) as Country
  return { data }
}

export async function fetchByRegion({
  params
}: {
  params: FetchByRegionParams
}) {
  const region = params.region
  const response = await fetch(
    `https://restcountries.com/v3.1/region/${region}`
  )
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
