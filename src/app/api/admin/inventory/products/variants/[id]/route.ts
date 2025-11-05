import { updateVariantStock } from '@/actions/admin/inventory/products/updateVariantStock';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { quantity } = body;

    if (typeof quantity !== 'number' || quantity < 0) {
      return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 });
    }

    const result = await updateVariantStock({ variantId: id, quantity });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating variant:', error);
    return NextResponse.json(
      { error: 'Failed to update variant' },
      { status: 500 },
    );
  }
}
