import prisma from '@/lib/prismaDb';
import { auth } from '@clerk/nextjs/server';

// Note: For optimal performance, consider adding these database indexes:
// CREATE INDEX CONCURRENTLY idx_user_email ON "User" (email);
// CREATE INDEX CONCURRENTLY idx_user_first_name ON "User" (first_name);
// CREATE INDEX CONCURRENTLY idx_user_last_name ON "User" (last_name);
// CREATE INDEX CONCURRENTLY idx_user_created_at ON "User" (created_at);

interface GetCustomersParams {
  pageIndex?: number;
  pageSize?: number;
  filters?: { id: string; value: string }[];
  sorting?: { id: string; desc: boolean }[];
}

export async function getCustomers({
  pageIndex = 0,
  pageSize = 10,
  filters = [],
  sorting = [],
}: GetCustomersParams = {}) {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== 'admin') {
    throw new Error('Unauthorized');
  }

  // Build where clause for filters
  const where: {
    OR?: Array<{ [key: string]: { contains: string; mode: string } }>;
  } = {};
  const orConditions: Array<{
    [key: string]: { contains: string; mode: string };
  }> = [];

  filters.forEach((filter) => {
    if (filter.value && filter.value.trim()) {
      const searchValue = filter.value.trim();

      if (filter.id === 'email') {
        orConditions.push({
          email: {
            contains: searchValue,
            mode: 'insensitive',
          },
        });
      } else if (filter.id === 'firstName') {
        // Search in both firstName and lastName for name searches
        orConditions.push({
          firstName: {
            contains: searchValue,
            mode: 'insensitive',
          },
        });
        orConditions.push({
          lastName: {
            contains: searchValue,
            mode: 'insensitive',
          },
        });
      }
    }
  });

  // Use OR for all search conditions to allow searching across multiple fields
  if (orConditions.length > 0) {
    where.OR = orConditions;
  }

  // Build orderBy for sorting - only use database fields, not computed fields
  const orderBy: Record<string, 'asc' | 'desc'> = {};
  const hasComputedFieldSort = sorting.some((sort) =>
    ['totalOrders', 'totalReviews', 'totalSpent'].includes(sort.id),
  );

  if (sorting.length > 0 && !hasComputedFieldSort) {
    // Only apply database-level sorting for fields that exist in the database
    sorting.forEach((sort) => {
      // Map frontend field names to database field names
      const dbFieldMap: { [key: string]: string } = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        createdAt: 'createdAt',
        lastActive: 'updatedAt', // Use updatedAt as fallback for lastActive
      };

      const dbField = dbFieldMap[sort.id];
      if (dbField) {
        orderBy[dbField] = sort.desc ? 'desc' : 'asc';
      }
    });
  } else {
    // Default sorting by createdAt if no valid database field sorting is specified
    orderBy.createdAt = 'desc';
  }

  // Get total count for pagination
  const totalCount = await prisma.user.count({ where });

  // Get basic user data with optimized aggregations
  const customers = await prisma.user.findMany({
    where,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      imageUrl: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          orders: true,
          reviews: true,
        },
      },
      orders: {
        select: {
          totalAmount: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        take: 1, // Only get the latest order for lastActive calculation
      },
      viewedProducts: {
        select: {
          viewedAt: true,
        },
        orderBy: {
          viewedAt: 'desc',
        },
        take: 1,
      },
      searchHistories: {
        select: {
          searchedAt: true,
        },
        orderBy: {
          searchedAt: 'desc',
        },
        take: 1,
      },
    },
    orderBy,
    skip: pageIndex * pageSize,
    take: pageSize,
  });

  // Get total spent for each user in a separate optimized query
  const userIds = customers.map((c) => c.id);
  const totalSpentByUser = await prisma.order.groupBy({
    by: ['userId'],
    where: {
      userId: {
        in: userIds,
      },
    },
    _sum: {
      totalAmount: true,
    },
  });

  const totalSpentMap = new Map(
    totalSpentByUser.map((item) => [item.userId, item._sum.totalAmount || 0]),
  );

  const formattedCustomers = customers.map((user) => {
    const totalSpent = totalSpentMap.get(user.id) || 0;

    // Calculate lastActive more efficiently
    const dates: number[] = [];

    if (user.orders && user.orders.length > 0) {
      dates.push(user.orders[0].updatedAt.getTime());
    }
    if (user.viewedProducts && user.viewedProducts.length > 0) {
      dates.push(user.viewedProducts[0].viewedAt.getTime());
    }
    if (user.searchHistories && user.searchHistories.length > 0) {
      dates.push(user.searchHistories[0].searchedAt.getTime());
    }

    const lastActive =
      dates.length > 0 ? new Date(Math.max(...dates)) : user.updatedAt;

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt,
      totalOrders: user._count.orders,
      totalReviews: user._count.reviews,
      totalSpent,
      lastActive,
    };
  });

  // If sorting by computed fields, sort the results after formatting
  if (hasComputedFieldSort && sorting.length > 0) {
    const sort = sorting[0];
    formattedCustomers.sort((a, b) => {
      let valueA: number | Date = 0;
      let valueB: number | Date = 0;

      switch (sort.id) {
        case 'totalOrders':
          valueA = a.totalOrders;
          valueB = b.totalOrders;
          break;
        case 'totalReviews':
          valueA = a.totalReviews;
          valueB = b.totalReviews;
          break;
        case 'totalSpent':
          valueA = a.totalSpent;
          valueB = b.totalSpent;
          break;
        default:
          return 0;
      }

      const result = (valueA as number) - (valueB as number);
      return sort.desc ? -result : result;
    });
  }

  return {
    customers: formattedCustomers,
    totalCount,
  };
}
