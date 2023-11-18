'use client'

import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { CountryDetailProps } from '@/interfaces'
import Image from 'next/image'

const CountryDetail: FC<CountryDetailProps> = ({ country }) => {
  const router = useRouter()
  const goBack = () => {
    router.back()
  }

  // Function to get a displayable string from native names object
  const getNativeNameDisplay = (nativeNames: {
    [key: string]: { official: string; common: string }
  }): string => {
    // This will take the first nativeName entry and return its official name.
    const [firstNativeName] = Object.values(nativeNames)
    return firstNativeName?.common || 'No native name available'
  }

  // Function to get a displayable string from currencies object
  const getCurrenciesDisplay = (currencies: {
    [key: string]: { name: string; symbol: string }
  }): string => {
    return Object.values(currencies)
      .map((currency) => `${currency.name} (${currency.symbol})`)
      .join(', ')
  }

  // Function to get a displayable string from languages object
  const getLanguagesDisplay = (languages: {
    [key: string]: string
  }): string => {
    return Object.values(languages).join(', ')
  }

  // Determine the longest border country name for minWidth
  const longestBorderCountryNameLength = Math.max(
    ...(country.borderCountries?.map((name) => name.length) || [0])
  )
  // Convert this length into a suitable minWidth in 'em' units
  const minWidthStyle = {
    minWidth: `${longestBorderCountryNameLength * 0.6}em`
  }

  return (
    <div className="space-y-16">
      <div
        onClick={goBack}
        className="shadow-md cursor-pointer hover:shadow-xl text-xs space-x-2 py-1.5 dark:bg-dark-blue bg-white w-24 flex flex-row items-center justify-center"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Back</p>
      </div>
      <article className="flex flex-col md:flex-row md:space-x-24 space-y-12">
        <div className="relative h-96 w-full md:w-1/2 overflow-hidden">
          {country.flags.svg || country.flags.png ? (
            <Image
              src={country.flags.svg || country.flags.png}
              alt={`${country.name.official} Flag`}
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <p>No flag available</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="space-y-6 flex-col md:flex-row items-center justify-center">
            <div>
              <h2 className="font-bold text-2xl">
                {country.name.common || country.name.official}
              </h2>
            </div>
            <div className="flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-24">
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row space-x-2">
                  <h3 className="text-sm font-semibold">Native Name: </h3>
                  <span className="text-sm">
                    {getNativeNameDisplay(country.name.nativeName)}
                  </span>
                </div>
                <div className="flex flex-row space-x-2">
                  <h3 className="text-sm font-semibold">Population: </h3>
                  <span className="text-sm">
                    {country.population.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-row space-x-2">
                  <h3 className="text-sm font-semibold">Region: </h3>
                  <span className="text-sm"> {country.region}</span>
                </div>
                <div className="flex flex-row space-x-2">
                  <h3 className="text-sm font-semibold">Sub Region: </h3>
                  <span className="text-sm"> {country.subRegion}</span>
                </div>
                <div className="flex flex-row space-x-2">
                  <h3 className="text-sm font-semibold">Capital: </h3>
                  <span className="text-sm"> {country.capital.join(', ')}</span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row space-x-2">
                  <h3 className="text-sm font-semibold">Top Level Domain: </h3>
                  <span className="text-sm"> {country.tld.join(', ')}</span>
                </div>
                <div className="flex flex-row space-x-2">
                  <h3 className="text-sm font-semibold">Currencies: </h3>
                  <span className="text-sm">
                    {getCurrenciesDisplay(country.currencies)}
                  </span>
                </div>
                <div className="flex flex-row space-x-2">
                  <h3 className="text-sm font-semibold">Languages: </h3>
                  <span className="text-sm">
                    {getLanguagesDisplay(country.languages)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-3 pt-6 md:pt-0">
              <span className="leading-none font-bold text-sm pb-4 md:pb-0">
                Border Countries:{' '}
              </span>
              <div className="flex flex-wrap mt-0">
                {country.borderCountries &&
                  country.borderCountries.map((borderCountry, index) => (
                    <div
                      key={index}
                      style={minWidthStyle}
                      className="bg-white rounded-sm dark:bg-dark-blue text-very-dark-blue-text dark:text-white py-1 px-3 shadow-md text-center mr-2 mt-2 first:ml-0"
                    >
                      <span className="text-xs">{borderCountry}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default CountryDetail
