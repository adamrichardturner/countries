'use client'

import { useQuery } from '@tanstack/react-query'
import { countryKeys } from '@/lib/query-keys'
import { fetchCountry } from '@/services/countries.client'

export const useCountry = (countryId: string) => {
  return useQuery({
    queryKey: countryKeys.detail(countryId),
    queryFn: () => {
      return fetchCountry({ countryId })
    },
    enabled: Boolean(countryId),
  })
}
