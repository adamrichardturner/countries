import { NextResponse } from 'next/server'
import { fetchCountry } from '@/services/countries.server'

export async function GET(
  _request: Request,
  context: { params: Promise<{ countryId: string }> }
) {
  try {
    const { countryId } = await context.params
    const country = await fetchCountry({ countryId })
    return NextResponse.json(country)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch country'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
