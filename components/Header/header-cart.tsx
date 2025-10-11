'use client'
import React, { useState, useRef, useEffect } from "react";
import {useTranslations} from 'next-intl';
import DropDownCartItem from "../cart/dropDownCartItem";
import { useCart } from "@/context/Cart";
import EmptyCart from "../cart/emptyCart";
import tokenGetter from "@/lib/tokenGetter";
import { useTokenSafe } from "@/context/Token";
const HeaderCart: React.FC = () => {
  const { Cart, setCart } = useCart();
  const { isAuthenticated } = useTokenSafe();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const t = useTranslations()
  const totalPrice = Cart?.amount_to_pay


  return (
   <>
   {
    isAuthenticated &&
     <div className="te-navbar-dropdown" ref={dropdownRef}>
     {/* Cart Header */}
     <div
       className="header-cart relative flex items-center gap-3 cursor-pointer"
       data-dropdown="cart"
       onClick={toggleDropdown}
     >
       <div className="cart-icon">
         <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 flex justify-center items-center rounded-full relative">
           {/* Cart SVG */}
           <svg
             className="w-5 h-5 text-gray-600 dark:text-white"
             xmlns="http://www.w3.org/2000/svg"
             width="18"
             height="18"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
           >
             <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
             <path d="M8 11V6a4 4 0 0 1 8 0v5" />
           </svg>

           {/* Badge */}
           <span className="header-cart-item absolute -top-1 -right-1 bg-primary-200 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
             {Cart?.products ? Cart?.products?.length : 0}
           </span>
         </div>
       </div>

       {/* Cart Count */}
       <div className="grid">
         <span className="text-gray-600 dark:text-gray-400 text-sm">
           {t("My Cart")}
         </span>
         <span className="text-gray-900 dark:text-gray-100 text-sm font-medium">
           {Cart?.amount_to_pay ? Cart?.amount_to_pay : 0}
         </span>
       </div>
     </div>

     {/* Dropdown Content */}
   { 
    <div className={`cart-drop-down te-navbar-dropdown-content px-4 py-4 bg-white dark:bg-gray-800 max-w-[200px] ${isOpen ? 'te-dropdown-show' : ''}`}>
       <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">
         {t("Shopping Cart")}
       </div>

       {/* Cart Items */}
        <DropDownCartItem  items={Cart?.products || []} />

       {/* Cart Total */}
       {
         Cart?.products?.length == 0 || !Cart?.products ? (
           <EmptyCart />
         ) : (
       <div className="mt-6">
         <div className="flex justify-between items-center font-medium mb-3 text-gray-900 dark:text-white">
           <span>Total:</span>
           <span>
             <span className="icon-riyal-symbol mr-1" />
             {totalPrice}
           </span>
         </div>

         <div className="grid gap-2">
           <a href="/cart" className="w-full te-btn te-btn-default text-center block">
             {t("View Cart")}
           </a>
           <a
             href="/checkout"
             className="w-full te-btn te-btn-primary text-center block"
           >
             {t("Checkout")}
           </a>
         </div>
       </div>
       )
     }
     </div>}
   </div>
   }
   </>
  );
};

export default HeaderCart;
