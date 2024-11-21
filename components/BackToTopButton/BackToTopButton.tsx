"use client"

import { FC, useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"

const BackToTopButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-4 right-4 px-3 py-2 dark:bg-white bg-dark-blue rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none'
          aria-label='Back to top'
        >
          <FontAwesomeIcon
            icon={faArrowUp}
            className='dark:text-very-dark-blue-text text-white w-4 h-4'
          />
        </button>
      )}
    </>
  )
}

export default BackToTopButton
