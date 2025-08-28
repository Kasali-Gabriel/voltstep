'use client';

import { PasswordSchema } from '@/lib/schema';
import { PasswordFormProps } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FloatingLabelInput } from '../ui/floating-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';

const PasswordForm = ({
  isLoading,
  serverErrors,
  onSubmit,
  onFieldChange,
}: PasswordFormProps) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Set server errors when they change
  useEffect(() => {
    if (serverErrors?.newPassword) {
      form.setError('newPassword', {
        type: 'server',
        message: serverErrors.newPassword,
      });
    } else {
      form.clearErrors('newPassword');
    }
  }, [serverErrors, form]);

  const handleSubmit = (data: z.infer<typeof PasswordSchema>) => {
    onSubmit(data.newPassword);
  };

  return (
    <Form {...form}>
      <form
        id="password-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full flex-col space-y-5"
      >
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <FloatingLabelInput
                    type={showNewPassword ? 'text' : 'password'}
                    label="New Password"
                    {...field}
                    className="rounded-md border-neutral-300 pr-10"
                    disabled={isLoading}
                    onChange={(e) => {
                      field.onChange(e);
                      onFieldChange?.('newPassword');
                    }}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-neutral-500 hover:text-neutral-700"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    tabIndex={-1}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <FloatingLabelInput
                    type={showConfirmPassword ? 'text' : 'password'}
                    label="Confirm New Password"
                    {...field}
                    className="rounded-md border-neutral-300 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-neutral-500 hover:text-neutral-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default PasswordForm;
