
import React, { useState } from 'react'
import { useCart } from '@/context/CartContext';
import { CheckCircle2, X } from 'lucide-react';
import postRequest from '@/lib/post';
import tokenGetter from '@/lib/tokenGetter';
import toastHelper from '@/lib/toastHelper';
function AppliedPromoCode() {
  const { cartItems,setCartItems } = useCart();
  const token = tokenGetter();
  const [isRemovingPromo, setIsRemovingPromo] = useState(false);
  
  const removePromoCode = async () => {
    setIsRemovingPromo(true);
    try {
      // Get cart ID from the cart data structure
      const cartId = (cartItems as { id?: string })?.id || (Array.isArray(cartItems) ? cartItems[0]?.id : undefined);
      const response = await postRequest('/marketplace/cart/delete-voucher/'+cartId, {}, {}, token);
      toastHelper(response.data.status,response.data.message);
      setCartItems(response.data.data);
    } catch (error) {
      console.error('Failed to remove promo code:', error);
    } finally {
      setIsRemovingPromo(false);
    }
  }
  return (
    <div>
      <div className="mb-6 mt-2">
            <div className="flex items-center justify-between p-2 bg-green-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex-1">
                <div className='flex gap-2'>

                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1 text-capitalize ">
                    {(cartItems as { voucher?: { code?: string } })?.voucher?.code}
                </h3>
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    {(cartItems as { voucher?: { message?: string } })?.voucher?.message}
                </p>
              </div>
              <div className="flex items-center">
                {isRemovingPromo && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
                )}
                <label className="relative inline-flex items-center cursor-pointer">
                  <X 
                    className={`w-4 h-4 ${isRemovingPromo ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-red-500'}`} 
                    onClick={isRemovingPromo ? undefined : removePromoCode} 
                  />
                </label>
              </div>
            </div>
          </div>
    </div>
  )
}

export default AppliedPromoCode
