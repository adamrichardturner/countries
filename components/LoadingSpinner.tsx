import Image from 'next/image'
import { useTheme } from 'next-themes'
import SpinnerBlack from '@/assets/Spinner-Black.svg'
import SpinnerWhite from '@/assets/Spinner-White.svg'

export const LoadingSpinner = () => {
  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <div className="bg-very-light-gray dark:bg-very-dark-blue-bg min-h-screen flex flex-col">
      <div className="text-center w-full h-full flex justify-center items-center flex-1 pb-[56px]">
        <Image
          src={currentTheme === 'light' ? SpinnerBlack : SpinnerWhite}
          alt="Loading..."
          width={70}
          height={70}
        />
      </div>
    </div>
  )
}
