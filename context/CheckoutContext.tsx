'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
interface Address {
  id: number;
  label: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface NewAddressData {
  name: string;
  address: string;
  contact_phone: string;
  countryCode: string;
  house: string;
  street: string;
  notes: string;
  lat: string;
  lng: string;
}

interface PaymentMethodData {
  payment_method: string;
  card_number: string;
  expiry_date: string;
  cvv: string;
  cardholder_name: string;
}

interface CheckoutData {
  // Address selection
  addressType: 'existing' | 'new';
  selectedAddressId: string | null;
  newAddressData: NewAddressData | null;
  
  // Shipping method
  shippingMethod: string | null;
  
  // Payment method
  paymentMethod: string | null;
  paymentData: PaymentMethodData | null;
  
  // Validation states
  isAddressValid: boolean;
  isShippingValid: boolean;
  isPaymentValid: boolean;
}

interface CheckoutContextType {
  checkoutData: CheckoutData;
  updateAddressType: (type: 'existing' | 'new') => void;
  updateSelectedAddress: (addressId: string | null) => void;
  updateNewAddressData: (data: NewAddressData | null) => void;
  updateShippingMethod: (method: string | null) => void;
  updatePaymentMethod: (method: string | null) => void;
  updatePaymentData: (data: PaymentMethodData | null) => void;
  validateCheckout: () => boolean;
  getCheckoutPayload: () => {
    user_address_id?: string;
    shipping_slug?: string;
    new_address_data?: NewAddressData;
    payment_method?: string;
    payment_data?: PaymentMethodData;
  };
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};

interface CheckoutProviderProps {
  children: ReactNode;
}

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    addressType: 'existing',
    selectedAddressId: null,
    newAddressData: null,
    shippingMethod: null,
    paymentMethod: null,
    paymentData: null,
    isAddressValid: false,
    isShippingValid: false,
    isPaymentValid: false,
  });

  const updateAddressType = (type: 'existing' | 'new') => {
    setCheckoutData(prev => ({
      ...prev,
      addressType: type,
      // Reset validation when switching types
      isAddressValid: false,
    }));
  };

  const updateSelectedAddress = (addressId: string | null) => {
    setCheckoutData(prev => ({
      ...prev,
      selectedAddressId: addressId,
      isAddressValid: addressId !== null,
    }));
  };

  const updateNewAddressData = (data: NewAddressData | null) => {
    setCheckoutData(prev => ({
      ...prev,
      newAddressData: data,
      isAddressValid: data !== null && data.lat !== '' && data.lng !== '' && data.name !== '' && data.address !== '',
    }));
  };

  const updateShippingMethod = (method: string | null) => {
    setCheckoutData(prev => ({
      ...prev,
      shippingMethod: method,
      isShippingValid: method !== null,
    }));
  };

  const updatePaymentMethod = (method: string | null) => {
    setCheckoutData(prev => ({
      ...prev,
      paymentMethod: method,
      isPaymentValid: method !== null,
    }));
  };

  const updatePaymentData = (data: PaymentMethodData | null) => {
    setCheckoutData(prev => ({
      ...prev,
      paymentData: data,
    }));
  };

  const validateCheckout = () => {
    return checkoutData.isAddressValid && checkoutData.isShippingValid && checkoutData.isPaymentValid;
  };

  const getCheckoutPayload = () => {
    const payload: {
      user_address_id?: string;
      shipping_slug?: string;
      new_address_data?: NewAddressData;
      payment_method?: string;
      payment_data?: PaymentMethodData;
    } = {};

    if (checkoutData.addressType === 'existing' && checkoutData.selectedAddressId) {
      payload.user_address_id = checkoutData.selectedAddressId;
    } else if (checkoutData.addressType === 'new' && checkoutData.newAddressData) {
      payload.new_address_data = checkoutData.newAddressData;
    }

    if (checkoutData.shippingMethod) {
      payload.shipping_slug = checkoutData.shippingMethod;
    }

    if (checkoutData.paymentMethod) {
      payload.payment_method = checkoutData.paymentMethod;
    }

    if (checkoutData.paymentData) {
      payload.payment_data = checkoutData.paymentData;
    }

    return payload;
  };

  const value: CheckoutContextType = {
    checkoutData,
    updateAddressType,
    updateSelectedAddress,
    updateNewAddressData,
    updateShippingMethod,
    updatePaymentMethod,
    updatePaymentData,
    validateCheckout,
    getCheckoutPayload,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};
