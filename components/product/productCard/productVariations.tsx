import React from 'react';
import { Product } from '@/types/product';

interface ProductVariationsProps {
  product: Product;
  selectedColor: any;
  selectedSize: any;
  setSelectedColor: (color: any) => void;
  setSelectedSize: (size: any) => void;
  getProductByVariations: (showSuccessMessage?: boolean, newColor?: any, newSize?: any) => Promise<any>;
}

function ProductVariations({ 
  product, 
  selectedColor, 
  selectedSize, 
  setSelectedColor, 
  setSelectedSize, 
  getProductByVariations 
}: ProductVariationsProps) {
  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'red': 'bg-red-500',
      'blue': 'bg-blue-500',
      'green': 'bg-green-500',
      'yellow': 'bg-yellow-500',
      'purple': 'bg-purple-500',
      'pink': 'bg-pink-500',
      'orange': 'bg-orange-500',
      'black': 'bg-black',
      'white': 'bg-white border border-gray-300',
      'gray': 'bg-gray-500',
    };
    return colorMap[color.toLowerCase()] || 'bg-gray-500';
  };

  return (
    <>
      {/* Color Options */}
      {product?.variations && product.variations.length > 1 && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-500">Colors:</span>
          <div className="flex gap-1">
            {product?.variations[1]?.values?.map((colorOption) => (
              <button
                key={colorOption.id}
                style={{ backgroundColor: colorOption.color || '' }}
                onClick={async () => {
                  setSelectedColor(colorOption);
                  
                  // Build variations object with new color and existing size
                  const newVariations = {
                    ...(colorOption && typeof colorOption === 'object' && 'id' in colorOption && {
                      [product.variations?.[1]?.attribute_id || 'color']: colorOption.id
                    }),
                    ...(selectedSize && typeof selectedSize === 'object' && 'id' in selectedSize && {
                      [product.variations?.[0]?.attribute_id || 'size']: selectedSize.id
                    })
                  };
                  
                  // Check if all variations are now selected
                  const hasAllVariations = Object.keys(newVariations).length === 
                    (product.variations?.filter((v: any) => v.values && v.values.length > 0).length || 0); // eslint-disable-line @typescript-eslint/no-explicit-any
                  
                  if (hasAllVariations) {
                    try {
                      await getProductByVariations(false, colorOption, selectedSize);
                    } catch (error) {
                      console.error('Error fetching variations on color change:', error);
                    }
                  } else {
                    console.log('Not all variations selected yet, skipping API call');
                  }
                }}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                  selectedColor && typeof selectedColor === 'object' && 'id' in selectedColor && selectedColor.id === colorOption.id
                    ? 'border-gray-800 dark:border-white ring-2 ring-primary-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                 title={colorOption.value || colorOption.color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Options */}
      {product?.variations && product.variations.length > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-500">Sizes:</span>
          <div className="flex gap-1 flex-wrap">
            {product?.variations[0]?.values?.map((size) => (
              <button
                key={size.id}
                onClick={async () => {
                  setSelectedSize(size);
                  
                  // Build variations object with existing color and new size
                  const newVariations = {
                    ...(selectedColor && typeof selectedColor === 'object' && 'id' in selectedColor && {
                      [product.variations?.[1]?.attribute_id || 'color']: selectedColor.id
                    }),
                    ...(size && typeof size === 'object' && 'id' in size && {
                      [product.variations?.[0]?.attribute_id || 'size']: size.id
                    })
                  };
                  
                  // Check if all variations are now selected
                  const hasAllVariations = Object.keys(newVariations).length === 
                    (product.variations?.filter((v: any) => v.values && v.values.length > 0).length || 0); // eslint-disable-line @typescript-eslint/no-explicit-any
                  
                  if (hasAllVariations) {
                    try {
                      await getProductByVariations(false, selectedColor, size);
                    } catch (error) {
                      console.error('Error fetching variations on size change:', error);
                    }
                  } else {
                    console.log('Not all variations selected yet, skipping API call');
                  }
                }}
                className={`px-2 py-1 text-xs rounded border transition-all duration-200 hover:scale-105 ${
                  selectedSize && typeof selectedSize === 'object' && 'id' in selectedSize && selectedSize.id === size.id
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                 {size.value}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductVariations;
