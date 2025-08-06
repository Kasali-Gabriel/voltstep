import {
  addViewedProduct,
  getRecentViewedProducts,
} from '@/actions/viewedProduct';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const fromSearchParam = searchParams.get('fromSearch');
  let fromSearch: boolean | undefined = undefined;
  if (fromSearchParam === 'true') fromSearch = true;
  else if (fromSearchParam === 'false') fromSearch = false;

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Missing userId' }), {
      status: 400,
    });
  }

  const viewed = await getRecentViewedProducts(userId, fromSearch);

  return new Response(JSON.stringify(viewed), { status: 200 });
}

export async function POST(req: Request) {
  try {
    const { userId, SearchedProduct, fromSearch, query } = await req.json();
    if (!userId || !SearchedProduct) {
      return new Response(JSON.stringify({ error: 'Missing data' }), {
        status: 400,
      });
    }
    await addViewedProduct(userId, SearchedProduct, fromSearch, query);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch {
    return new Response(
      JSON.stringify({ error: 'Failed to record viewed product' }),
      { status: 500 },
    );
  }
}
