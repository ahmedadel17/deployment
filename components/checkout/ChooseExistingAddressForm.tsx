'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import AddressRadioButton from './AddressRadioButton';
import getRequest from '@/lib/getter';
import tokenGetter from '@/lib/tokenGetter';
import postRequest from '@/lib/post';
import toastHelper from '@/lib/toastHelper';
import { useOrderState } from '@/context/OrderStateContext';

interface Address {
  id: number;
  label: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  street: string;
  contact_phone: string;
  notes: string;
}

interface ChooseExistingAddressFormProps {
  onAddressSelected?: (addressId: string) => void;
  onAddressDeleted?: () => void;
}

const ChooseExistingAddressForm: React.FC<ChooseExistingAddressFormProps> = ({ 
  onAddressSelected, 
  onAddressDeleted 
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const { updateUserAddressId } = useOrderState();
  const [existingAddresses, setExistingAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');

  const getExistingAddresses = useCallback(async() => {
    try {
      setLoading(true);
      const response = await getRequest('/customer/addresses', {}, locale, tokenGetter())
      setExistingAddresses(response.data)
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toastHelper(false, t('Failed to load addresses'))
    } finally {
      setLoading(false);
    }
  }, [locale, t]);

  const handleDeleteAddress = useCallback(async (addressId: number) => {
    try {
      const response = await postRequest(`/customer/delete-address/${addressId}`, {}, {}, tokenGetter(), locale)
      toastHelper(response.data.status, response.data.message)
      getExistingAddresses()
      onAddressDeleted?.()
    } catch {
      toastHelper(false, t('Failed to delete address'))
    }
  }, [locale, getExistingAddresses, t, onAddressDeleted]);

  const handleAddressChange = (addressId: string) => {
    setSelectedAddressId(addressId);
    updateUserAddressId(addressId);
    onAddressSelected?.(addressId);
  };

  useEffect(() => {
    getExistingAddresses()
  }, [getExistingAddresses]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Choose Existing Address')}</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (existingAddresses.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800   border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Choose Existing Address')}</h2>
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">{t('No saved addresses found')}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">{t('Please create a new address first')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800  border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Choose Existing Address')}</h2>

      <div className="space-y-3">
        {existingAddresses.map((addr) => (
          <AddressRadioButton
            key={addr.id}
            address={addr}
            name="selected_address"
            value={addr.id.toString()}
            showDeleteButton={true}
            onDelete={handleDeleteAddress}
            onChange={handleAddressChange}
            checked={selectedAddressId === addr.id.toString()}
          />
        ))}
      </div>

      {selectedAddressId && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-green-800 dark:text-green-200 font-medium">
              {t('Address selected successfully')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseExistingAddressForm;
