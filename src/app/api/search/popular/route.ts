import { getPopularSearches, updatePopularSearch } from '@/actions/search';
import { NextRequest, NextResponse } from 'next/server';

// GET popular searches
export async function GET(req: NextRequest) {
  const limit = Number(req.nextUrl.searchParams.get('limit')) || 10;
  const searches = await getPopularSearches(limit);
  return NextResponse.json(searches);
}

// Update a popular search
export async function POST(req: NextRequest) {
  const { query } = await req.json();
  if (!query || typeof query !== 'string') {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }
  const updated = await updatePopularSearch(query);
  return NextResponse.json(updated);
}
