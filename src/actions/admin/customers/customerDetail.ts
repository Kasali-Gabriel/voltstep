import prisma from '@/lib/prismaDb';
import { ActivityItem } from '@/types/admin';
import { SearchedProduct } from '@/types/search';
import { auth } from '@clerk/nextjs/server';
import { format } from 'date-fns';

export async function getCustomerDetail(customerId: string) {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  const user = await prisma.user.findUnique({
    where: { id: customerId },
    include: {
      orders: { select: { totalAmount: true, updatedAt: true } },
      reviews: { select: { id: true } },
      viewedProducts: {
        select: { viewedAt: true },
        orderBy: { viewedAt: 'desc' },
        take: 1,
      },
      searchHistories: {
        select: { searchedAt: true },
        orderBy: { searchedAt: 'desc' },
        take: 1,
      },
    },
  });
  if (!user) throw new Error('Customer not found');
  const totalOrders = user.orders.length;
  const totalReviews = user.reviews.length;
  const totalSpent = user.orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0,
  );
  const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
  const orderDates = user.orders.map((o) => o.updatedAt.getTime());
  const latestOrder = orderDates.length ? Math.max(...orderDates) : null;
  const viewedDates = user.viewedProducts.map((v) => v.viewedAt.getTime());
  const latestViewed = viewedDates.length ? Math.max(...viewedDates) : null;
  const searchDates = user.searchHistories.map((s) => s.searchedAt.getTime());
  const latestSearch = searchDates.length ? Math.max(...searchDates) : null;
  const dates: number[] = [latestOrder, latestViewed, latestSearch].filter(
    Boolean,
  ) as number[];
  const lastActive =
    dates.length === 0 ? user.updatedAt : new Date(Math.max(...dates));
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    createdAt: user.createdAt,
    lastActive,
    totalOrders,
    totalSpent,
    avgOrderValue,
    totalReviews,
  };
}

export async function getCustomerReviews(customerId: string) {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  const reviews = await prisma.review.findMany({
    where: { reviewerId: customerId },
    include: { product: { select: { name: true, slug: true } } },
    orderBy: { date: 'desc' },
  });
  return reviews
    .filter((review) => review.product)
    .map((review) => ({
      id: review.id,
      rating: review.rating,
      title: review.title,
      details: review.details,
      date: review.date,
      productName: review.product?.name ?? null,
      productSlug: review.product?.slug ?? null,
    }));
}

export async function getCustomerOrders(customerId: string) {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  const orders = await prisma.order.findMany({
    where: { userId: customerId },
    include: {
      items: {
        include: { product: { select: { name: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  return orders.map((order) => ({
    id: order.id,
    status: order.status,
    totalAmount: order.totalAmount,
    createdAt: order.createdAt,
    deliveredAt: order.deliveredAt || null,
    items: order.items
      .filter((item) => item.product)
      .map((item) => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.price,
      })),
  }));
}

export async function getCustomerActivity(customerId: string) {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  const orders = await prisma.order.findMany({
    where: { userId: customerId },
    select: { id: true, totalAmount: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });
  const reviews = await prisma.review.findMany({
    where: { reviewerId: customerId },
    select: {
      id: true,
      rating: true,
      date: true,
      product: { select: { name: true } },
    },
    orderBy: { date: 'desc' },
  });
  const wishlist = await prisma.wishList.findMany({
    where: { userId: customerId },
    select: { id: true, createdAt: true, product: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  });
  const viewed = await prisma.viewedProduct.findMany({
    where: { userId: customerId },
    select: { id: true, viewedAt: true, product: true },
    orderBy: { viewedAt: 'desc' },
  });
  const searches = await prisma.searchHistory.findMany({
    where: { userId: customerId },
    select: { id: true, query: true, searchedAt: true },
    orderBy: { searchedAt: 'desc' },
  });
  const activities: ActivityItem[] = [
    ...orders.map((order) => ({
      id: `order-${order.id}`,
      type: 'order' as const,
      date: order.createdAt,
      description: [
        { text: 'Placed order #' },
        { text: order.id.slice(-8), bold: true, italic: true },
      ],
      value: order.totalAmount,
    })),
    ...reviews
      .filter((review) => review.product)
      .map((review) => ({
        id: `review-${review.id}`,
        type: 'review' as const,
        date: review.date,
        description: [
          { text: 'Reviewed ' },
          { text: review.product ? review.product.name : '', bold: true, italic: true },
        ],
        value: review.rating,
      })),
    ...wishlist
      .filter((item) => item.product)
      .map((item) => ({
        id: `wishlist-${item.id}`,
        type: 'wishlist' as const,
        date: item.createdAt,
        description: [
          { text: 'Added ' },
          { text: item.product.name, bold: true, italic: true },
          { text: ' to wishlist' },
        ],
      })),
    ...viewed.map((item) => ({
      id: `view-${item.id}`,
      type: 'view' as const,
      date: item.viewedAt,
      description: [
        { text: 'Viewed ' },
        {
          text: (item.product as SearchedProduct).name,
          bold: true,
          italic: true,
        },
      ],
    })),
    ...searches.map((search) => ({
      id: `search-${search.id}`,
      type: 'search' as const,
      date: search.searchedAt,
      description: [
        { text: 'Searched for "' },
        { text: search.query, bold: true, italic: true },
        { text: '"' },
      ],
    })),
  ];
  return activities.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getCustomerSpendingOverTime(customerId: string) {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  const orders = await prisma.order.findMany({
    where: { userId: customerId },
    select: { totalAmount: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  });
  const monthlyData: { [key: string]: number } = {};
  orders.forEach((order) => {
    const month = format(order.createdAt, 'yyyy-MM');
    monthlyData[month] = (monthlyData[month] || 0) + order.totalAmount;
  });
  return Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount,
  }));
}

export async function getCustomerCategoryBreakdown(customerId: string) {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  const orders = await prisma.order.findMany({
    where: { userId: customerId },
    include: {
      items: {
        include: {
          product: {
            include: {
              subcategory: {
                include: {
                  category: { include: { catalog: true } },
                },
              },
            },
          },
        },
      },
    },
  });
  const categoryTotals: { [key: string]: number } = {};
  orders.forEach((order) => {
    order.items
      .filter(
        (item) =>
          item.product &&
          item.product.subcategory &&
          item.product.subcategory.category,
      )
      .forEach((item) => {
        const categoryName = item.product.subcategory.category.name;
        categoryTotals[categoryName] =
          (categoryTotals[categoryName] || 0) + item.price * item.quantity;
      });
  });
  const totalSpent = Object.values(categoryTotals).reduce(
    (sum, amount) => sum + amount,
    0,
  );
  return Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
    percentage: totalSpent > 0 ? (amount / totalSpent) * 100 : 0,
  }));
}
