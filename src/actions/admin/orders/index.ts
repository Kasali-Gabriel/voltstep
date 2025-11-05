import prisma from '@/lib/prismaDb';
import { OrderStatus, Prisma } from '@prisma/client';

// Admin functions
export async function getAllOrders({
  page = 1,
  pageSize = 10,
  searchTerm = '',
  statusFilter = 'all',
  sortBy = 'createdAt',
  sortOrder = 'desc',
}: {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  statusFilter?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} = {}) {
  try {
    const skip = (page - 1) * pageSize;

    // Build the where clause for filtering
    const where: Prisma.OrderWhereInput = {};

    // Search filter
    if (searchTerm) {
      const searchConditions: Prisma.OrderWhereInput[] = [];

      // Check if the search term is a valid ObjectID format (24 characters hex)
      const isValidObjectIdFormat = /^[0-9a-fA-F]{24}$/.test(searchTerm);
      if (isValidObjectIdFormat) {
        // For complete ObjectId, use exact match
        searchConditions.push({
          id: searchTerm,
        });
      }

      // For partial ObjectId search or other searches, we'll need to fetch orders
      // and do post-processing since MongoDB doesn't support regex on ObjectId fields efficiently
      // This is a limitation we'll handle by searching other fields and letting the frontend
      // display the partial match

      // Search user fields
      searchConditions.push(
        {
          user: {
            firstName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            lastName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            email: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
      );

      // Search in guest delivery address (stored as JSON string)
      if (searchTerm) {
        searchConditions.push({
          guestDeliveryAddress: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        });
      }

      where.OR = searchConditions;
    }

    // Status filter
    if (statusFilter !== 'all') {
      where.status = statusFilter as OrderStatus;
    }

    // Get total count for pagination
    const totalItems = await prisma.order.count({ where });

    // Get paginated orders
    let orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        deliveryAddress: true,
        user: true,
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: pageSize,
    });

    // Handle partial ObjectId matching for display purposes
    // If the search term looks like a partial ObjectId (hex characters),
    // try client-side filtering for partial ID matches
    const isPartialObjectId =
      /^[0-9a-fA-F]+$/.test(searchTerm) && searchTerm.length >= 1;

    if (searchTerm && isPartialObjectId && orders.length === 0) {
      // Get a larger set of orders to check for partial ID matches
      const allOrders = await prisma.order.findMany({
        where:
          statusFilter !== 'all' ? { status: statusFilter as OrderStatus } : {},
        include: {
          items: {
            include: {
              product: true,
            },
          },
          deliveryAddress: true,
          user: true,
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
        take: 1000, // Limit to prevent performance issues
      });

      // Filter orders where the ID contains the search term (case insensitive)
      const filteredOrders = allOrders.filter((order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      // Apply pagination to filtered results
      const filteredStart = skip;
      const filteredEnd = skip + pageSize;
      orders = filteredOrders.slice(filteredStart, filteredEnd);

      // Update total count for the filtered results
      const filteredTotalItems = filteredOrders.length;
      const totalPages = Math.ceil(filteredTotalItems / pageSize);

      return {
        orders,
        pagination: {
          page,
          pageSize,
          totalItems: filteredTotalItems,
          totalPages,
        },
      };
    }

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      orders,
      pagination: {
        page,
        pageSize,
        totalItems,
        totalPages,
      },
    };
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return { error: 'Failed to fetch orders' };
  }
}

export async function getOrderStats() {
  try {
    const totalOrders = await prisma.order.count();
    const totalRevenue = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

    const pendingOrders = await prisma.order.count({
      where: { status: 'PENDING' },
    });

    const deliveredOrders = await prisma.order.count({
      where: { status: 'DELIVERED' },
    });

    return {
      stats: {
        totalOrders,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        pendingOrders,
        deliveredOrders,
      },
    };
  } catch (error) {
    console.error('Error fetching order stats:', error);
    return { error: 'Failed to fetch order stats' };
  }
}
