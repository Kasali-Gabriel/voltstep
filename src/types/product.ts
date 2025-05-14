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

export interface Catalog {
  id: string;
  name: string;
  slug: string;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentCategory?: string;
  subcategories: Subcategory[];
  catalogId: string;
  catalog: Catalog;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  parentCategory?: string;
  categoryId: string;
  category: Category;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  sizes: string[];
  colors: string[];
  tags: Tag[];
  reviews: Review[];
  subcategoryId: string;
  subcategory: Subcategory;
}

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

export enum Tag {
  NEW_ARRIVAL = 'NEW_ARRIVAL',
  BESTSELLER = 'BESTSELLER',
  FLASH_SALE = 'FLASH_SALE',
  BACK_IN_STOCK = 'BACK_IN_STOCK',
}
