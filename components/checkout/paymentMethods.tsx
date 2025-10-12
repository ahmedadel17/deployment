'use client'
import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useOrderState } from '@/context/OrderStateContext';
import HyperPayPayment from '@/components/checkout/hyperpay'
import postRequest from '@/lib/post';
import { useToken } from '@/context/Token';
import { useCart } from '@/context/Cart';

interface PaymentMethodsProps {
  allowedPaymentMethods?: string[];
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ 
  allowedPaymentMethods = []
}) => {
  const t = useTranslations();
  const { orderState, updatePaymentMethod } = useOrderState();
  const {Cart}=useCart();
  const { token } = useToken();
  const locale = useLocale();

  const handlePaymentMethodChange = (method: string) => {
    updatePaymentMethod(method);
  };


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
  const tamara=async()=>{
    const response=await postRequest('/payment/tamara/prepare-checkout', {
      order_id: Cart?.id,
    }, {}, token, locale);
    console.log(response);
    if(response.data.status){

      
    }
  }   

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
        <div>
          <div className="space-y-3">
            {paymentOptions.map((option) => (
              <label key={option.value} className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="payment_method"
                  value={option.value}
                  checked={orderState.payment_method === option.value}
                  className="text-primary-600"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handlePaymentMethodChange(e.target.value);
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

   
        </div>
      )}
     {orderState.payment_method!='cod' && orderState.payment_method && <div className='mt-4'>

{  <HyperPayPayment selectedBrand={orderState.payment_method} />}


      </div>}
    </div>
  );
};

export default PaymentMethods;