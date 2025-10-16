import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProductActionsProps {
  isAddedToCart: boolean;
  isLoadingVariations: boolean;
  hasVariations: boolean;
  areAllVariationsSelected: () => boolean;
  onAddToCart: () => void;
}

function ProductActions({ 
  isAddedToCart, 
  isLoadingVariations, 
  hasVariations, 
  areAllVariationsSelected, 
  onAddToCart 
}: ProductActionsProps) {
  const t = useTranslations();

  return (
    <button
      onClick={onAddToCart}
      disabled={isAddedToCart || isLoadingVariations || (hasVariations && !areAllVariationsSelected())}
      className={`product-add-to-cart flex-1 te-btn te-btn-primary flex items-center justify-center gap-2 px-0 py-2 sm:py-3 ${
        isAddedToCart
          ? 'bg-green-500 text-white'
          : isLoadingVariations
          ? 'bg-gray-400 text-white cursor-not-allowed'
          : (hasVariations && !areAllVariationsSelected())
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-primary-500 text-white hover:bg-primary-600'
      }`}
    >
      {isLoadingVariations ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className='hidden sm:block'>Loading...</span>
        </>
      ) : isAddedToCart ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className='hidden sm:block'>Added!</span>
        </>
      ) : (hasVariations && !areAllVariationsSelected()) ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span className='hidden sm:block'>Select Options</span>
        </>
      ) : (
        <>
          <svg className="icon-cart w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
            <path d="M8 11V6a4 4 0 0 1 8 0v5" />
          </svg>
          <span className='hidden sm:block'>
            {t("Add to Cart")}
          </span>
        </>
      )}
    </button>
  );
}

export default ProductActions;
