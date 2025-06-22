import { fetchCategoryProducts } from '@/actions/products';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const catalogSlug = searchParams.get('catalog');
  const categorySlug = searchParams.get('category');

  if (!catalogSlug || !categorySlug) {
    return NextResponse.json(
      { error: 'Missing catalog or category slug' },
      { status: 400 },
    );
  }

  const products = await fetchCategoryProducts(catalogSlug, categorySlug);

  return NextResponse.json(products);
}
