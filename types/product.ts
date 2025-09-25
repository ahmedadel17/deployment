export interface Product {
  id: number;
  image: string;
  hover?: string;
  title: string;
  name?: string; // API field
  price: string | number;
  price_after_discount?: string | number; // API field
  min_price?: string | number; // API field
  old_price?: string | null;
  thumbnail?: string; // API field
  short_description?: string; // API field
  is_is_favourite?: boolean; // API field: wishlist flag
  colors: string[];
  sizes: string[];
  category: string;
  badges?: ProductBadge[];
  description?: string;
  rating?: number;
  reviews?: number;
  stock?: string;
  merchant?: string;
  features?: string[];
  specifications?: Record<string, string>;
  images?: string[];
  variants?: ProductVariant[];
}

export interface ProductBadge {
  type: 'new' | 'sale' | 'bestseller' | 'limited' | 'hot';
  text: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
  selected?: string;
}

export interface ProductFilter {
  type: 'price' | 'category' | 'color' | 'size' | 'brand';
  name: string;
  options: FilterOption[];
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  checked?: boolean;
}

export interface ProductSortOption {
  value: string;
  label: string;
}

export interface ProductPagination {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  perPage: number;
}

export interface ProductGalleryImage {
  src: string;
  alt: string;
  thumbnail?: string;
}

export interface ProductReview {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

export interface ProductTab {
  id: string;
  label: string;
  content: string;
  active?: boolean;
}


