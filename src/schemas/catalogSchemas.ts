import { z } from 'zod';

export const CatalogFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Catalog name is required' })
    .min(2, { message: 'Catalog name must be at least 2 characters' })
    .max(100, { message: 'Catalog name must be less than 100 characters' }),
  slug: z
    .string()
    .min(1, { message: 'Slug is required' })
    .regex(/^[a-z0-9-]+$/, {
      message: 'Slug can only contain lowercase letters, numbers, and hyphens',
    })
    .max(100, { message: 'Slug must be less than 100 characters' }),
  img: z
    .string()
    .min(1, { message: 'Image URL is required' })
    .url({ message: 'Image must be a valid URL' }),
});

export const CategoryFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Category name is required' })
    .min(2, { message: 'Category name must be at least 2 characters' })
    .max(100, { message: 'Category name must be less than 100 characters' }),
  slug: z
    .string()
    .min(1, { message: 'Slug is required' })
    .regex(/^[a-z0-9-]+$/, {
      message: 'Slug can only contain lowercase letters, numbers, and hyphens',
    })
    .max(100, { message: 'Slug must be less than 100 characters' }),
  img: z
    .string()
    .min(1, { message: 'Image URL is required' })
    .url({ message: 'Image must be a valid URL' }),
});

export const SubcategoryFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Subcategory name is required' })
    .min(2, { message: 'Subcategory name must be at least 2 characters' })
    .max(100, { message: 'Subcategory name must be less than 100 characters' }),
  slug: z
    .string()
    .min(1, { message: 'Slug is required' })
    .regex(/^[a-z0-9-]+$/, {
      message: 'Slug can only contain lowercase letters, numbers, and hyphens',
    })
    .max(100, { message: 'Slug must be less than 100 characters' }),
  img: z
    .string()
    .min(1, { message: 'Image URL is required' })
    .url({ message: 'Image must be a valid URL' }),
});
