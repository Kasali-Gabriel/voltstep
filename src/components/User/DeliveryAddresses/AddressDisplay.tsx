import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { AddressDisplayProps } from '@/types/address';
import { Trash2 } from 'lucide-react';

export const AddressDisplay = ({
  address,
  isSubmitting,
  isAccountPage = false,
  onEdit,
  onDelete,
}: AddressDisplayProps) => {
  if (!address) return null;
  return (
    <div
      className={`relative mb-4 rounded-lg border p-4 ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
    >
      <div className="mb-2 flex items-center gap-2">
        {address.isDefault && (
          <Badge variant="secondary" className="rounded-3xl">
            Default
          </Badge>
        )}
      </div>

      <p className="text-sm text-gray-800">
        {address.firstName} {address.lastName}
      </p>

      <p className="text-xs text-gray-500">{address.email}</p>

      <p className="text-sm text-gray-700">
        {address.addressLine1}
        {address.addressLine2 && `, ${address.addressLine2}`}
      </p>

      <p className="text-sm text-gray-700">
        {address.city}
        {address.state && `, ${address.state}`}
        {address.zipCode && ` ${address.zipCode}`}
      </p>

      <p className="text-sm text-gray-700">{address.country}</p>

      <p className="text-sm text-gray-700">{address.phone}</p>

      {isAccountPage && (
        <>
          <div className="absolute top-4 right-4">
            {onEdit && (
              <button
                className="flex w-fit cursor-pointer items-center justify-center rounded-3xl border border-stone-400 px-3 text-sm text-black hover:border-black sm:px-5 sm:text-base"
                onClick={() => onEdit(address)}
                aria-label="Edit address"
              >
                Edit
              </button>
            )}
          </div>

          <div className="absolute right-4 bottom-4">
            {onDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="cursor-pointer text-red-600 hover:text-red-700">
                    <Trash2 className="size-6" />
                  </button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Address</AlertDialogTitle>

                    <AlertDialogDescription>
                      Are you sure you want to delete this address? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(address.id)}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </>
      )}
    </div>
  );
};
