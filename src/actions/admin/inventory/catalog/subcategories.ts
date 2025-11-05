'use server';

import prisma from '@/lib/prismaDb';
import {
  deleteFromR2,
  extractKeyFromUrl,
  generateUniqueImageKey,
  getImageBuffer,
  uploadToR2,
} from '@/utils/Admin/uploadImage';
import { revalidatePath } from 'next/cache';

export async function getAllSubcategories() {
  try {
    const subcategories = await prisma.subcategory.findMany({
      include: {
        category: {
          include: {
            catalog: true,
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return subcategories;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw new Error('Failed to fetch subcategories');
  }
}

export async function getSubcategoriesByCategorySlug(
  categorySlug: string,
  catalogSlug?: string,
) {
  try {
    const category = await prisma.category.findFirst({
      where: {
        slug: categorySlug,
        catalog: catalogSlug ? { slug: catalogSlug } : undefined,
      },
      include: {
        subcategories: {
          include: {
            _count: { select: { products: true } },
            category: { include: { catalog: true } },
          },
          orderBy: { name: 'asc' },
        },
      },
    });

    return {
      category,
      subcategories: category?.subcategories || [],
    };
  } catch (error) {
    console.error('Error fetching subcategories by category slug:', error);
    throw new Error('Failed to fetch subcategories');
  }
}

export async function createSubcategory(data: {
  name: string;
  slug: string;
  categoryId: string;
  img: string;
}) {
  let imgUrl = data.img;

  const category = await prisma.category.findUnique({
    where: { id: data.categoryId },
    include: { catalog: true },
  });
  if (!category) throw new Error('Category not found');

  const buffer = getImageBuffer(data.img);
  if (buffer) {
    const key = generateUniqueImageKey(
      `catalogs/${category.catalog.slug}/${category.slug}/${data.slug}`,
    );
    const uploadedUrl = await uploadToR2(buffer, key);
    if (uploadedUrl) imgUrl = uploadedUrl;
  }

  try {
    const subcategory = await prisma.subcategory.create({
      data: {
        name: data.name,
        slug: data.slug,
        img: imgUrl,
        categoryId: data.categoryId,
      },
      include: {
        category: {
          include: {
            catalog: true,
          },
        },
      },
    });

    revalidatePath(
      '/admin/inventory/catalogs/' +
        category.catalog.slug +
        '/' +
        category.slug,
    );

    return subcategory;
  } catch (error) {
    console.error('Error creating subcategory:', error);
    throw new Error('Failed to create subcategory');
  }
}

export async function updateSubcategory(
  id: string,
  data: {
    name?: string;
    slug?: string;
    categoryId?: string;
    img?: string;
  },
) {
  let imgUrl: string | undefined;

  if (data.img) {
    const buffer = getImageBuffer(data.img);
    if (buffer) {
      const currentSubcategory = await prisma.subcategory.findUnique({
        where: { id },
        include: {
          category: {
            include: { catalog: true },
          },
        },
      });
      if (!currentSubcategory) throw new Error('Subcategory not found');

      // Delete old image if it exists and is from R2
      if (currentSubcategory.img) {
        const oldKey = extractKeyFromUrl(currentSubcategory.img);
        if (oldKey) {
          await deleteFromR2(oldKey);
        }
      }

      const categorySlug = currentSubcategory.category.slug;
      const catalogSlug = currentSubcategory.category.catalog.slug;
      const slug = data.slug || currentSubcategory.slug;
      const key = generateUniqueImageKey(
        `catalogs/${catalogSlug}/${categorySlug}/${slug}`,
      );
      imgUrl = (await uploadToR2(buffer, key)) || undefined;
    }
  }

  try {
    const subcategory = await prisma.subcategory.update({
      where: { id },
      data: {
        ...data,
        ...(imgUrl && { img: imgUrl }),
      },
      include: {
        category: {
          include: {
            catalog: true,
          },
        },
      },
    });

    revalidatePath(
      '/admin/inventory/catalogs/' +
        subcategory.category.catalog.slug +
        '/' +
        subcategory.category.slug,
    );

    return subcategory;
  } catch (error) {
    console.error('Error updating subcategory:', error);
    throw new Error('Failed to update subcategory');
  }
}

export async function deleteSubcategory(id: string) {
  try {
    const subcategory = await prisma.subcategory.findUnique({
      where: { id },
      include: {
        category: {
          include: { catalog: true },
        },
      },
    });

    if (!subcategory) throw new Error('Subcategory not found');

    // Delete image from R2 if it exists
    if (subcategory.img) {
      const key = extractKeyFromUrl(subcategory.img);
      if (key) {
        await deleteFromR2(key);
      }
    }

    await prisma.subcategory.delete({
      where: { id },
    });

    revalidatePath(
      '/admin/inventory/catalogs/' +
        subcategory.category.catalog.slug +
        '/' +
        subcategory.category.slug,
    );
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    throw new Error('Failed to delete subcategory');
  }
}
