'use client';

import AddressForm from '@/components/Forms/AddressForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { useDeliveryAddresses } from '@/hooks/useDeliveryAddresses';
import {
  checkoutDeliveryAddressProps,
  CreateDeliveryAddressInput,
} from '@/types/address';
import { MapPin, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { AddressDisplay } from '../User/DeliveryAddresses/AddressDisplay';
import { AddressList } from './AddressList';

const CheckoutDeliverySection =({
  userId,
  deliveryAddresses,
  selectedDeliveryAddress,
  setSelectedDeliveryAddress,
  guestDeliveryData,
  setGuestDeliveryData,
  handleGuestDeliverySubmit,
  refreshAddresses,
}: checkoutDeliveryAddressProps) =>{
  const { handleSubmit, isSubmitting } = useDeliveryAddresses();

  // Submit logic for address add/edit
  const handleAddressFormSubmit = async (data: CreateDeliveryAddressInput) => {
    setEditingAddressId(null);
    if (userId) {
      // add new address
      if (editingAddressId === 'new') {
        await handleSubmit(data);
        await refreshAddresses();
      } else {
        // Edit existing address
        await handleSubmit({ ...data, id: editingAddress?.id });
        await refreshAddresses();
      }
    } else {
      handleGuestDeliverySubmit(data);
    }
  };

  const [showCollapsible, setShowCollapsible] = useState(false);
  // Track the address selected when collapsible is opened
  const [initialSelectedAddress, setInitialSelectedAddress] = useState<
    string | null
  >(null);

  // Keep initialSelectedAddress in sync if selected address changes while collapsible is open
  useEffect(() => {
    if (
      showCollapsible &&
      selectedDeliveryAddress &&
      selectedDeliveryAddress !== initialSelectedAddress
    ) {
      setInitialSelectedAddress(selectedDeliveryAddress);
    }
  }, [showCollapsible, selectedDeliveryAddress, initialSelectedAddress]);

  // Open collapsible if multiple addresses, no default, and none selected
  useEffect(() => {
    const hasMultiple = deliveryAddresses.length > 1;
    const hasDefault = deliveryAddresses.some((addr) => addr.isDefault);
    const noneSelected = !selectedDeliveryAddress;
    if (hasMultiple && !hasDefault && noneSelected) {
      setShowCollapsible(true);
    }
  }, [deliveryAddresses, selectedDeliveryAddress]);


  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  // For add/edit form state
  const emptyAddress: CreateDeliveryAddressInput = useMemo(
    () => ({
      email: '',
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: undefined,
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: '',
      isDefault: false,
    }),
    [],
  );

  const editingAddress =
    editingAddressId && editingAddressId !== 'new'
      ? deliveryAddresses.find((addr) => addr.id === editingAddressId)
      : null;

  const initialFormData: CreateDeliveryAddressInput = editingAddress
    ? {
        email: editingAddress.email,
        firstName: editingAddress.firstName,
        lastName: editingAddress.lastName,
        addressLine1: editingAddress.addressLine1,
        addressLine2: editingAddress.addressLine2 ?? undefined,
        city: editingAddress.city,
        state: editingAddress.state,
        zipCode: editingAddress.zipCode,
        country: editingAddress.country,
        phone: editingAddress.phone,
        isDefault: editingAddress.isDefault,
      }
    : emptyAddress;

  const [localFormData, setLocalFormData] =
    useState<CreateDeliveryAddressInput>(initialFormData);

  // Reset localFormData when switching between add/edit
  useEffect(() => {
    if (editingAddressId) {
      const editingAddress =
        editingAddressId !== 'new'
          ? deliveryAddresses.find((addr) => addr.id === editingAddressId)
          : null;

      setLocalFormData(
        editingAddress
          ? {
              email: editingAddress.email,
              firstName: editingAddress.firstName,
              lastName: editingAddress.lastName,
              addressLine1: editingAddress.addressLine1,
              addressLine2: editingAddress.addressLine2 ?? undefined,
              city: editingAddress.city,
              state: editingAddress.state,
              zipCode: editingAddress.zipCode,
              country: editingAddress.country,
              phone: editingAddress.phone,
              isDefault: editingAddress.isDefault,
            }
          : emptyAddress,
      );
    }
  }, [editingAddressId, deliveryAddresses, emptyAddress]);

  const defaultAddress = deliveryAddresses.find((addr) => addr.isDefault);

  const onlyOneAddress =
    deliveryAddresses.length === 1 ? deliveryAddresses[0] : null;

  const selectedAddress =
    deliveryAddresses.find((addr) => addr.id === selectedDeliveryAddress) ||
    defaultAddress ||
    onlyOneAddress ||
    null;

  // Show guest delivery form if guest or no addresses
  if (deliveryAddresses.length === 0 || !userId) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Delivery Address
          </CardTitle>
        </CardHeader>

        <CardContent className="px-3 sm:px-6">
          <AddressForm
            formData={guestDeliveryData}
            setFormData={setGuestDeliveryData}
            editingAddress={editingAddress ?? null}
            isSubmitting={userId ? isSubmitting : false}
            onSubmit={
              userId ? handleAddressFormSubmit : handleGuestDeliverySubmit
            }
            hideDefaultOption={!userId}
          />
        </CardContent>
      </Card>
    );
  }

  // If editing, show only the address form (no other addresses/details/buttons)
  if (editingAddressId) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {editingAddressId === 'new' ? 'Add New Address' : 'Edit Address'}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <AddressForm
            formData={localFormData}
            setFormData={setLocalFormData}
            editingAddress={editingAddress ?? null}
            isSubmitting={isSubmitting}
            onSubmit={handleAddressFormSubmit}
            hideDefaultOption={false}
          />

          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => setEditingAddressId(null)}
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Otherwise, show address display and list
  return (
    <Card
      className={`bg-white ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
    >
      <CardHeader className="flex flex-row items-center justify-between px-3 sm:px-6">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Delivery Address
        </CardTitle>
        {!showCollapsible && (
          <button
            className="flex w-fit cursor-pointer items-center justify-center rounded-3xl border border-stone-400 px-2 py-0.5 text-sm text-black hover:border-black sm:px-4 sm:text-base"
            disabled={isSubmitting}
            onClick={() => {
              setInitialSelectedAddress(selectedDeliveryAddress || null);
              setShowCollapsible(true);
            }}
          >
            Change
          </button>
        )}
        {showCollapsible &&
          initialSelectedAddress &&
          selectedDeliveryAddress === initialSelectedAddress && (
            <button
              className="ml-2 flex size-8 cursor-pointer items-center justify-center rounded-full bg-neutral-100 font-medium hover:bg-neutral-200"
              onClick={() => {
                setShowCollapsible(false);
                setInitialSelectedAddress(null);
              }}
              aria-label="Cancel address change"
            >
              <X className="h-4 w-4" />
            </button>
          )}
      </CardHeader>

      <CardContent className="px-3 sm:px-6">
        {/* Show default/selected address only if not changing */}
        {!showCollapsible && selectedAddress && (
          <AddressDisplay
            address={selectedAddress}
            isSubmitting={isSubmitting}
          />
        )}

        {/* Collapsible for changing address */}
        <Collapsible open={showCollapsible} onOpenChange={setShowCollapsible}>
          <CollapsibleContent>
            <div className="space-y-4">
              <AddressList
                addresses={deliveryAddresses}
                selectedId={selectedDeliveryAddress}
                onSelect={(id) => {
                  setSelectedDeliveryAddress(id);
                  // Only close if the address is different from the initial
                  if (id !== initialSelectedAddress) {
                    setShowCollapsible(false);
                    setInitialSelectedAddress(null);
                  }
                }}
                onEdit={setEditingAddressId}
              />

              <div className="mt-6 flex w-full justify-end">
                <button
                  className="flex w-fit cursor-pointer items-center justify-center rounded-3xl border border-stone-400 px-3 py-1 text-sm text-black hover:border-black sm:px-5 sm:text-base"
                  onClick={() => setEditingAddressId('new')}
                >
                  Add New Address
                </button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

export default CheckoutDeliverySection;
