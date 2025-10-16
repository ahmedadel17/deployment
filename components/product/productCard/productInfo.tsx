import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductInfoProps {
  product: Product;
  getCurrentProduct: () => Product;
}

function ProductInfo({ product, getCurrentProduct }: ProductInfoProps) {
  return (
    <div className="product-body space-y-2 mb-2 sm:mb-3">
      {/* Category */}
      {getCurrentProduct()?.category && (
        <p className="product-category text-xs font-semibold uppercase text-gray-500 dark:text-white">
          {getCurrentProduct().category as unknown as string}
        </p>
      )}

      <h3 className="product-title font-semibold text-sm sm:text-base dark:text-white">
        <Link href={`/products/${getCurrentProduct().slug}`} className="line-clamp-2 dark:text-white">
          {getCurrentProduct()?.name}
        </Link>
      </h3>

      {/* Short Description */}
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
        {getCurrentProduct()?.short_description || 'A premium quality product crafted with attention to detail for everyday comfort and style.'}
      </p>

      {/* Extra Dummy Description */}
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
        {'Experience unmatched comfort, versatile design, and durable materials perfect for daily wear.'}
      </p>

      {/* Price */}
      <div className="product-price flex items-center gap-1 flex-wrap">
        {getCurrentProduct()?.price_befor_discount && (
          <p className="text-gray-500 dark:text-gray-300 line-through text-sm flex items-center gap-1">
            <span className="icon-riyal-symbol"></span>
            {getCurrentProduct()?.price_befor_discount || getCurrentProduct()?.min_price}
          </p>
        )}
        <p className="text-sm sm:text-base font-semibold text-secondary-600 dark:text-yellow-400 flex items-center gap-1">
          <span className="icon-riyal-symbol dark:text-yellow-400"></span>
          {getCurrentProduct()?.price_after_discount || getCurrentProduct()?.price}
        </p>
      </div>
    </div>
  );
}

export default ProductInfo;
