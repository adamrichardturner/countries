import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { Nunito_Sans } from 'next/font/google'
import { getTheme, getThemeScript } from '@teispace/next-themes/server'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import './globals.css'

config.autoAddCss = false

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '600', '800'],
})

const THEME_SCRIPT_OPTIONS = {
  attribute: 'class' as const,
  defaultTheme: 'dark',
  enableSystem: false,
  themes: ['light', 'dark'],
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
  ),
  title: 'Countries API Dashboard with Dark Mode by Adam Turner',
  description:
    'Next.js, Tailwind and TypeScript app using Countries API by Adam Turner',
  openGraph: {
    title: 'Countries API Dashboard with Dark Mode by Adam Turner',
    description:
      'Next.js, Tailwind and TypeScript app using Countries API by Adam Turner',
    url: '/',
    siteName: 'Countries API Dashboard',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'REST Countries API by Adam Turner',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Countries API Dashboard with Dark Mode by Adam Turner',
    description:
      'Next.js, Tailwind and TypeScript app using Countries API by Adam Turner',
    images: [
      {
        url: '/opengraph-image.png',
        alt: 'Countries API Dashboard by Adam Turner',
      },
    ],
    creator: '@devadam88',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const storedTheme = await getTheme({ themes: THEME_SCRIPT_OPTIONS.themes })
  const initialTheme = storedTheme ?? THEME_SCRIPT_OPTIONS.defaultTheme
  const themeScript = getThemeScript({
    ...THEME_SCRIPT_OPTIONS,
    initialTheme,
  })

  return (
    <html lang="en" className={nunitoSans.className} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider initialTheme={initialTheme} noScript>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
