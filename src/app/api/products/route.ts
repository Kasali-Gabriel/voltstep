import { fetchAllProducts } from '@/actions/products';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await fetchAllProducts();

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
