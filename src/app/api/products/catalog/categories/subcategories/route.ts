import { fetchSubCategoryProducts } from '@/actions/products';
import { parseCatalogFilters } from '@/utils/parseCatalogFilters';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filters = parseCatalogFilters(searchParams);
  if (
    !filters.catalogSlug ||
    !filters.categorySlug ||
    !filters.subcategorySlug
  ) {
    return NextResponse.json(
      { error: 'Missing catalog, category, or subcategory slug' },
      { status: 400 },
    );
  }

  const offset = Number(searchParams.get('offset')) || 0;
  const limit = Number(searchParams.get('limit')) || 18;
  const sort = searchParams.get('sort') || undefined;

  const result = await fetchSubCategoryProducts(filters, limit, offset, sort);

  return NextResponse.json({
    products: result.products,
    unfilteredProducts: result.unfilteredProducts,
    totalCount: result.totalCount,
    hasMore: result.hasMore,
  });
}
