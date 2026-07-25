'use client'

import { useQuery } from '@tanstack/react-query'
import { countryKeys } from '@/lib/query-keys'
import { fetchByRegion } from '@/services/countries.client'

type UseCountriesByRegionParams = {
  region: string
  page?: number
  pageSize?: number
  enabled?: boolean
}

export const useCountriesByRegion = ({
  region,
  page = 1,
  pageSize = 100,
  enabled = true,
}: UseCountriesByRegionParams) => {
  return useQuery({
    queryKey: countryKeys.byRegion(region),
    queryFn: () => {
      return fetchByRegion({ region, page, pageSize })
    },
    enabled: enabled && Boolean(region) && region !== 'All',
  })
}
