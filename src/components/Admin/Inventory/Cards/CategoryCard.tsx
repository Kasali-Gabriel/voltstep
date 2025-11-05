'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Category } from '@/types/product';
import axios from 'axios';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CategoryDialog } from '../../../Dialogs/CategoryDialog';
import Loader from '@/components/ui/loader';

export const CategoryCard = ({
  category,
  catalogSlug,
}: {
  category: Category;
  catalogSlug: string;
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleEdit = async (data: {
    name: string;
    slug: string;
    img: string;
  }) => {
    setIsSubmitting(true);
    try {
      await axios.put(`/api/admin/inventory/categories/${category.id}`, data);

      setEditDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error editing category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await axios.delete(`/api/admin/inventory/categories/${category.id}`);

      setDeleteDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="group relative flex flex-col rounded-2xl border-none pb-3 shadow transition hover:shadow-lg">
        {category.img ? (
          <Link
            href={`/admin/inventory/catalogs/${catalogSlug}/${category.slug}`}
            className="relative aspect-square h-auto w-full cursor-pointer rounded-t-2xl"
          >
            <Image
              src={category.img}
              alt={category.name}
              fill
              className="rounded-t-2xl object-contain"
            />
          </Link>
        ) : (
          <div className="relative flex aspect-square items-center justify-center rounded-t-2xl bg-gradient-to-br from-blue-100 to-blue-200">
            {/* Placeholder for image or fallback initial */}
            <span className="text-5xl font-bold text-blue-600">
              {category.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div className="flex flex-col justify-between border-t p-2 md:p-4">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/admin/inventory/catalogs/${catalogSlug}/${category.slug}`}
              className="w-fit"
            >
              <h3 className="truncate text-xl font-semibold text-gray-900 transition-colors hover:text-blue-600">
                {category.name}
              </h3>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="mt-1 h-5 w-10">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setDeleteDialogOpen(true)}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {category._count && (
            <p className="mt-1 text-sm text-gray-400">
              {category._count.subcategories} subcategories
            </p>
          )}
        </div>
      </div>

      <CategoryDialog
        isOpen={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleEdit}
        isSubmitting={isSubmitting}
        editingCategory={{
          id: category.id,
          name: category.name,
          slug: category.slug,
          img: category.img || '',
        }}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-semibold italic">{category.name}</span>?
              This action cannot be undone.
              {category.subcategories && category.subcategories.length > 0 && (
                <span className="mt-2 block text-red-600">
                  This will also delete {category.subcategories.length}{' '}
                  subcategories as well as all their products.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={isSubmitting}
              className="flex min-w-28 items-center justify-center rounded-4xl bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? (
                <Loader borderWidth="1.5px" color="white" />
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
