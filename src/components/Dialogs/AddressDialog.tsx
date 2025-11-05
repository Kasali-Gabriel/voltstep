'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AddressDialogProps } from '@/types/address';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { X } from 'lucide-react';
import AddressForm from '../Forms/AddressForm';

const AddressDialog =({
  isOpen,
  onOpenChange,
  editingAddress,
  formData,
  setFormData,
  isSubmitting,
  onSubmit,
  onCancel,
}: AddressDialogProps) =>{
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
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h2>

          <button
            type="button"
            onClick={onCancel}
            tabIndex={-1}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-neutral-100 font-medium hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50 md:size-10"
            disabled={isSubmitting}
          >
            <X strokeWidth={1.5} size={20} />
          </button>
        </div>

        <AddressForm
          formData={formData}
          setFormData={setFormData}
          editingAddress={editingAddress}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCancel={onCancel}
          maxHeight={true}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddressDialog;
