import { fetchProduct } from '@/actions/products';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: { slug: string } },
) {
  try {
    const { slug } = await context.params;
    const product = await fetchProduct(slug);
    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
