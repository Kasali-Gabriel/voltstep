import { getAllOrders } from '@/actions/admin/orders';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { sessionClaims } = await auth();
    if (sessionClaims?.metadata?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { pageIndex, pageSize, filters, sorting, statusFilter } = body;

    // Convert filters to search term
    const searchTerm =
      filters && filters.length > 0
        ? filters.find((f: { id: string; value: string }) => f.value)?.value ||
          ''
        : '';

    // Convert sorting
    let sortBy = 'createdAt';
    let sortOrder: 'asc' | 'desc' = 'desc';
    let effectiveStatusFilter = statusFilter || 'all';

    if (sorting && sorting.length > 0) {
      const sort = sorting[0];
      // Map frontend column names to backend field names
      const sortFieldMap: { [key: string]: string } = {
        confirmedAt: 'createdAt', // Map confirmedAt column to createdAt field
        deliveredAt: 'deliveredAt',
        totalAmount: 'totalAmount',
        status: 'status',
        paymentStatus: 'paymentStatus',
      };
      sortBy = sortFieldMap[sort.id] || sort.id;
      sortOrder = sort.desc ? 'desc' : 'asc';

      // When sorting by deliveredAt, automatically filter to show only delivered orders
      if (sort.id === 'deliveredAt') {
        effectiveStatusFilter = 'DELIVERED';
      }
    }

    const result = await getAllOrders({
      page: (pageIndex || 0) + 1,
      pageSize: pageSize || 10,
      searchTerm,
      statusFilter: effectiveStatusFilter,
      sortBy,
      sortOrder,
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      orders: result.orders,
      totalCount: result.pagination?.totalItems || 0,
    });
  } catch (error) {
    console.error('Error in orders API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const result = await getAllOrders();

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Get all orders error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 },
    );
  }
}
