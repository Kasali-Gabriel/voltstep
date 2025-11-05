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

export async function getCatalog() {
  try {
    const categories = await prisma.catalog.findMany({
      include: {
        categories: {
          include: {
            subcategories: true,
            _count: {
              select: {
                subcategories: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

export async function getCatalogBySlug(slug: string) {
  try {
    const catalog = await prisma.catalog.findUnique({
      where: { slug },
    });

    return catalog;
  } catch (error) {
    console.error('Error fetching catalog by slug:', error);
    throw new Error('Failed to fetch catalog by slug');
  }
}

export async function createCatalog(data: {
  name: string;
  slug: string;
  img: string;
}) {
  let imgUrl = data.img;

  const buffer = getImageBuffer(data.img);
  if (buffer) {
    const key = generateUniqueImageKey(`catalogs/${data.slug}`);
    const uploadedUrl = await uploadToR2(buffer, key);
    if (uploadedUrl) imgUrl = uploadedUrl;
  }

  try {
    const catalog = await prisma.catalog.create({
      data: {
        name: data.name,
        slug: data.slug,
        img: imgUrl,
      },
    });

    revalidatePath('/admin/inventory/catalogs');

    return catalog;
  } catch (error) {
    console.error('Error creating catalog:', error);
    throw new Error('Failed to create catalog');
  }
}

export async function updateCatalog(
  id: string,
  data: {
    name?: string;
    slug?: string;
    img?: string;
  },
) {
  let imgUrl: string | undefined;

  if (data.img) {
    const buffer = getImageBuffer(data.img);
    if (buffer) {
      const currentCatalog = await prisma.catalog.findUnique({ where: { id } });

      if (!currentCatalog) throw new Error('Catalog not found');

      // Delete old image if it exists and is from R2
      if (currentCatalog.img) {
        const oldKey = extractKeyFromUrl(currentCatalog.img);
        if (oldKey) {
          await deleteFromR2(oldKey);
        }
      }

      const slug = data.slug || currentCatalog.slug;
      const key = generateUniqueImageKey(`catalogs/${slug}`);
      imgUrl = (await uploadToR2(buffer, key)) || undefined;
    }
  }

  try {
    const catalog = await prisma.catalog.update({
      where: { id },
      data: {
        ...data,
        ...(imgUrl && { img: imgUrl }),
      },
    });

    revalidatePath('/admin/inventory/catalogs');

    return catalog;
  } catch (error) {
    console.error('Error editing catalog:', error);
    throw new Error('Failed to edit catalog');
  }
}

export async function deleteCatalog(id: string) {
  try {
    const catalog = await prisma.catalog.findUnique({
      where: { id },
    });

    if (!catalog) throw new Error('Catalog not found');

    // Delete image from R2 if it exists
    if (catalog.img) {
      const key = extractKeyFromUrl(catalog.img);
      if (key) {
        await deleteFromR2(key);
      }
    }

    await prisma.catalog.delete({
      where: { id },
    });

    revalidatePath('/admin/inventory/catalogs');
  } catch (error) {
    console.error('Error deleting catalog:', error);
    throw new Error('Failed to delete catalog');
  }
}
