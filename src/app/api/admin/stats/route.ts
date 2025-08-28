import { getOrderStats } from '@/actions/order';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await getOrderStats();

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Get order stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order stats' },
      { status: 500 },
    );
  }
}
