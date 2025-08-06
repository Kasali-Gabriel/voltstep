import { useReverification } from '@clerk/nextjs';
import { EmailAddressResource, UserResource } from '@clerk/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const useEmailUpdate = (user: UserResource) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [emailObj, setEmailObj] = useState<EmailAddressResource | undefined>();
  const [isVerificationSuccessful, setIsVerificationSuccessful] =
    useState(false);
  const createEmailAddress = useReverification((email: string) =>
    user?.createEmailAddress({ email }),
  );
  const router = useRouter();

  const startEmailUpdate = async (newEmail: string) => {
    if (!user) return;

    const oldEmail = user.emailAddresses[0]?.emailAddress;

    if (newEmail === oldEmail) {
      return;
    }

    // Clean up any existing verification state first
    if (emailObj) {
      await emailObj.destroy();
      await user.reload();
    }

    // Reset verification success flag when starting new verification
    setIsVerificationSuccessful(false);

    try {
      const res = await createEmailAddress(newEmail);

      setEmailObj(res);

      // Send the user an email with the verification code
      await res?.prepareVerification({ strategy: 'email_code' });

      // display verification form
      setIsVerifying(true);
    } catch (error) {
      console.error(
        '❌ Error creating email address or sending verification:',
        error,
      );

      // If email creation failed (e.g., user cancelled password dialog),
      // check if an unverified email was still created and clean it up
      await user.reload();

      // Find any unverified email addresses that match the new email
      const unverifiedEmail = user.emailAddresses.find(
        (email) =>
          email.emailAddress === newEmail &&
          email.verification?.status !== 'verified',
      );

      if (unverifiedEmail) {
        try {
          await unverifiedEmail.destroy();
          await user.reload();
        } catch (cleanupError) {
          console.error('❌ Failed to cleanup unverified email:', cleanupError);
        }
      }

      // Show user-friendly error message
      toast.error('Email update was cancelled or failed. Please try again.', {
        duration: 10000,
      });
    }
  };

  const verifyEmailCode = async (
    code: string,
    onError: (message: string) => void,
    onClearInput: () => void,
    onSuccess?: () => void,
  ) => {
    if (!emailObj) {
      onError('Verification failed - no email object');
      return;
    }

    try {
      // Verify that the code entered matches the code sent to the user
      const emailVerifyAttempt = await emailObj.attemptVerification({
        code: code,
      });

      if (emailVerifyAttempt?.verification.status === 'verified') {
        onSuccess?.(); // Call success callback before handling verification
        await handleSuccessfulVerification();
      } else {
        onError('Invalid verification code');
        onClearInput();
      }
    } catch (err: unknown) {
      console.error('Error during verification:', err);

      // Check if this is a verification error (incorrect code) vs network error
      const isClerkError = (
        error: unknown,
      ): error is {
        errors?: Array<{ code: string }>;
        clerkError?: boolean;
      } => {
        return typeof error === 'object' && error !== null;
      };

      if (
        isClerkError(err) &&
        (err?.errors?.[0]?.code === 'form_code_incorrect' ||
          err?.errors?.[0]?.code === 'verification_failed' ||
          err?.clerkError === true)
      ) {
        // This is an incorrect verification code, not a network error
        onError('Invalid verification code');
        onClearInput();
      } else {
        // This is a real network/API error, handle cleanup
        await handleVerificationError();
      }
    }
  };

  const handleSuccessfulVerification = async () => {
    // Mark verification as successful to prevent cleanup
    setIsVerificationSuccessful(true);

    try {
      // Set the new email as primary FIRST, before any reloading
      await user.update({
        primaryEmailAddressId: emailObj?.id,
      });

      // Now reload user to get the updated data
      await user.reload();

      // Find the old email address (the one that's NOT the newly verified one)
      const oldEmailAddress = user.emailAddresses.find(
        (email) => email.id !== emailObj?.id,
      );

      let emailDeleted = false;

      if (oldEmailAddress) {
        try {
          // Try to delete the old email address
          await oldEmailAddress.destroy();
          emailDeleted = true;
        } catch (deleteError: unknown) {
          console.error('❌ Error deleting old email:', deleteError);
          emailDeleted = false;
        }
      }

      // Final reload and refresh
      await user.reload();
      router.refresh();

      // C Close the dialog by setting isVerifying to false
      setIsVerifying(false);

      // Show appropriate success message
      if (emailDeleted) {
        toast.success('Email updated successfully!', { duration: 10000 });
      } else {
        toast.success(
          'New email verified and set as primary! Previous email kept due to linked accounts.',
          { duration: 10000 },
        );
      }
    } catch (error) {
      console.error('❌ Error in handleSuccessfulVerification:', error);
      setIsVerifying(false);
      toast.error(
        'Verification succeeded but there was an error updating your account. Please refresh the page.',
        { duration: 10000 },
      );
    }
  };

  const handleVerificationError = async () => {
    try {
      if (emailObj) {
        await emailObj.destroy();

        // Force reload and refresh to ensure UI updates
        await user.reload();
        router.refresh();

        toast.error('Network error occurred. Please try again.', {
          duration: 10000,
        });
      }
    } catch {
      // Ignore cleanup errors on unmount
    } finally {
      // Clean up verification state
      setIsVerifying(false);
      setEmailObj(undefined);
      setIsVerificationSuccessful(false);
    }
  };

  const cancelVerification = async () => {
    // Only delete the email if verification wasn't successful
    if (!isVerificationSuccessful) {
      try {
        if (emailObj) {
          // Delete the newly created email address since verification was cancelled
          await emailObj.destroy();

          // Force reload and refresh to ensure UI updates
          await user.reload();
          router.refresh();

          toast.error('Email verification cancelled.', { duration: 10000 });
        }
      } catch {}
    }

    setIsVerifying(false);
    setEmailObj(undefined);
  };

  return {
    isVerifying,
    startEmailUpdate,
    verifyEmailCode,
    cancelVerification,
  };
};
