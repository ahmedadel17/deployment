'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import OrderSummary2 from '@/components/checkout/orderSummary'
import ShippingAddress from '@/components/checkout/shippingAddress'
import ShippingMethod from '@/components/checkout/shippingMethod'
import { OrderStateProvider } from '@/context/OrderStateContext'
import PaymentMethods from '@/components/checkout/paymentMethods'
import HyperpayPayment from '@/components/checkout/hyperpay'

export default function CheckoutPage() {
  const t = useTranslations();
  return (
      
            <div >
               

                 {/* Shipping Address */}
                 <ShippingAddress 
                 
                 />

                 {/* Shipping Method */}
                 <ShippingMethod 
                   
                 />

            </div>

  
       
  )
}
