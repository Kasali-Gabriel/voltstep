import prisma from '@/lib/prismaDb';

export async function getProductOrders(
  productId: string,
  page: number = 1,
  pageSize: number = 10,
) {
  try {
    // Calculate skip for pagination
    const skip = (page - 1) * pageSize;

    // Fetch total count for pagination
    const totalOrderItems = await prisma.orderItem.count({
      where: {
        productId: productId,
      },
    });

    // Fetch paginated order items for the product with order and user details
    const orderItems = await prisma.orderItem.findMany({
      where: {
        productId: productId,
      },
      include: {
        order: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        order: {
          createdAt: 'desc',
        },
      },
      skip,
      take: pageSize,
    });

    // Calculate stats (these need all data, not just paginated)
    const allOrderItems = await prisma.orderItem.findMany({
      where: {
        productId: productId,
      },
      select: {
        quantity: true,
        price: true,
      },
    });

    const totalOrders = new Set(orderItems.map((item) => item.orderId)).size;
    const totalQuantity = allOrderItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const totalRevenue = allOrderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const stats = {
      totalOrders,
      totalQuantity,
      totalRevenue,
    };

    // Transform the data to match the expected interface
    const orders = orderItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price,
      color: item.color,
      size: item.size || '',
      order: {
        id: item.order.id,
        orderNumber: item.order.id, // Using id as orderNumber since there's no orderNumber field
        status: item.order.status,
        paymentStatus: item.order.paymentStatus,
        total: item.order.totalAmount,
        createdAt: item.order.createdAt,
        user: item.order.user || {
          id: '',
          firstName: 'Guest',
          lastName: '',
          email: '',
        },
      },
    }));

    return {
      orders,
      stats,
      pagination: {
        page,
        pageSize,
        totalItems: totalOrderItems,
        totalPages: Math.ceil(totalOrderItems / pageSize),
      },
    };
  } catch (error) {
    console.error('Error fetching product orders:', error);
    throw new Error('Failed to fetch product orders');
  }
}

export async function getProductReviews(productId: string) {
  try {
    // Fetch reviews for the product
    const reviews = await prisma.review.findMany({
      where: {
        productId: productId,
      },
      include: {
        reviewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    // Calculate rating stats
    const total = reviews.length;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = total > 0 ? totalRating / total : 0;

    // Calculate distribution
    const distribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating as keyof typeof distribution]++;
      }
    });

    const stats = {
      average,
      total,
      distribution,
    };

    // Transform reviews to match the expected interface
    const transformedReviews = reviews.map((review) => ({
      id: review.id,
      reviewerId: review.reviewerId,
      reviewer: review.reviewer,
      rating: review.rating,
      title: review.title,
      details: review.details,
      date: review.date,
      productId: review.productId,
      product: null, // Not needed for this use case
      verified: review.verified,
      user: review.reviewer, // Alias for compatibility
    }));

    return {
      reviews: transformedReviews,
      stats,
    };
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    throw new Error('Failed to fetch product reviews');
  }
}
