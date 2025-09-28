'use client';

import React, { useState } from 'react';
import ProductGallery from './ProductGallery';
import ProductVariations from './ProductVariations';
import { Product, ProductVariation } from '@/types/product';

interface ProductPageClientProps {
  product: Product;
  variations: ProductVariation[];
}

interface SelectedVariations {
  [attributeId: string]: string;
}

export default function ProductPageClient({ product, variations }: ProductPageClientProps) {
  const [selectedVariations, setSelectedVariations] = useState<SelectedVariations>({});

  const handleVariationChange = (variations: SelectedVariations) => {
    setSelectedVariations(variations);
    console.log('Variations changed in ProductPageClient:', variations);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Left Side - Image Gallery */}
      <div>
        <div className="sticky top-8 space-y-6">
          <ProductGallery 
            product={product} 
            selectedVariations={selectedVariations}
          />
        </div>
      </div>

      {/* Right Side - Product Details */}
      <div>
        <div className="space-y-6">
          {/* Product Variations */}
          {variations && variations.length > 0 && (
            <ProductVariations 
              variations={variations} 
              product={product}
              onVariationChange={handleVariationChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
