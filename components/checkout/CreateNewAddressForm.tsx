'use client'
import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useLocale, useTranslations } from 'next-intl';
import FormikInput from '@/components/ui/FormikInput';
import ClientOnly from '@/components/ClientOnly';
import * as Yup from 'yup';
import MapComponent from './map';
import TextArea from '@/components/ui/TextArea';
import CountryPhoneInput from '../phone/CountryPhoneInput';
import postRequest from '@/lib/post';
import tokenGetter from '@/lib/tokenGetter';
import { getCountryDialCodeFromCountryCodeOrNameOrFlagEmoji } from 'country-codes-flags-phone-codes';
import toastHelper from '@/lib/toastHelper';

interface CreateAddressData {
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

interface CreateNewAddressFormProps {
  onAddressCreated?: (addressData: CreateAddressData) => void;
}

const CreateNewAddressForm: React.FC<CreateNewAddressFormProps> = ({ onAddressCreated }) => {
  const t = useTranslations();
  const locale = useLocale();

  const initialValues: CreateAddressData = {
    name: '',
    address: '',
    contact_phone: '',
    countryCode: 'SA',
    house: '',
    street: '',
    notes: '',
    lat: '',
    lng: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required(t('Name is required')).min(2, t('Name must be at least 2 characters')),
    contact_phone: Yup.string().required(t('Phone number is required')).matches(/^[0-9]+$/, t('Phone number must contain only digits')).min(7, t('Phone number must be at least 7 digits')).max(15, t('Phone number must not exceed 15 digits')),
    address: Yup.string().required(t('Address is required')).min(5, t('Address must be at least 5 characters')),
    street: Yup.string().required(t('Street address is required')).min(5, t('Street address must be at least 5 characters')),
    house: Yup.string().notRequired(),
    notes: Yup.string().notRequired().max(500, t('Notes must not exceed 500 characters')),
    lat: Yup.string().required(t('Please select a location on the map')),
    lng: Yup.string().required(t('Please select a location on the map')),
  });

  const onSubmit = async(values: CreateAddressData, { resetForm, setFieldTouched }: FormikHelpers<CreateAddressData>) => {
    // Check if location is selected
    if (!values.lat || !values.lng) {
      toastHelper(false, t('Please select a location on the map'))
      setFieldTouched('lat', true)
      setFieldTouched('lng', true)
      return
    }

    try {
      const phoneCode = getCountryDialCodeFromCountryCodeOrNameOrFlagEmoji(values.countryCode || '')
      const response = await postRequest('/customer/create-address', {
        ...values,
        contact_phone: phoneCode + values.contact_phone
      }, {}, tokenGetter(), locale)
      
      
         toastHelper(response.data.status, response.data.message)
         // Pass the address data to the callback
         onAddressCreated?.(values)
         if(response.data.status){

           resetForm()
         }else{
          
         }
      
    } catch (error) {
      console.error('Error saving address:', error)
      toastHelper(false, t('Failed to save address. Please try again.'))
    }
  }

  return (
    <ClientOnly fallback={
      <div className="bg-white dark:bg-gray-800  border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Create New Address')}</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    }>
      <div className="bg-white dark:bg-gray-800  border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Create New Address')}</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, handleChange, handleBlur, errors, touched, isSubmitting }) => {
            // Debug: Log validation errors
            console.log('Form errors:', errors);
            console.log('Form touched:', touched);
            
            return (
            <Form>
              <div className="space-y-4">
                <MapComponent
                  onLocationSelect={(lat: number, lng: number, address?: string) => {
                    setFieldValue('lat', String(lat));
                    setFieldValue('lng', String(lng));
                    if (address) {
                      setFieldValue('address', address);
                    }
                  }}
                />
                
                {/* Map Location Validation Display */}
                <div className="space-y-2">
                  {(errors.lat || errors.lng) && (touched.lat || touched.lng) && (
                    <div className="text-red-600 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {t('Please select a location on the map')}
                    </div>
                  )}
                  {values.lat && values.lng && !errors.lat && !errors.lng && (
                    <div className="text-green-600 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {t('Location selected successfully')}
                    </div>
                  )}
                </div>

                <FormikInput
                  name="name"
                  label={t('Name')}
                  placeholder="Enter your name"
                  required
                />
                
                <CountryPhoneInput
                  value={values.contact_phone}
                  onChange={(phoneValue, countryCode) => {
                    handleChange({
                      target: {
                        name: 'contact_phone',
                        value: phoneValue
                      }
                    } as React.ChangeEvent<HTMLInputElement>);
                    handleChange({
                      target: {
                        name: 'countryCode',
                        value: countryCode
                      }
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                  onBlur={handleBlur}
                  error={errors.contact_phone}
                  touched={touched.contact_phone}
                  disabled={isSubmitting}
                  label="Phone Number"
                  required
                  initialCountryCode="SA"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormikInput
                    name="address"
                    label={t('Address')}
                    placeholder="123 Main Street"
                    required
                  />
                  <FormikInput
                    name="street"
                    label={t('Street Address')}
                    placeholder="123 Main Street"
                    required
                  />
                  <FormikInput
                    name="house"
                    label={t('Apartment, suite, etc. (optional)')}
                    placeholder="Apt 4B"
                  />
                </div>
                
                <TextArea
                  name="notes"
                  label={t('Notes') as string}
                  placeholder={t('Add any delivery notes (optional)') as string}
                  rows={4}
                />

                {/* Hidden lat/lng fields */}
                <input type="hidden" name="lat" value={values.lat} />
                <input type="hidden" name="lng" value={values.lng} />

                <button type="submit" className="te-btn te-btn-primary w-full" disabled={isSubmitting}>
                  {isSubmitting ? t('Saving...') : t('Save Address')}
                </button>
              </div>
            </Form>
            );
          }}
        </Formik>
      </div>
    </ClientOnly>
  );
};

export default CreateNewAddressForm;
