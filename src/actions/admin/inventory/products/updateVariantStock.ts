'use server';

import prisma from '@/lib/prismaDb';
import { revalidatePath } from 'next/cache';

interface UpdateVariantStockParams {
  variantId: string;
  quantity: number;
}

export async function updateVariantStock({
  variantId,
  quantity,
}: UpdateVariantStockParams) {
  try {
    // Update the variant quantity
    const updatedVariant = await prisma.productSizeVariant.update({
      where: { id: variantId },
      data: { quantity },
      include: {
        productColor: {
          include: {
            product: true,
          },
        },
      },
    });

    // Recalculate total quantity for the product
    const totalQuantity = await prisma.productSizeVariant.aggregate({
      where: {
        productColor: {
          productId: updatedVariant.productColor.productId,
        },
      },
      _sum: {
        quantity: true,
      },
    });

    // Update the product's total quantity
    await prisma.product.update({
      where: { id: updatedVariant.productColor.productId },
      data: {
        quantity: totalQuantity._sum.quantity || 0,
      },
    });

    revalidatePath('/admin/products/[slug]', 'page');

    return { success: true, variant: updatedVariant };
  } catch (error) {
    console.error('Error updating variant stock:', error);
    throw new Error('Failed to update variant stock');
  }
}
