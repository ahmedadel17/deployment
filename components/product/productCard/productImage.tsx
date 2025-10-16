import React from 'react'
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

interface ProductImageProps {
  product: Product | null;
  productWithVariations?: Product | null;
}

function ProductImage({ product, productWithVariations }: ProductImageProps) {
  if (!product) {
    return null;
  }

  const getBadgeClasses = (type: string) => {
    const badgeClasses = {
      'new': 'bg-green-500/20 text-green-500',
      'sale': 'bg-red-500/20 text-red-500',
      'bestseller': 'bg-blue-500/20 text-blue-500',
      'limited': 'bg-purple-500/20 text-purple-500',
      'hot': 'bg-orange-500/20 text-orange-500',
    };
    return badgeClasses[type as keyof typeof badgeClasses] || 'bg-gray-500 text-white';
  };

  // Use productWithVariations if available, otherwise use the base product
  const currentProduct = productWithVariations || product;

  // Check if product has an image
  const hasImage = currentProduct?.image || currentProduct?.thumbnail;

  if (!hasImage) {
    return (
      <div className="product-thumbnail-placeholder bg-gray-200 dark:bg-gray-700 aspect-[4/5] sm:aspect-square object-cover rounded-lg lg:rounded-t-lg lg:rounded-b-none flex items-center justify-center text-gray-400 dark:text-gray-400 text-xs text-center">
        <div className="text-center">
          <svg className="w-8 h-8 m-auto" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M16 5h6"></path>
            <path d="M19 2v6"></path>
            <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"></path>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
            <circle cx="9" cy="9" r="2"></circle>
          </svg>
          <div className="mt-2">Image Not Set</div>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/products/${product.slug}`} className="product-thumbnail relative block overflow-hidden rounded-lg lg:rounded-t-lg lg:rounded-b-none group aspect-[4/5] sm:aspect-square">
        {/* Product Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="product-badges absolute top-2 start-2 z-10 flex flex-col gap-1">
            {product.badges.map((badge, index) => (
              <span
                key={index}
                className={`product-badge px-2 py-1 text-xs font-semibold rounded-full ${getBadgeClasses(badge.type)}`}
              >
                {badge.text}
              </span>
            ))}
          </div>
        )}

        {/* Hover Buttons - Center of Image */}
        <div className="product-hover-btns absolute inset-0 pointer-events-auto flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 z-20 flex gap-1">
          {/* Compare Button */}
          <button
            className="compare-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-all duration-200 flex items-center justify-center"
            title="Add to Compare"
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <path d="M13 6h3a2 2 0 0 1 2 2v7" />
              <path d="M11 18H8a2 2 0 0 1-2-2V9" />
            </svg>
          </button>
          {/* Quick View Button */}
          <button
            onClick={() => window.location.href = `/products/${product.slug}`}
            className="quick-view-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-colors duration-200 flex items-center justify-center"
            title="Quick View"
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </button>
        </div>

        {/* Thumbnail Main Image */}
        <Image
          src={currentProduct?.thumbnail || currentProduct?.image || '/assets/images/placeholder.jpg'}
          alt={currentProduct?.name || ''}
          width={300}
          height={320}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out transform"
          priority
        />

        {/* Thumbnail Flip Image */}
        {currentProduct?.thumbnail && (
          <Image
            src={currentProduct?.thumbnail || '/assets/images/placeholder.jpg'}
            alt={`${currentProduct?.name} hover image`}
            width={300}
            height={320}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100"
          />
        )}
    </Link>
  )
}

export default ProductImage
