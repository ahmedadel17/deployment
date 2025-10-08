'use client'
import PaymentMethods from '@/components/checkout/paymentMethods'
import React, { useEffect } from 'react'
import { useOrderState } from '@/context/OrderStateContext'
import { useRouter } from 'next/navigation';

function Payment() {
  const { orderState,goToPayment } = useOrderState();
  const router = useRouter();
  useEffect(() => {
    if(!goToPayment()){
      router.push('/checkout');
    }
  }, []);
  if(!goToPayment()){
    router.push('/checkout');
  }

  return (
    <div>
                 <PaymentMethods />

    </div>
  )
}

export default Payment
