'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { CountryDetailProps } from '@/interfaces'

const CountryDetail: FC<CountryDetailProps> = ({ country }) => {
  console.log(country)
  const countryName = country.name.common || country.name.official
  console.log('hello')
  return (
    <div>
      <div className="shadow-md cursor-pointer hover:shadow-xl text-xs space-x-2 py-1.5 dark:bg-dark-blue bg-white w-24 flex flex-row items-center justify-center">
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Back</p>
      </div>
      <article>
        <div>
          {/* <Image src={country.flags.svg} fill alt={countryName} /> */}
        </div>
      </article>
    </div>
  )
}

export default CountryDetail
