'use client'

import { useQuery } from '@tanstack/react-query'
import { countryKeys } from '@/lib/query-keys'
import { fetchCountriesByName } from '@/services/countries.client'

type UseCountriesByNameParams = {
  searchTerm: string
  page?: number
  pageSize: number
  enabled?: boolean
}

export const useCountriesByName = ({
  searchTerm,
  page = 1,
  pageSize,
  enabled = true,
}: UseCountriesByNameParams) => {
  return useQuery({
    queryKey: countryKeys.byName(searchTerm, page, pageSize),
    queryFn: () => {
      return fetchCountriesByName({ searchTerm, page, pageSize })
    },
    enabled: enabled && Boolean(searchTerm),
  })
}
