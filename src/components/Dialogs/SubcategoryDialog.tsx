'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { X } from 'lucide-react';
import { SubcategoryForm } from '../Forms/SubcategoryForm';

interface SubcategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    slug: string;
    img: string;
  }) => Promise<void>;
  isSubmitting: boolean;
  editingSubcategory?: {
    id: string;
    name: string;
    slug: string;
    img: string;
  };
}

export const SubcategoryDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
  editingSubcategory,
}: SubcategoryDialogProps) => {
  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[95vh] max-w-[90vw] rounded-3xl p-5 py-10 sm:max-w-xl sm:px-10 xl:px-14"
      >
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </VisuallyHidden>

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-medium md:text-2xl">
            {editingSubcategory ? 'Edit Subcategory' : 'Add New Subcategory'}
          </h2>

          <button
            type="button"
            onClick={handleCancel}
            tabIndex={-1}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-neutral-100 font-medium hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50 md:size-10"
            disabled={isSubmitting}
          >
            <X strokeWidth={1.5} size={20} />
          </button>
        </div>

        <SubcategoryForm
          onSubmit={onSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          initialData={editingSubcategory}
        />
      </DialogContent>
    </Dialog>
  );
};
