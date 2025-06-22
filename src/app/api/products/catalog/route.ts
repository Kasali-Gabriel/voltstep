import { fetchCatalogProducts } from '@/actions/products';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const catalogSlug = searchParams.get('catalog');

  if (!catalogSlug) {
    return NextResponse.json(
      { error: 'Missing catalog slug' },
      { status: 400 },
    );
  }

  const products = await fetchCatalogProducts(catalogSlug);

  return NextResponse.json(products);
}
