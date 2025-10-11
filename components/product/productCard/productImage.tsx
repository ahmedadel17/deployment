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

  return (
    <div className="relative aspect-square overflow-hidden bg-white dark:bg-gray-800">
      {/* Variation Indicator */}
      {productWithVariations && (
        <div className="absolute top-2 right-2 z-20 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(productWithVariations as any)?.out_of_stock ? 'Out of Stock' : 'In Stock'}
        </div>
      )}
      
      <div className="product-thumbnail relative block overflow-hidden rounded-lg lg:rounded-t-lg lg:rounded-b-none group">
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
        <div className="product-hover-btns absolute inset-0 pointer-events-auto flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 z-20 gap-1">
          {/* Quick View Button */}
          <Link
            href={`/products/${product.id}`}
            className="quick-view-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-colors duration-200 flex items-center justify-center"
            title="Quick View"
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </Link>
        </div>

        {/* Thumbnail Main Image */}
        <Image
          src={currentProduct?.thumbnail || currentProduct?.image || '/assets/images/placeholder.jpg'}
          alt={currentProduct?.name || ''}
          width={300}
          height={320}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out transform min-h-[320px]"
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
      </div>
    </div>
  )
}

export default ProductImage
