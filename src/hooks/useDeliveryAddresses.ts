import { fetchData } from '@/lib/fetch';
import { CreateDeliveryAddressInput, DeliveryAddress } from '@/types/address';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useDeliveryAddresses(userId?: string | null) {
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingAddress, setEditingAddress] = useState<DeliveryAddress | null>(
    null,
  );
  const [formData, setFormData] = useState<CreateDeliveryAddressInput>({
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

  useEffect(() => {
    if (userId) {
      loadAddresses();
    }
  }, [userId]);

  const loadAddresses = async () => {
    setIsLoading(true);
    try {
      const result = await fetchData<{ deliveryAddresses: DeliveryAddress[] }>(
        '/api/user/delivery-addresses',
        { noStore: true },
      );
      if (result && result.deliveryAddresses) {
        setAddresses(result.deliveryAddresses);
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
      toast.error('Failed to load addresses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (
    data: CreateDeliveryAddressInput & { id?: string },
  ) => {
    setIsSubmitting(true);
    try {
      if (data.id) {
        // Edit
        const response = await axios.put(
          `/api/user/delivery-addresses?id=${data.id}`,
          data,
        );
        if (response.data.error) {
          toast.error(response.data.error);
          return;
        }
        toast.success('Address updated successfully');
      } else {
        // Add
        const response = await axios.post('/api/user/delivery-addresses', data);
        if (response.data.error) {
          toast.error(response.data.error);
          return;
        }
        toast.success('Address added successfully');
      }
      await loadAddresses();
      resetForm();
      setEditingAddress(null);
    } catch (error: unknown) {
      console.error('Error saving address:', error);
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error
          : error instanceof Error
            ? error.message
            : 'Failed to save address';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `/api/user/delivery-addresses?id=${id}`,
      );
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      toast.success('Address deleted successfully');
      await loadAddresses();
    } catch (error: unknown) {
      console.error('Error deleting address:', error);
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error
          : error instanceof Error
            ? error.message
            : 'Failed to delete address';
      toast.error(errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
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
  };

  const openEditDialog = (address: DeliveryAddress) => {
    setEditingAddress(address);
    setFormData({
      email: address.email,
      firstName: address.firstName,
      lastName: address.lastName,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || '',
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      phone: address.phone || '',
      isDefault: address.isDefault,
    });
  };

  const handleCancel = () => {
    setEditingAddress(null);
    resetForm();
  };

  return {
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
  };
}
