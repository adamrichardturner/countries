import Header from '@/components/Header/Header'
import countriesServices from '../../../services/countries'
import CountryDetail from '@/components/CountryDetail/CountryDetail'

export default async function ({ params }: { params: { countryId: string } }) {
  // const data = await countriesServices.fetchCountry(params.countryId)
  return (
    <div className="bg-very-light-gray dark:bg-very-dark-blue-bg">
      <Header />
      <main className="container min-h-screen p-6">
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        {/* <CountryDetail country={data} /> */}
      </main>
    </div>
  )
}
