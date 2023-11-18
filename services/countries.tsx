import {
  Country,
  FetchCountriesParams,
  FetchCountriesByNameParams,
  FetchCountryParams,
  FetchByRegionParams
} from '@/interfaces'

const baseUrl = `https://restcountries.com/v3.1/`
const query = `?fields=name,flags,nativeName,population,region,subRegion,capital,tld,currencies,languages,borders,borderCountries,cca3`

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

async function fetchCountryNameByCode(countryCode: string): Promise<string> {
  const response = await fetch(`${baseUrl}alpha/${countryCode}?fields=name`)
  const country = (await response.json()) as { name: CountryName }
  return country.name.common
}

export async function fetchCountry(
  params: FetchCountryParams
): Promise<Country> {
  const { countryId } = params
  const response = await fetch(`${baseUrl}alpha/${countryId}${query}`)
  let country = (await response.json()) as Country

  if (country.borders) {
    try {
      const borderNames = await Promise.all(
        country.borders.map(fetchCountryNameByCode)
      )
      country.borderCountries = borderNames
    } catch (error) {
      console.error('Error fetching border countries', error)
      throw error
    }
  }

  return country
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
