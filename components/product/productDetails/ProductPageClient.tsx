'use client';

import React, { useState, useEffect } from 'react';
import ProductGallery from './ProductGallery';
import ProductVariations from './ProductVariations';
import { Product, ProductVariation } from '@/types/product';
import { useTranslations } from 'next-intl';
import { Formik, Form } from 'formik';
import { useCart } from '@/context/Cart';
import postRequest from '@/lib/post';
import QuantityInput from '@/components/QuantityInput';
import Rating from '../rating';
import Price from './price';
import Description from './description';
import Name from '../name';
import TextArea from '../../ui/TextArea';
import AddToCartButton from '../../ui/AddToCartButton';
import ActionButton from '../../ui/ActionButton';
import ProductMeta from '../productMeta';
import toastHelper from '@/lib/toastHelper';

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
  const [isUpdatingVariations, setIsUpdatingVariations] = useState(false);
  const { setCart } = useCart();
  const t = useTranslations();

  const handleVariationChange = (variations: SelectedVariations) => {
    setSelectedVariations(variations);
  };

  const handleProductWithVariationsChange = (product: Product | null) => {
    console.log('ProductPageClient - handleProductWithVariationsChange called with:', product);
    setProductWithVariations(product);
  };

  const handleUpdatingVariationsChange = (updating: boolean) => {
    setIsUpdatingVariations(updating);
  };

  // Debug: Track productWithVariations changes
  useEffect(() => {
    console.log('ProductPageClient - productWithVariations changed:', productWithVariations);
  }, [productWithVariations]);

  // Handle form submission for products without variations
  const handleAddToCart = async (values: { qty: number; customer_note: string }) => {
    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('token') || 'null');
      const response = await postRequest('/marketplace/cart/add-to-cart', { ...values, item_id: product?.id, type: 'product' }, 
        { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },token);
     toastHelper(response.data.status,response.data.message);
      // Add products from response to cart context
      if (response.data.data.products && Array.isArray(response.data.data.products)) {
        setCart(() => {
          // Update localStorage immediately
          localStorage.setItem('cart', JSON.stringify(response.data.data));
          return response.data.data;
        });
      }
    } catch (error) {
      const err = error as unknown as { response?: { data?: unknown } } & { message?: string };
      console.error('Failed to add to cart:', err.response?.data || err.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Left Side - Image Gallery */}
      <div>
        <div className="sticky top-8 space-y-6">
          <ProductGallery 
            product={product as Product} 
            selectedVariations={selectedVariations}
            productWithVariations={productWithVariations}
            isUpdatingVariations={isUpdatingVariations}
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
              product={product as Product}
              productWithVariations={productWithVariations}
              onVariationChange={handleVariationChange}
              onProductWithVariationsChange={handleProductWithVariationsChange}
              onUpdatingVariationsChange={handleUpdatingVariationsChange}
            />
          ) : (
            /* Product without variations */
            <Formik
              initialValues={{ qty: 1, customer_note: '' }}
              onSubmit={handleAddToCart}
            >
              {({ setFieldValue, values }) => (
                <Form >
              {/* Product Title and Rating */}
              <div>
                <Name product={product as Product} />
               <Rating product={product} />
              </div>

             <Price product={product} />

             <Description product={product} />

              {/* Quantity */}
              <div className="product-quantity">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{t("Quantity")}</h3>
                <QuantityInput
                  value={Number(values.qty)}
                  onChange={(newValue) => setFieldValue('qty', newValue)}
                  min={1}
                  max={10}
                  showStockInfo={!!product?.stock}
                  stock={product?.stock}
                  stockLabel={t("Only")}
                />
              </div>

             <TextArea
              name="customer_note"
              label="Do you have another comment?"
              placeholder="Enter your comment here..."
              rows={3}
            />

              {/* Action Buttons */}
              <div className="product-actions space-y-3">
                <AddToCartButton
                  isLoading={isLoading}
                  disabled={false}
                  isAllVariationsSelected={true}
                />
                <ActionButton
                  type="checkout"
                  isDisabled={false}
                  href="checkout.php"
                />
                <ActionButton
                  type="whatsapp"
                  isDisabled={false}
                />

              </div>

              {/* Product Meta */}
              <ProductMeta product={product} />
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}
