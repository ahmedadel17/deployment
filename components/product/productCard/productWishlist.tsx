import React from 'react';
import { Heart } from 'lucide-react';

interface ProductWishlistProps {
  isWishlisted: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

function ProductWishlist({ isWishlisted, onToggle }: ProductWishlistProps) {
  return (
    <button
      onClick={onToggle}
      className={`product-add-to-wishlist flex items-center justify-center p-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out w-12 h-12 ${
        isWishlisted
          ? 'border-red-500 bg-red-50 text-red-600 dark:bg-red-900/20'
          : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-red-400'
      }`}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
      </svg>
    </button>
  );
}

export default ProductWishlist;
