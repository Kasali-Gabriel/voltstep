'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAdminSidebarStore } from '@/lib/state';
import {
  createProductSchema,
  editProductSchema,
  ProductFormData,
} from '@/schemas/productSchemas';
import { Catalog } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import ProductDetailsFields from '../Admin/Inventory/Products/FormFields/ProductDetailsFields';
import ProductImageField from '../Admin/Inventory/Products/FormFields/ProductImageField';
import ProductVariantField from '../Admin/Inventory/Products/FormFields/ProductVariantField';
import Loader from '../ui/loader';

interface ProductFormProps {
  onSubmit: (
    data: ProductFormData & { quantity: number; subcategoryId: string },
  ) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  initialData?: Partial<ProductFormData & { subcategoryId: string }>;
  subcategoryName: string;
}

export const ProductForm = ({
  onSubmit,
  onCancel,
  isSubmitting,
  initialData,
  subcategoryName,
}: ProductFormProps) => {
  const { showSidebar } = useAdminSidebarStore();

  const [catalogData, setCatalogData] = useState<Catalog[]>([]);

  const [subcategoryId, setSubcategoryId] = useState(
    initialData?.subcategoryId || '',
  );

  const isEditing = !!initialData;

  const productFormSchema = isEditing ? editProductSchema : createProductSchema;

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      slug: initialData?.slug || '',
      description: initialData?.description || '',
      price: initialData?.price,
      images: initialData?.images || [],
      catalog: initialData?.catalog || '',
      category: initialData?.category || '',
      subcategory: initialData?.subcategory || '',
      variants: initialData?.variants || [
        { color: '', sizes: [{ size: '', quantity: 0 }] },
      ],
    },
  });

  const watchedSubcategory = form.watch('subcategory');

  useEffect(() => {
    axios
      .get('/api/admin/inventory/catalog')
      .then((response) => setCatalogData(response.data as Catalog[]))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (catalogData.length > 0) {
      if (isEditing && initialData?.subcategoryId) {
        // For editing, find the names from subcategoryId
        for (const catalog of catalogData) {
          for (const category of catalog.categories || []) {
            const sub = category.subcategories?.find(
              (sub) => sub.id === initialData.subcategoryId,
            );
            if (sub) {
              form.setValue('catalog', catalog.name);
              form.setValue('category', category.name);
              form.setValue('subcategory', sub.name);
              setSubcategoryId(sub.id);
              return;
            }
          }
        }
      } else if (subcategoryName && !isEditing) {
        // For create with subcategoryName
        for (const catalog of catalogData) {
          for (const category of catalog.categories || []) {
            const sub = category.subcategories?.find(
              (sub) => sub.name === subcategoryName,
            );
            if (sub) {
              form.setValue('catalog', catalog.name);
              form.setValue('category', category.name);
              form.setValue('subcategory', subcategoryName);
              setSubcategoryId(sub.id);
              return;
            }
          }
        }
      }
    }
  }, [
    subcategoryName,
    catalogData,
    form,
    isEditing,
    initialData?.subcategoryId,
  ]);

  useEffect(() => {
    if (watchedSubcategory && catalogData.length > 0 && !isEditing) {
      for (const catalog of catalogData) {
        for (const category of catalog.categories || []) {
          const sub = category.subcategories?.find(
            (sub) => sub.name === watchedSubcategory,
          );
          if (sub) {
            setSubcategoryId(sub.id);
            return;
          }
        }
      }
    }
  }, [watchedSubcategory, catalogData, isEditing]);

  const currentSubcategory = subcategoryName || watchedSubcategory || '';

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control: form.control,
    name: 'variants',
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (name: string) => {
    const slug = generateSlug(name);
    form.setValue('name', name);
    form.setValue('slug', slug);
  };

  const addVariant = () => {
    appendVariant({ color: '', sizes: [{ size: '', quantity: 0 }] });
  };

  const removeVariantField = (index: number) => {
    removeVariant(index);
  };

  const addSizeToVariant = (variantIndex: number) => {
    const currentVariants = form.getValues('variants');
    currentVariants[variantIndex].sizes.push({ size: '', quantity: 0 });
    form.setValue('variants', currentVariants);
  };

  const removeSizeFromVariant = (variantIndex: number, sizeIndex: number) => {
    const currentVariants = form.getValues('variants');
    currentVariants[variantIndex].sizes = currentVariants[
      variantIndex
    ].sizes.filter((_, i) => i !== sizeIndex);
    form.setValue('variants', currentVariants);
  };

  const handleSubmit = async (data: ProductFormData) => {
    const totalQuantity = data.variants.reduce(
      (sum, variant) =>
        sum +
        variant.sizes.reduce((sizeSum, size) => sizeSum + size.quantity, 0),
      0,
    );

    await onSubmit({ ...data, quantity: totalQuantity, subcategoryId });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`flex w-full max-w-5xl flex-col lg:w-full${showSidebar ? 'md:w-full' : 'md:w-[80%]'}`}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <ProductDetailsFields
              form={form}
              isSubmitting={isSubmitting}
              handleNameChange={handleNameChange}
              subcategoryName={subcategoryName}
              catalogData={catalogData}
            />

            <ProductVariantField
              form={form}
              isSubmitting={isSubmitting}
              variantFields={variantFields}
              addVariant={addVariant}
              removeVariantField={removeVariantField}
              addSizeToVariant={addSizeToVariant}
              removeSizeFromVariant={removeSizeFromVariant}
              subcategoryName={currentSubcategory}
              disabled={!currentSubcategory}
            />
          </div>

          <ProductImageField
            form={form}
            isSubmitting={isSubmitting}
            showSidebar={showSidebar}
          />
        </div>

        <div className="flex w-full justify-end gap-3 pt-10">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-2xl"
          >
            Cancel
          </Button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-9 w-40 cursor-pointer items-center justify-center rounded-2xl bg-black text-white hover:bg-neutral-800 disabled:pointer-events-none disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader color="white" borderWidth="2px" size={22} />
            ) : initialData ? (
              'Update Product'
            ) : (
              'Create Product'
            )}
          </button>
        </div>
      </form>
    </Form>
  );
};
