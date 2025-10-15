'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { useLocale } from 'next-intl';
import postRequest from '@/lib/post';
import { useToken } from '@/context/Token';
import toastHelper from '@/lib/toastHelper';
import { useCart } from '@/context/Cart';
import ProductImage from './productCard/productImage';
import ProductInfo from './productCard/productInfo';
import ProductVariations from './productCard/productVariations';
import ProductActions from './productCard/productActions';
import ProductWishlist from './productCard/productWishlist';
interface ProductCardProps {
  product: Product;
  carousel?: boolean;
}

export default function ProductCard({ product, carousel = false }: ProductCardProps) {
  const locale = useLocale();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedColor, setSelectedColor] = useState<any>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedSize, setSelectedSize] = useState<any>('');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(Boolean(product?.is_is_favourite));
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [productWithVariations, setProductWithVariations] = useState<Product | null>(null);
  const [isLoadingVariations, setIsLoadingVariations] = useState(false);
  const { setCart } = useCart();
  const { token } = useToken();  

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  // Helper function to get current product (original or variation)
  const getCurrentProduct = () => {
    return productWithVariations || product;
  };



  // Function to get product variations
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getProductByVariations = async (showSuccessMessage = false, newColor: any = null, newSize: any = null) => {
    try {
      setIsLoadingVariations(true);
      
      // Use passed values or current state
      const currentColor = newColor !== null ? newColor : selectedColor;
      const currentSize = newSize !== null ? newSize : selectedSize;
      
      // Build variations object from selected color and size
      const variations: { [key: string]: string } = {};
      
      if (currentColor && typeof currentColor === 'object' && 'id' in currentColor) {
        console.log('currentColor', currentColor);
        variations[product.variations?.[1]?.attribute_id || 'color'] = currentColor.id;
      }
      
      if (currentSize && typeof currentSize === 'object' && 'id' in currentSize) {
        console.log('currentSize', currentSize);
        variations[product.variations?.[0]?.attribute_id || 'size'] = currentSize.id;
      }
      
      console.log('Selected variations:', variations);
      
      // If no variations selected, reset to original product
      if (Object.keys(variations).length === 0) {
        setProductWithVariations(null);
        if (showSuccessMessage) {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
        }
        return;
      }
      
      const requestBody = {
        product_id: product.id.toString(),
        attributes: variations
      };
      
      const response = await postRequest('/catalog/products/get-variation-by-attribute', requestBody, { 'Content-Type': 'application/json' }, null, locale);
      console.log('Product variation response:', response);
      setProductWithVariations(response.data.data);
      
      if (showSuccessMessage) {
        setIsAddedToCart(true);
        setTimeout(() => setIsAddedToCart(false), 2000);
      }
      console.log('Current product:', getCurrentProduct());
      return response.data.data;
    } catch (error) {
      console.error('Error fetching product variations:', error);
      throw error;
    } finally {
      setIsLoadingVariations(false);
    }
  };
  // Check if product has variations
  const hasVariations = Boolean(product?.variations && product.variations.length > 0);
  
  // Check if all required variations are selected
  const areAllVariationsSelected = () => {
    if (!hasVariations) return true;
    
    // Check if color is required and selected
    const colorRequired = product.variations?.[1]?.values && product.variations[1].values.length > 0;
    const colorSelected = selectedColor && typeof selectedColor === 'object' && 'id' in selectedColor;
    
    // Check if size is required and selected
    const sizeRequired = product.variations?.[0]?.values && product.variations[0].values.length > 0;
    const sizeSelected = selectedSize && typeof selectedSize === 'object' && 'id' in selectedSize;
    
    return (!colorRequired || colorSelected) && (!sizeRequired || sizeSelected);
  };

  const AddToCart = async () => {
    // Validate variations if product has them
    if (hasVariations && !areAllVariationsSelected()) {
      toastHelper(false, 'Please select all required variations (color and size) before adding to cart');
      return;
    }

    try {
      setIsLoadingVariations(true);
      
      const requestBody = {
        item_id: (productWithVariations?.id ?? (product as any)?.default_variation_id ?? product.id).toString(), // eslint-disable-line @typescript-eslint/no-explicit-any
        qty: 1,
        customer_note: '',
        type: 'product',
        // Include attributes if variations are selected
        ...(hasVariations && areAllVariationsSelected() && {
          attributes: {
            ...(selectedColor && typeof selectedColor === 'object' && 'id' in selectedColor && {
              [product.variations?.[1]?.attribute_id || 'color']: (selectedColor as any).id // eslint-disable-line @typescript-eslint/no-explicit-any
            }),
            ...(selectedSize && typeof selectedSize === 'object' && 'id' in selectedSize && {
              [product.variations?.[0]?.attribute_id || 'size']: (selectedSize as any).id // eslint-disable-line @typescript-eslint/no-explicit-any
            })
          }
        })
      };
      
      // Token is now available from context
      const response = await postRequest('/marketplace/cart/add-to-cart', requestBody, { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, token);
      toastHelper(response.data.status, response.data.message);
      
      // Add products from response to cart context
      if (response.data.data.products && Array.isArray(response.data.data.products)) {
        setCart(() => {
          // Update localStorage immediately
          localStorage.setItem('cart', JSON.stringify(response.data.data));
          return response.data.data;
        });
      }
      
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toastHelper(false, 'Failed to add product to cart');
    } finally {
      setIsLoadingVariations(false);
    }
  }

 


 

 


  return (
    <div 
      className={`product-item w-full h-full lg:bg-white dark:lg:bg-gray-800 rounded-md lg:rounded-lg lg:shadow flex flex-col ${
        carousel ? 'flex-shrink-0' : ''
      }`}
      data-product-id={product.id}
      data-product-title={product.title}
      data-product-price={product.price}
      data-product-image={product.image}
    >
      {/* Product Image */}
    
      <ProductImage product={getCurrentProduct()} productWithVariations={getCurrentProduct()} />

      {/* Product Info */}
      <div className="mt-3 lg:mt-0 lg:p-3 p-3 sm:p-4 flex flex-col flex-1">
        <ProductInfo product={product} getCurrentProduct={getCurrentProduct} />

        <ProductVariations 
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          setSelectedColor={setSelectedColor}
          setSelectedSize={setSelectedSize}
          getProductByVariations={getProductByVariations}
        />

        {/* Actions */}
        <div className="product-footer mt-auto flex gap-2 items-stretch">
          <ProductActions
            isAddedToCart={isAddedToCart}
            isLoadingVariations={isLoadingVariations}
            hasVariations={hasVariations}
            areAllVariationsSelected={areAllVariationsSelected}
            onAddToCart={AddToCart}
          />

          <ProductWishlist 
            isWishlisted={isWishlisted}
            onToggle={handleWishlistToggle}
          />
        </div>
      </div>
    </div>
  );
}
