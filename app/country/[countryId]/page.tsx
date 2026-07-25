import CountryDetailView from '@/components/CountryDetail/CountryDetailView'

export default async function CountryPage(props: {
  params: Promise<{ countryId: string }>
}) {
  const params = await props.params
  const { countryId } = params

  return <CountryDetailView countryId={countryId} />
}
