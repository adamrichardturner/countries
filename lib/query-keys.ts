export const countryKeys = {
  all: ['countries'] as const,
  lists: () => {
    return [...countryKeys.all, 'list'] as const
  },
  list: () => {
    return [...countryKeys.lists(), 'all'] as const
  },
  paginated: (page: number, pageSize: number) => {
    return [...countryKeys.lists(), 'paginated', page, pageSize] as const
  },
  details: () => {
    return [...countryKeys.all, 'detail'] as const
  },
  detail: (countryId: string) => {
    return [...countryKeys.details(), countryId] as const
  },
  byName: (searchTerm: string, page: number, pageSize: number) => {
    return [...countryKeys.all, 'name', searchTerm, page, pageSize] as const
  },
  byRegion: (region: string) => {
    return [...countryKeys.all, 'region', region] as const
  },
}
