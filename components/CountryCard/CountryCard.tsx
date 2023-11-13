import { FC } from 'react'
import Image from 'next/image'
import { CountryCardProps } from '@/interfaces'

const CountryCard: FC<CountryCardProps> = ({ country }) => {
  const countryName = country.name.common || country.name.official

  return (
    <article className="card rounded-lg shadow-md min-h-fit bg-white dark:bg-dark-blue flex-1">
      <div className="flag-container relative w-full h-40 overflow-hidden">
        <Image
          src={country.flags.svg || country.flags.png}
          alt={`${countryName} Flag`}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-t-lg"
        />
      </div>
      <div className="info p-4 bg-white dark:bg-dark-blue rounded-b-lg space-y-3 pb-12 h-full">
        <h3 className="text-lg font-bold">{countryName}</h3>
        <div className="text-very-dark-blue-text dark:text-white">
          <p>
            <span className="font-semibold">Population:</span>{' '}
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-semibold">Capital:</span> {country.capital}
          </p>
        </div>
      </div>
    </article>
  )
}

export default CountryCard
