'use client'
import React from 'react';
import { Formik, Form } from 'formik';
import { useTranslations } from 'next-intl';
import FormikInput from '@/components/ui/FormikInput';
import * as Yup from 'yup';

interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface ContactInformationProps {
  onSubmit: (values: ContactFormData) => void;
  initialValues?: ContactFormData;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ 
  onSubmit, 
  initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  }
}) => {
  const t = useTranslations();

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .min(2, t('First name must be at least 2 characters'))
      .required(t('First name is required')),
    last_name: Yup.string()
      .min(2, t('Last name must be at least 2 characters'))
      .required(t('Last name is required')),
    email: Yup.string()
      .email(t('Invalid email address'))
      .required(t('Email is required')),
    phone: Yup.string()
      .min(10, t('Phone number must be at least 10 digits'))
      .required(t('Phone number is required'))
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Contact Information')}</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormikInput
              name="first_name"
              label={t('First Name')}
              placeholder="John"
              autoComplete="given-name"
              required
            />
            
            <FormikInput
              name="last_name"
              label={t('Last Name')}
              placeholder="Doe"
              autoComplete="family-name"
              required
            />
            
            <div className="md:col-span-2">
              <FormikInput
                name="email"
                type="email"
                label={t('Email Address')}
                placeholder="john.doe@example.com"
                autoComplete="email"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <FormikInput
                name="phone"
                type="tel"
                label={t('Phone Number')}
                placeholder="+1 (555) 123-4567"
                autoComplete="tel"
                required
              />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactInformation;