import { AddressListProps, DeliveryAddress } from '@/types/address';
import { Check } from 'lucide-react';
import { Badge } from '../ui/badge';

export const AddressList = ({
  addresses,
  selectedId,
  onSelect,
  onEdit,
}: AddressListProps) => {
  return (
    <>
      {addresses.map((address: DeliveryAddress) => (
        <div
          key={address.id}
          className="relative cursor-pointer rounded-lg border p-4"
          onClick={() => onSelect(address.id)}
        >
          {selectedId === address.id && (
            <div className="absolute top-4 right-4">
              <Check className="size-6 text-green-600" />
            </div>
          )}

          <div className="mb-2 flex items-center gap-2">
            {address.isDefault && <Badge variant="secondary">Default</Badge>}
          </div>

          <p className="text-sm text-gray-600">
            {address.firstName} {address.lastName}
          </p>

          <p className="text-xs text-gray-500">{address.email}</p>

          <p className="text-sm text-gray-600">
            {address.addressLine1}
            {address.addressLine2 && `, ${address.addressLine2}`}
          </p>

          <p className="text-sm text-gray-600">
            {address.city}, {address.state} {address.zipCode}
          </p>

          <div className="flex w-full justify-between">
            <p className="text-sm text-gray-600">{address.country}</p>

            <button
              className="flex w-fit cursor-pointer items-center justify-center rounded-3xl border border-stone-400 px-3 text-sm text-black hover:border-black sm:px-5 sm:text-base"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(address.id);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
