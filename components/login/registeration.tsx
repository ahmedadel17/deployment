"use client"
// import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Formik, FormikHelpers } from 'formik';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';
function Registeration() {
  
    interface RegisterFormValues {
        phone: string;
        first_name: string;
        last_name: string;
        email: string;
        terms: boolean;
      }
      const router = useRouter();
      const phone=useSearchParams().get('phone');
      
  return (
    <div>
          {/* <!-- Registration Step (Hidden by default) --> */}
        <div id="register-step" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 ">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Your Account</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">We need a few more details to get started</p>
            </div>

            <Formik<RegisterFormValues>
      initialValues={{ 
        phone: phone || '', 
        first_name: '', 
        last_name: '', 
        email: '', 
        terms: false 
      }}
      validate={(values: RegisterFormValues) => {
        const errors: Partial<Record<keyof RegisterFormValues, string>> = {};
        if (!values.first_name) {
          errors.first_name = 'First name is required';
        }
        if (!values.last_name) {
          errors.last_name = 'Last name is required';
        }
        if (!values.email) {
          errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.phone) {
          errors.phone = 'Phone number is required';
        } else if (!/^5[0-9]{8}$/.test(values.phone)) {
          errors.phone = 'Phone number must start with 5 and be 9 digits';
        }
        if (!values.terms) {
          errors.terms = 'You must agree to the terms';
        }
        return errors;
      }}
      onSubmit={async (values: RegisterFormValues, { setSubmitting, setFieldError }: FormikHelpers<RegisterFormValues>) => {
        try {
            
            // Prepare the data for the API
            const registrationData = {
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
              phone: `+966${values.phone}`,
              terms_accepted: values.terms,
            };
            
            // Uncomment and use the actual API call when ready
            // const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/register", registrationData);
            // console.log('Registration response:', response.data);
            
            // For now, just log the data and show success
            localStorage.setItem('registrationData', JSON.stringify(registrationData));
            router.push("/auth2/otp");
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error("Axios error:", error.response?.data || error.message);
              setFieldError('email', 'Registration failed. Please try again.');
            } else {
              console.error("Unexpected error:", error);
              setFieldError('email', 'An unexpected error occurred. Please try again.');
            }
          } finally {
            setSubmitting(false);
          }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form id="register-form" className="space-y-6" onSubmit={handleSubmit}>
       <div className='flex flex-row gap-4'>
       <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                First Name
            </label>
            <input
                type="text"
                id="first_name"
                name="first_name"
                required
                disabled={isSubmitting}
                className={`block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-3 py-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                placeholder="Enter your First name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
                />
                {errors.first_name && touched.first_name && <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>}
        </div>
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Last Name
            </label>
            <input
                type="text"
                id="last_name"
                name="last_name"
                required
                disabled={isSubmitting}
                className={`block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-3 py-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                placeholder="Enter your Last name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
                />
                {errors.last_name && touched.last_name && <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>}
        </div>
       </div>

        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email Address *
            </label>
            <input
                type="email"
                id="email"
                name="email"
                disabled={isSubmitting}
                className={`block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-3 py-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                required
                placeholder="Enter your email address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                />
                {errors.email && touched.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Phone Number {phone && <span className="text-green-600 text-xs">(Pre-filled from login)</span>}
            </label>
            <div className="mt-1 relative">
                <div className="absolute inset-y-0 start-00 ps-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">+966</span>
                </div>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    maxLength={9}
                    disabled={isSubmitting}
                    className={`block w-full ps-12 pr-3 py-2 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300 ${
                      errors.phone && touched.phone 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="5XXXXXXXX"
                    pattern="5[0-9]{8}"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      // Only allow digits and limit to 9 characters
                      const value = e.target.value.replace(/\D/g, '').slice(0, 9);
                      handleChange({
                        target: {
                          name: 'phone',
                          value: value
                        }
                      } as React.ChangeEvent<HTMLInputElement>);
                    }}
                    onBlur={handleBlur}
                    value={values.phone}
                    />
            </div>
            {errors.phone && touched.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    disabled={isSubmitting}
                    className={`focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.terms === true}
                    />
            </div>
            <div className="ml-3 text-sm">
                {errors.terms && touched.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
                <label htmlFor="terms" className="text-gray-700 dark:text-gray-200">
                    I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms of Service</a>
                    and <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
                </label>
            </div>
        </div>

        <div className="flex space-x-4">
            <Link
                href="/auth2/login"
                type="button"
                id="back-to-phone"
                className="te-btn te-btn-default">
                Back
            </Link>
            <button
                type="submit"
                id="register-submit"
                disabled={isSubmitting}
                className={`te-btn te-btn-primary flex-1 flex justify-center items-center ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
            </button>
        </div>
    </form>
      )}
    </Formik>
           
        </div>
    </div>
  )
}

export default Registeration
