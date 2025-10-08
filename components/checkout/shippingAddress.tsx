'use client'
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import CreateNewAddressForm from './CreateNewAddressForm';
import ChooseExistingAddressForm from './ChooseExistingAddressForm';
import { useOrderState } from '@/context/OrderStateContext';

type AddressFormType = 'existing' | 'new';

const ShippingAddressManager: React.FC = () => {
  const t = useTranslations();
  const { orderState, updateUserAddressId } = useOrderState();
  const [formType, setFormType] = useState<AddressFormType>('existing');
  const [selectedAddressId, setSelectedAddressId] = useState<string>(orderState.user_address_id || '');

  const handleAddressCreated = () => {
    // Update order state with new address data
    // For new addresses, we might need to create the address first and get the ID
    // For now, we'll use a placeholder or the address data itself
    updateUserAddressId('new_address_created');
    // Switch to existing addresses view after creating a new one
    setFormType('existing');
  };

  const handleAddressSelected = (addressId: string) => {
    setSelectedAddressId(addressId);
    updateUserAddressId(addressId);
  };

  const handleAddressDeleted = () => {
    setSelectedAddressId('');
    updateUserAddressId('');
  };

  // Sync local state with orderState when it changes
  useEffect(() => {
    setSelectedAddressId(orderState.user_address_id || '');
  }, [orderState.user_address_id]);

  return (
    <div className="space-y-6">
      {/* Form Type Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Shipping Address')}</h2>
        
        <div className="flex space-x-4 rtl:space-x-reverse mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="address_form_type"
              value="existing"
              checked={formType === 'existing'}
              onChange={(e) => setFormType(e.target.value as AddressFormType)}
              className="text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('Use Existing Address')}
            </span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="address_form_type"
              value="new"
              checked={formType === 'new'}
              onChange={(e) => setFormType(e.target.value as AddressFormType)}
              className="text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('Add New Address')}
            </span>
          </label>
        </div>
           {/* Form Components */}
      {formType === 'existing' && (
        <ChooseExistingAddressForm
          onAddressSelected={handleAddressSelected}
          onAddressDeleted={handleAddressDeleted}
        />
      )}

      {formType === 'new' && (
        <CreateNewAddressForm
          onAddressCreated={handleAddressCreated}
        />
      )}
      </div>

   

    
    </div>
  );
};

export default ShippingAddressManager;
