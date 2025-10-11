"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

import { CartData } from "@/types/cart";
type CartContextType = {
  Cart: CartData | null;
  setCart: React.Dispatch<React.SetStateAction<CartData | null>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [Cart, setCart] = useState<CartData | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          setCart(parsedCart);
          console.log('Cart loaded from localStorage:', parsedCart);
        } catch (error) {
          console.error('Error parsing cart from localStorage:', error);
          setCart(null);
        }
      } else {
        setCart(null);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(Cart));
      console.log('Cart saved to localStorage:', Cart);
    }
  }, [Cart]);

  return (
    <CartContext.Provider value={{ Cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
