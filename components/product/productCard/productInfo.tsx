import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductInfoProps {
  product: Product;
  getCurrentProduct: () => Product;
}

function ProductInfo({ product, getCurrentProduct }: ProductInfoProps) {
  return (
    <div className="flex-1">
      <Link href={`/products/${getCurrentProduct().id}`}>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary-500 transition-colors">
          {getCurrentProduct()?.name}
        </h3>
      </Link>
      <Link href={`/products/${getCurrentProduct().id}`}>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary-500 transition-colors">
          {getCurrentProduct()?.short_description}
        </h4>
      </Link>

      {/* Price */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          ${getCurrentProduct()?.price_after_discount || getCurrentProduct()?.price}
        </span>
        {getCurrentProduct()?.price_befor_discount && (
          <span className="text-sm text-gray-500 line-through">
            ${getCurrentProduct()?.price_befor_discount || getCurrentProduct()?.min_price}
          </span>
        )}
      </div>
    </div>
  );
}

export default ProductInfo;
