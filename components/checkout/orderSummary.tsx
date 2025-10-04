import Link from 'next/link'
import React from 'react'
import {useTranslations} from 'next-intl'
import { useCart } from '@/context/CartContext';
import OrderAttribute from '../cart/orderAttribute';
import Image from 'next/image';
function OrderSummary() {
  const { cartItems } = useCart();
  const t = useTranslations();
  return (
    <div className="lg:col-span-1">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Order Summary')}</h2>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {cartItems?.products.map((item: any, index: any) => (
          <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse">
            <Image 
              src={item.image} 
              alt={item.name} 
              width={100} 
              height={100} 
              className="w-16 h-16 object-cover rounded-md" 
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.variation}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('Qty')}: {item.qty}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900 dark:text-white">
                <span className="icon-riyal-symbol text-xs"></span>
                <span>{item.price}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Totals */}
      <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">{t('Subtotal')}</span>
          <span className="text-gray-900 dark:text-white">
            <span className="icon-riyal-symbol text-xs"></span>
            <span>{cartItems?.sub_total}</span>
          </span>
        </div>
      {
        cartItems?.order_attributes.map((item: any, index: any) => (
            <OrderAttribute key={index} {...item} />
        ))
      }
        <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">{t('Total')}</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              <span className="icon-riyal-symbol"></span>
              <span>{cartItems?.total_amount}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <Link
        href="/confirmation" 
        className="w-full mt-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center block"
      >
        {t('Place Order')}
      </Link>

      {/* Security Notice */}
      <div className="mt-4 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
        <svg className="w-4 h-4 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        {t('Secure SSL encrypted checkout')}
      </div>
    </div>
  </div>
  )
}

export default OrderSummary
