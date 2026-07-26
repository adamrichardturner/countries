'use client'

import { useQuery } from '@tanstack/react-query'
import { countryKeys } from '@/lib/query-keys'
import { fetchCountries } from '@/services/countries.client'

type UsePaginatedCountriesParams = {
  page?: number
  pageSize: number
  q?: string
  region?: string
  enabled?: boolean
}

export const usePaginatedCountries = ({
  page = 1,
  pageSize,
  q,
  region,
  enabled = true,
}: UsePaginatedCountriesParams) => {
  return useQuery({
    queryKey: countryKeys.paginated(page, pageSize),
    queryFn: () => {
      return fetchCountries({ page, pageSize, q, region })
    },
    enabled,
  })
}
