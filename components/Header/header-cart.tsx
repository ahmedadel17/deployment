'use client'
import React, { useState, useRef, useEffect } from "react";

type CartItem = {
  title: string;
  qty: number;
  price: number;
  image?: string;
};

type HeaderCartProps = {
  cartItems: CartItem[];
};

const HeaderCart: React.FC<HeaderCartProps> = ({ cartItems }) => {
  const total = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);
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

  return (
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
              {cartItems.length}
            </span>
          </div>
        </div>

        {/* Cart Count */}
        <div className="grid">
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            My Cart
          </span>
          <span className="text-gray-900 dark:text-gray-100 text-sm font-medium">
            {cartItems.length}
          </span>
        </div>
      </div>

      {/* Dropdown Content */}
      <div className={`cart-drop-down te-navbar-dropdown-content px-4 py-4 bg-white dark:bg-gray-800 max-w-[200px] ${isOpen ? 'te-dropdown-show' : ''}`}>
        <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Shopping Cart
        </div>

        {/* Cart Items */}
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700"
          >
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex-shrink-0">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white whitespace-normal break-words">
                <a href="#" className="hover:text-primary-400">
                  {item.title}
                </a>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Qty: {item.qty} × <span className="icon-riyal-symbol text-xs" />{" "}
                <span>{item.price.toFixed(2)}</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}

        {/* Cart Total */}
        <div className="mt-6">
          <div className="flex justify-between items-center font-medium mb-3 text-gray-900 dark:text-white">
            <span>Total:</span>
            <span>
              <span className="icon-riyal-symbol mr-1" />
              {total.toFixed(2)}
            </span>
          </div>

          <div className="grid gap-2">
            <a href="/cart" className="w-full te-btn te-btn-default text-center block">
              View Cart
            </a>
            <a
              href="/checkout"
              className="w-full te-btn te-btn-primary text-center block"
            >
              Checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCart;
