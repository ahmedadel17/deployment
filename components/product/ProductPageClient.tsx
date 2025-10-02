'use client';

import React, { useState } from 'react';
import ProductGallery from './ProductGallery';
import ProductVariations from './ProductVariations';
import { Product, ProductVariation } from '@/types/product';
import { useTranslations } from 'next-intl';
import { Formik, Form, Field } from 'formik';
import { useCart } from '@/context/CartContext';
import postRequest from '@/lib/post';
import QuantityInput from '@/components/QuantityInput';

interface ProductPageClientProps {
  product: Product;
  variations: ProductVariation[];
}

interface SelectedVariations {
  [attributeId: string]: string;
}

export default function ProductPageClient({ product, variations }: ProductPageClientProps) {
  const [selectedVariations, setSelectedVariations] = useState<SelectedVariations>({});
  const [productWithVariations, setProductWithVariations] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems, setCartItems } = useCart();
  const t = useTranslations();

  const handleVariationChange = (variations: SelectedVariations) => {
    setSelectedVariations(variations);
  };

  const handleProductWithVariationsChange = (product: Product | null) => {
    setProductWithVariations(product);
  };

  

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Left Side - Image Gallery */}
      <div>
        <div className="sticky top-8 space-y-6">
          <ProductGallery 
            product={product} 
            selectedVariations={selectedVariations}
            productWithVariations={productWithVariations}
          />
        </div>
      </div>

      {/* Right Side - Product Details */}
      <div>
        <div className="space-y-6">
          {/* Product Variations */}
          {variations && variations.length > 0 ? (
            <ProductVariations 
              variations={variations} 
              product={product}
              onVariationChange={handleVariationChange}
              onProductWithVariationsChange={handleProductWithVariationsChange}
            />
          ) : (
            /* Product without variations */
            <Formik
              initialValues={{ qty: 1, customer_note: '' }}
              onSubmit={async (values) => {
                setIsLoading(true);
                try {
                  const token = JSON.parse(localStorage.getItem('token') || 'null');
                  const response = await postRequest('/marketplace/cart/add-to-cart', { ...values, item_id: product.id, type: 'product' }, 
                    { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },token);
                  
               
                  
                  // Add products from response to cart context
                  if (response.data.data.products && Array.isArray(response.data.data.products)) {
                    setCartItems(prevItems => {
                    
                      // Update localStorage immediately
                      localStorage.setItem('cart', JSON.stringify(response.data.data));
                      console.log('Updated localStorage cart:', JSON.parse(localStorage.getItem('cart') || '[]'));
                      return response.data.data;
                    });
                  }
                } catch (error) {
                  const err = error as unknown as { response?: { data?: unknown } } & { message?: string };
                  console.error('Failed to add to cart:', err.response?.data || err.message || error);
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              {({ setFieldValue, values }) => (
                <Form >
              {/* Product Title and Rating */}
              <div>
                <h1 className="product-title text-3xl font-bold text-gray-900 dark:text-white mb-2">{product?.name}</h1>
                
                <div className="product-rate flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="product-rating flex space-x-1">
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2 rtl:ml-0 rtl:mr-2">4.2 (89 {t("reviews")})</span>
                  </div>
                  <span className="product-stock text-sm text-green-600 dark:text-green-400">{t("In Stock")}</span>
                </div>
              </div>

              {/* Price */}
              <div className="product-price flex items-baseline gap-2">
                <span className="text-3xl font-bold text-secondary-600">
                  <span className="icon-riyal-symbol"></span>
                  <span>{product.min_price}</span>
                </span>
                {product.old_price && (
                  <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                    <span className="icon-riyal-symbol"></span>
                    <span>{product.old_price}</span>
                  </span>
                )}

              </div>

              {/* Product Description */}
              <div className="product-desc">
                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  {product.description || "Experience ultimate comfort with our premium product. Made from high-quality materials with excellent craftsmanship that ensures durability and style."}
                </p>
              </div>

              <hr className="border-gray-300 dark:border-gray-800"/>

              {/* Quantity */}
              <div className="product-quantity">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{t("Quantity")}</h3>
                <QuantityInput
                  value={Number(values.qty)}
                  onChange={(newValue) => setFieldValue('qty', newValue)}
                  min={1}
                  max={10}
                  showStockInfo={!!product.stock}
                  stock={product.stock}
                  stockLabel={t("Only")}
                />
              </div>

              {/* Comment Section */}
              <div className="space-y-2">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-900 dark:text-white">Do you have another comment?</label>
                <Field as="textarea" id="customer_note" name="customer_note" rows={3} className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500" placeholder="Enter your comment here..."></Field>
              </div>

              {/* Action Buttons */}
              <div className="product-actions space-y-3">
                <button 
                  type="submit"
                  className={`w-full py-1 product-add-to-cart flex-1 te-btn te-btn-primary flex gap-2 items-center justify-center ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-700'
                  }`}
                  disabled={isLoading}
                >
                  {/* Cart Icon or Loading Spinner */}
                  {isLoading ? (
                    <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="icon-cart w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
                      <path d="M8 11V6a4 4 0 0 1 8 0v5" />
                    </svg>
                  )}
                  <span>
                    {isLoading ? 'Loading...' : 'Add to Cart'}
                  </span>
                </button>

                <a 
                  href="checkout.php" 
                  className="w-full py-1 te-btn flex gap-2 text-center bg-gray-800 text-white hover:bg-gray-600"
                >
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="21" r="1"></circle>
                    <circle cx="19" cy="21" r="1"></circle>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                  </svg>
                  <span>Buy Now</span>
                </a>

                {/* WhatsApp Button */}
                <button 
                  className="w-full py-3 font-medium rounded-md flex gap-2 items-center justify-center transition-colors bg-[#075E54] hover:bg-green-600 text-white"
                >
                  {/* WhatsApp Icon */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386" />
                  </svg>
                  Contact via WhatsApp
                </button>
              </div>

              {/* Product Meta */}
              <div className="product-meta text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <p><span className="font-medium text-gray-900 dark:text-white">SKU:</span> {product.id}</p>
                <p>
                  <span className="font-medium text-gray-900 dark:text-white">Category:</span>
                  <a href="/category/clothing" className="text-primary-600 dark:text-primary-200 hover:underline">Clothing</a>
                </p>
                <p>
                  <span className="font-medium text-gray-900 dark:text-white">Tags:</span>
                  <a href="/tag/shorts" className="text-primary-600 dark:text-primary-200 hover:underline">Shorts</a>,
                  <a href="/tag/chino" className="text-primary-600 dark:text-primary-200 hover:underline">Chino</a>,
                  <a href="/tag/casual" className="text-primary-600 dark:text-primary-200 hover:underline">Casual</a>,
                  <a href="/tag/men" className="text-primary-600 dark:text-primary-200 hover:underline">Men</a>
                </p>
              </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}
