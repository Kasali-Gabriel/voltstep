import { Tag as PrismaTag } from '@prisma/client';
import { Review } from './review';
import { SearchedProduct } from './search';

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
  catalog?: Catalog;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  parentCategory?: string;
  categoryId: string;
  category?: Category;
  products?: Product[];
}

export interface ProductSizeVariant {
  id: string;
  size: string;
  quantity: number;
}

export interface ProductColor {
  id: string;
  color: string;
  variants: ProductSizeVariant[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  colors: ProductColor[];
  createdAt: Date;
  updatedAt: Date;
  tags: PrismaTag[];
  reviews: Review[];
  subcategoryId: string;
  subcategory?: Subcategory;
  popularityScore: number;
  lastScoreUpdate: Date | null;
}

export const Tag = PrismaTag;
export type Tag = PrismaTag;

export interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | undefined;
  selectedColor: string;
  productColors: ProductColor[];
  setSelectedSize: (size: string) => void;
  sizeError?: boolean;
  setSizeError?: (error: boolean) => void;
  isTitle?: boolean;
  subcategoryName: string;
}

export interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

export interface ProductCardProps {
  query?: string;
  SearchedProduct?: SearchedProduct;
  setQuery?: (q: string) => void;
  slug?: string[];
  loading?: boolean;
  notSubcategory?: boolean;
  recordViewedSearchProduct?: (product: SearchedProduct) => void;
}

export interface ProductsListProps {
  query?: string;
  slug?: string[];
  filters?: Record<string, string>;
  initialProducts?: Product[] | SearchedProduct[];
  initialTotalCount?: number;
  initialHasMore?: boolean;
}

export interface ProductFilterProps {
  atProductListEnd?: boolean;
  filterBottomOffset?: number;
  isSearchResults?: boolean;
  slug?: string[];
  unfilteredResults?: SearchedProduct[];
}

export interface ProductListHeaderProps {
  query?: string;
  slug?: string[];
  isMobile: boolean;
  loading?: boolean;
  totalCount?: number;
}

export interface SortProductsProps {
  isMobile?: boolean;
  isSearchResults?: boolean;
  loading?: boolean;
}

export interface FilterProductsProps {
  products?: SearchedProduct[];
  slug?: string[];
  loading?: boolean;
}

export interface CatalogPagination {
  isSearch?: boolean;
  slug?: string[];
  sort?: string;
  filters?: ProductFilters;
  initialProducts?: Product[];
  initialTotalCount?: number;
  initialHasMore?: boolean;
  skipInitialFetch?: boolean;
}

export interface ViewedProductItem {
  id: string;
  viewedAt: string;
  product: SearchedProduct;
  fromSearch: boolean;
  query: string;
}

export interface ProductFilters {
  priceRange?: [number, number];
  priceRanges?: Array<[number, number]>;
  sizes?: string[];
  colors?: string[];
  tags?: Tag[];
  rating?: number;
  inStock?: boolean;
  subcategory?: string;
  category?: string;
  catalog?: string;
}
