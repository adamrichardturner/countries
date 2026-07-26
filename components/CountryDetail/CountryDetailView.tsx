'use client'

import Header from '@/components/Header/Header'
import CountryDetail from '@/components/CountryDetail/CountryDetail'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useCountry } from '@/hooks/useCountry'

type CountryDetailViewProps = {
  countryId: string
}

export default function CountryDetailView({
  countryId,
}: CountryDetailViewProps) {
  const { data: country, isLoading, isError, error } = useCountry(countryId)

  if (isLoading) {
    return (
      <div className="bg-very-light-gray dark:bg-very-dark-blue-bg min-h-screen flex flex-col">
        <Header />
        <LoadingSpinner />
      </div>
    )
  }

  if (isError || !country) {
    return (
      <div className="bg-very-light-gray dark:bg-very-dark-blue-bg min-h-screen">
        <Header />
        <main className="container p-6">
          <p className="text-sm">
            {error instanceof Error
              ? error.message
              : 'Unable to load country details.'}
          </p>
        </main>
      </div>
    )
  }

  return (
    <div className="bg-very-light-gray dark:bg-very-dark-blue-bg min-h-screen">
      <Header />
      <main className="container p-6">
        <CountryDetail country={country} />
      </main>
    </div>
  )
}
