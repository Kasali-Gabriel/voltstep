/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { fetchData } from '@/lib/fetch';
import { CreateDeliveryAddressInput, DeliveryAddress } from '@/types/address';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useCartStore } from './use-cart';

export const useCheckout = () => {
  const router = useRouter();
  const { user } = useUser();
  const { items } = useCartStore();

  const [deliveryAddresses, setDeliveryAddresses] = useState<DeliveryAddress[]>(
    [],
  );
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] =
    useState<string>('');
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Guest form states
  const [guestDeliveryData, setGuestDeliveryData] =
    useState<CreateDeliveryAddressInput>({
      email: '',
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: '',
      isDefault: false,
    });

  const loadUserData = useCallback(async () => {
    if (!user) {
      setIsInitializing(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const addressResult = await fetchData<{
        deliveryAddresses: DeliveryAddress[];
      }>('/api/user/delivery-addresses');

      if (addressResult?.deliveryAddresses) {
        setDeliveryAddresses(addressResult.deliveryAddresses);
        const defaultAddress = addressResult.deliveryAddresses.find(
          (addr) => addr.isDefault,
        );
        if (defaultAddress) {
          setSelectedDeliveryAddress(defaultAddress.id);
        } else if (addressResult.deliveryAddresses.length === 1) {
          setSelectedDeliveryAddress(addressResult.deliveryAddresses[0].id);
        }
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load delivery addresses',
      );
      console.error('Error loading user data:', err);
    } finally {
      setIsLoading(false);
      setIsInitializing(false);
    }
  }, [user]);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/');
      return;
    }
    loadUserData();
  }, [items, router, loadUserData]);

  const refreshAddresses = useCallback(async () => {
    await loadUserData();
  }, [loadUserData]);

  const handleGuestDeliverySubmit = useCallback(
    (data: CreateDeliveryAddressInput) => {
      setGuestDeliveryData(data);
    },
    [],
  );

  // Return delivery address as CreateDeliveryAddressInput (guest or selected)
  const getDeliveryAddressInput = useCallback(():
    | CreateDeliveryAddressInput
    | undefined => {
    if (!user) {
      // Guest delivery
      return guestDeliveryData.email ? guestDeliveryData : undefined;
    }

    if (!selectedDeliveryAddress) {
      return undefined;
    }

    const found = deliveryAddresses.find(
      (addr) => addr.id === selectedDeliveryAddress,
    );

    if (!found) {
      return undefined;
    }

    const { id, userId, createdAt, updatedAt, ...rest } = found;
    return {
      ...rest,
      addressLine2: rest.addressLine2 === null ? undefined : rest.addressLine2,
    };
  }, [user, selectedDeliveryAddress, deliveryAddresses, guestDeliveryData]);

  const deliveryAddressInput = getDeliveryAddressInput();

  return {
    // Data
    deliveryAddresses,
    selectedDeliveryAddress,
    setSelectedDeliveryAddress,
    isInitializing,
    isLoading,
    error,
    guestDeliveryData,
    setGuestDeliveryData,
    deliveryAddressInput,

    // Functions
    handleGuestDeliverySubmit,
    refreshAddresses,
    getDeliveryAddressInput,
  };
};
