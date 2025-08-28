import {
  deleteDeliveryAddress,
  updateDeliveryAddress,
} from '@/actions/address';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
) {
  try {
    const body = await request.json();
    const result = await updateDeliveryAddress( body);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Update delivery address error:', error);
    return NextResponse.json(
      { error: 'Failed to update delivery address' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await deleteDeliveryAddress(id);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Delete delivery address error:', error);
    return NextResponse.json(
      { error: 'Failed to delete delivery address' },
      { status: 500 },
    );
  }
}
