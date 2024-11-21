'use client'

import { FC } from 'react'
import { useTheme } from 'next-themes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const Header: FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-dark-blue h-14 w-full shadow-md">
      <div className="container p-6 flex flex-row justify-between items-center h-full">
        <Link href={`/`} passHref>
          <div>
            <h1 className="font-bold text-1xl">Where in the world?</h1>
          </div>
        </Link>
        <div
          className="flex flex-row items-center space-x-2 cursor-pointer"
          onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light')
          }}
        >
          <FontAwesomeIcon
            icon={theme === 'light' ? faMoon : faLightbulb}
            className="text-black dark:text-white"
          />
          <h2 className="text-sm font-semibold">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </h2>
        </div>
      </div>
    </header>
  )
}

export default Header
