'use client'

import { FC } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {
  CountryCurrency,
  CountryDetailProps,
  CountryLanguage,
  CountryNameForms,
} from '@/interfaces'
import Image from 'next/image'

const CountryDetail: FC<CountryDetailProps> = ({ country }) => {
  const router = useRouter()
  const goBack = () => {
    router.back()
    if (!document.referrer.includes(window.location.origin)) {
      sessionStorage.clear()
    }
  }

  const getNativeNameDisplay = (
    nativeNames: Record<string, CountryNameForms>
  ): string => {
    const [firstNativeName] = Object.values(nativeNames)
    return firstNativeName?.common || 'No native name available'
  }

  const getCurrenciesDisplay = (currencies: CountryCurrency[]): string => {
    return currencies
      .map((currency) => {
        return `${currency.name} (${currency.symbol})`
      })
      .join(', ')
  }

  const getLanguagesDisplay = (languages: CountryLanguage[]): string => {
    return languages
      .map((language) => {
        return language.name
      })
      .join(', ')
  }

  const flagSrc = country.flag.url_svg || country.flag.url_png
  const capitalNames = country.capitals.map((capital) => {
    return capital.name
  })

  return (
    <div className="space-y-16">
      <div
        onClick={goBack}
        className="shadow-md cursor-pointer hover:shadow-xl text-xs space-x-2 py-1.5 dark:bg-dark-blue bg-white w-24 flex flex-row items-center justify-center"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Back</p>
      </div>
      <article className="flex flex-col md:flex-row md:space-x-24 space-y-12 md:space-y-0">
        <div className="relative object-cover object-center w-full md:w-1/2 overflow-hidden">
          {flagSrc ? (
            <Image
              src={flagSrc}
              alt={country.flag.description ?? `${country.names.official} Flag`}
              width={1920}
              height={1080}
              priority
              className="h-auto w-full shadow-md"
            />
          ) : (
            <p>No flag available</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-1/2">
          <div className="space-y-6 flex-col md:flex-row items-center justify-center">
            <div>
              <h2 className="font-bold text-2xl">
                {country.names.common || country.names.official}
              </h2>
            </div>
            <div className="flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-24">
              <div className="flex flex-col space-y-2">
                {Object.keys(country.names.native).length > 0 ? (
                  <div className="flex flex-row space-x-2">
                    <h3 className="text-sm font-semibold">Native Name: </h3>
                    <span className="text-sm">
                      {getNativeNameDisplay(country.names.native)}
                    </span>
                  </div>
                ) : null}
                {country.population ? (
                  <div className="flex flex-row space-x-2">
                    <h3 className="text-sm font-semibold">Population: </h3>
                    <span className="text-sm">
                      {country.population.toLocaleString()}
                    </span>
                  </div>
                ) : null}
                {country.region ? (
                  <div className="flex flex-row space-x-2">
                    <h3 className="text-sm font-semibold">Region: </h3>
                    <span className="text-sm"> {country.region}</span>
                  </div>
                ) : null}
                {country.subregion ? (
                  <div className="flex flex-row space-x-2">
                    <h3 className="text-sm font-semibold">Sub Region: </h3>
                    <span className="text-sm"> {country.subregion}</span>
                  </div>
                ) : null}
                {capitalNames.length ? (
                  <div className="flex flex-row space-x-2">
                    <h3 className="text-sm font-semibold">Capital: </h3>
                    <span className="text-sm"> {capitalNames.join(', ')}</span>
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col space-y-2">
                {country.tlds[0] ? (
                  <div className="flex flex-row space-x-2">
                    <h3 className="text-sm font-semibold">
                      Top Level Domain:{' '}
                    </h3>
                    <span className="text-sm"> {country.tlds[0]}</span>
                  </div>
                ) : null}
                {country.currencies.length ? (
                  <div className="flex flex-row space-x-2">
                    <h3 className="text-sm font-semibold">Currencies: </h3>
                    <span className="text-sm">
                      {getCurrenciesDisplay(country.currencies)}
                    </span>
                  </div>
                ) : null}
                {country.languages.length ? (
                  <div className="flex flex-row space-x-2">
                    <h3 className="text-sm font-semibold">Languages: </h3>
                    <span className="text-sm">
                      {getLanguagesDisplay(country.languages)}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
            {country.borderCountries && country.borderCountries.length > 0 ? (
              <div className="flex flex-col md:flex-row md:items-center md:space-x-3 pt-6 md:pt-0">
                <span className="leading-none font-bold text-sm pb-4 md:pb-0">
                  Border Countries:{' '}
                </span>
                <div className="flex flex-wrap -mx-2">
                  {country.borderCountries.map((borderCountry) => (
                    <Link
                      href={`/country/${encodeURIComponent(
                        borderCountry.code
                      )}`}
                      passHref
                      key={borderCountry.code}
                    >
                      <div className="bg-white rounded-sm dark:bg-dark-blue text-very-dark-blue-text dark:text-white py-1 px-2 shadow-md text-center mx-2 mt-2 first:ml-0">
                        <span className="text-xs">{borderCountry.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </div>
  )
}

export default CountryDetail
