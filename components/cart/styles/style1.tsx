
'use client'
import React, { useEffect, useState } from 'react'
import { useCart } from '@/context/Cart'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import getRequest from '@/lib/getter'
import OrderSummary from '../orderSummary'
import EmptyCart from '../emptyCart'
import CartItem from '../cartItem'
import { useToken } from '@/context/Token'


export default function CartStyle1() {
  const { Cart, setCart } = useCart();
  const t = useTranslations();
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  const { token, isInitialized } = useToken();
  
  // Load cart data from API
  useEffect(() => {
    const loadCartData = async () => {
      try {
        setIsLoading(true);
        console.log('token', token);
        console.log('isInitialized', isInitialized);
        
        const data = await getRequest('/marketplace/cart/my-cart', {
       
        }, {}, locale, token);
        setCart(data.data);
      } catch (error: unknown) {
        console.error('Failed to load cart data:', error);
        // If unauthorized, show empty cart or redirect to login
        if (error && typeof error === 'object' && 'response' in error && 
            (error as { response?: { status?: number } }).response?.status === 401) {
          console.log('User not authenticated, showing empty cart');
          setCart({ id: '', products: [] });
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Only load cart data when token context is initialized
    if (isInitialized) {
      loadCartData();
    }
  }, [locale, setCart, token, isInitialized]);
  



 

  return (
    <section className="te-section dark:bg-gray-900">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('Shopping Cart')}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
                {/* {totalItems}  */}
                {t('items in your cart')}
                </p>
          </div>
          {/* <button onClick={onClear ?? clearCart} className="text-gray-500 hover:text-red-500 transition-colors text-sm">Clear Cart</button> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading cart...</p>
              </div>
            </div>
          ) : !Cart?.products || Cart.products.length === 0 ? (
            <EmptyCart />
          ) : (
            Cart.products.map((item, idx: number) => (
            <CartItem item={item} idx={idx} key={idx} />
            ))
          )}

            <div className="pt-4">
              <Link href="/products" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                {t('Continue Shopping')}
              </Link>
            </div>
          </div>
          {
            Cart?.products && Cart.products.length > 0 && <OrderSummary />
          }

        

        </div>
      </div>
    </section>
  )
}


