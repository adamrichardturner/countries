import {
  Country,
  FetchCountriesParams,
  FetchCountriesByNameParams,
  FetchCountryParams,
  FetchByRegionParams,
  CountryName
} from '@/interfaces'

const baseUrl = `https://restcountries.com/v3.1/`
const query = `?fields=name,flags,nativeName,population,region,subRegion,capital,tld,currencies,languages,borders,borderCountries,cca3`

async function fetchAllCountries(): Promise<{ data: Country[] }> {
  try {
    const response = await fetch(`${baseUrl}all${query}`)
    const data = (await response.json()).sort((a: Country, b: Country) => {
      if (a.name.official < b.name.official) return -1
      if (a.name.official > b.name.official) return 1
      return 0
    }) as Country[]
    return { data }
  } catch (error) {
    console.error('Error fetching all countries', error)
    throw error
  }
}

async function fetchCountries(
  params: FetchCountriesParams
): Promise<{ data: Country[] }> {
  const page = params.page || 1
  const pageSize = params.pageSize
  try {
    const response = await fetch(
      `${baseUrl}all?limit=${pageSize}&start=${(page - 1) * pageSize}${query}`
    )
    const data = (await response.json()) as Country[]
    return { data }
  } catch (error) {
    console.error('Error fetching countries with pagination', error)
    throw error
  }
}

export async function fetchCountriesByName(
  params: FetchCountriesByNameParams
): Promise<{ data: Country[] }> {
  const searchTerm = params.searchTerm
  const page = params.page || 1
  const pageSize = params.pageSize
  try {
    const response = await fetch(
      `${baseUrl}name/${searchTerm}?limit=${pageSize}&offset=${
        (page - 1) * pageSize
      }${query}`
    )
    const data = (await response.json()) as Country[]
    return { data }
  } catch (error) {
    console.error('Error fetching countries by name', error)
    throw error
  }
}

async function fetchCountryNameByCode(countryCode: string): Promise<string> {
  try {
    const response = await fetch(`${baseUrl}alpha/${countryCode}?fields=name`)
    const country = (await response.json()) as { name: CountryName }
    return country.name.common
  } catch (error) {
    console.error('Error fetching country name by code', error)
    throw error
  }
}

export async function fetchCountry(
  params: FetchCountryParams
): Promise<Country> {
  const { countryId } = params
  try {
    const response = await fetch(`${baseUrl}alpha/${countryId}${query}`)
    let country = (await response.json()) as Country

    if (country.borders) {
      const borderCountries = await Promise.all(
        country.borders.map(async (borderCode) => {
          const borderCountryName = await fetchCountryNameByCode(borderCode)
          return { name: borderCountryName, code: borderCode }
        })
      )
      country.borderCountries = borderCountries
    }

    return country
  } catch (error) {
    console.error('Error fetching country', error)
    throw error
  }
}

export async function fetchByRegion(
  params: FetchByRegionParams
): Promise<{ data: Country[] }> {
  const region = params.region
  try {
    const response = await fetch(`${baseUrl}region/${region}${query}`)
    const data = (await response.json()) as Country[]
    return { data }
  } catch (error) {
    console.error('Error fetching countries by region', error)
    throw error
  }
}

export default {
  fetchAllCountries,
  fetchCountries,
  fetchCountriesByName,
  fetchCountry,
  fetchByRegion
}
