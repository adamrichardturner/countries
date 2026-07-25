import { NextRequest, NextResponse } from 'next/server'
import { fetchByRegion } from '@/services/countries.server'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ region: string }> }
) {
  try {
    const { region } = await context.params
    const { searchParams } = request.nextUrl
    const page = Number(searchParams.get('page') ?? '1')
    const pageSize = Number(searchParams.get('pageSize') ?? '100')

    const countries = await fetchByRegion({
      region,
      page: Number.isFinite(page) ? page : 1,
      pageSize: Number.isFinite(pageSize) ? pageSize : 100,
    })

    return NextResponse.json(countries)
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to fetch countries by region'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
