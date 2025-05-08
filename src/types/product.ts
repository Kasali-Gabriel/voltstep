export interface ProductCatalog {
  _id: string;
  products_data: ProductsData[];
}

export interface ProductsData {
  id: number;
  name: string;
  slug: string;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_category: number; // ID reference to ProductsData
  subcategories?: Subcategory[];
  products?: Product[]; // Some categories may have products directly
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  parent_category: number; // ID reference to Category
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  quantity: number;
  src: string[]; // array of image URLs
}
