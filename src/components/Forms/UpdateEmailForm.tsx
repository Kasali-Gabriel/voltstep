'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useEmailUpdate } from '@/hooks/useEmailUpdate';
import { EmailSchema } from '@/lib/schema';
import { EmailVerificationDialogRef } from '@/types/user';
import { UserResource } from '@clerk/types';
import { useRef } from 'react';
import EmailVerificationDialog from '../Dialogs/EmailVerificationDialog';
import { Input } from '../ui/input';

const UpdateEmailForm = ({ user }: { user: UserResource }) => {
  const { isVerifying, startEmailUpdate, verifyEmailCode, cancelVerification } =
    useEmailUpdate(user);
  const dialogRef = useRef<EmailVerificationDialogRef>(null);

  const emailform = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: user?.emailAddresses[0]?.emailAddress,
    },
  });

  const handleSubmit = async (data: z.infer<typeof EmailSchema>) => {
    await startEmailUpdate(data.email);
  };

  const handleVerifyCode = async (code: string) => {
    await verifyEmailCode(
      code,
      (message: string) => dialogRef.current?.setError(message),
      () => dialogRef.current?.clearInput(),
      () => dialogRef.current?.markSuccessful(), // Mark successful before dialog closes
    );
  };

  const handleCancelVerification = async () => {
    await cancelVerification();
    // Reset email form to original email after cancellation
    emailform.reset({ email: user?.emailAddresses[0]?.emailAddress });
  };

  return (
    <>
      <Form {...emailform}>
        <form
          onSubmit={emailform.handleSubmit(handleSubmit)}
          className="flex w-full flex-col justify-between sm:flex-row sm:items-center"
        >
          <FormField
            control={emailform.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 w-full rounded-lg border-neutral-300 sm:w-72"
                    type="email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <button
            className="hidden cursor-pointer text-sm font-medium underline decoration-2 underline-offset-[6px] hover:text-neutral-600 sm:block sm:text-base md:text-lg"
            type="submit"
            disabled={!emailform.formState.isDirty}
          >
            Update
          </button>
        </form>
      </Form>

      <EmailVerificationDialog
        ref={dialogRef}
        isOpen={isVerifying}
        onVerify={handleVerifyCode}
        onCancel={handleCancelVerification}
      />
    </>
  );
};

export default UpdateEmailForm;
