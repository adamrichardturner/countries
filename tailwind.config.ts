import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': 'hsl(209, 23%, 22%)',
        'very-dark-blue-bg': 'hsl(207, 26%, 17%)',
        'very-dark-blue-text': 'hsl(200, 15%, 8%)',
        'dark-gray': 'hsl(0, 0%, 52%)',
        'very-light-gray': 'hsl(0, 0%, 98%)',
        white: 'hsl(0, 0%, 100%)'
      },
      fontSize: {
        'body-homepage': '14px',
        'body-detail': '16px'
      },
      fontWeight: {
        light: '300',
        semibold: '600',
        bold: '800'
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '100%', // Full width on small screens
          md: '100%', // Full width on medium screens
          lg: '1024px', // Max container width for large screens
          xl: '1200px', // Max container width for extra large screens
          '2xl': '1280px' // Max container width for 2xl screens
        }
      },
      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      }
    }
  },
  plugins: []
}

export default config
