'use client';

import { UpdateProfileFormProps } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FloatingLabelInputField } from '../ui/floating-input';
import { Form } from '../ui/form';
import { ProfileSchema } from '@/schemas/authSchemas';

const UpdateProfileForm = ({
  firstName,
  lastName,
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
        <FloatingLabelInputField
          form={form}
          name="firstName"
          label="First Name"
          type="text"
        />

        <FloatingLabelInputField
          form={form}
          name="lastName"
          label="Last Name"
          type="text"
        />
      </form>
    </Form>
  );
};

export default UpdateProfileForm;
