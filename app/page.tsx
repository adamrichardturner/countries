'use client'

import { FC, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header/Header'
import SearchComponent from '@/components/SearchComponent/SearchComponent'
import FilterComponent from '@/components/FilterComponent/FilterComponent'
import CountryCard from '@/components/CountryCard/CountryCard'
import { Country } from '@/interfaces'
import countriesService from '../services/countries'
import Link from 'next/link'

const Home: FC = () => {
  const [allCountries, setAllCountries] = useState<Country[]>([])
  const [displayedCountries, setDisplayedCountries] = useState<Country[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [pageSize] = useState<number>(25)
  const [pageEndIndex, setPageEndIndex] = useState<number>(pageSize)

  const loader = useRef<HTMLDivElement | null>(null)

  const fetchAllCountries = async () => {
    setIsFetching(true)
    try {
      const response = await countriesService.fetchAllCountries()
      const data = response.data
      setAllCountries(data)
      setIsFetching(false)
    } catch (error) {
      console.error('Failed to fetch all countries:', error)
      setIsFetching(false)
    }
  }

  // Fetch all countries on component mount
  useEffect(() => {
    fetchAllCountries()
  }, [])

  // Filter countries
  useEffect(() => {
    let filteredCountries = allCountries

    if (selectedRegion !== 'All') {
      filteredCountries = filteredCountries.filter((country) =>
        country.region.includes(selectedRegion)
      )
    }

    if (searchTerm) {
      filteredCountries = filteredCountries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setDisplayedCountries(filteredCountries.slice(0, pageEndIndex))
  }, [allCountries, searchTerm, selectedRegion, pageEndIndex])

  // IntersectionObserver callback for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting) {
          if (pageEndIndex < allCountries.length) {
            // Load the next set of countries if not all have been displayed
            setPageEndIndex((prevIndex) => prevIndex + pageSize)
          }
        }
      },
      { threshold: 1.0 }
    )

    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current)
      }
    }
  }, [pageSize, allCountries, pageEndIndex])

  // Search handling
  const handleSearchChange = (newSearchTerm: string) => {
    setSelectedRegion('')
    setSearchTerm(newSearchTerm)
    setPageEndIndex(pageSize) // Reset pagination
  }

  // Region handling
  const handleRegionChange = async (newRegion: string) => {
    setSearchTerm('')
    setSelectedRegion(newRegion)
    setPageEndIndex(pageSize) // Reset pagination
  }

  return (
    <div className="bg-very-light-gray dark:bg-very-dark-blue-bg">
      <Header />
      <main className="container min-h-screen p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <SearchComponent
            searchTerm={searchTerm}
            onSearchTermChange={handleSearchChange}
          />
          <FilterComponent
            selectedRegion={selectedRegion}
            onRegionChange={handleRegionChange}
          />
        </div>
        {isFetching ? (
          <div className="text-center">Loading...</div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14">
              {displayedCountries.map((country) => (
                <Link
                  href={`/country/${encodeURIComponent(country.cca3)}`}
                  passHref
                  key={country.cca3}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    layout
                  >
                    <CountryCard country={country} />
                  </motion.div>
                </Link>
              ))}
            </div>
          </AnimatePresence>
        )}
        {pageEndIndex < allCountries.length && (
          <div ref={loader} className="loading" />
        )}
      </main>
    </div>
  )
}

export default Home
