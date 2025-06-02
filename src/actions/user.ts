import { User } from '@/generated/prisma';
import prisma from '../lib/prismaDb';

export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({
      data,
    });
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function getUserById({
  id,
  clerkUserId,
}: {
  id?: string;
  clerkUserId?: string;
}) {
  try {
    if (!id && !clerkUserId) throw new Error('id or clearkUserId is required');

    const query = id ? { id } : { clerkUserId };

    const user = await prisma.user.findFirst({ where: { ...query } });

    return { user };
  } catch (error) {
    return { error };
  }
}

export async function updateUser(id: string, data: Partial<User>) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function deleteUser(id: string) {
  try {
    const user = await prisma.user.delete({
      where: { id },
    });
    return { user };
  } catch (error) {
    return { error };
  }
}
