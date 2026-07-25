import { FC, useEffect } from 'react'
import Image from 'next/image'
import { CountryCardProps } from '@/interfaces'
import { AspectRatio } from '../ui/aspect-ratio'

const CountryCard: FC<CountryCardProps> = ({ country }) => {
  useEffect(() => {
    const setMinHeightToCards = () => {
      const cards = document.querySelectorAll(
        '.card'
      ) as NodeListOf<HTMLElement>
      let maxHeight = 0

      for (const card of Array.from(cards)) {
        const cardHeight = card.clientHeight
        if (cardHeight > maxHeight) {
          maxHeight = cardHeight
        }
      }

      for (const card of Array.from(cards)) {
        card.style.minHeight = `${maxHeight}px`
      }
    }

    setMinHeightToCards()
    window.addEventListener('resize', setMinHeightToCards)

    return () => {
      window.removeEventListener('resize', setMinHeightToCards)
    }
  }, [])

  const flagSrc = country.flag.url_svg || country.flag.url_png
  const capitalNames = country.capitals.map((capital) => {
    return capital.name
  })

  return (
    <article className="card rounded-lg shadow-md hover:shadow-xl bg-white dark:bg-dark-blue flex flex-1 flex-col h-full">
      <div className="relative overflow-hidden h-52 md:h-48 lg:h-36">
        <AspectRatio ratio={16 / 9}>
          {flagSrc ? (
            <Image
              src={flagSrc}
              alt={
                country.flag.description ??
                `${country.names.official || country.names.common} Flag`
              }
              priority
              fill
              className="rounded-t-lg object-cover"
            />
          ) : null}
        </AspectRatio>
      </div>
      <div className="p-5 bg-white dark:bg-dark-blue rounded-b-lg">
        <h3 className="leading-none pb-4 text-md font-bold">
          {country.names.official || country.names.common}
        </h3>
        <div className="text-very-dark-blue-text dark:text-white text-sm">
          <p>
            <span className="font-semibold">Population:</span>{' '}
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-semibold">Capital:</span>{' '}
            {capitalNames.join(', ') || 'N/A'}
          </p>
        </div>
      </div>
    </article>
  )
}

export default CountryCard
