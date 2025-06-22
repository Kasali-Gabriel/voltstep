import { syncProducts } from '@/utils/syncProductsToMeili';

export async function POST() {
  try {
    await syncProducts();
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error in seed-meili:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
