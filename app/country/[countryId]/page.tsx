import Header from '@/components/Header/Header'
import countriesServices from '../../../services/countries'
import CountryDetail from '@/components/CountryDetail/CountryDetail'

export default async function ({ params }: { params: { countryId: string } }) {
  const { countryId } = params

  const countryData = await countriesServices.fetchCountry({ countryId })

  const country = countryData

  return (
    <div className="bg-very-light-gray dark:bg-very-dark-blue-bg">
      <Header />
      <main className="container min-h-screen p-6">
        <CountryDetail country={country} />
      </main>
    </div>
  )
}
