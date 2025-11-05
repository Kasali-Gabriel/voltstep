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
import { Subcategory } from '@/types/product';
import axios from 'axios';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubcategoryDialog } from '../../../Dialogs/SubcategoryDialog';
import Loader from '@/components/ui/loader';

export const SubcategoryCard = ({
  subcategory,
}: {
  subcategory: Subcategory;
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleEdit = async (data: { name: string; slug: string }) => {
    setIsSubmitting(true);
    try {
      await axios.put(
        `/api/admin/inventory/subcategories/${subcategory.id}`,
        data,
      );

      setEditDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error editing subcategory:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await axios.delete(
        `/api/admin/inventory/subcategories/${subcategory.id}`,
      );

      setDeleteDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="group relative flex flex-col rounded-2xl border-none pb-3 shadow transition hover:shadow-lg">
        {subcategory.img ? (
          <Link
            href={`/admin/inventory/products?subcategoryId=${subcategory.id}`}
            className="relative aspect-square h-auto w-full cursor-pointer rounded-t-2xl"
          >
            <Image
              src={subcategory.img}
              alt={subcategory.name}
              fill
              className="rounded-t-2xl object-contain"
            />
          </Link>
        ) : (
          <div className="relative flex aspect-square items-center justify-center rounded-t-2xl bg-gradient-to-br from-blue-100 to-blue-200">
            <span className="text-5xl font-bold text-blue-600">
              {subcategory.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div className="flex flex-col overflow-x-hidden border-t p-2 md:p-4">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/admin/inventory/products?subcategoryId=${subcategory.id}`}
              className="w-fit truncate"
            >
              <h3 className="truncate text-lg font-semibold text-gray-900 transition-colors hover:text-blue-600 xl:text-xl">
                {subcategory.name}
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

          {subcategory._count && (
            <p className="mt-1 text-sm text-gray-400">
              {subcategory._count.products} products
            </p>
          )}
        </div>
      </div>

      <SubcategoryDialog
        isOpen={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleEdit}
        isSubmitting={isSubmitting}
        editingSubcategory={{
          id: subcategory.id,
          name: subcategory.name,
          slug: subcategory.slug,
          img: subcategory.img || '',
        }}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subcategory</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-semibold italic">{subcategory.name}</span>?
              This action cannot be undone.
              {subcategory._count && subcategory._count.products > 0 && (
                <span className="mt-2 block text-red-600">
                  This will also delete {subcategory._count.products} products.
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
