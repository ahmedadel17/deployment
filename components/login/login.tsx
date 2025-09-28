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
          errors.phone = 'Required';
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
                router.push("/auth2/Register" );
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
                    className="block w-full ps-16 pr-5 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                    placeholder="5XXXXXXXX"
                    pattern="5[0-9]{8}"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Enter your Saudi phone number (starting with 5)
            </p>
            <p className='text-red-500'>{errors.phone && touched.phone && errors.phone}</p>
        </div>

        <div>
            <button
                type="submit"
                id="phone-submit"
                disabled={isSubmitting}
                className="te-btn te-btn-primary w-full flex justify-center items-center">
                <span id="phone-submit-text">Continue</span>
                <div id="phone-loading" className="hidden ml-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                </div>
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
