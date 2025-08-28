import {
  createDeliveryAddress,
  deleteDeliveryAddress,
  getUserDeliveryAddresses,
  updateDeliveryAddress,
} from '@/actions/address';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await getUserDeliveryAddresses();

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Get delivery addresses error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch delivery addresses' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await createDeliveryAddress(body);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Create delivery address error:', error);
    return NextResponse.json(
      { error: 'Failed to create delivery address' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'Missing address id' },
        { status: 400 },
      );
    }
    const body = await request.json();
    const result = await updateDeliveryAddress({ id, ...body });
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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'Missing address id' },
        { status: 400 },
      );
    }
    const result = await deleteDeliveryAddress(id);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete delivery address error:', error);
    return NextResponse.json(
      { error: 'Failed to delete delivery address' },
      { status: 500 },
    );
  }
}
