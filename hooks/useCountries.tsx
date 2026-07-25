'use client'

import { useState, useEffect, useMemo } from 'react'
import countriesData from '../data.json'
import { Country, FallbackCountry } from '@/interfaces'

const fallbackCountries = countriesData as FallbackCountry[]

const transformFallbackCountry = (country: FallbackCountry): Country => {
  const languageCode = country.languages?.[0]?.iso639_1 ?? 'default'
  const primaryCurrency = country.currencies?.[0]

  return {
    name: {
      common: country.name,
      official: country.name,
      nativeName: {
        [languageCode]: {
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
      [languageCode]: {
        official: country.name,
        common: country.name,
      },
    },
    subRegion: country.subregion,
    tld: country.topLevelDomain,
    currencies: primaryCurrency
      ? {
          [primaryCurrency.code]: {
            name: primaryCurrency.name,
            symbol: primaryCurrency.symbol,
          },
        }
      : {},
    languages: Object.fromEntries(
      (country.languages ?? []).map((lang) => [lang.iso639_1, lang.name])
    ),
    borders: country.borders ?? [],
  }
}

export const useCountries = () => {
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
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => {
            reject(new Error('Request timeout'))
          }, 10000)
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
        const sortedData = data.sort((a, b) => {
          return a.name.common.localeCompare(b.name.common)
        })
        setAllCountries({ data: sortedData })
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching countries:', err)
        const transformedData = fallbackCountries.map(transformFallbackCountry)

        const sortedFallbackData = transformedData.sort((a, b) => {
          return a.name.common.localeCompare(b.name.common)
        })
        setAllCountries({ data: sortedFallbackData })
        setError(err instanceof Error ? err : new Error('An error occurred'))
        setIsLoading(false)
      }
    }

    void fetchCountries()
  }, [])

  const displayedCountries = useMemo(() => {
    if (!allCountries) {
      return []
    }

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

    return filteredCountries.slice(0, pageEndIndex)
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
