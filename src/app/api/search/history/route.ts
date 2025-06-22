import { addSearchHistory, getRecentSearchHistory } from '@/actions/search';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }

  const recentSearches = await getRecentSearchHistory(userId, 8);

  return new Response(JSON.stringify({ recentSearches }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: Request) {
  try {
    const { userId, query } = await req.json();

    if (!userId || !query) {
      return new Response(
        JSON.stringify({ error: 'Missing userId or query' }),
        { status: 400 },
      );
    }
    
    await addSearchHistory(userId, query);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch {
    return new Response(
      JSON.stringify({ error: 'Failed to record search history' }),
      { status: 500 },
    );
  }
}
