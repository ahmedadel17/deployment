"use client"
import { Formik, FormikHelpers } from 'formik';
import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
function Login() {
    interface PhoneFormValues {
        phone: string;
      }
      const router = useRouter();
  return (
  
<>


        {/* <!-- Logo/Header --> */}
      

        {/* <!-- Phone Number Step --> */}
        <div id="phone-step" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">

           
        <Formik<PhoneFormValues>
      initialValues={{ phone: ''}}
      validate={(values: PhoneFormValues) => {
        const errors: Partial<Record<keyof PhoneFormValues, string>> = {};
        
        if (!values.phone) {
          errors.phone = 'Phone number is required';
        } else if (!/^5[0-9]{8}$/.test(values.phone)) {
          errors.phone = 'Please enter a valid Saudi phone number (5XXXXXXXX)';
        } else if (values.phone.length !== 9) {
          errors.phone = 'Phone number must be exactly 9 digits';
        }
        
        return errors;
      }}
      onSubmit={async (values: PhoneFormValues, { setSubmitting, setFieldError }: FormikHelpers<PhoneFormValues>) => {
        try {
            console.log('Login attempt with phone:', values.phone);
            
            const phoneData = { phone: `+966${values.phone}` };
            
            const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+"/auth/check-exists-user", phoneData);
            console.log('API response:', response.data);
            
            if(response.data.data.registered){
               router.push("/auth2/otp?phone="+ values.phone);
            }
            else{
                console.log('User not registered, redirecting to registration');
                router.push("/auth2/Register?phone="+ values.phone);
            }
        
          } catch (error) {
            console.error('Login error:', error);
            if (axios.isAxiosError(error)) {
              console.error("Axios error:", error.response?.data || error.message);
              setFieldError('phone', 'Login failed. Please check your phone number and try again.');
            } else {
              console.error("Unexpected error:", error);
              setFieldError('phone', 'An unexpected error occurred. Please try again.');
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
        <form id="phone-form" className="space-y-6" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Phone Number
            </label>
            <div className="mt-1 relative">
                <div className="absolute inset-y-0 start-00 ps-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">+966</span>
                </div>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    maxLength={9}
                    disabled={isSubmitting}
                    className={`block w-full ps-16 pr-5 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white ${
                      errors.phone && touched.phone 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-600' : ''}`}
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
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Enter your Saudi phone number (starting with 5)
            </p>
            {errors.phone && touched.phone && (
              <p className="mt-1 text-xs text-red-500 dark:text-red-400 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.phone}
              </p>
            )}
            {!errors.phone && touched.phone && values.phone && /^5[0-9]{8}$/.test(values.phone) && (
              <p className="mt-1 text-xs text-green-500 dark:text-green-400 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Valid phone number
              </p>
            )}
        </div>

        <div>
            <button
                type="submit"
                id="phone-submit"
                disabled={isSubmitting}
                className={`te-btn te-btn-primary w-full flex justify-center items-center ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span>Checking...</span>
                  </>
                ) : (
                  <span>Continue</span>
                )}
            </button>
        </div>
    </form>
      )}
    </Formik>
    </div>

</>

    



     

   
  )
}

export default Login
