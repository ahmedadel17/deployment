
'use client'
import React, { useEffect, useState } from 'react'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import getRequest from '@/lib/getter'
import QuantityInput from '@/components/QuantityInput'
import postRequest from '@/lib/post'
import OrderAttribute from '../orderAttribute'
import { deleteCartItem } from '@/lib/cartHelpers'

interface CartData {
  id: string;
  products: unknown[];
  order_attributes?: Array<{
    label: string;
    value: string | number;
    color?: string;
    show_currency?: boolean;
  }>;
  amount_to_pay?: string | number;
}

export default function CartStyle1() {
  const { cartItems, setCartItems } = useCart();
  const t = useTranslations();
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  const [deletingItems, setDeletingItems] = useState<Set<string>>(new Set());
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const [isOrderSummaryExpanded, setIsOrderSummaryExpanded] = useState(true);
  const [useWalletBalance, setUseWalletBalance] = useState(false);
  const [isWalletToggleLoading, setIsWalletToggleLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  // Load cart data from API
  useEffect(() => {
    const loadCartData = async () => {
      try {
        setIsLoading(true);
        const token = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('token') || 'null') : null;
        
        const data = await getRequest('/marketplace/cart/my-cart', {
          'Accept-Language': locale,
        }, locale, token);
        setCartItems(data.data);
      } catch (error) {
        console.error('Failed to load cart data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartData();
  }, [locale, setCartItems]);

  const deleteItem = async (item_id: string) => {
    try {
      // Add item to deleting set
      setDeletingItems(prev => new Set(prev).add(item_id));
      
      const response = await deleteCartItem({
        orderId: cartData?.id || '',
        itemId: item_id,
        token,
        locale
      });
      
      setCartItems(response.data);
      localStorage.setItem('cart', JSON.stringify(response.products || []));
    } catch (error) {
      console.error('Failed to delete item:', error);
      // You can add error handling here (show error message, etc.)
    } finally {
      // Remove item from deleting set
      setDeletingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item_id);
        return newSet;
      });
    }
  }

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], qty: newQuantity };
      return updatedItems;
    });
  };
const updateCartItemQty = async (item_id: string, newQuantity: number) => {
  try {
    // Add item to updating set
    setUpdatingItems(prev => new Set(prev).add(item_id));
    
    const response = await postRequest('/marketplace/cart/update-quantity-cart', {
      order_id: cartData?.id,
      cart_item_id: item_id,
      qty: newQuantity,
      type: 'product'
    }, {}, token, locale);
    
    setCartItems(response.data.data);
    localStorage.setItem('cart', JSON.stringify(response.data.data || []));
  } catch (error) {
    console.error('Failed to update item quantity:', error);
    // You can add error handling here (show error message, etc.)
  } finally {
    // Remove item from updating set
    setUpdatingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(item_id);
      return newSet;
    });
  }
  }

  const handleWalletBalanceToggle = async (checked: boolean) => {
    try {
      setIsWalletToggleLoading(true);
      
      const response = await postRequest('/marketplace/order/use_wallet/'+cartData?.id, {
       
      }, {}, token, locale);
      
      // Update cart data with new wallet balance information
      setCartItems(response.data.data);
      setUseWalletBalance(checked);
      localStorage.setItem('cart', JSON.stringify(response.data.data || []));
    } catch (error) {
      console.error('Failed to toggle wallet balance:', error);
      // You can add error handling here (show error message, etc.)
    } finally {
      setIsWalletToggleLoading(false);
    }
  };

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
          ) : cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                </svg>
              </div>
              {/* <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('Your cart is empty')}</h3> */}
              <p className="text-gray-600 dark:text-gray-400 mb-4">{t('Add some items to get started')}</p>
              <Link href="/products" className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                {t('Continue Shopping')}
              </Link>
            </div>
          ) : (
            cartItems?.products?.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-32 md:h-32 w-full h-48">
                  <Image width={100} height={100} src={item.image as string} alt={String(item.name)} className="w-full h-full object-cover rounded-md" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {String(item.name)}
                       <h5 className="text-xs text-gray-600 dark:text-gray-400">
                         {item?.variations && String(item.variations)}
                       </h5>
                      </h3>
                   
                 
                     <button 
                       onClick={() => deleteItem(String(item.id))} 
                       disabled={deletingItems.has(String(item.id))}
                       className={`text-gray-400 hover:text-red-500 transition-colors ${
                         deletingItems.has(String(item.id)) ? 'opacity-50 cursor-not-allowed' : ''
                       }`} 
                       aria-label="Remove item"
                     >
                       {deletingItems.has(String(item.id)) ? (
                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
                       ) : (
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                         </svg>
                       )}
                     </button>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {item.variations && <span>{String(item.variations)}</span>}
                    {item.color && <span>Color: {String(item.color)}</span>}
                    {item.size && <span>Size: {String(item.size)}</span>}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Qty:</span>
                      <QuantityInput
                        value={item.qty}
                        onChange={(newQuantity) => updateQuantity(idx, newQuantity)}
                        min={1}
                        max={99}
                        className="ml-2"
                      />
                       <button 
                         className={`px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md transition-colors ${
                           updatingItems.has(String(item.id)) 
                             ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                             : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                         }`}
                         onClick={() => updateCartItemQty(String(item.id), item.qty)}
                         disabled={updatingItems.has(String(item.id))}
                       >
                         {updatingItems.has(String(item.id)) ? (
                           <div className="flex items-center">
                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
                             <span>Updating...</span>
                           </div>
                         ) : (
                           'Update'
                         )}
                       </button>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          <span className="icon-riyal-symbol"></span>
                          {Number(item.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ))
          )}

            <div className="pt-4">
              <a href="#" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                {t('Continue Shopping')}
              </a>
            </div>
          </div>

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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('Promo Code')}</label>
                    <div className="flex">
                      <input type="text" className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md rtl:rounded-l-none rtl:rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white" placeholder={t("Enter code")} />
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 border border-l-0 rtl:border-l rtl:border-r-0 border-gray-300 dark:border-gray-600 rounded-r-md rtl:rounded-r-none rtl:rounded-l-md hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">{t('Apply')}</button>
                    </div>
                  </div>

                  {/* Wallet Balance Toggle */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">{t('Use Wallet Balance')}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{t('Apply your wallet balance to this order')}</p>
                      </div>
                      <div className="flex items-center">
                        {isWalletToggleLoading && (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-3"></div>
                        )}
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={useWalletBalance}
                            onChange={(e) => handleWalletBalanceToggle(e.target.checked)}
                            disabled={isWalletToggleLoading}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

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

                  <a href="/checkout" className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium mb-3 text-center block">{t('Proceed to Checkout')}</a>
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

        </div>
      </div>
    </section>
  )
}


