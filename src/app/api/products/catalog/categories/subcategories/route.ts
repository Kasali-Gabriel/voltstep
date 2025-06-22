import { fetchSubCategoryProducts } from '@/actions/products';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const catalogSlug = searchParams.get('catalog');
  const categorySlug = searchParams.get('category');
  const subcategorySlug = searchParams.get('subcategory');

  if (!catalogSlug || !categorySlug || !subcategorySlug) {
    return NextResponse.json(
      { error: 'Missing catalog, category, or subcategory slug' },
      { status: 400 },
    );
  }

  const products = await fetchSubCategoryProducts(
    catalogSlug,
    categorySlug,
    subcategorySlug,
  );

  return NextResponse.json(products);
}
