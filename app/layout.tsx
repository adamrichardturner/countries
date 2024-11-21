import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Nunito_Sans } from 'next/font/google'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import './globals.css'
config.autoAddCss = false

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '600', '800'],
})

export const metadata: Metadata = {
  title: 'REST Countries API with Dark Mode by Adam Turner',
  description:
    'Next.js, Tailwind and TypeScript app using Countries API by Adam Turner',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
