'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { useUserContext } from '@/context/UserContext';
import { useAddressStore } from '@/lib/state';
import { AddressFormProps } from '@/types/address';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Loader from '../ui/loader';
import AddressFields from '../User/DeliveryAddresses/AddressFields';
import { AddressFormSchema } from '@/schemas/addressSchema';

const AddressForm = ({
  formData,
  setFormData,
  editingAddress,
  isSubmitting,
  onSubmit,
  hideDefaultOption = false,
  maxHeight = false,
}: AddressFormProps) => {
  const addressFormSchema = useMemo(() => AddressFormSchema(), []);
  const { setIsFormValid } = useAddressStore();

  const { userId } = useUserContext();

  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    mode: userId ? 'onSubmit' : 'onChange',
    reValidateMode: userId ? 'onSubmit' : 'onChange',
    defaultValues: {
      email: formData.email || '',
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      addressLine1: formData.addressLine1 || '',
      addressLine2: formData.addressLine2 || '',
      city: formData.city || '',
      state: formData.state || '',
      zipCode: formData.zipCode || '',
      country: formData.country || '',
      phone: formData.phone || '',
      isDefault: formData.isDefault || false,
    },
  });

  useEffect(() => {
    setIsFormValid(form.formState.isValid);
  }, [form.formState.isValid, setIsFormValid]);

  // Update form when formData changes (for editing)
  useEffect(() => {
    form.reset({
      email: formData.email || '',
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      addressLine1: formData.addressLine1 || '',
      addressLine2: formData.addressLine2 || '',
      city: formData.city || '',
      state: formData.state || '',
      zipCode: formData.zipCode || '',
      country: formData.country || '',
      phone: formData.phone || '',
      isDefault: formData.isDefault || false,
    });
  }, [formData, form]);

  // For guest users (no userId) keep parent state in sync as the user types
  // so the guest delivery data is available without an explicit submit button.
  // timer ref at component scope for debounce
  const watchTimerRef = useRef<number | null>(null);
  // keep a ref of latest formData to compare and avoid unnecessary state updates
  const latestFormDataRef = useRef<typeof formData>(formData);

  useEffect(() => {
    latestFormDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    if (userId) return; // only for guests

    const unsubscribe = form.watch((values) => {
      const safeData = {
        email: values.email ?? '',
        firstName: values.firstName ?? '',
        lastName: values.lastName ?? '',
        addressLine1: values.addressLine1 ?? '',
        addressLine2: values.addressLine2 ?? '',
        city: values.city ?? '',
        state: values.state ?? '',
        zipCode: values.zipCode ?? '',
        country: values.country ?? '',
        phone: values.phone ?? '',
        isDefault: values.isDefault ?? false,
      } as typeof formData;

      // if values are identical to the latest parent state, skip update to avoid loops
      const latest = latestFormDataRef.current || ({} as typeof formData);
      const keys: (keyof typeof formData)[] = [
        'email',
        'firstName',
        'lastName',
        'addressLine1',
        'addressLine2',
        'city',
        'state',
        'zipCode',
        'country',
        'phone',
        'isDefault',
      ];

      const isSame = keys.every((k) => {
        if (k === 'isDefault') return latest[k] === safeData[k];
        const a =
          latest[k] === undefined || latest[k] === null
            ? ''
            : String(latest[k]);
        const b =
          safeData[k] === undefined || safeData[k] === null
            ? ''
            : String(safeData[k]);
        return a === b;
      });

      if (isSame) return;

      // debounce updates to avoid triggering rapid order updates while typing
      if (watchTimerRef.current) {
        clearTimeout(watchTimerRef.current);
      }
      watchTimerRef.current = window.setTimeout(() => {
        setFormData(safeData);
      }, 400);
    });

    return () => {
      // cleanup subscription and pending timer
      try {
        const fn = unsubscribe as unknown as () => void;
        if (typeof fn === 'function') fn();
      } catch {}

      if (watchTimerRef.current) {
        clearTimeout(watchTimerRef.current);
      }
    };
  }, [userId, form, setFormData]);

  const handleFormSubmit = (data: z.infer<typeof addressFormSchema>) => {
    const safeData = {
      ...data,
      addressLine2: data.addressLine2 ?? '',
      state: data.state ?? '',
      zipCode: data.zipCode ?? '',
      phone: data.phone ?? '',
    };
    setFormData({
      ...formData,
      ...safeData,
    });

    onSubmit(safeData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="h-full w-full space-y-4"
      >
        <div
          className={`scrollbar-thin flex flex-col space-y-5 overflow-y-auto p-2 pr-5 ${maxHeight ? 'max-h-[calc(100vh-300px)]' : ''}`}
        >
          <AddressFields form={form} isSubmitting={isSubmitting} />

          {!hideDefaultOption && (
            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-5 flex items-center space-x-2">
                    <Checkbox
                      id="isDefault"
                      disabled={isSubmitting}
                      checked={field.value || false}
                      className="cursor-pointer"
                      onCheckedChange={field.onChange}
                    />
                    <Label
                      htmlFor="isDefault"
                      className="cursor-pointer text-sm"
                    >
                      Set as default address
                    </Label>
                  </div>
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="flex w-full justify-end">
          {userId && (
            <button
              type="submit"
              disabled={
                isSubmitting ||
                (editingAddress ? !form.formState.isDirty : false)
              }
              className="mt-6 flex h-9 w-24 cursor-pointer items-center justify-center rounded-3xl bg-black font-medium text-white hover:bg-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-black"
            >
              {isSubmitting ? (
                <Loader size={20} borderWidth="2px" color="white" />
              ) : editingAddress ? (
                'Update'
              ) : (
                'Add'
              )}
            </button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AddressForm;
