'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
interface ShippingRate {
  id: string;
  name: string;
  cost: number;
  estimated_days: string;
  [key: string]: string | number | boolean;
}

interface OrderState {
  user_address_id: string;
  shipping_slug: string;
  payment_method: string;
  shipping_rates: ShippingRate[];
}

interface OrderStateContextType {
  orderState: OrderState;
  updateUserAddressId: (addressId: string) => void;
  updateShippingSlug: (shippingSlug: string) => void;
  updatePaymentMethod: (paymentMethod: string) => void;
  updateShippingRates: (shippingRates: ShippingRate[]) => void;
  resetOrderState: () => void;
  goToPayment: () => boolean;
  getOrderPayload: () => OrderState;
}

const OrderStateContext = createContext<OrderStateContextType | undefined>(undefined);

export const useOrderState = () => {
  const context = useContext(OrderStateContext);
  if (!context) {
    throw new Error('useOrderState must be used within an OrderStateProvider');
  }
  return context;
};

interface OrderStateProviderProps {
  children: ReactNode;
}

export const OrderStateProvider: React.FC<OrderStateProviderProps> = ({ children }) => {
  const [orderState, setOrderState] = useState<OrderState>({
    user_address_id: '',
    shipping_slug: '',
    payment_method: '',
    shipping_rates: [],
  });

  const updateUserAddressId = (addressId: string) => {
    setOrderState(prev => ({
      ...prev,
      user_address_id: addressId,
    }));
  };

  const updateShippingSlug = (shippingSlug: string) => {
    setOrderState(prev => ({
      ...prev,
      shipping_slug: shippingSlug,
    }));
  };

  const updatePaymentMethod = (paymentMethod: string) => {
    setOrderState(prev => ({
      ...prev,
      payment_method: paymentMethod,
    }));
  };

  const updateShippingRates = (shippingRates: ShippingRate[]) => {
    setOrderState(prev => ({
      ...prev,
      shipping_rates: shippingRates,
    }));
  };

  const resetOrderState = () => {
    setOrderState({
      user_address_id: '',
      shipping_slug: '',
      payment_method: '',
      shipping_rates: [],
    });
  };

  const goToPayment = () => {
    return orderState.user_address_id !== '' && 
           orderState.shipping_slug !== '' 
  };
 

  const getOrderPayload = () => {
    return orderState;
  };

  const value: OrderStateContextType = {
    orderState,
    updateUserAddressId,
    updateShippingSlug,
    updatePaymentMethod,
    updateShippingRates,
    resetOrderState,
    goToPayment,
    getOrderPayload,
  };

  return (
    <OrderStateContext.Provider value={value}>
      {children}
    </OrderStateContext.Provider>
  );
};
