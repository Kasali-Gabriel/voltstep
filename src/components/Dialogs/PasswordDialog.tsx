'use client';

import { PasswordDialogProps } from '@/types/user';
import { useReverification, useUser } from '@clerk/nextjs';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import PasswordForm from '../Forms/PasswordForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import Loader from '../ui/loader';

const PasswordDialog = ({ isOpen, setIsOpen }: PasswordDialogProps) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<{
    newPassword?: string;
  }>({});

  // Use reverification for secure password updates
  const updatePasswordWithReverification = useReverification(
    (params: { newPassword: string; signOutOfOtherSessions?: boolean }) =>
      user?.updatePassword(params),
  );

  const handlePasswordSubmit = async (newPassword: string) => {
    if (!user) {
      toast.error('User not found. Please try again.');
      return;
    }

    // Clear previous server errors
    setServerErrors({});
    setIsLoading(true);

    try {
      // Use reverification for both adding and updating passwords
      await updatePasswordWithReverification({
        newPassword,
        signOutOfOtherSessions: true, // Sign out other sessions for security
      });

      toast.success(
        user.passwordEnabled
          ? 'Password updated successfully!'
          : 'Password added successfully!',
        {
          icon: <CheckCircle2 size={16} className="text-green-600" />,
        },
      );

      setIsOpen(false);
    } catch (error: unknown) {
      console.error('Password update error:', error);

      // Handle specific Clerk server-side errors
      if (error && typeof error === 'object' && 'errors' in error) {
        const clerkError = error as {
          errors: Array<{ message: string; meta?: { paramName?: string } }>;
        };
        if (clerkError.errors && clerkError.errors.length > 0) {
          const errorMessage = clerkError.errors[0].message;

          // Handle validation errors that should show in form
          if (
            errorMessage.includes('password_pwned') ||
            errorMessage.includes('password_too_common') ||
            errorMessage.includes('not strong enough') ||
            errorMessage.includes('password') // All password validation errors
          ) {
            setServerErrors({
              newPassword: errorMessage,
            });
          } else {
            // Only show toasts for actual server/network errors
            toast.error('Failed to update password. Please try again.', {
              icon: <AlertCircle size={16} className="text-red-600" />,
            });
          }
        }
      } else if (error && typeof error === 'object' && 'message' in error) {
        // Handle direct error messages
        const directError = error as { message: string };
        if (
          directError.message.includes('password') ||
          directError.message.includes('strong enough')
        ) {
          setServerErrors({
            newPassword: directError.message,
          });
        } else {
          toast.error('Failed to update password. Please try again.', {
            icon: <AlertCircle size={16} className="text-red-600" />,
          });
        }
      } else {
        toast.error('Failed to update password. Please try again.', {
          icon: <AlertCircle size={16} className="text-red-600" />,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (!isLoading) {
      setIsOpen(false);
    }
  };

  const handleFieldChange = (field: 'newPassword') => {
    // Clear server errors when user starts typing in a field
    setServerErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent  showCloseButton={false} className="sm:max-w-md">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>
              {user?.passwordEnabled ? 'Change Password' : 'Add Password'}
            </DialogTitle>
          </DialogHeader>
        </VisuallyHidden>

        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">
              {user?.passwordEnabled ? 'Change Password' : 'Add Password'}
            </h2>
            <p className="text-muted-foreground text-sm">
              {user?.passwordEnabled
                ? 'Create a new secure password. You may be asked to verify your identity.'
                : 'Create a secure password to protect your account.'}
            </p>
          </div>

          {/* Password Requirements */}
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
            <h4 className="mb-2 text-sm font-medium text-neutral-900">
              Password Requirements:
            </h4>
            <ul className="space-y-1 text-xs text-neutral-600">
              <li>• At least 8 characters long</li>
              <li>• Contains at least one uppercase letter</li>
              <li>• Contains at least one lowercase letter</li>
              <li>• Contains at least one number</li>
              <li>• Contains at least one special character</li>
            </ul>
          </div>

          {/* Password Form */}
          <PasswordForm
            isLoading={isLoading}
            serverErrors={serverErrors}
            onSubmit={handlePasswordSubmit}
            onFieldChange={handleFieldChange}
          />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="cursor-pointer font-medium text-black hover:text-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="password-form"
              disabled={isLoading}
              className="flex h-9 w-20 cursor-pointer items-center justify-center rounded-3xl bg-black text-white hover:bg-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-black"
            >
              {isLoading ? (
                <Loader size={20} borderWidth="2px" color="white" />
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordDialog;
