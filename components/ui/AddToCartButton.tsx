'use client'
import React from 'react';
import Button from './Button';

interface AddToCartButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  onAddToCart?: () => void;
  isAllVariationsSelected?: boolean;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  isLoading = false,
  disabled = false,
  onAddToCart,
  isAllVariationsSelected = true,
  className = ''
}) => {
  const isDisabled = disabled || !isAllVariationsSelected || isLoading;
  
  const getButtonText = () => {
    if (isLoading) return 'Loading...';
    if (!isAllVariationsSelected) return 'Select all options';
    return 'Add to Cart';
  };


  return (
    <Button
      type="submit"
      id="addToCart"
      className={`w-full py-1 product-add-to-cart flex-1 te-btn te-btn-primary ${className}`}
      disabled={isDisabled}
      isLoading={isLoading}
      loadingText="Loading..."
      onClick={onAddToCart}
    >
      <div className="flex items-center justify-center gap-2">
        {!isLoading && (
          <svg 
            className="icon-cart w-5 h-5 flex-shrink-0" 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.6" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
            <path d="M8 11V6a4 4 0 0 1 8 0v5" />
          </svg>
        )}
        <span className="flex-shrink-0">
          {getButtonText()}
        </span>
      </div>
    </Button>
  );
};

export default AddToCartButton;
