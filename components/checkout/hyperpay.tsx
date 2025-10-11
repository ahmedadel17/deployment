// app/payment/page.tsx or pages/payment.tsx
'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useCart } from '@/context/Cart';
import { useToken } from '@/context/Token';
import { useLocale } from 'next-intl';
import postRequest from '@/lib/post';
import { useOrderState } from '@/context/OrderStateContext';
import toastHelper from '@/lib/toastHelper';

interface HyperPayPaymentProps {
  selectedBrand?: string;
}

export default function HyperPayPayment({ selectedBrand }: HyperPayPaymentProps) {
  const url= window.location.origin;
  const [checkoutId, setCheckoutId] = useState<string>('');
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { Cart } = useCart();
  const { token } = useToken();
  const { orderState } = useOrderState();
  const locale = useLocale();
  // Fetch checkout ID from YOUR Laravel API
  useEffect(() => {
    const fetchCheckoutId = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching checkout ID for cart:', Cart?.id, 'with brand:', selectedBrand);
        const response = await postRequest('/payment/hyper-pay/prepare-checkout', {
          order_id: Cart?.id,
          brand: selectedBrand || orderState.payment_method,
        }, {}, token, locale);

        // Check if the response status is false
        if (response?.data?.status === false) {
          toastHelper(false, response?.data?.message || 'Payment preparation failed. Please try again.');
          setIsLoading(false);
          return;
        }
        
        // Check different possible response structures
        const checkoutId = response?.data?.data?.checkoutId || 
                          response?.data?.checkoutId || 
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (response as any)?.checkoutId;
        
        if (checkoutId) {
          setCheckoutId(checkoutId);
          console.log('Checkout ID updated:', checkoutId);
          setIsLoading(false);
        } else {
          console.error('No checkout ID found in response:', response);
          toastHelper(false, 'Failed to prepare payment. Please try again.');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching checkout ID:', error);
        toastHelper(false, 'Payment preparation failed. Please try again.');
        setIsLoading(false);
      }
    };

    if (Cart?.id && selectedBrand) {
      fetchCheckoutId();
    } else {
      console.log('No cart items or brand found, skipping checkout ID fetch');
    }
  }, [Cart?.id, selectedBrand, orderState.payment_method, locale, token]);

  // Initialize HyperPay widget options
  useEffect(() => {
      // @ts-expect-error - HyperPay global object
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
  }, [scriptLoaded, checkoutId, selectedBrand]);

  return (
    <section className="cart-page">
      <div className="container">
        <div className="cart-content shipping-information-section">
          <div className="row">
            <div className="col-lg-7">

              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 animate-spin text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="text-gray-600">Preparing payment...</span>
                  </div>
                </div>
              ) : checkoutId ? (
                  <>
                  <div className="mb-4 p-3 bg-blue-50 rounded-md">
                    <h3 className="text-sm font-medium text-blue-900">Debug Info:</h3>
                    <p className="text-xs text-blue-700">Checkout ID: {checkoutId}</p>
                    <p className="text-xs text-blue-700">Script Loaded: {scriptLoaded ? 'Yes' : 'No'}</p>
                    <p className="text-xs text-blue-700">Cart ID: {Cart?.id || 'None'}</p>
                    <p className="text-xs text-blue-700">Selected Brand: {selectedBrand || 'None'}</p>
                  </div>
                  
                  <form
                    action={`${url}/checkoutConfirmation?orderId=${Cart?.id}`}
                   
                    className="paymentWidgets"
                    data-brands={selectedBrand ? selectedBrand.toUpperCase() : "VISA MASTER MADA"}
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
                <div className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-gray-500 mb-2">Payment form not available</div>
                    <div className="text-sm text-gray-400">Please try again or contact support</div>
                  </div>
                </div>
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