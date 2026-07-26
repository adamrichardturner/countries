import { NextRequest, NextResponse } from 'next/server'
import {
  fetchAllCountries,
  fetchCountriesPage,
} from '@/services/countries.server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const fetchAll = searchParams.get('all') === '1'

    if (fetchAll) {
      const countries = await fetchAllCountries()
      return NextResponse.json(countries)
    }

    const page = Number(searchParams.get('page') ?? '1')
    const pageSize = Number(searchParams.get('pageSize') ?? '25')
    const q = searchParams.get('q') ?? undefined
    const region = searchParams.get('region') ?? undefined

    const countries = await fetchCountriesPage({
      page: Number.isFinite(page) ? page : 1,
      pageSize: Number.isFinite(pageSize) ? pageSize : 25,
      q,
      region,
    })

    return NextResponse.json(countries)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch countries'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
