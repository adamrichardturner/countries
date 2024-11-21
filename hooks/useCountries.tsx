'use client'

import { useState, useEffect } from 'react'
import countriesData from '../data.json'
import { Country } from '@/interfaces'

export const useCountries = () => {
  const [displayedCountries, setDisplayedCountries] = useState<Country[]>([])
  const [allCountries, setAllCountries] = useState<{ data: Country[] } | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [pageSize] = useState(20)
  const [pageEndIndex, setPageEndIndex] = useState(pageSize)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        })

        const fetchPromise = fetch('https://restcountries.com/v3.1/all')

        const response = (await Promise.race([
          fetchPromise,
          timeoutPromise,
        ])) as Response

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = (await response.json()) as Country[]
        const sortedData = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        )
        setAllCountries({ data: sortedData })
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching countries:', err)
        // Transform the fallback data to match the API data structure
        const transformedData = (countriesData as any[]).map((country) => ({
          name: {
            common: country.name,
            official: country.name,
            nativeName: {
              [country.languages?.[0]?.iso639_1 || 'default']: {
                official: country.name,
                common: country.name,
              },
            },
          },
          flags: {
            svg: country.flag,
            png: country.flag,
          },
          population: country.population,
          region: country.region,
          capital: [country.capital],
          cca2: country.alpha2Code,
          cca3: country.alpha3Code,
          nativeName: {
            [country.languages?.[0]?.iso639_1 || 'default']: {
              official: country.name,
              common: country.name,
            },
          },
          subRegion: country.subregion,
          tld: country.topLevelDomain,
          currencies: country.currencies
            ? {
                [Object.keys(country.currencies)[0]]: {
                  name: country.currencies[0]?.name || '',
                  symbol: country.currencies[0]?.symbol || '',
                },
              }
            : {},
          languages: Object.fromEntries(
            (country.languages || []).map((lang: any) => [
              lang.iso639_1,
              lang.name,
            ])
          ),
          borders: country.borders || [],
        }))

        const sortedFallbackData = transformedData.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        )
        setAllCountries({ data: sortedFallbackData })
        setError(err instanceof Error ? err : new Error('An error occurred'))
        setIsLoading(false)
      }
    }

    fetchCountries()
  }, [])

  // Filter logic
  useEffect(() => {
    if (!allCountries) return
    const filteredCountries = allCountries.data.filter((country) => {
      const matchesRegion =
        selectedRegion === 'All' ||
        !selectedRegion ||
        country.region.includes(selectedRegion)
      const matchesSearch =
        !searchTerm ||
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesRegion && matchesSearch
    })

    setDisplayedCountries(filteredCountries.slice(0, pageEndIndex))
  }, [allCountries, searchTerm, selectedRegion, pageEndIndex])

  return {
    displayedCountries,
    allCountries,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedRegion,
    setSelectedRegion,
    pageSize,
    pageEndIndex,
    setPageEndIndex,
  }
}
