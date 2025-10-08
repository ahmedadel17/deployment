'use client'
import React from 'react';
import { Formik, Form } from 'formik';
import { useTranslations } from 'next-intl';
import * as Yup from 'yup';
import ShippingMethodRadioButton from './ShippingMethodRadioButton';
import { useCart } from '@/context/CartContext';
import { useOrderState } from '@/context/OrderStateContext';

interface ShippingOption {
  slug: string;
  name: string;
  price: string;
  description: string;
  image: string;
  value: string;
  label: string;
}

const ShippingMethod = () => {
  const t = useTranslations();
  const { cartItems } = useCart();
  const { orderState, updateShippingSlug } = useOrderState();

  const validationSchema = Yup.object({
    shipping: Yup.string().required(t('Please select a shipping method'))
  });

  const initialValues = {
    shipping: orderState.shipping_slug || 'standard'
  }
  
  const onSubmit = (values: { shipping: string }) => {
    console.log('Shipping method selected:', values.shipping);
    updateShippingSlug(values.shipping);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 my-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Shipping Method')}</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="space-y-3">
              {(cartItems as { shipping_methods?: ShippingOption[] })?.shipping_methods?.map((option: ShippingOption) => (
                <ShippingMethodRadioButton
                  key={option.slug}
                  option={option}
                  name="shipping"
                  onChange={(value: string) => {
                    setFieldValue('shipping', value);
                    updateShippingSlug(value);
                  }}
                />
              ))}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShippingMethod;