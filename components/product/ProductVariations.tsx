'use client';

import React, { useState } from 'react';
import { Product, ProductVariation } from '@/types/product';
import { useLocale, useTranslations } from 'next-intl';
import { Formik, Form } from 'formik';
import { useCart } from '@/context/CartContext';
import postRequest from '@/lib/post';
import QuantityInput from '@/components/QuantityInput';
import TextArea from '@/components/ui/TextArea';
import AddToCartButton from '@/components/ui/AddToCartButton';
import ActionButton from '@/components/ui/ActionButton';
import Rating from './rating';
import Name from './name';
import Price from './price';
import Variations from './variations';
import Description from './description';
import ProductMeta from './productMeta';

interface ProductVariationsProps {
  variations: ProductVariation[];
  onSelectionChange?: (selectedVariations: SelectedVariations) => void;
  onVariationChange?: (selectedVariations: SelectedVariations) => void;
  product: Product;
  onProductWithVariationsChange?: (product: Product | null) => void;
}

interface SelectedVariations {
  [attributeId: string]: string;
}

export default function ProductVariations({ variations, onSelectionChange, onVariationChange, product, onProductWithVariationsChange }: ProductVariationsProps) {
  const [selectedVariations, setSelectedVariations] = useState<SelectedVariations>({});
  const [isUpdatingVariations, setIsUpdatingVariations] = useState(false);
  const [productWithVariations, setProductWithVariations] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedVariations, setHasLoadedVariations] = useState(false);
  const { cartItems, setCartItems } = useCart();
  const locale = useLocale();
  const t = useTranslations();
  // Handle form submission
  const handleAddToCart = async (values: { qty: number; customer_note: string }) => {
    if (!isAllVariationsSelected()) return;
    setIsLoading(true);
    try {
      onSelectionChange?.(selectedVariations);
      
      const token = JSON.parse(localStorage.getItem('token') || 'null');
      const requestBody = {
        item_id: (productWithVariations?.id ?? product.id).toString(),
        qty: values.qty,
        customer_note: values.customer_note || '',
        attributes: selectedVariations,
        type: 'product'
      };
      const response = await
        postRequest('/marketplace/cart/add-to-cart', requestBody, { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },token);
     
      
      // Add products from response to cart context
      if (response.data.data.products && Array.isArray(response.data.data.products)) {
        setCartItems(prevItems => {
          // Update localStorage immediately
          localStorage.setItem('cart', JSON.stringify(response.data.data));
          return response.data.data;
        });
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleVariationSelect = async (attributeId: string, value: string) => {
    // Toggle selection: if the same value is clicked, unselect it
    const isSameValueClicked = selectedVariations[attributeId] === value;
    const newSelection: SelectedVariations = { ...selectedVariations };
    if (isSameValueClicked) {
      delete newSelection[attributeId];
    } else {
      newSelection[attributeId] = value;
    }

    setSelectedVariations(newSelection);
    onSelectionChange?.(newSelection);
    onVariationChange?.(newSelection);

    // Check if all variations are selected
    const allVariationsSelected = variations.every(v => Object.prototype.hasOwnProperty.call(newSelection, v.attribute_id));
    
    if (allVariationsSelected) {
      // Check if the selection has actually changed (not just the same selection)
      const selectionChanged = JSON.stringify(selectedVariations) !== JSON.stringify(newSelection);
      
      if (!hasLoadedVariations || selectionChanged) {
        setIsUpdatingVariations(true);
        try {
          const variationData = await getProductByVariations(newSelection);
          console.log('Variation data loaded:', variationData);
          setHasLoadedVariations(true);
          onProductWithVariationsChange?.(variationData);
        } catch (error) {
          console.error('Failed to load product variations:', error);
        } finally {
          setIsUpdatingVariations(false);
        }
      }
    } else {
      // Not all selected, clear any previously loaded variation-specific product and reset flag
      setProductWithVariations(null);
      setHasLoadedVariations(false);
      onProductWithVariationsChange?.(null);
    }
  };

  const isSelected = (attributeId: string, value: string) => {
    return selectedVariations[attributeId] === value;
  };

  const isAllVariationsSelected = () => {
    return variations.every(variation => 
      selectedVariations.hasOwnProperty(variation.attribute_id)
    );
  };
  const getProductByVariations = async (variations: SelectedVariations) => {
    try {
      
      const requestBody = {
        product_id: product.id.toString(),
        attributes: variations
      };
      

      const response = await
       postRequest('/catalog/products/get-variation-by-attribute', requestBody, { 'Content-Type': 'application/json' },null,locale);
     console.log(response);
      setProductWithVariations(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching product variations:', error);
      throw error;
    }
  }


  return (
    <>
    
                {/* <!-- Product Title and Rating --> */}
             <div>
                <Name product={product} productWithVariations={productWithVariations} />
               <Rating product={product} productWithVariations={productWithVariations} />
            </div>

             {/* <!-- Price --> */}
             <div className="product-price flex items-baseline gap-2">
              <Price product={product} productWithVariations={productWithVariations} />
             </div>

            {/* <!-- Product Description --> */}
           <Description product={product} productWithVariations={productWithVariations} />


            <Formik
              initialValues={{ qty: 1, customer_note: '' }}
              onSubmit={handleAddToCart}
            >
              {({ setFieldValue, values }) => (
                <Form>
                  {/* Quantity */}
                  <div className="product-quantity">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{t("Quantity")}</h3>
                      <QuantityInput
                        value={Number(values.qty)}
                        onChange={(newValue) => setFieldValue('qty', newValue)}
                        min={1}
                        max={10}
                        showStockInfo={!!productWithVariations?.stock}
                        stock={productWithVariations?.stock}
                        stockLabel={t("Only")}
                      />
                  </div>
           <Variations variations={variations} isSelected={isSelected} isUpdatingVariations={isUpdatingVariations} handleVariationSelect={handleVariationSelect} />
            <TextArea
              name="customer_note"
              label="Do you have another comment?"
              placeholder="Enter your comment here..."
              rows={3}
            />
{/* 
              <!-- Action Buttons --> */}
            <div className="product-actions space-y-3">
                <AddToCartButton
                  isLoading={isLoading}
                  disabled={false}
                  isAllVariationsSelected={isAllVariationsSelected()}
                />

                <ActionButton
                  type="checkout"
                  isDisabled={!isAllVariationsSelected()}
                  href={isAllVariationsSelected() ? "checkout.php" : "#"}
                />

                <ActionButton
                  type="whatsapp"
                  isDisabled={!isAllVariationsSelected()}
                />
            </div>
                </Form>
              )}
            </Formik>

            {/* <!-- Product Meta --> */}
         <ProductMeta product={product} productWithVariations={productWithVariations} />
    </>
  );
}
