'use client';

import AddressDialog from '@/components/Dialogs/AddressDialog';
import Loader from '@/components/ui/loader';
import { useUserContext } from '@/context/UserContext';
import { useDeliveryAddresses } from '@/hooks/useDeliveryAddresses';
import { useState } from 'react';
import { AddressDisplay } from './AddressDisplay';

const DeliveryAddresses = () => {
  const { userId, loading } = useUserContext();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const {
    addresses,
    isLoading,
    isSubmitting,
    editingAddress,
    formData,
    setFormData,
    handleSubmit,
    handleDelete,
    openEditDialog,
    handleCancel,
    resetForm,
    setEditingAddress,
  } = useDeliveryAddresses(userId);

  if (isLoading || loading) {
    return <Loader color="black" size={44} borderWidth="2px" />;
  }

  return (
    <div className="flex w-full flex-col space-y-5 sm:w-4/5 sm:pl-20 xl:w-2/3 xl:pl-36">
      <h2 className="mb-7 text-2xl sm:text-3xl">Delivery Addresses</h2>

      {addresses.length === 0 ? (
        <>
          <p className="text-xl font-medium">
            You currently don&apos;t have any saved delivery addresses. Add an
            address here to be prefilled for quicker checkout.
          </p>

          {userId && (
            <div className="flex w-full justify-end">
              <button
                className="mt-10 flex w-fit cursor-pointer items-center gap-2 rounded-3xl bg-black px-4 py-2 text-sm text-white hover:bg-neutral-700 sm:text-base"
                onClick={() => {
                  resetForm();
                  setIsAddDialogOpen(true);
                  setEditingAddress(null);
                }}
              >
                Add Address
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <AddressDisplay
              key={address.id}
              address={address}
              isAccountPage={true}
              onEdit={() => {
                openEditDialog(address);
                setIsAddDialogOpen(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {addresses.length > 0 && userId && (
        <button
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-3xl border border-stone-400 text-black hover:border-black sm:text-lg"
          onClick={() => {
            resetForm();
            setIsAddDialogOpen(true);
            setEditingAddress(null);
          }}
        >
          Add Address
        </button>
      )}

      <AddressDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        editingAddress={editingAddress}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        onSubmit={async (data) => {
          if (editingAddress) {
            await handleSubmit({ ...data, id: editingAddress.id });
          } else {
            await handleSubmit(data);
          }
          setIsAddDialogOpen(false);
        }}
        onCancel={() => {
          setIsAddDialogOpen(false);
          handleCancel();
        }}
      />
    </div>
  );
};

export default DeliveryAddresses;
