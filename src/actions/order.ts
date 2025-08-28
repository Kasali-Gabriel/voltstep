'use server';

import prisma from '@/lib/prismaDb';
import { CreateOrderInput, UpdateOrderInput } from '@/types/order';
import { auth } from '@clerk/nextjs/server';
import { getUserById } from './user';

export async function createOrder(data: CreateOrderInput) {
  try {
    let userId: string | null = null;

    if (data.userId) {
      userId = data.userId;
    } else {
      const { userId: clerkUserId } = await auth();
      if (clerkUserId) {
        const { user } = await getUserById({ clerkUserId });
        if (user) {
          userId = user.id;
        }
      }
    }

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount: data.totalAmount,
        shippingCost: data.shippingCost || 0,
        taxAmount: data.taxAmount || 0,
        paymentStatus: data.paymentStatus || 'PENDING',
        items: {
          create: data.items
            .filter((item) => item.productId && item.productId.trim() !== '')
            .map((item) => ({
              product: { connect: { id: item.productId } },
              quantity: item.quantity,
              size: item.size,
              color: item.color,
              price: item.price,
            })),
        },
      },
    });

    return { order };
  } catch (error) {
    console.error('Error creating order:', error);
    return { error: 'Failed to create order' };
  }
}

export async function getUserOrders() {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return { error: 'User not authenticated' };
    }

    const { user } = await getUserById({ clerkUserId });

    if (!user) {
      return { error: 'User not found' };
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        deliveryAddress: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return { orders };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { error: 'Failed to fetch orders' };
  }
}

export async function getOrderById(id: string) {
  try {
    const order = await prisma.order.findFirst({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        deliveryAddress: true,
      },
    });

    if (!order) {
      return { error: 'Order not found' };
    }

    return { order };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { error: 'Failed to fetch order' };
  }
}

export async function updateOrder(id: string, data: UpdateOrderInput) {
  try {
    // Separate items from other order data
    const { items, guestDeliveryAddress, deliveryAddressId, ...orderData } =
      data;

    console.log('Updating order with data:', data);

    // Build update payload but only include address fields when provided
    const updatePayload: Record<string, unknown> = { ...orderData };

    type NestedItemsUpdate = {
      deleteMany: object;
      create: Array<{
        product: { connect: { id: string } };
        quantity: number;
        size?: string | null;
        color: string;
        price: number;
      }>;
    };

    if (deliveryAddressId !== undefined) {
      // allow explicit null (to clear) or a string id
      updatePayload.deliveryAddressId = deliveryAddressId || null;
    }

    if (guestDeliveryAddress !== undefined) {
      updatePayload.guestDeliveryAddress = guestDeliveryAddress
        ? JSON.stringify(guestDeliveryAddress)
        : null;
    }

    if (items) {
      // typed nested update for Prisma
      (updatePayload as Record<string, unknown>).items = {
        deleteMany: {},
        create: items
          .filter((item) => item.productId && item.productId.trim() !== '')
          .map((item) => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            price: item.price,
          })),
      } as NestedItemsUpdate;
    }

    const order = await prisma.order.update({
      where: { id },
      data: updatePayload,
    });

    return { order };
  } catch (error) {
    console.error('Error updating order:', error);
    return { error: 'Failed to update order' };
  }
}

// Admin functions
export async function getAllOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
        deliveryAddress: true,
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return { orders };
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
