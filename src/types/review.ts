import { User } from './auth';
import { Product } from './product';

export interface Review {
  id: string;
  reviewerId: string;
  reviewer: User;
  rating: number;
  title: string;
  details: string;
  date: Date;
  productId: string;
  product: Product;
  verified?: boolean;
}

export type AddReviewParams = {
  reviewerId: string;
  productId: string;
  rating: number;
  title: string;
  details: string;
  verified?: boolean;
};

export type UpdateReviewParams = {
  reviewId: string;
  rating?: number;
  title?: string;
  details?: string;
  verified?: boolean;
};

export interface AddReviewBtnProps {
  productId: string;
  reviews?: Review[];
}

export interface ReviewFiltersProps {
  rating: string;
  setRating: (r: string) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (v: boolean) => void;
  sortOrder: string;
  setSortOrder: (s: string) => void;
}

export interface ReviewFormProps {
  reviewerId: string;
  productId: string;
  defaultTitle?: string;
  defaultDetails?: string;
  defaultRating?: number;
  reviewId?: string;
  onSuccess?: () => void;
}

export interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  size?: number;
  disabled?: boolean;
  starClassName?: string;
}
