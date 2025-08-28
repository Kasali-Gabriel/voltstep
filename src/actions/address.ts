'use server';

import prisma from '@/lib/prismaDb';
import {
  CreateDeliveryAddressInput,
  UpdateDeliveryAddressInput,
} from '@/types/address';
import { auth } from '@clerk/nextjs/server';
import { getUserById } from './user';

export async function createDeliveryAddress(data: CreateDeliveryAddressInput) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return { error: 'User not authenticated' };
    }

    const { user } = await getUserById({ clerkUserId });

    if (!user) {
      return { error: 'User not found' };
    }

    // If this is set as default, unset other defaults
    if (data.isDefault) {
      await prisma.deliveryAddress.updateMany({
        where: { userId: user.id },
        data: { isDefault: false },
      });
    }

    const deliveryAddress = await prisma.deliveryAddress.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    return { deliveryAddress };
  } catch (error) {
    console.error('Error creating delivery address:', error);
    return { error: 'Failed to create delivery address' };
  }
}

export async function getUserDeliveryAddresses() {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return { error: 'User not authenticated' };
    }

    const { user } = await getUserById({ clerkUserId });

    if (!user) {
      return { error: 'User not found' };
    }

    const deliveryAddresses = await prisma.deliveryAddress.findMany({
      where: { userId: user.id },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });

    return { deliveryAddresses };
  } catch (error) {
    console.error('Error fetching delivery addresses:', error);
    return { error: 'Failed to fetch delivery addresses' };
  }
}

export async function updateDeliveryAddress(
  data: UpdateDeliveryAddressInput,
) {
  try {
    const { userId: clerkUserId } = await auth();

    // Remove 'id' from data before updating
    const { id, ...updateData } = data;

    if (!clerkUserId) {
      return { error: 'User not authenticated' };
    }

    const { user } = await getUserById({ clerkUserId });

    if (!user) {
      return { error: 'User not found' };
    }

    // Verify the delivery address belongs to the user
    const existingAddress = await prisma.deliveryAddress.findFirst({
      where: { id, userId: user.id },
    });

    if (!existingAddress) {
      return { error: 'Delivery address not found' };
    }

    // If this is set as default, unset other defaults
    if (data.isDefault) {
      await prisma.deliveryAddress.updateMany({
        where: { userId: user.id, id: { not: id } },
        data: { isDefault: false },
      });
    }

    const deliveryAddress = await prisma.deliveryAddress.update({
      where: { id },
      data: updateData,
    });

    return { deliveryAddress };
  } catch (error) {
    console.error('Error updating delivery address:', error);
    return { error: 'Failed to update delivery address' };
  }
}

export async function deleteDeliveryAddress(id: string) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return { error: 'User not authenticated' };
    }

    const { user } = await getUserById({ clerkUserId });

    if (!user) {
      return { error: 'User not found' };
    }

    // Verify the delivery address belongs to the user
    const existingAddress = await prisma.deliveryAddress.findFirst({
      where: { id, userId: user.id },
    });

    if (!existingAddress) {
      return { error: 'Delivery address not found' };
    }

    await prisma.deliveryAddress.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting delivery address:', error);
    return { error: 'Failed to delete delivery address' };
  }
}
