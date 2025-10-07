'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import OrderSummary2 from '@/components/checkout/orderSummary'
import ShippingAddress from '@/components/checkout/shippingAddress'
import ShippingMethod from '@/components/checkout/shippingMethod'
import { OrderStateProvider } from '@/context/OrderStateContext'

export default function CheckoutPage() {
  const t = useTranslations();
  return (
    <OrderStateProvider>
      <section className="te-section dark:bg-gray-900">
        <div className="container">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('Checkout')}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{t('Complete your purchase')}</p>
          </div>

          {/* Checkout Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-8">
               

                 {/* Shipping Address */}
                 <ShippingAddress 
                 
                 />

                 {/* Shipping Method */}
                 <ShippingMethod 
                   
                 />

            </div>

            {/* Right Column - Order Summary */}
            <OrderSummary2 />
          </div>
        </div>
      </section>
    </OrderStateProvider>
  )
}
