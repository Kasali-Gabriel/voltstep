import { fetchCatalogData } from '@/actions/products';
import { Catalog } from '@/types/product';
import { NextResponse } from 'next/server';

const cachedCatalogData: Catalog[] | undefined = undefined;

export async function GET() {
  if (cachedCatalogData) return NextResponse.json(cachedCatalogData);

  try {
    const productsCatalogs = await fetchCatalogData();

    if (!productsCatalogs || productsCatalogs.length === 0) {
      return NextResponse.json(
        { message: 'No product catalogs found' },
        { status: 404 },
      );
    }

    return NextResponse.json(productsCatalogs);
  } catch (error) {
    console.error('Error fetching product catalogs:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
