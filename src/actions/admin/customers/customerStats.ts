import prisma from '@/lib/prismaDb';
import { auth } from '@clerk/nextjs/server';
import { endOfMonth, format, startOfMonth, subMonths } from 'date-fns';

export async function getCustomerStats() {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const currentMonthEnd = endOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));
  const totalCustomers = await prisma.user.count();
  const newCustomersThisMonth = await prisma.user.count({
    where: { createdAt: { gte: currentMonthStart, lte: currentMonthEnd } },
  });
  const newCustomersLastMonth = await prisma.user.count({
    where: { createdAt: { gte: lastMonthStart, lte: lastMonthEnd } },
  });
  const totalSpentResult = await prisma.order.aggregate({
    _sum: { totalAmount: true },
  });
  const totalSpent = totalSpentResult._sum.totalAmount || 0;
  const spentThisMonthResult = await prisma.order.aggregate({
    _sum: { totalAmount: true },
    where: { createdAt: { gte: currentMonthStart, lte: currentMonthEnd } },
  });
  const spentThisMonth = spentThisMonthResult._sum.totalAmount || 0;
  const spentLastMonthResult = await prisma.order.aggregate({
    _sum: { totalAmount: true },
    where: { createdAt: { gte: lastMonthStart, lte: lastMonthEnd } },
  });
  const spentLastMonth = spentLastMonthResult._sum.totalAmount || 0;
  const avgOrderValue = totalCustomers > 0 ? totalSpent / totalCustomers : 0;
  const newCustomersChange =
    newCustomersLastMonth > 0
      ? ((newCustomersThisMonth - newCustomersLastMonth) /
          newCustomersLastMonth) *
        100
      : 0;
  const spentChange =
    spentLastMonth > 0
      ? ((spentThisMonth - spentLastMonth) / spentLastMonth) * 100
      : spentThisMonth > 0
        ? 100
        : 0;
  return {
    totalCustomers,
    newCustomersThisMonth,
    newCustomersChange: Math.round(newCustomersChange * 100) / 100,
    totalSpent,
    spentChange: Math.round(spentChange * 100) / 100,
    avgOrderValue: Math.round(avgOrderValue * 100) / 100,
  };
}

export async function getNewCustomersOverTime() {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  const customers = await prisma.user.findMany({
    select: { createdAt: true },
    orderBy: { createdAt: 'asc' },
  });
  const monthlyData: { [key: string]: number } = {};
  customers.forEach((user) => {
    const month = format(user.createdAt, 'yyyy-MM');
    monthlyData[month] = (monthlyData[month] || 0) + 1;
  });
  return Object.entries(monthlyData).map(([month, count]) => ({
    month,
    customers: count,
  }));
}

export async function getOrderFrequencyDistribution() {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  const users = await prisma.user.findMany({
    include: { _count: { select: { orders: true } } },
  });
  const distribution = { '1 order': 0, '2-5 orders': 0, '5+ orders': 0 };
  users.forEach((user) => {
    const orderCount = user._count.orders;
    if (orderCount === 1) distribution['1 order']++;
    else if (orderCount >= 2 && orderCount <= 5) distribution['2-5 orders']++;
    else if (orderCount > 5) distribution['5+ orders']++;
  });
  return Object.entries(distribution).map(([range, count]) => ({
    range,
    customers: count,
  }));
}

export async function getTopSpenders() {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  const users = await prisma.user.findMany({
    include: { orders: { select: { totalAmount: true } } },
  });
  const spenders = users
    .map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      totalSpent: user.orders.reduce(
        (sum, order) => sum + order.totalAmount,
        0,
      ),
    }))
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 10);
  return spenders;
}
