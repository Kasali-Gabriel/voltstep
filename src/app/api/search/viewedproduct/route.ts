import { addViewedProduct, getRecentViewedProducts } from '@/actions/search';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Missing userId' }), {
      status: 400,
    });
  }
  const viewed = await getRecentViewedProducts(userId, 10);
  return new Response(JSON.stringify(viewed), { status: 200 });
}

export async function POST(req: Request) {
  try {
    const { userId, SearchedProduct } = await req.json();
    if (!userId || !SearchedProduct) {
      return new Response(JSON.stringify({ error: 'Missing data' }), {
        status: 400,
      });
    }
    await addViewedProduct(userId, SearchedProduct);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch {
    return new Response(
      JSON.stringify({ error: 'Failed to record viewed product' }),
      { status: 500 },
    );
  }
}
