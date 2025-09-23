"use client";
import React, { createContext, useContext, useState } from "react";

type CartContextType = {
  cartItems: any[];
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<any[]>(JSON.parse(localStorage.getItem('cart')||'[]'));

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
