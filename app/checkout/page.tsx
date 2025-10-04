'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import OrderSummary2 from '@/components/checkout/orderSummary'
import ContactInformation from '@/components/checkout/contactInformation'
import ShippingAddress from '@/components/checkout/shippingAddress'
import ShippingMethod from '@/components/checkout/shippingMethod'
import PaymentMethods from '@/components/checkout/paymentMethods'
import { useCart } from '@/context/CartContext'

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

interface OrderItem {
  title: string;
  image: string;
  color: string;
  size: string;
  qty: number;
  price: string;
}

interface CheckoutFormData {
  // Contact Information
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  
  // Address
  address_option: 'existing' | 'new';
  selected_address: string;
  new_address: string;
  new_apartment: string;
  new_city: string;
  new_state: string;
  new_postal_code: string;
  new_country: string;
  new_lat: string;
  new_lng: string;
  save_address: boolean;
  
  // Shipping
  shipping: string;
  
  // Payment
  payment_method: string;
  card_number: string;
  expiry_date: string;
  cvv: string;
  cardholder_name: string;
}

export default function CheckoutPage() {
  const t = useTranslations();
  const { cartItems } = useCart();
  
  // State
  const [formData, setFormData] = useState<CheckoutFormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address_option: 'existing',
    selected_address: '',
    new_address: '',
    new_apartment: '',
    new_city: '',
    new_state: '',
    new_postal_code: '',
    new_country: 'United States',
    new_lat: '',
    new_lng: '',
    save_address: false,
    shipping: 'standard',
    payment_method: '',
    card_number: '',
    expiry_date: '',
    cvv: '',
    cardholder_name: ''
  });

  const [existingAddresses] = useState<Address[]>([
    {
      id: 1,
      label: 'Home',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postal_code: '10001',
      country: 'United States'
    },
    {
      id: 2,
      label: 'Office',
      address: '456 Business Ave, Suite 200',
      city: 'New York',
      state: 'NY',
      postal_code: '10002',
      country: 'United States'
    }
  ]);

  const [orderItems] = useState<OrderItem[]>([
    {
      title: 'Mercer 7 Inch Chino Shorts',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=80&h=80&fit=crop&crop=center',
      color: 'Blue',
      size: 'M',
      qty: 1,
      price: '200.00'
    },
    {
      title: 'Tutu Dress with Sparkles',
      image: '/assets/images/product-19.jpg',
      color: 'Pink',
      size: 'S',
      qty: 2,
      price: '150.00'
    },
    {
      title: 'Embroidered crew neck T-shirt',
      image: '/assets/images/product-1.jpg',
      color: 'Black',
      size: 'L',
      qty: 1,
      price: '120.00'
    }
  ]);

  // Handlers



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Checkout form submitted:', formData);
    // Handle form submission logic here
  };

  const handleContactInfoSubmit = (values: { first_name: string; last_name: string; email: string; phone: string }) => {
    setFormData(prev => ({
      ...prev,
      ...values
    }));
    console.log('Contact information updated:', values);
  };

  const handleShippingAddressSubmit = (values: {
    address_option: 'existing' | 'new';
    selected_address: string;
    new_address: string;
    new_apartment: string;
    new_city: string;
    new_state: string;
    new_postal_code: string;
    new_country: string;
    new_lat: string;
    new_lng: string;
    save_address: boolean;
  }) => {
    setFormData(prev => ({
      ...prev,
      ...values
    }));
    console.log('Shipping address updated:', values);
  };

  const handleShippingMethodSubmit = (values: { shipping: string }) => {
    setFormData(prev => ({
      ...prev,
      ...values
    }));
    console.log('Shipping method updated:', values);
  };

  const handlePaymentMethodsSubmit = (values: {
    payment_method: string;
    card_number: string;
    expiry_date: string;
    cvv: string;
    cardholder_name: string;
  }) => {
    setFormData(prev => ({
      ...prev,
      ...values
    }));
    console.log('Payment methods updated:', values);
  };

  return (
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
            <form onSubmit={handleSubmit}>
               {/* Contact Information */}
               <ContactInformation 
                 onSubmit={handleContactInfoSubmit}
                 initialValues={{
                   first_name: formData.first_name,
                   last_name: formData.last_name,
                   email: formData.email,
                   phone: formData.phone
                 }}
               />

               {/* Shipping Address */}
               <ShippingAddress 
                 onSubmit={handleShippingAddressSubmit}
                 initialValues={{
                   address_option: formData.address_option,
                   selected_address: formData.selected_address,
                   new_address: formData.new_address,
                   new_apartment: formData.new_apartment,
                   new_city: formData.new_city,
                   new_state: formData.new_state,
                   new_postal_code: formData.new_postal_code,
                   new_country: formData.new_country,
                   new_lat: formData.new_lat,
                   new_lng: formData.new_lng,
                   save_address: formData.save_address
                 }}
                 existingAddresses={existingAddresses}
               />

               {/* Shipping Method */}
               <ShippingMethod 
                 onSubmit={handleShippingMethodSubmit}
                 initialValues={{
                   shipping: formData.shipping
                 }}
               />

              {/* Payment Method */}
              <PaymentMethods 
                onSubmit={handlePaymentMethodsSubmit}
                initialValues={{
                  payment_method: formData.payment_method,
                  card_number: formData.card_number,
                  expiry_date: formData.expiry_date,
                  cvv: formData.cvv,
                  cardholder_name: formData.cardholder_name
                }}
                allowedPaymentMethods={cartItems?.allowed_payment_methods}
              />
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <OrderSummary2 />
        </div>
      </div>
    </section>
  )
}
