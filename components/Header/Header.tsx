'use client'

import { FC } from 'react'
import { useTheme } from 'next-themes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

const Header: FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-dark-blue h-14 w-full shadow-md">
      <div className="container flex flex-row justify-between items-center h-full">
        <div>
          <h1 className="font-bold text-1xl">Where in the world?</h1>
        </div>
        <div
          className="flex flex-row items-center space-x-2 cursor-pointer"
          onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light')
          }}
        >
          <FontAwesomeIcon
            icon={faMoon}
            className="text-black dark:text-white"
          />
          <h2 className="text-sm font-semibold">Dark Mode</h2>
        </div>
      </div>
    </header>
  )
}

export default Header
