import { getProductReviews } from '@/actions/admin/inventory/products/productDetails';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: productId } = await params;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 },
      );
    }

    const result = await getProductReviews(productId);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product reviews' },
      { status: 500 },
    );
  }
}
