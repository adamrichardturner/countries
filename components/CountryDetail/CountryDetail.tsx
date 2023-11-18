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

  // Assuming `country.name` exists and is the name of the country
  const countryName = country.name

  return (
    <div>
      <div
        onClick={goBack}
        className="shadow-md cursor-pointer hover:shadow-xl text-xs space-x-2 py-1.5 dark:bg-dark-blue bg-white w-24 flex flex-row items-center justify-center"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Back</p>
      </div>
      <article>
        <div className="relative h-40 w-full overflow-hidden">
          {/* Display the country flag */}
          {country.flags.svg || country.flags.png ? (
            <Image
              src={country.flags.svg || country.flags.png}
              alt={`${countryName} Flag`}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          ) : (
            <p>No flag available</p>
          )}
        </div>
        {/* You can add more country details here */}
      </article>
    </div>
  )
}

export default CountryDetail
