import { fetchCatalogProducts } from '@/actions/products';
import { parseCatalogFilters } from '@/utils/parseCatalogFilters';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filters = parseCatalogFilters(searchParams);

  if (!filters.catalogSlug) {
    return NextResponse.json(
      { error: 'Missing catalog slug' },
      { status: 400 },
    );
  }

  const offset = Number(searchParams.get('offset')) || 0;
  const limit = Number(searchParams.get('limit')) || 18;
  const sort = searchParams.get('sort') || undefined;

  const result = await fetchCatalogProducts(filters, limit, offset, sort);

  return NextResponse.json({
    products: result.products,
    unfilteredProducts: result.unfilteredProducts,
    totalCount: result.totalCount,
    hasMore: result.hasMore,
  });
}
