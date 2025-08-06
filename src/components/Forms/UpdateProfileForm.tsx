'use client';

import { ProfileSchema } from '@/lib/schema';
import { UpdateProfileFormProps } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const UpdateProfileForm = ({
  firstName,
  lastName,
  isLoading,
  onSubmit,
  onValuesChange,
}: UpdateProfileFormProps) => {
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: firstName || '',
      lastName: lastName || '',
    },
  });

  // Update form values when props change
  useEffect(() => {
    form.reset({
      firstName: firstName || '',
      lastName: lastName || '',
    });
  }, [firstName, lastName, form]);

  // Watch form values and call onValuesChange when they change
  const watchedValues = form.watch();
  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(watchedValues.firstName, watchedValues.lastName);
    }
  }, [watchedValues.firstName, watchedValues.lastName, onValuesChange]);

  const handleSubmit = (data: z.infer<typeof ProfileSchema>) => {
    onSubmit(data.firstName, data.lastName);
  };

  return (
    <Form {...form}>
      <form
        id="update-profile-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full items-center space-x-3"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your first name"
                  {...field}
                  className="rounded-md border-neutral-300"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your last name"
                  {...field}
                  className="rounded-md border-neutral-300"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default UpdateProfileForm;
