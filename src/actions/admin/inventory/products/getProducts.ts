import prisma from '@/lib/prismaDb';
import { Prisma } from '@prisma/client';

export async function getProducts({
  page = 1,
  pageSize = 10,
  search = '',
  sortBy = 'createdAt',
  sortOrder = 'desc',
  subcategoryId,
}: {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  subcategoryId?: string;
}) {
  try {
    const skip = (page - 1) * pageSize;

    const where: Prisma.ProductWhereInput = {};
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive' as const,
      };
    }
    if (subcategoryId) {
      where.subcategoryId = subcategoryId;
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput = {};
    if (sortBy === 'name') {
      orderBy.name = sortOrder;
    } else if (sortBy === 'price') {
      orderBy.price = sortOrder;
    } else if (sortBy === 'quantity') {
      orderBy.quantity = sortOrder;
    } else if (sortBy === 'createdAt') {
      orderBy.createdAt = sortOrder;
    } else if (sortBy === 'popularityScore') {
      orderBy.popularityScore = sortOrder;
    } else if (sortBy === 'avgRating') {
      // For avgRating, we'll sort after calculation
      orderBy.createdAt = 'desc'; // Default sort for fetching
    } else {
      orderBy.createdAt = 'desc'; // default
    }

    // For avgRating sorting, we need to fetch all products first
    const fetchAll = sortBy === 'avgRating';

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          subcategory: {
            include: {
              category: {
                include: {
                  catalog: true,
                },
              },
            },
          },
          reviews: {
            select: {
              rating: true,
            },
          },
          colors: {
            include: {
              variants: true,
            },
          },
          _count: {
            select: {
              reviews: true,
            },
          },
        },
        orderBy: fetchAll ? undefined : orderBy,
        skip: fetchAll ? 0 : skip,
        take: fetchAll ? undefined : pageSize,
      }),
      prisma.product.count({ where }),
    ]);

    // Calculate average rating for each product
    const productsWithAvgRating = products.map((product) => {
      const totalRating = product.reviews.reduce(
        (sum: number, review) => sum + review.rating,
        0,
      );
      const avgRating =
        product.reviews.length > 0 ? totalRating / product.reviews.length : 0;

      return {
        ...product,
        avgRating: Math.round(avgRating * 10) / 10, // Round to 1 decimal place
        reviews: [],
      };
    });

    // Sort by avgRating if requested
    let sortedProducts = productsWithAvgRating;
    if (sortBy === 'avgRating') {
      sortedProducts = productsWithAvgRating.sort((a, b) => {
        const aRating = a.avgRating;
        const bRating = b.avgRating;
        if (sortOrder === 'asc') {
          return aRating - bRating;
        } else {
          return bRating - aRating;
        }
      });
    }

    // Apply pagination if we fetched all products
    const paginatedProducts = fetchAll
      ? sortedProducts.slice(skip, skip + pageSize)
      : sortedProducts;

    return {
      products: paginatedProducts,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}

