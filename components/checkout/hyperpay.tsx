// app/payment/page.tsx or pages/payment.tsx
'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useCart } from '@/context/CartContext';
import tokenGetter from '@/lib/tokenGetter';
import { useLocale } from 'next-intl';
import postRequest from '@/lib/post';


export default function PaymentPage() {
  const [checkoutId, setCheckoutId] = useState<string>('');
  const [scriptLoaded, setScriptLoaded] = useState(false);
        const { cartItems } = useCart();
       const locale = useLocale()
  // Fetch checkout ID from YOUR Laravel API
  useEffect(() => {
    const fetchCheckoutId = async () => {
      try {
        console.log('Fetching checkout ID for cart:', cartItems?.id);
        const response = await postRequest('/payment/hyper-pay/prepare-checkout', {
          order_id: cartItems?.id,
          brand:'visa',
        }, {}, tokenGetter(), locale);

        console.log('API Response:', response);
        
        // Check different possible response structures
        const checkoutId = response?.data?.data?.checkoutId || 
                          response?.data?.checkoutId || 
                          response?.checkoutId;
        
        if (checkoutId) {
          console.log('Checkout ID received:', checkoutId);
          setCheckoutId(checkoutId);
        } else {
          console.error('No checkout ID found in response:', response);
        }
      } catch (error) {
        console.error('Error fetching checkout ID:', error);
      }
    };

    if (cartItems?.id) {
      fetchCheckoutId();
    } else {
      console.log('No cart items found, skipping checkout ID fetch');
    }
  }, [cartItems?.id, locale]);

  // Initialize HyperPay widget options
  useEffect(() => {
      // @ts-ignore
      window.wpwlOptions = {
        applePay: {
          version: 3,
          displayName: "MyStore",
          checkAvailability: "canMakePayments",
          style: "white",
          countryCode: "US",
          merchantCapabilities: ["supports3DS"],
          supportedNetworks: ["amex", "discover", "masterCard", "visa"],
        },
      };
  }, [scriptLoaded, checkoutId]);

  return (
    <section className="cart-page">
      <div className="container">
        <div className="cart-content shipping-information-section">
          <div className="row">
            <div className="col-lg-7">

              {checkoutId ? (
                  <>
                  <div className="mb-4 p-3 bg-blue-50 rounded-md">
                    <h3 className="text-sm font-medium text-blue-900">Debug Info:</h3>
                    <p className="text-xs text-blue-700">Checkout ID: {checkoutId}</p>
                    <p className="text-xs text-blue-700">Script Loaded: {scriptLoaded ? 'Yes' : 'No'}</p>
                    <p className="text-xs text-blue-700">Cart ID: {cartItems?.id || 'None'}</p>
                  </div>
                  
                  <form
                    action={`https://ecommerce.demo.asol-tec.com/api/payment/hyper-pay/check-status`}
                    className="paymentWidgets"
                    data-brands="VISA MASTER MADA"
                  ></form>
                    <Script
                        src={`https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`}
                        onLoad={() => {
                          console.log('HyperPay script loaded successfully');
                          setScriptLoaded(true);
                        }}
                        onError={(e) => {
                          console.error('HyperPay script failed to load:', e);
                        }}
                        strategy="afterInteractive"
                    />
                </>
              ) : (
                <div>Loading payment form...</div>
              )}
            </div>
            <div className="col-lg-5 mt-md-30">
              {/* Order summary */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}