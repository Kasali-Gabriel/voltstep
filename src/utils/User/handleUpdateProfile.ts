import { UserResource } from '@clerk/types';
import { toast } from 'sonner';

export const handleUpdateProfile = async (
  user: UserResource,
  firstName: string,
  lastName: string,
  imageFile?: File | null,
  removeImage?: boolean,
  setIsLoading?: (loading: boolean) => void,
  setIsOpen?: (open: boolean) => void,
) => {
  if (!user) return;

  try {
    setIsLoading?.(true);

    // Store original values before updating
    const originalFirstName = user.firstName;
    const originalLastName = user.lastName;

    // Update name
    await user.update({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });

    // Handle profile image
    if (removeImage) {
      await user.setProfileImage({ file: null });
    } else if (imageFile) {
      await user.setProfileImage({ file: imageFile });
    }

    // Check what changed using original values
    const nameChanged =
      firstName.trim() !== originalFirstName ||
      lastName.trim() !== originalLastName;
    const imageChanged = removeImage || imageFile;

    // Show appropriate success message based on what changed
    const changesCount = (nameChanged ? 1 : 0) + (imageChanged ? 1 : 0);

    if (changesCount > 1) {
      // Multiple changes - generic message
      toast.success('Profile updated successfully');
    } else if (nameChanged) {
      // Only name changed
      toast.success('Name updated successfully');
    } else if (removeImage) {
      // Only profile picture removed
      toast.success('Profile picture removed successfully');
    } else if (imageFile) {
      // Only profile picture updated
      toast.success('Profile picture updated successfully');
    }

    setIsOpen?.(false);
  } catch (error) {
    console.error('Error updating profile:', error);
    toast.error('Failed to update profile. Please try again.');
  } finally {
    setIsLoading?.(false);
  }
};
