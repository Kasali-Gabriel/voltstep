import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '@/actions/wishlist';
import { NextRequest, NextResponse } from 'next/server';

// POST: Add item to wishlist
export async function POST(req: NextRequest) {
  try {
    const { userId, productId, selectedSize, selectedColor } = await req.json();
    if (!userId || !productId) {
      return NextResponse.json(
        { error: 'Missing userId or productId' },
        { status: 400 },
      );
    }
    const result = await addToWishlist(userId, {
      productId,
      selectedSize,
      selectedColor,
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error)?.message || 'Internal server error' },
      { status: 500 },
    );
  }
}

// GET: Get user's wishlist, optionally filter by productId
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url!);
    const userId = searchParams.get('userId');
    const productId = searchParams.get('productId') || undefined;

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const items = await getWishlist(userId, productId);

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error)?.message || 'Internal server error' },
      { status: 500 },
    );
  }
}

// DELETE: Remove item from wishlist
export async function DELETE(req: NextRequest) {
  try {
    const { userId, productId } = await req.json();
    if (!userId || !productId) {
      return NextResponse.json(
        { error: 'Missing userId or productId' },
        { status: 400 },
      );
    }
    await removeFromWishlist(userId, productId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error)?.message || 'Internal server error' },
      { status: 500 },
    );
  }
}
