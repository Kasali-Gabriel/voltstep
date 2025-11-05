'use client';

import axios from 'axios';
import { Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { CatalogDialog } from '../Dialogs/CatalogDialog';
import { CategoryDialog } from '../Dialogs/CategoryDialog';
import { SubcategoryDialog } from '../Dialogs/SubcategoryDialog';

export const AddButton = ({
  categoryId,
  catalogId,
  setIsProductFormOpen,
}: {
  categoryId?: string;
  catalogId?: string;
  setIsProductFormOpen?: (open: boolean) => void;
}) => {
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [subcategoryDialogOpen, setSubcategoryDialogOpen] = useState(false);
  const [catalogDialogOpen, setCatalogDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  const isInCatalogPage = pathName === '/admin/inventory/catalogs';

  const isInCategoryPage =
    pathName.startsWith('/admin/inventory/catalogs/') &&
    pathName.split('/').length === 5;

  const isInSubcategoryPage =
    pathName.startsWith('/admin/inventory/catalogs/') &&
    pathName.split('/').length === 6;

  const isInProductPage = pathName === '/admin/inventory/products';

  const handleAddCatalog = async (data: {
    name: string;
    slug: string;
    img: string;
  }) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/admin/inventory/catalog', data);

      setCatalogDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error adding catalog:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCategory = async (data: {
    name: string;
    slug: string;
    img: string;
  }) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/admin/inventory/categories', {
        catalogId,
        ...data,
      });

      setCategoryDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSubcategory = async (data: {
    name: string;
    slug: string;
    img: string;
  }) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/admin/inventory/subcategories', {
        categoryId,
        ...data,
      });

      setSubcategoryDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error adding subcategory:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isInCatalogPage && (
        <button
          className="flex h-10 w-40 cursor-pointer items-center justify-center gap-2 rounded-4xl border border-neutral-300 hover:border-black"
          onClick={() => setCatalogDialogOpen(true)}
        >
          <Plus className="-mt-0.5 -ml-1 size-5" />
          Add Catalog
        </button>
      )}

      {isInProductPage && setIsProductFormOpen && (
        <button
          className="flex h-10 w-40 cursor-pointer items-center justify-center gap-2 rounded-4xl border border-neutral-300 hover:border-black"
          onClick={() => setIsProductFormOpen(true)}
        >
          <Plus className="-mt-0.5 -ml-1 size-5" />
          Add Product
        </button>
      )}

      {isInCategoryPage && (
        <button
          className="flex h-10 w-44 cursor-pointer items-center justify-center gap-2 rounded-4xl border border-neutral-300 hover:border-black"
          onClick={() => setCategoryDialogOpen(true)}
        >
          <Plus className="-mt-0.5 -ml-1 size-5" />
          Add Category
        </button>
      )}

      {isInSubcategoryPage && (
        <button
          className="flex h-10 w-48 cursor-pointer items-center justify-center gap-2 rounded-4xl border border-neutral-300 hover:border-black"
          onClick={() => setSubcategoryDialogOpen(true)}
        >
          <Plus className="-mt-0.5 -ml-1 size-5" />
          Add Subcategory
        </button>
      )}

      <CatalogDialog
        isOpen={catalogDialogOpen}
        onOpenChange={setCatalogDialogOpen}
        onSubmit={handleAddCatalog}
        isSubmitting={isSubmitting}
      />

      <CategoryDialog
        isOpen={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        onSubmit={handleAddCategory}
        isSubmitting={isSubmitting}
      />

      <SubcategoryDialog
        isOpen={subcategoryDialogOpen}
        onOpenChange={setSubcategoryDialogOpen}
        onSubmit={handleAddSubcategory}
        isSubmitting={isSubmitting}
      />
    </>
  );
};
