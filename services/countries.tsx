import axios from 'axios'
import { Country } from '@/interfaces'

// Create an Axios instance with the API base URL
const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1/'
})

/**
 * Fetches a list of countries from the REST Countries API with pagination support.
 *
 * The function sends an HTTP GET request to the specified REST Countries API endpoint
 * to retrieve a subset of country data based on the pagination parameters provided.
 *
 * @param {number} page - The current page number for pagination.
 * @param {number} pageSize - The number of countries to return per page.
 * @returns {Promise<Country[]>} A promise that resolves to an array of Country objects.
 * @throws {Error} Throws an error if the HTTP request fails.
 *
 * Example usage:
 * ```
 * fetchCountries(1, 20)
 *   .then(countries => console.log(countries))
 *   .catch(error => console.error(error));
 * ```
 */
const fetchCountries = async (
  page: number,
  pageSize: number
): Promise<Country[]> => {
  try {
    // Make the HTTP request using Axios
    const response = await api.get<Country[]>(
      `all?limit=${pageSize}&start=${(page - 1) * pageSize}`
    )
    // Assuming the response.data is directly an array of Country objects
    return response.data
  } catch (error) {
    // Handle errors here (e.g., throw error, return empty array, etc.)
    throw error
  }
}

/**
 * Searches for countries by name with pagination using the REST Countries API.
 *
 * The function sends an HTTP GET request to the REST Countries API's `/name` endpoint
 * with the search term. It includes parameters to control the pagination of results.
 * This assumes the API supports pagination, which it does not currently.
 *
 * @param {string} searchTerm - The search term used to find countries by name.
 * @param {number} page - The current page of the search results to fetch.
 * @param {number} pageSize - The number of search results per page.
 * @returns {Promise<Country[]>} A promise that resolves to an array of Country objects.
 * @throws {Error} Throws an error if the HTTP request fails.
 *
 * Example usage:
 * ```
 * fetchCountriesByName('united', 1, 10)
 *   .then(countries => console.log(countries))
 *   .catch(error => console.error(error));
 * ```
 */
const fetchCountriesByName = async (
  searchTerm: string,
  page: number,
  pageSize: number
): Promise<Country[]> => {
  try {
    // Calculate the starting point for the results (offset)
    const offset = (page - 1) * pageSize
    const response = await api.get<Country[]>(
      `/name/${searchTerm}?limit=${pageSize}&offset=${offset}`
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Fetches details of a specific country from the REST Countries API using the country's cca2 code.
 *
 * This asynchronous function sends an HTTP GET request to the REST Countries API and retrieves
 * the data for a single country that matches the provided cca2 code.
 *
 * @param {string} cca2 - The two-letter country code (cca2 code) used to identify the country.
 * @returns {Promise<Country>} A promise that resolves to the Country object.
 * @throws {Error} Throws an error if the HTTP request fails or if the country cannot be found.
 *
 * Example usage:
 * ```
 * fetchCountry('US')
 *   .then(country => console.log(country))
 *   .catch(error => console.error(error));
 * ```
 */
const fetchCountry = async (cca2: string): Promise<Country> => {
  try {
    const response = await api.get<Country>(`/alpha/${cca2}`)
    console.log(response)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Retrieves a list of countries from a specified region using the REST Countries API.
 *
 * This function asynchronously sends a GET request to the REST Countries API's `/region` endpoint
 * and returns an array of countries that belong to the given region. The region is case-insensitive
 * and should match one of the region names recognized by the API (e.g., "Asia", "Europe").
 *
 * @param {string} region - The name of the region for which to fetch countries.
 * @returns {Promise<Country[]>} A promise that resolves to an array of Country objects.
 * @throws {Error} Throws an error if the HTTP request fails, such as for an invalid region name.
 *
 * Example usage:
 * ```
 * fetchByRegion('Europe')
 *   .then(countries => console.log(countries))
 *   .catch(error => console.error(error));
 * ```
 */
const fetchByRegion = async (region: string): Promise<Country[]> => {
  try {
    const response = await api.get<Country[]>(`/region/${region}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export default {
  fetchCountries,
  fetchCountriesByName,
  fetchCountry,
  fetchByRegion
}
