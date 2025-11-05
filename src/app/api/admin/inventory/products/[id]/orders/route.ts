import { getProductOrders } from '@/actions/admin/inventory/products/productDetails';
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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    const result = await getProductOrders(productId, page, pageSize);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching product orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product orders' },
      { status: 500 },
    );
  }
}
