import { Product } from "./product";

export interface CartItem extends Omit<Product, 'price_after_discount' | 'thumbnail'> {
  price_after_discount: number;
  thumbnail: string;
  quantity: number;
  qty: number; // alias for components expecting `qty`
  color?: string;
  size?: string;
}


