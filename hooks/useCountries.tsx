'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Country } from '@/interfaces'
import countriesService from '@/services/countries'

export const useCountries = () => {
  const [displayedCountries, setDisplayedCountries] = useState<Country[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [pageSize] = useState(25)
  const [pageEndIndex, setPageEndIndex] = useState(pageSize)

  const {
    data: allCountries,
    error,
    isLoading,
  } = useSWR('allCountries', countriesService.fetchAllCountries)

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
