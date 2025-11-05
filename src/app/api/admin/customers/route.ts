import { getCustomers } from '@/actions/admin/customers/customerList';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { sessionClaims } = await auth();
    if (sessionClaims?.metadata?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { pageIndex, pageSize, filters, sorting } = body;

    const result = await getCustomers({
      pageIndex: pageIndex || 0,
      pageSize: pageSize || 10,
      filters: filters || [],
      sorting: sorting || [],
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in customers API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 },
    );
  }
}
