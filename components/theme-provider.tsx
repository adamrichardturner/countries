'use client'

import {
  ThemeProvider as TeispaceThemeProvider,
  type ThemeProviderProps,
} from '@teispace/next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <TeispaceThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      themes={['light', 'dark']}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </TeispaceThemeProvider>
  )
}
