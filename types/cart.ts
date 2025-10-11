import { Product } from "./product";

export interface CartItem extends Omit<Product, 'price_after_discount' | 'thumbnail'> {
  price_after_discount: number;
  thumbnail: string;
  quantity: number;
  qty: number; // alias for components expecting `qty`
  color?: string;
  size?: string;
  attributes?: { [key: string]: string };
}

export interface CartData {
  id: string;
  products: CartItem[];
  order_attributes?: Array<{
    label: string;
    value: string | number;
    color?: string;
    show_currency?: boolean;
  }>;
  amount_to_pay?: string | number;
  user_balance?: string;
  use_wallet?: boolean;
  voucher?: {
    code: string;
    message: string;
  };
  allowed_payment_methods?: string[];
}


