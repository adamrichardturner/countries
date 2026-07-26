'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CountriesListResponse, Country } from '@/interfaces'
import { countryKeys } from '@/lib/query-keys'
import { fetchAllCountries } from '@/services/countries.client'
import { getFallbackCountries } from '@/services/fallback-countries'

export const useCountries = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [pageSize] = useState(20)
  const [pageEndIndex, setPageEndIndex] = useState(pageSize)

  const countriesQuery = useQuery<CountriesListResponse>({
    queryKey: countryKeys.list(),
    queryFn: async () => {
      try {
        return await fetchAllCountries()
      } catch (error) {
        console.error('Error fetching countries:', error)
        return { data: getFallbackCountries() }
      }
    },
  })

  const allCountries: CountriesListResponse | null = countriesQuery.data ?? null

  const displayedCountries = useMemo((): Country[] => {
    if (!allCountries) {
      return []
    }

    const countries = allCountries.data
    const filteredCountries: Country[] = []

    for (const country of countries) {
      const matchesRegion =
        selectedRegion === 'All' ||
        !selectedRegion ||
        country.region.includes(selectedRegion)
      const matchesSearch =
        !searchTerm ||
        country.names.common.toLowerCase().includes(searchTerm.toLowerCase())

      if (!matchesRegion || !matchesSearch) {
        continue
      }

      filteredCountries.push(country)
    }

    return filteredCountries.slice(0, pageEndIndex)
  }, [allCountries, searchTerm, selectedRegion, pageEndIndex])

  return {
    displayedCountries,
    allCountries,
    isLoading: countriesQuery.isLoading,
    isFetching: countriesQuery.isFetching,
    error: countriesQuery.error,
    searchTerm,
    setSearchTerm,
    selectedRegion,
    setSelectedRegion,
    pageSize,
    pageEndIndex,
    setPageEndIndex,
  }
}
