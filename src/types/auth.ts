import { Review } from './review';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  clerkUserId?: string;
  reviews: Review[];
}

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
