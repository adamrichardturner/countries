'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import debounce from 'lodash.debounce'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header/Header'
import SearchComponent from '@/components/SearchComponent/SearchComponent'
import FilterComponent from '@/components/FilterComponent/FilterComponent'
import CountryCard from '@/components/CountryCard/CountryCard'
import { Country } from '@/interfaces'
import countriesService from '../services/countries' // Make sure this import matches the actual file path
import Link from 'next/link'

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [results, setResults] = useState<Country[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const loader = useRef<HTMLDivElement | null>(null)

  // Function to fetch initial set of countries
  const fetchInitialCountries = async () => {
    setIsSearching(true)
    try {
      const fetchedCountries = await countriesService.fetchCountries(1, 10) // Fetch first page of countries
      console.log(fetchedCountries)
      setResults(fetchedCountries)
      setPage(2) // Set the next page to be fetched
    } catch (error) {
      console.error('Failed to fetch initial set of countries:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const fetchMoreCountries = async () => {
    try {
      const fetchedCountries = await countriesService.fetchCountries(page, 10) // Modify to fetch next set of countries
      setResults((prevResults) => [...prevResults, ...fetchedCountries])
      setPage(page + 1) // Increment page number for next API call
    } catch (error) {
      console.error('Failed to fetch more countries:', error)
    }
  }

  const handleObserver = useCallback(
    (entities: IntersectionObserverEntry[]) => {
      const target = entities[0]
      if (target.isIntersecting) {
        fetchMoreCountries()
      }
    },
    [page]
  )

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) observer.observe(loader.current)

    return () => {
      if (loader.current) observer.unobserve(loader.current)
    }
  }, [handleObserver])

  const debouncedSearch = useCallback(
    debounce((newSearchTerm: string) => {
      handleSearch(newSearchTerm)
      setSelectedRegion('') // Reset the region filter when searching
    }, 300),
    []
  )

  const handleSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm)
    debouncedSearch(newSearchTerm)
  }

  // Function to fetch all countries
  const fetchAllCountries = async () => {
    setIsSearching(true)
    try {
      const fetchedCountries = await countriesService.fetchCountries(1, 10) // Increase the pageSize if needed to fetch all countries
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
    if (region === 'All') {
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

  useEffect(() => {
    fetchInitialCountries() // Fetch the initial set of countries on mount
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
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14">
            {!isSearching &&
              results.map((country) => (
                <Link
                  href={`/country/${encodeURIComponent(country.cca2)}`}
                  passHref
                  key={country.cca2}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'block' }} // Ensure this is clickable
                  >
                    <CountryCard country={country} />
                  </motion.div>
                </Link>
              ))}
          </div>
        </AnimatePresence>

        <div ref={loader} />
      </main>
    </div>
  )
}

export default Home
