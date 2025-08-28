import { ExternalAccountResource } from '@clerk/types';
import { RefObject } from 'react';
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  clerkUserId: string | null;
}

export type CreateUserInput = {
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  clerkUserId: string;
  stripeCustomerId?: string | null;
};

export interface AuthHeaderProps {
  title: string;
  description?: string;
  isSemibold?: boolean;
}

export interface AuthContinueBtnProps {
  BtnText?: string;
  isSignUp?: boolean;
  isGlobalLoading?: boolean;
  type?: 'submit' | 'button' | 'reset';
}

export interface AuthOptionProps {
  text: string;
  btnText: string;
  href: string;
}

export interface SignedOutProp {
  title: string;
  description: string;
  isSheet?: boolean;
  isDialog?: boolean;
}

export interface UpdateProfileDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
}

export interface UpdateProfileFormProps {
  firstName: string;
  lastName: string;
  isLoading?: boolean;
  onSubmit: (firstName: string, lastName: string) => void;
  onValuesChange?: (firstName: string, lastName: string) => void;
}

export interface RemoveAccountDialogProps {
  account: ExternalAccountResource;
  onRemove: (account: ExternalAccountResource) => void;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export interface EmailVerificationDialogProps {
  isOpen: boolean;
  onVerify: (code: string) => Promise<void>;
  onCancel: () => void;
  ref?: RefObject<EmailVerificationDialogRef | null>;
}

export interface EmailVerificationDialogRef {
  setError: (message: string) => void;
  clearInput: () => void;
  markSuccessful: () => void;
}

export interface PasswordFormProps {
  isLoading: boolean;
  serverErrors?: {
    newPassword?: string;
  };
  onSubmit: (newPassword: string) => void;
  onFieldChange?: (field: 'newPassword') => void;
}

export interface PasswordDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
