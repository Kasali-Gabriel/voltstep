import { fetchProducts } from '@/actions/products';
import { parseCatalogFilters } from '@/utils/Product/parseCatalogFilters';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filters = parseCatalogFilters(searchParams);
  const offset = Number(searchParams.get('offset')) || 0;
  const limit = Number(searchParams.get('limit')) || 18;
  const sort = searchParams.get('sort') || undefined;

  const result = await fetchProducts(filters, limit, offset, sort);

  return NextResponse.json({
    products: result.products,
    totalCount: result.totalCount,
    hasMore: result.hasMore,
  });
}
