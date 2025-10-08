'use client'
import OrderSummary2 from "@/components/checkout/orderSummary";
import { OrderStateProvider } from "@/context/OrderStateContext";
import { useLocale, useTranslations } from "next-intl";
type Props = {
  children: React.ReactNode;
};



export default function ProductsLayout({children}: Props) {
    const t = useTranslations();
    const locale = useLocale();
  return (
    <OrderStateProvider>

    <div className="products-layout">
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
               

            {children}

                

            </div>

            {/* Right Column - Order Summary */}
            <OrderSummary2 />
          </div>
        </div>
      </section>
    </div>
    </OrderStateProvider>
  );
}
