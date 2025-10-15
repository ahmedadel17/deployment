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

  return (
    <div className="product-options space-y-2 sm:space-y-3 !mt-2 sm:!mt-3">
      {/* Colors */}
      {product?.variations && product.variations.length > 1 && (
        <div className="product-colors">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {product?.variations[1]?.values?.map((colorOption) => {
              const isActive = selectedColor && typeof selectedColor === 'object' && 'id' in selectedColor && selectedColor.id === colorOption.id;
              return (
                <button
                  key={colorOption.id}
                  className={`color-option ${isActive ? 'active' : ''}`}
                  style={{ backgroundColor: colorOption.color || '' }}
                  data-color={colorOption.color}
                  title={colorOption.value || colorOption.color}
                  aria-label={`Select color ${colorOption.value || colorOption.color}`}
                  onClick={async () => {
                    // Toggle selection
                    if (isActive) {
                      setSelectedColor(null);
                      try {
                        await getProductByVariations(false, null, selectedSize);
                      } catch (error) {
                        console.error('Error updating variations on color unselect:', error);
                      }
                      return;
                    }

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
                >
                  <span className="sr-only">{colorOption.value || colorOption.color}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sizes */}
      {product?.variations && product.variations.length > 0 && (
        <div className="product-sizes mb-1">
          <div className="flex flex-wrap gap-1 sm:gap-2 items-end">
            {product?.variations[0]?.values?.map((size) => {
              const isActive = selectedSize && typeof selectedSize === 'object' && 'id' in selectedSize && selectedSize.id === size.id;
              return (
                <button
                  key={size.id}
                  className={`size-option ${isActive ? 'active' : ''}`}
                  data-size={size.value}
                  aria-label={`Select size ${size.value}`}
                  onClick={async () => {
                    // Toggle selection
                    if (isActive) {
                      // Unselect size
                      setSelectedSize(null);
                      try {
                        await getProductByVariations(false, selectedColor, null);
                      } catch (error) {
                        console.error('Error updating variations on size unselect:', error);
                      }
                      return;
                    }

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
                      // Partial selection; update variation state without full fetch if needed
                      console.log('Not all variations selected yet, skipping API call');
                    }
                  }}
                >
                  {size.value}
                </button>
              );
            })}
            {product?.variations[0]?.values && product.variations[0].values.length > 4 && (
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                +{product.variations[0].values.length - 4}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductVariations;
