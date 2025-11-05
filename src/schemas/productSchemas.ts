import { z } from 'zod';

export const reviewSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Review Title must be at least 10 characters.' }),
  details: z
    .string()
    .min(10, { message: 'Review Description must be at least 50 characters.' }),
  rating: z.number().min(1, { message: 'Please provide a rating.' }).max(5),
});

const sizeVariantSchemaCreate = z.object({
  size: z.string().min(1, 'Size is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

const sizeVariantSchemaEdit = z.object({
  size: z.string().min(1, 'Size is required'),
  quantity: z
    .number()
    .min(0, 'Quantity must be non-negative')
    .int('Quantity must be an integer'),
});

const colorVariantSchemaCreate = z.object({
  color: z.string().min(1, 'Color is required'),
  sizes: z
    .array(sizeVariantSchemaCreate)
    .min(1, 'At least one size is required'),
});

const colorVariantSchemaEdit = z.object({
  color: z.string().min(1, 'Color is required'),
  sizes: z.array(sizeVariantSchemaEdit).min(1, 'At least one size is required'),
});

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .min(1, 'Price must be at least $1'),
  images: z
    .array(z.string().min(1, 'Image URL is required'))
    .min(8, '8 images are required')
    .max(8, 'Maximum 8 images'),
  catalog: z.string().min(1, 'Catalog is required'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().min(1, 'Subcategory is required'),
  variants: z
    .array(colorVariantSchemaCreate)
    .min(1, 'At least one variant is required'),
});

export const editProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .min(1, 'Price must be at least $1'),
  images: z
    .array(z.string().min(1, 'Image URL is required'))
    .min(8, '8 images are required')
    .max(8, 'Maximum 8 images'),
  catalog: z.string().min(1, 'Catalog is required'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().min(1, 'Subcategory is required'),
  variants: z
    .array(colorVariantSchemaEdit)
    .min(1, 'At least one variant is required'),
});

export type ProductFormData = z.infer<typeof editProductSchema>;
