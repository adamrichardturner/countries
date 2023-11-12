'use client'

import { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash.debounce'
import Header from '@/components/Header/Header'
import SearchComponent from '@/components/SearchComponent/SearchComponent'
import FilterComponent from '@/components/FilterComponent/FilterComponent'
import CountryCard from '@/components/CountryCard/CountryCard'
import { Country } from '@/interfaces'
import countriesService from '../services/countries' // Make sure this import matches the actual file path

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [results, setResults] = useState<Country[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)

  // Function to fetch all countries
  const fetchAllCountries = async () => {
    setIsSearching(true)
    try {
      const fetchedCountries = await countriesService.fetchCountries(1, 250) // Increase the pageSize if needed to fetch all countries
      setResults(fetchedCountries)
    } catch (error) {
      console.error('Failed to fetch all countries:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = async (term: string) => {
    setSearchTerm(term)
    if (term.trim() === '') {
      await fetchAllCountries() // Fetch all countries if search term is empty
      return
    }
    setIsSearching(true)
    try {
      const fetchedCountries = await countriesService.fetchCountriesByName(
        term,
        1,
        10
      ) // Assuming this is the correct service function
      setResults(fetchedCountries)
    } catch (error) {
      console.error('Failed to fetch countries:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleRegionChange = async (region: string) => {
    setSelectedRegion(region)
    if (region === '') {
      await fetchAllCountries() // Fetch all countries if region is cleared
      return
    }
    setIsSearching(true)
    try {
      const fetchedCountries = await countriesService.fetchByRegion(region)
      setResults(fetchedCountries)
    } catch (error) {
      console.error('Failed to fetch countries by region:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const debouncedSearch = useCallback(debounce(handleSearch, 300), [])

  // Handler to be called when the search term changes
  const handleSearchTermChange = (newSearchTerm: string) => {
    debouncedSearch(newSearchTerm)
    setSelectedRegion('') // Reset the region filter when searching
  }

  // useEffect to fetch all countries on initial render
  useEffect(() => {
    fetchAllCountries()
  }, [])

  return (
    <div className="bg-very-light-gray dark:bg-very-dark-blue-bg">
      <Header />
      <main className="container min-h-screen p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <SearchComponent onSearchTermChange={handleSearchTermChange} />
          <FilterComponent
            selectedRegion={selectedRegion}
            onRegionChange={handleRegionChange}
          />
        </div>
        {isSearching && <div className="text-center">Searching...</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14">
          {!isSearching &&
            results.map((country) => (
              <CountryCard key={country.alpha2Code} country={country} />
            ))}
        </div>
      </main>
    </div>
  )
}

export default Home
