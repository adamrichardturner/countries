import { NextRequest, NextResponse } from 'next/server'
import { fetchCountriesByName } from '@/services/countries.server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const searchTerm = searchParams.get('q')

    if (!searchTerm) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      )
    }

    const page = Number(searchParams.get('page') ?? '1')
    const pageSize = Number(searchParams.get('pageSize') ?? '25')

    const countries = await fetchCountriesByName({
      searchTerm,
      page: Number.isFinite(page) ? page : 1,
      pageSize: Number.isFinite(pageSize) ? pageSize : 25,
    })

    return NextResponse.json(countries)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to search countries'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
