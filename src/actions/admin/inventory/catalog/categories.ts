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

export async function getCategoriesByCatalogSlug(catalogSlug: string) {
  try {
    const catalog = await prisma.catalog.findUnique({
      where: { slug: catalogSlug },
      include: {
        categories: {
          include: {
            _count: {
              select: { subcategories: true },
            },
            catalog: true,
          },
          orderBy: { name: 'asc' },
        },
      },
    });

    return catalog?.categories || [];
  } catch (error) {
    console.error('Error fetching categories by catalog slug:', error);
    throw new Error('Failed to fetch categories');
  }
}

export async function getCategoriesBySlug(slug: string) {
  try {
    const categories = await prisma.category.findMany({
      where: { slug },
      include: {
        catalog: true,
        subcategories: {
          include: {
            _count: {
              select: {
                products: true,
              },
            },
            category: {
              include: {
                catalog: true,
              },
            },
          },
          orderBy: {
            name: 'asc',
          },
        },
      },
    });

    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

export async function createCategory(data: {
  name: string;
  slug: string;
  img: string;
  catalogId: string;
  catalogSlug?: string;
}) {
  let imgUrl = data.img;

  const buffer = getImageBuffer(data.img);
  if (buffer) {
    const catalog = await prisma.catalog.findUnique({
      where: { id: data.catalogId },
    });
    if (!catalog) throw new Error('Catalog not found');

    const catalogSlug = data.catalogSlug || catalog.slug;
    const key = generateUniqueImageKey(
      `catalogs/${catalogSlug}/${data.slug}`,
    );
    const uploadedUrl = await uploadToR2(buffer, key);
    if (uploadedUrl) imgUrl = uploadedUrl;
  }

  try {
    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        img: imgUrl,
        catalogId: data.catalogId,
      },
      include: {
        catalog: true,
      },
    });

    revalidatePath('/admin/inventory/catalogs/' + category.catalog.slug);

    return category;
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Failed to create category');
  }
}

export async function updateCategory(
  id: string,
  data: {
    name?: string;
    slug?: string;
    catalogId?: string;
    catalogSlug?: string;
    img?: string;
  },
) {
  let imgUrl: string | undefined;

  if (data.img) {
    const buffer = getImageBuffer(data.img);
    if (buffer) {
      const currentCategory = await prisma.category.findUnique({
        where: { id },
        include: { catalog: true },
      });
      if (!currentCategory) throw new Error('Category not found');

      // Delete old image if it exists and is from R2
      if (currentCategory.img) {
        const oldKey = extractKeyFromUrl(currentCategory.img);
        if (oldKey) {
          await deleteFromR2(oldKey);
        }
      }

      const catalogSlug = data.catalogSlug || currentCategory.catalog.slug;
      const slug = data.slug || currentCategory.slug;
      const key = generateUniqueImageKey(
        `catalogs/${catalogSlug}/${slug}`,
      );
      imgUrl = (await uploadToR2(buffer, key)) || undefined;
    }
  }

  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        ...data,
        ...(imgUrl && { img: imgUrl }),
      },
      include: {
        catalog: true,
      },
    });

    revalidatePath('/admin/inventory/catalogs/' + category.catalog.slug);

    return category;
  } catch (error) {
    console.error('Error updating category:', error);
    throw new Error('Failed to update category');
  }
}

export async function deleteCategory(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { catalog: true },
    });

    if (!category) throw new Error('Category not found');

    // Delete image from R2 if it exists
    if (category.img) {
      const key = extractKeyFromUrl(category.img);
      if (key) {
        await deleteFromR2(key);
      }
    }

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath('/admin/inventory/catalogs/' + category.catalog.slug);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw new Error('Failed to delete category');
  }
}
