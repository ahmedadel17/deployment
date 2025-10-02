'use client'
import React from 'react';

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
  showStockInfo?: boolean;
  stock?: string;
  stockLabel?: string;
}

export default function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 10,
  disabled = false,
  className = "",
  showStockInfo = false,
  stock,
  stockLabel
}: QuantityInputProps) {
  const handleDecrease = () => {
    if (!disabled && value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (!disabled && value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min;
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className={`flex items-center space-x-3 rtl:space-x-reverse ${className}`}>
      <div className="flex items-center rtl:flex-row-reverse border border-gray-300 dark:border-gray-600 rounded-md">
        {/* Decrease Button */}
        <button 
          type="button" 
          className={`px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 ${
            disabled || value <= min ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleDecrease}
          disabled={disabled || value <= min}
          aria-label="Decrease quantity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
          </svg>
        </button>

        {/* Quantity Input */}
        <input 
          type="number" 
          min={min} 
          max={max}
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          className="w-16 !rounded-none border-0 focus:outline-none text-center bg-transparent"
        />

        {/* Increase Button */}
        <button 
          type="button" 
          className={`px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 ${
            disabled || value >= max ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleIncrease}
          disabled={disabled || value >= max}
          aria-label="Increase quantity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </button>
      </div>
      
      {showStockInfo && stock && (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {stockLabel || "Only"} {stock} {stockLabel ? "" : "left in stock"}
        </span>
      )}
    </div>
  );
}
