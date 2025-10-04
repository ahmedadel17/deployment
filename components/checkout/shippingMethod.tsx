'use client'
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslations } from 'next-intl';
import * as Yup from 'yup';

interface ShippingMethodData {
  shipping: string;
}

interface ShippingMethodProps {
  onSubmit: (values: ShippingMethodData) => void;
  initialValues?: ShippingMethodData;
}

const ShippingMethod: React.FC<ShippingMethodProps> = ({ 
  onSubmit, 
  initialValues = {
    shipping: 'standard'
  }
}) => {
  const t = useTranslations();

  const validationSchema = Yup.object({
    shipping: Yup.string().required(t('Please select a shipping method'))
  });

  const shippingOptions = [
    {
      value: 'standard',
      label: t('Standard Shipping'),
      price: t('Free'),
      description: t('5-7 business days')
    },
    {
      value: 'express',
      label: t('Express Shipping'),
      price: '12.99',
      description: t('2-3 business days')
    },
    {
      value: 'overnight',
      label: t('Overnight Shipping'),
      price: '24.00',
      description: t('Next business day')
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 my-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Shipping Method')}</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="space-y-3">
            {shippingOptions.map((option) => (
              <label key={option.value} className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <Field
                  type="radio"
                  name="shipping"
                  value={option.value}
                  className="text-primary-600"
                />
                <div className="ms-3 flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{option.label}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {option.price === t('Free') ? (
                        t('Free')
                      ) : (
                        <>
                          <span className="icon-riyal-symbol ms-1"></span>
                          {option.price}
                        </>
                      )}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ShippingMethod;