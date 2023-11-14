'use client'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Country } from '../../../interfaces'
import countriesServices from '../../../services/countries'

const CountryPage = () => {
  const router = useRouter()
  const { country } = router.query
  const [countryData, setCountryData] = useState<Country | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getCountryData = async () => {
      try {
        if (typeof country === 'string') {
          const data = await countriesServices.fetchCountry(country)
          console.log(data)
          setCountryData(data)
        }
      } catch (error: any) {
        setError(error.message || 'An error occurred')
      }
    }

    if (country) {
      getCountryData()
    }
  }, [country])

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!countryData) {
    return <div>Loading...</div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Your content here using countryData */}
      <h1>Hello</h1>
    </main>
  )
}

export default CountryPage
