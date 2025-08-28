import { getOrderStats } from '@/actions/order';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Add admin role check here if needed
    // You can check user roles using Clerk's publicMetadata or a database lookup

    const result = await getOrderStats();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in admin orders stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
