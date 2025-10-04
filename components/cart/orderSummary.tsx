'use client'
import React, { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl';

import { useCart } from '@/context/CartContext';
import OrderAttribute from './orderAttribute';
import WalletBallanceToggler from './walletBalanceToggler';
import PromoCode from './promoCode';
import { Check, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import tokenGetter from '@/lib/tokenGetter';
import postRequest from '@/lib/post';
// Validation schema for promo code


function OrderSummary() {
    const { cartItems } = useCart();
    const t = useTranslations();
    const [isOrderSummaryExpanded, setIsOrderSummaryExpanded] = useState(true);
    const token= tokenGetter();
    const locale = useLocale();
    const convertCartToOrder = async () => {
      try {
        const response = await postRequest('/order/orders/change-cart-to-order/'+cartItems?.id, {
        }, {}, token, locale);
      } catch (error) {
        console.error('Failed to convert cart to order:', error);
      }
    }   
    // Get token safely (handles SSR)
    
 
  return (
    <div className="lg:col-span-1">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('Order Summary')}</h2>
        <button
          onClick={() => setIsOrderSummaryExpanded(!isOrderSummaryExpanded)}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          aria-label={isOrderSummaryExpanded ? 'Collapse order summary' : 'Expand order summary'}
        >
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${isOrderSummaryExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    
      {isOrderSummaryExpanded && (
        <div className="transition-all duration-300 ease-in-out">
          <div className="mb-6">
       <PromoCode/>
     
          </div>

          <WalletBallanceToggler />

          <div className="space-y-3 mb-6">
           
          {
            cartItems?.order_attributes?.map((item, idx) => (
              <OrderAttribute key={idx} t={t} {...item} />
            ))
          } 
          
            <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">{t('Total')}</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white"><span className="icon-riyal-symbol" /><span>{cartItems?.amount_to_pay}</span></span>
              </div>
            </div>
          </div>

          <button onClick={convertCartToOrder} className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium mb-3 text-center block">{t('Proceed to Checkout')}</button>
          <Link href="/checkout" className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium mb-3 text-center block">{t('Proceed to Checkout')}</Link>
          <a href="#" className="w-full py-3 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 transition-colors font-medium mb-4 text-center block">{t('PayPal Express Checkout')}</a>

          <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            {t('Secure checkout guaranteed')}
          </div>

          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-sm text-green-700 dark:text-green-300">{t('You qualify for free shipping')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  )
}

export default OrderSummary
