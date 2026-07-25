import { Country, FallbackCountry } from '@/interfaces'
import countriesData from '../data.json'

const fallbackCountries = countriesData as FallbackCountry[]

const transformFallbackCountry = (country: FallbackCountry): Country => {
  const languageCode = country.languages?.[0]?.iso639_1 ?? 'default'
  const primaryCurrency = country.currencies?.[0]

  return {
    names: {
      common: country.name,
      official: country.name,
      native: {
        [languageCode]: {
          official: country.name,
          common: country.name,
        },
      },
    },
    codes: {
      alpha_2: country.alpha2Code,
      alpha_3: country.alpha3Code,
    },
    flag: {
      url_svg: country.flag,
      url_png: country.flag,
    },
    population: country.population,
    region: country.region,
    subregion: country.subregion,
    capitals: country.capital ? [{ name: country.capital }] : [],
    tlds: country.topLevelDomain,
    currencies: primaryCurrency
      ? [
          {
            code: primaryCurrency.code,
            name: primaryCurrency.name,
            symbol: primaryCurrency.symbol,
          },
        ]
      : [],
    languages: (country.languages ?? []).map((lang) => {
      return {
        name: lang.name,
        iso639_1: lang.iso639_1,
      }
    }),
    borders: country.borders ?? [],
  }
}

export const getFallbackCountries = (): Country[] => {
  const transformed: Country[] = []

  for (const country of fallbackCountries) {
    transformed.push(transformFallbackCountry(country))
  }

  return transformed.sort((a, b) => {
    return a.names.common.localeCompare(b.names.common)
  })
}
