'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { CodeSchema } from '@/lib/schema';
import { EmailVerificationDialogProps } from '@/types/user';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import OTPInput from '../ui/otp-input';

const EmailVerificationDialog = ({
  isOpen,
  onVerify,
  onCancel,
  ref,
}: EmailVerificationDialogProps) => {
  const [verificationSuccessful, setVerificationSuccessful] = useState(false);

  const codeForm = useForm<z.infer<typeof CodeSchema>>({
    resolver: zodResolver(CodeSchema),
    defaultValues: { code: '' },
  });

  // Reset verification success flag when dialog opens
  useEffect(() => {
    if (isOpen) {
      setVerificationSuccessful(false);
    }
  }, [isOpen]);

  // Expose methods via ref
  useEffect(() => {
    if (ref) {
      ref.current = {
        setError: (message: string) => {
          codeForm.setError('code', {
            type: 'manual',
            message,
          });
        },
        clearInput: () => {
          codeForm.setValue('code', '');
        },
        markSuccessful: () => {
          setVerificationSuccessful(true);
        },
      };
    }
  }, [ref, codeForm]);

  const handleSubmit = async (data: z.infer<typeof CodeSchema>) => {
    await onVerify(data.code);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open && !verificationSuccessful) {
      // Dialog is closing and verification was not successful - call onCancel
      codeForm.reset();
      onCancel();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <VisuallyHidden>
        <DialogHeader>
          <DialogTitle>Verify Email</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </VisuallyHidden>

      <DialogContent showCloseButton={false} className="max-w-xs">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="mb-2 text-xl font-semibold">Verify email</h2>

          <Form {...codeForm}>
            <form
              onSubmit={codeForm.handleSubmit(handleSubmit)}
              className="flex w-2/3 flex-col items-center justify-center space-y-6"
            >
              <FormField
                control={codeForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className="mb-5 px-5 text-center text-sm">
                      Please enter the one-time password sent to your email.
                    </FormDescription>

                    <FormControl>
                      <OTPInput
                        value={field.value}
                        onChange={field.onChange}
                        hasError={!!codeForm.formState.errors.code}
                        maxLength={6}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerificationDialog;
