import { FC, useEffect } from 'react'
import Image from 'next/image'
import { CountryCardProps } from '@/interfaces'

const CountryCard: FC<CountryCardProps> = ({ country }) => {
  const countryName = country.name.official || country.name.common
  // In your component where you render the cards
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

    // Attach an event listener for window resize (optional)
    window.addEventListener('resize', setMinHeightToCards)

    // Clean up the event listener on unmount (optional)
    return () => {
      window.removeEventListener('resize', setMinHeightToCards)
    }
  }, [])

  return (
    <article className="card rounded-lg shadow-md bg-white dark:bg-dark-blue flex flex-1 flex-col h-full">
      <div className="relative overflow-hidden h-40">
        {/* Display the country flag */}
        <Image
          src={country.flags.svg || country.flags.png}
          alt={`${countryName} Flag`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4 bg-white dark:bg-dark-blue rounded-b-lg">
        <h3 className="leading-none  pb-4 text-lg font-bold">{countryName}</h3>
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
