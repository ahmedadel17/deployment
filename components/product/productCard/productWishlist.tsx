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
      className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
        isWishlisted
          ? 'border-red-500 bg-red-50 text-red-600 dark:bg-red-900/20'
          : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-red-400'
      }`}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
    </button>
  );
}

export default ProductWishlist;
