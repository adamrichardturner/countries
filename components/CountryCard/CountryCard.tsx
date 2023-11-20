import { FC, useEffect } from 'react'
import Image from 'next/image'
import { CountryCardProps } from '@/interfaces'

const CountryCard: FC<CountryCardProps> = ({ country }) => {
  const countryName = country.name.official || country.name.common
  useEffect(() => {
    // Function to calculate and set minimum height
    const setMinHeightToCards = () => {
      const cards = document.querySelectorAll(
        '.card'
      ) as NodeListOf<HTMLElement> // Typecast as HTMLElement
      let maxHeight = 0

      // Calculate the maximum height among all cards
      cards.forEach((card) => {
        const cardHeight = card.clientHeight
        if (cardHeight > maxHeight) {
          maxHeight = cardHeight
        }
      })

      // Set the maximum height to all cards
      cards.forEach((card) => {
        card.style.minHeight = `${maxHeight}px`
      })
    }

    // Call the function initially
    setMinHeightToCards()

    // Attach an event listener for window resize
    window.addEventListener('resize', setMinHeightToCards)

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', setMinHeightToCards)
    }
  }, [])

  return (
    <article className="card rounded-lg shadow-md hover:shadow-xl bg-white dark:bg-dark-blue flex flex-1 flex-col h-full">
      <div className="relative overflow-hidden h-52 md:h-48 lg:h-36">
        <Image
          src={country.flags.svg || country.flags.png}
          alt={`${countryName} Flag`}
          priority
          fill
          className="rounded-t-lg object-cover"
        />
      </div>
      <div className="p-5 bg-white dark:bg-dark-blue rounded-b-lg">
        <h3 className="leading-none pb-4 text-md font-bold">{countryName}</h3>
        <div className="text-very-dark-blue-text dark:text-white text-sm">
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
