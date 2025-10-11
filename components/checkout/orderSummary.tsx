import React from 'react'
import {useLocale, useTranslations} from 'next-intl'
import { useCart } from '@/context/Cart';
import { useOrderState } from '@/context/OrderStateContext';
import OrderAttribute from '../cart/orderAttribute';
import Image from 'next/image';
import { useToken } from '@/context/Token';
import postRequest from '@/lib/post';
import toastHelper from '@/lib/toastHelper';
import getRequest from '@/lib/getter';
import { useRouter, usePathname } from 'next/navigation';
import { CartItem } from '@/types/cart';
function OrderSummary() {
  const { Cart, setCart } = useCart();
  const { token } = useToken();
  const { orderState, goToPayment, getOrderPayload, updateShippingRates } = useOrderState();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const locale = useLocale();

  const handlePlaceOrder = async() => {
    

    const payload = getOrderPayload();
    const response = await postRequest(`/marketplace/cart/cart-details/${Cart?.id}`, payload, {}, token, locale);
    setCart(response.data.data);
    toastHelper(response.data.status,response.data.message);
    if(response.data.status){
      router.push('/checkout/payment');
    }

  };
  const goToShippingMethod = async() => {
    // Extract product variations from cart items
    const productVariations = Cart?.products?.map(item => ({
      item_id: item.id,
      qty: item.qty,
      attributes: item.attributes || {}
    })) || [];

    const response = await postRequest(`/marketplace/cart/shipping-rates`, {
      user_address_id: orderState.user_address_id,
      order_id: Cart?.id,
      products: productVariations
    }, {}, token, locale);
    
    console.log(response.data.data.shipping_methods);
    // Save shipping rates to order context
    if (response.data && response.data.data) {
      updateShippingRates(response.data.data.shipping_methods);
    }
    
    router.push('/checkout/ShippingMethod');
  }
  const handlePayment = async() => {
        if(orderState.payment_method=='cod'){
      if (!token) {
        console.error('No token available');
        return;
      }
      
      const response = await getRequest(`/payment/cash-on-delivery/${Cart?.id}`, {}, {}, locale, token);
      router.push(`/checkoutConfirmation?orderId=${Cart?.id}`);

      toastHelper(response.status,response.data.message);
    }
  }

  // Helper functions for conditional logic
  const isAmountZero = () => {
    const totalAmount = parseFloat((Cart as { total_amount?: string })?.total_amount || '0');
    return totalAmount === 0;
  };



  const isPaymentMethodSelected = () => {
    return orderState.payment_method && orderState.payment_method !== '';
  };

  const isOnShippingMethodPage = () => {
    return pathname.includes('/ShippingMethod');
  };

  const isOnPaymentPage = () => {
    return pathname.includes('/payment');
  };
  const convertIntoOrder = async() => {
    const response = await postRequest(`/marketplace/cart/convert-into-order`, {
      cart_id: Cart?.id,
    }, {}, token, locale);
    router.push(`/checkoutConfirmation?orderId=${response.data.data.id}`);
  }
  return (
    <div className="lg:col-span-1">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Order Summary')}</h2>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {Cart?.products.map((item: CartItem, index: number) => (
          <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse">
            <Image 
              src={item.image || '/placeholder.jpg'} 
              alt={item.name || 'Product'} 
              width={100} 
              height={100} 
              className="w-16 h-16 object-cover rounded-md" 
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {typeof item.variations === 'string' ? item.variations : ''}
              </p>
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
              <span>{(Cart as { sub_total?: string })?.sub_total || '0'}</span>
            </span>
        </div>
      {
        Cart?.order_attributes?.map((item, index: number) => (
            <OrderAttribute key={index} {...item} t={t} />
        ))
      }
        <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">{t('Total')}</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              <span className="icon-riyal-symbol"></span>
              <span>{(Cart as { total_amount?: string })?.total_amount || '0'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Order State Debug */}
      <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-xs">
        <div className="font-semibold mb-2">Order State:</div>
        <div>Address ID: {orderState.user_address_id || 'Not selected'}</div>
        <div>Shipping: {orderState.shipping_slug || 'Not selected'}</div>
        <div>Payment: {orderState.payment_method || 'Not selected'}</div>
        <div className="mt-2 font-semibold">
          Status: {goToPayment() ? '✅ Complete' : '❌ Incomplete'}
        </div>
      </div>

      {/* Conditional Buttons */}
      
      {/* 1. If amount is 0.00, show Place Order button */}
      {isAmountZero() && (
        <button
          onClick={handlePayment}
          className="w-full mt-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t('Place Order')}
        </button>
      )}

      {/* 2. Go to Shipping Method - Hide if shipping address selected and not on shipping method page */}
      { !isOnShippingMethodPage() && !isOnPaymentPage() ? (
        <button
          onClick={goToShippingMethod}
          className="w-full mt-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t('Go to Shipping Method')}
        </button>
      ) : null}

      {/* 3. Proceed to Payment - Show if payment method not selected and not on payment page */}
      {orderState?.user_address_id &&!isPaymentMethodSelected() && !isOnPaymentPage() && (
        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t('Proceed to Payment')}
        </button>
      )}

      {/* 4. Return to Checkout - Show on payment page */}
      {isOnPaymentPage() && (
        <button
          onClick={router.back}
          className="w-full mt-6 py-3 flex items-center justify-center bg-primary-400 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <span>{t('Return to Checkout')}</span>
        </button>
      )}

      {/* 5. Place Order for COD - Show if payment method is COD and not zero amount */}
      {orderState.payment_method === 'cod' && !isAmountZero() && (
        <button
          onClick={handlePayment}
          className="w-full mt-3 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t('Place Order')}
        </button>
      )}
        {/* 5. Place Order for COD - Show if payment method is COD and not zero amount */}
        {isAmountZero() && (
        <button
          onClick={convertIntoOrder}
          className="w-full mt-3 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t('Place Order')}
        </button>
      )}
     
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
