'use client';

import { useIsTouchOnlyDevice } from '@/hooks/useIsTouchOnlyDevice';
import { UpdateProfileDialogProps } from '@/types/user';
import { handleUpdateProfile } from '@/utils/User/handleUpdateProfile';
import { useUser } from '@clerk/nextjs';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Camera, User } from 'lucide-react';
import { useRef, useState } from 'react';
import UpdateProfileForm from '../Forms/UpdateProfileForm';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import Loader from '../ui/loader';

const UpdateProfileDialog = ({
  isOpen,
  setIsOpen,
  firstName,
  lastName,
  profileImageUrl,
}: UpdateProfileDialogProps) => {
  const { user } = useUser();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFirstName, setCurrentFirstName] = useState(firstName || '');
  const [currentLastName, setCurrentLastName] = useState(lastName || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isTouchOnly] = useIsTouchOnlyDevice();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setImageError('File size must be less than 10MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setImageError('Please select a valid image file');
        return;
      }

      setImageError(null);
      setSelectedImage(file);
      setRemoveImage(false);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setRemoveImage(true);
    setImageError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFormSubmit = (firstName: string, lastName: string) => {
    if (!user) {
      return; // User not available
    }

    handleUpdateProfile(
      user,
      firstName,
      lastName,
      selectedImage,
      removeImage,
      setIsLoading,
      setIsOpen,
    );
  };

  const handleCancel = () => {
    // Reset image state
    setSelectedImage(null);
    setImagePreview(null);
    setRemoveImage(false);
    setImageError(null);
    setCurrentFirstName(firstName || '');
    setCurrentLastName(lastName || '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsOpen(false);
  };

  // Check if any changes have been made
  const hasChanges =
    currentFirstName.trim() !== (firstName || '').trim() ||
    currentLastName.trim() !== (lastName || '').trim() ||
    selectedImage !== null ||
    removeImage;

  const currentImageUrl =
    imagePreview || (removeImage ? null : profileImageUrl);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
        </VisuallyHidden>

        <div className="flex flex-col space-y-7">
          <h2 className="mb-4 text-xl font-semibold">Update Profile</h2>

          {/* Profile Picture Section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="size-16">
                <AvatarImage
                  src={currentImageUrl || undefined}
                  alt="Profile picture"
                />
                <AvatarFallback className="text-lg">
                  <User size={32} strokeWidth={1.25} />
                </AvatarFallback>
              </Avatar>

              {/* Camera overlay button */}
              {!isTouchOnly && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity hover:opacity-100"
                >
                  <Camera size={20} className="text-white" />
                </button>
              )}
            </div>

            <div className="flex flex-col justify-center space-y-1">
              <div className="flex space-x-2">
                {isTouchOnly && (
                  <button
                    type="button"
                    className="flex h-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-300 px-4 text-sm hover:border-neutral-400 hover:bg-neutral-100"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera size={16} className="mr-2" />
                    {currentImageUrl ? 'Change' : 'Add'}
                  </button>
                )}

                {(currentImageUrl || selectedImage) && (
                  <button
                    type="button"
                    className="flex h-8 cursor-pointer items-center justify-center rounded-lg border border-transparent px-4 text-sm text-red-500 hover:border-red-50 hover:bg-red-50 hover:text-red-700"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </button>
                )}
              </div>

              <p className="text-muted-foreground text-xs font-medium">
                Recommended size 1:1, up to 10MB.
              </p>
              {imageError && (
                <p className="text-xs text-red-500">{imageError}</p>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>

          {/* Name Form */}
          <UpdateProfileForm
            firstName={firstName}
            lastName={lastName}
            isLoading={isLoading}
            onSubmit={handleFormSubmit}
            onValuesChange={(firstName, lastName) => {
              setCurrentFirstName(firstName);
              setCurrentLastName(lastName);
            }}
          />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="cursor-pointer font-medium text-neutral-600 hover:text-neutral-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="update-profile-form"
              disabled={isLoading || !!imageError || !hasChanges}
              className="flex h-8 w-20 cursor-pointer items-center justify-center rounded-3xl bg-black text-white hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-neutral-700"
            >
              {isLoading ? (
                <Loader size={24} borderWidth="3px" color="white" />
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

export default UpdateProfileDialog;
