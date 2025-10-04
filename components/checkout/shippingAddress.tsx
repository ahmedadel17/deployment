'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useTranslations } from 'next-intl';
import FormikInput from '@/components/ui/FormikInput';
import ClientOnly from '@/components/ClientOnly';
import * as Yup from 'yup';

interface Address {
  id: number;
  label: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface ShippingAddressData {
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
}

interface ShippingAddressProps {
  onSubmit: (values: ShippingAddressData) => void;
  initialValues?: ShippingAddressData;
  existingAddresses?: Address[];
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({ 
  onSubmit, 
  initialValues = {
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
    save_address: false
  },
  existingAddresses = [
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
  ]
}) => {
  const t = useTranslations();

  const validationSchema = Yup.object({
    address_option: Yup.string().required(),
    selected_address: Yup.string().when('address_option', {
      is: 'existing',
      then: (schema) => schema.required(t('Please select an address')),
      otherwise: (schema) => schema.notRequired()
    }),
    new_address: Yup.string().when('address_option', {
      is: 'new',
      then: (schema) => schema.required(t('Street address is required')),
      otherwise: (schema) => schema.notRequired()
    }),
    new_city: Yup.string().when('address_option', {
      is: 'new',
      then: (schema) => schema.required(t('City is required')),
      otherwise: (schema) => schema.notRequired()
    }),
    new_state: Yup.string().when('address_option', {
      is: 'new',
      then: (schema) => schema.required(t('State is required')),
      otherwise: (schema) => schema.notRequired()
    }),
    new_postal_code: Yup.string().when('address_option', {
      is: 'new',
      then: (schema) => schema.required(t('Postal code is required')),
      otherwise: (schema) => schema.notRequired()
    }),
    new_country: Yup.string().when('address_option', {
      is: 'new',
      then: (schema) => schema.required(t('Country is required')),
      otherwise: (schema) => schema.notRequired()
    })
  });


  return (
    <ClientOnly fallback={
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Shipping Address')}</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    }>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Shipping Address')}</h2>

        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {/* Address Selection Options */}
            <div className="mb-6">
              <div className="flex space-x-4 rtl:space-x-reverse mb-4">
                <label className="flex items-center">
                   <Field
                     type="radio"
                     name="address_option"
                     value="existing"
                     className="text-primary-600"
                     checked={values.address_option === 'existing'}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                       setFieldValue('address_option', e.target.value);
                     }}
                   />
                  <span className="ms-2 text-sm font-medium text-gray-700 dark:text-gray-300">{t('Use Existing Address')}</span>
                </label>
                <label className="flex items-center">
                  <Field
                    type="radio"
                    name="address_option"
                    value="new"
                    className="text-primary-600"
                    checked={values.address_option === 'new'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('address_option', e.target.value);
                    }}
                  />
                  <span className="ms-2 text-sm font-medium text-gray-700 dark:text-gray-300">{t('Add New Address')}</span>
                </label>
              </div>
            </div>

            {/* Existing Addresses Section */}
            {values.address_option === 'existing' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t('Select Saved Address')}</label>
                <div className="space-y-3">
                  {existingAddresses.map((addr) => (
                    <label key={addr.id} className="flex items-start p-4 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <Field
                        type="radio"
                        name="selected_address"
                        value={addr.id.toString()}
                        className="text-primary-600 mt-1"
                      />
                      <div className="ms-3">
                        <div className="font-medium text-gray-900 dark:text-white">{addr.label}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {addr.address}<br />
                          {addr.city}, {addr.state} {addr.postal_code}<br />
                          {addr.country}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* New Address Form */}
            {values.address_option === 'new' && (
              <div className="space-y-4">
                <FormikInput
                  name="new_address"
                  label={t('Street Address')}
                  placeholder="123 Main Street"
                  required
                />
                
                <FormikInput
                  name="new_apartment"
                  label={t('Apartment, suite, etc. (optional)')}
                  placeholder="Apt 4B"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormikInput
                    name="new_city"
                    label={t('City')}
                    placeholder="New York"
                    required
                  />
                  
                  <FormikInput
                    name="new_state"
                    label={t('State')}
                    placeholder="NY"
                    required
                  />
                  
                  <FormikInput
                    name="new_postal_code"
                    label={t('ZIP Code')}
                    placeholder="10001"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('Country')}</label>
                  <Field
                    as="select"
                    name="new_country"
                    className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </Field>
                  <ErrorMessage name="new_country" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                {/* Hidden lat/lng fields */}
                <Field type="hidden" name="new_lat" />
                <Field type="hidden" name="new_lng" />

                {/* Save address option */}
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="save_address"
                    className="text-primary-600"
                  />
                  <label htmlFor="save_address" className="ms-2 text-sm text-gray-700 dark:text-gray-300">{t('Save this address for future use')}</label>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
      </div>
    </ClientOnly>
  );
};

export default ShippingAddress;