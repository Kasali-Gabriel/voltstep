'use server';

import prisma from '@/lib/prismaDb';
import {
  deleteFromR2,
  extractKeyFromUrl,
  generateUniqueImageKey,
  getImageBuffer,
  uploadToR2,
} from '@/utils/Admin/uploadImage';
import { Prisma, Tag } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function createProduct(data: {
  name: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  subcategoryId: string;
}) {
  // Fetch subcategory to get catalog slug for image key
  const subcategory = await prisma.subcategory.findUnique({
    where: { id: data.subcategoryId },
    include: {
      category: {
        include: {
          catalog: true,
        },
      },
    },
  });

  if (!subcategory) {
    throw new Error('Subcategory not found');
  }

  const catalogSlug = subcategory.category.catalog.slug;
  const categorySlug = subcategory.category.slug;
  const subcategorySlug = subcategory.slug;

  // Process images: upload base64 images, keep URLs as is
  const processedImages: string[] = [];
  for (const img of data.images) {
    const buffer = getImageBuffer(img);
    if (buffer) {
      const key = generateUniqueImageKey(
        `${catalogSlug}/${categorySlug}/${subcategorySlug}/${data.slug}`,
      );
      const uploadedUrl = await uploadToR2(buffer, key);
      if (uploadedUrl) {
        processedImages.push(uploadedUrl);
      }
    } else {
      processedImages.push(img);
    }
  }

  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        images: processedImages,
        subcategoryId: data.subcategoryId,
      },
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
      },
    });

    revalidatePath('/admin/inventory/products');

    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
}

export async function updateProduct(
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
    price?: number;
    quantity?: number;
    images?: string[];
    subcategoryId?: string;
    tags?: string[];
  },
) {
  // Get current product to handle image deletions
  const currentProduct = await prisma.product.findUnique({
    where: { id },
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
    },
  });

  if (!currentProduct) {
    throw new Error('Product not found');
  }

  const oldImages = currentProduct.images;
  const oldKeys = oldImages
    .map((img) => extractKeyFromUrl(img))
    .filter(Boolean) as string[];

  const catalogSlug = currentProduct.subcategory.category.catalog.slug;
  const categorySlug = currentProduct.subcategory.category.slug;
  const subcategorySlug = currentProduct.subcategory.slug;
  let productSlug = currentProduct.slug;

  // If subcategory is changing, get new catalog slug
  if (
    data.subcategoryId &&
    data.subcategoryId !== currentProduct.subcategoryId
  ) {
    const newSubcategory = await prisma.subcategory.findUnique({
      where: { id: data.subcategoryId },
      include: {
        category: {
          include: {
            catalog: true,
          },
        },
      },
    });
    if (!newSubcategory) {
      throw new Error('New subcategory not found');
    }
  }

  if (data.slug) {
    productSlug = data.slug;
  }

  // Process new images if provided
  let processedImages: string[] | undefined;

  if (data.images) {
    processedImages = [];
    for (const img of data.images) {
      const buffer = getImageBuffer(img);
      if (buffer) {
        const key = generateUniqueImageKey(
          `${catalogSlug}/${categorySlug}/${subcategorySlug}/${productSlug}`,
        );
        const uploadedUrl = await uploadToR2(buffer, key);
        if (uploadedUrl) {
          processedImages.push(uploadedUrl);
        }
      } else {
        processedImages.push(img);
      }
    }

    // Delete old R2 images that are not in the new images
    const newKeys = processedImages
      .map((img) => extractKeyFromUrl(img))
      .filter(Boolean) as string[];
    const keysToDelete = oldKeys.filter((key) => !newKeys.includes(key));
    for (const key of keysToDelete) {
      await deleteFromR2(key);
    }
  }

  try {
    const updateData: Prisma.ProductUpdateInput = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.quantity !== undefined) updateData.quantity = data.quantity;
    if (processedImages !== undefined) updateData.images = processedImages;
    if (data.subcategoryId !== undefined)
      updateData.subcategory = { connect: { id: data.subcategoryId } };
    if (data.tags !== undefined) updateData.tags = data.tags as Tag[];

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
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
      },
    });

    revalidatePath('/admin/inventory/products');

    return product;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
}

export async function deleteProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { images: true },
    });

    if (product) {
      // Delete images from R2
      for (const img of product.images) {
        const key = extractKeyFromUrl(img);
        if (key) {
          await deleteFromR2(key);
        }
      }
    }

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath('/admin/inventory/products');
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
}
