'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslations } from 'next-intl';
import FormikInput from '@/components/ui/FormikInput';
import * as Yup from 'yup';
import Image from 'next/image';

interface PaymentMethodData {
  payment_method: string;
  card_number: string;
  expiry_date: string;
  cvv: string;
  cardholder_name: string;
}

interface PaymentMethodsProps {
  onSubmit: (values: PaymentMethodData) => void;
  initialValues?: PaymentMethodData;
  allowedPaymentMethods?: string[];
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ 
  onSubmit, 
  initialValues = {
    payment_method: '',
    card_number: '',
    expiry_date: '',
    cvv: '',
    cardholder_name: ''
  },
  allowedPaymentMethods = []
}) => {
  const t = useTranslations();
  const [selectedMethod, setSelectedMethod] = useState('');

  const validationSchema = Yup.object({
    payment_method: Yup.string().required(t('Please select a payment method')),
    card_number: Yup.string().when('payment_method', {
      is: (val: string) => ['visa', 'mastercard', 'mada'].includes(val),
      then: (schema) => schema.required(t('Card number is required')),
      otherwise: (schema) => schema.notRequired()
    }),
    expiry_date: Yup.string().when('payment_method', {
      is: (val: string) => ['visa', 'mastercard', 'mada'].includes(val),
      then: (schema) => schema.required(t('Expiry date is required')),
      otherwise: (schema) => schema.notRequired()
    }),
    cvv: Yup.string().when('payment_method', {
      is: (val: string) => ['visa', 'mastercard', 'mada'].includes(val),
      then: (schema) => schema.required(t('CVV is required')),
      otherwise: (schema) => schema.notRequired()
    }),
    cardholder_name: Yup.string().when('payment_method', {
      is: (val: string) => ['visa', 'mastercard', 'mada'].includes(val),
      then: (schema) => schema.required(t('Cardholder name is required')),
      otherwise: (schema) => schema.notRequired()
    })
  });

  const allPaymentOptions = [
    {
      value: 'cod',
      label: t('Cash on Delivery'),
      description: t('Cash on Delivery'),
      icon: (
        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center me-3">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
          </svg>
        </div>
      )
    },
    
    {
      value: 'visa',
      label: 'Visa',
      description: 'Credit/Debit Card',
      icon: (
        <div className="w-12 h-12 rounded-lg flex items-center justify-center me-3 shadow-md">
          <Image width={200} height={200} className="rounded-lg" src="/assets/images/payment/visa.jpg" alt="Visa" />
        </div>
      )
    },
    {
      value: 'master',
      label: 'Mastercard',
      description: 'Credit/Debit Card',
      icon: (
        <div className="w-12 h-12 rounded-lg flex items-center justify-center me-3 shadow-md">
          <Image width={200} height={200} className="rounded-lg" src="/assets/images/payment/mastercard.jpg" alt="Mastercard" />
        </div>
      )
    },
    {
      value: 'mada',
      label: 'Mada',
      description: 'Local Payment',
      icon: (
        <div className="w-12 h-12 rounded-lg flex items-center justify-center me-3 shadow-md">
          <Image width={200} height={200} className="rounded-lg" src="/assets/images/payment/mada.jpg" alt="Mada" />
        </div>
      )
    },
    {
      value: 'tabby',
      label: 'Tabby',
      description: t('Pay in 4 installments'),
      icon: (
        <div className="w-12 h-12 rounded-lg flex items-center justify-center me-3 shadow-md">
          <Image width={200} height={200} className="rounded-lg" src="/assets/images/payment/tabby.jpg" alt="Tabby" />
        </div>
      )
    },
    {
      value: 'tamara',
      label: 'Tamara',
      description: t('Buy now, pay later'),
      icon: (
        <div className="w-12 h-12 rounded-lg flex items-center justify-center me-3 shadow-md">
          <Image width={200} height={200} className="rounded-lg" src="/assets/images/payment/tamara.jpg" alt="Tamara" />
        </div>
      )
    }
  ];

  // Filter payment options based on allowed payment methods
  const paymentOptions = allowedPaymentMethods.length > 0 
    ? allPaymentOptions.filter(option => allowedPaymentMethods.includes(option.value))
    : allPaymentOptions;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 my-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Payment Method')}</h2>

      {paymentOptions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">{t('No payment methods available')}</p>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="space-y-3">
                {paymentOptions.map((option) => (
                <label key={option.value} className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <Field
                    type="radio"
                    name="payment_method"
                    value={option.value}
                    className="text-primary-600"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('payment_method', e.target.value);
                      setSelectedMethod(e.target.value);
                    }}
                  />
                  <div className="ms-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {option.icon}
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">{option.label}</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* Card Details Form (shown when card payment is selected) */}
            {['visa', 'master', 'mada'].includes(selectedMethod) && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">{t('Card Details')}</h3>
                <div className="space-y-4">
                  <FormikInput
                    name="card_number"
                    label={t('Card Number')}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormikInput
                      name="expiry_date"
                      label={t('Expiry Date')}
                      placeholder="MM/YY"
                      required
                    />
                    
                    <FormikInput
                      name="cvv"
                      label={t('CVV')}
                      placeholder="123"
                      required
                    />
                  </div>
                  
                  <FormikInput
                    name="cardholder_name"
                    label={t('Cardholder Name')}
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
      )}
    </div>
  );
};

export default PaymentMethods;