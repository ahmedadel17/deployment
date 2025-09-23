'use client'

import React from 'react'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'


export default function CartStyle1() {
  const { cartItems, setCartItems } = useCart();
  const removeItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  }
  const updateQuantity = (index: number, quantity: number) => {
    setCartItems(cartItems.map((item, i) => i === index ? { ...item, quantity } : item));
  }
  return (
    <section className="te-section">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
                {/* {totalItems}  */}
                items in your cart</p>
          </div>
          {/* <button onClick={onClear ?? clearCart} className="text-gray-500 hover:text-red-500 transition-colors text-sm">Clear Cart</button> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-32 md:h-32 w-full h-48">
                  <Image width={100} height={100} src={item.thumbnail as string} alt={String(item.name)} className="w-full h-full object-cover rounded-md" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{String(item.name)}</h3>
                    <button onClick={() => removeItem(idx)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Remove item">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {item.color && <span>Color: {String(item.color)}</span>}
                    {item.size && <span>Size: {String(item.size)}</span>}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Qty:</span>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                          <button onClick={() => updateQuantity(String(item.id), Math.max(1, item.quantity - 1))} className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" aria-label="Decrease">-</button>
                          <input type="number" value={item.quantity} readOnly className="w-16 !rounded-none border-0 focus:outline-none" />
                          <button onClick={() => updateQuantity(String(item.id), item.quantity + 1)} className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" aria-label="Increase">+</button>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          <span className="icon-riyal-symbol"></span>
                          {item.price_after_discount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

            <div className="pt-4">
              <a href="#" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Continue Shopping
              </a>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Promo Code</label>
                <div className="flex">
                  <input type="text" className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white" placeholder="Enter code" />
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">Apply</button>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  {/* <span className="text-gray-600 dark:text-gray-400">Subtotal ({totalItems} items)</span> */}
                  <span className="text-gray-900 dark:text-white"><span className="icon-riyal-symbol text-xs" /><span>920.00</span></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-green-600 dark:text-green-400">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Estimated Tax</span>
                  <span className="text-gray-900 dark:text-white"><span className="icon-riyal-symbol text-xs" /><span>73.00</span></span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white"><span className="icon-riyal-symbol" /><span>993.00</span></span>
                  </div>
                </div>
              </div>

              <a href="/checkout" className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium mb-3 text-center block">Proceed to Checkout</a>
              <a href="#" className="w-full py-3 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 transition-colors font-medium mb-4 text-center block">PayPal Express Checkout</a>

              <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Secure checkout guaranteed
              </div>

              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm text-green-700 dark:text-green-300">You qualify for free shipping!</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}


