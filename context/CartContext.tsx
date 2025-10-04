"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

import { CartData } from "@/types/cart";
type CartContextType = {
  cartItems: CartData | null;
  setCartItems: React.Dispatch<React.SetStateAction<CartData | null>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartData | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          setCartItems(parsedCart);
          console.log('Cart loaded from localStorage:', parsedCart);
        } catch (error) {
          console.error('Error parsing cart from localStorage:', error);
          setCartItems(null);
        }
      } else {
        setCartItems(null);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      console.log('Cart saved to localStorage:', cartItems);
    }
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
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
