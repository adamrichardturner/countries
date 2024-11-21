'use client'

import { FC, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header/Header'
import SearchComponent from '@/components/SearchComponent/SearchComponent'
import FilterComponent from '@/components/FilterComponent/FilterComponent'
import CountryCard from '@/components/CountryCard/CountryCard'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useCountries } from '@/hooks/useCountries'
import { InfiniteScroll } from '@/components/InfiniteScroll'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { LoadingSpinner } from '@/components/LoadingSpinner'

const Home: FC = () => {
  const [mounted, setMounted] = useState(false)
  const {
    displayedCountries,
    allCountries,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedRegion,
    setSelectedRegion,
    pageSize,
    pageEndIndex,
    setPageEndIndex,
    error,
  } = useCountries()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted
  if (!mounted) return null

  const { theme } = useTheme()

  const handleLoadMore = () => {
    setPageEndIndex((prev) => prev + pageSize)
  }

  const handleSearchChange = (newSearchTerm: string) => {
    setSelectedRegion('')
    setSearchTerm(newSearchTerm)
    setPageEndIndex(pageSize)
  }

  const handleRegionChange = (newRegion: string) => {
    setSearchTerm('')
    setSelectedRegion(newRegion)
    setPageEndIndex(pageSize)
  }

  if (error) {
    return (
      <ErrorBoundary fallback={<div>Error fetching countries</div>}>
        <div>Error fetching countries</div>
      </ErrorBoundary>
    )
  }

  if (isLoading) {
    return (
      <div className="bg-very-light-gray dark:bg-very-dark-blue-bg min-h-screen flex flex-col">
        <Header />
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="bg-very-light-gray dark:bg-very-dark-blue-bg min-h-screen">
      <Header />
      <main className="container p-6 space-y-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2 mt-6">
          <SearchComponent
            searchTerm={searchTerm}
            onSearchTermChange={handleSearchChange}
          />
          <FilterComponent
            selectedRegion={selectedRegion}
            onRegionChange={handleRegionChange}
          />
        </div>
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-19">
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
        <InfiniteScroll
          onIntersect={handleLoadMore}
          hasMore={pageEndIndex < (allCountries?.data.length || 0)}
        />
      </main>
    </div>
  )
}

export default Home
