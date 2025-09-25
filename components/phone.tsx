"use client"
import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import axios from 'axios';
import {useRouter} from 'next/navigation';
interface PhoneFormValues {
  phone: string;
}
const Basic = () => {

const router = useRouter();
 return( <div>
    <h1>Anywhere in your app!</h1>
    <Formik<PhoneFormValues>
      initialValues={{ phone: ''}}
      validate={(values: PhoneFormValues) => {
        const errors: Partial<Record<keyof PhoneFormValues, string>> = {};
        if (!values.phone) {
          errors.phone = 'Required';
        } 
        return errors;
      }}
      onSubmit={async (values: PhoneFormValues, { setSubmitting }: FormikHelpers<PhoneFormValues>) => {
        try {
            const response = await axios.post("https://ecommerce.demo.asol-tec.com/api/auth/check-exists-user", ({phone: String(values.phone)}));
            if(response.data.data.registered){
               router.push("/auth/otp");
            }
        
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error("Axios error:", error.response?.data || error.message);
            } else {
              console.error("Unexpected error:", error);
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
        <form onSubmit={handleSubmit}>
          <input
            className='border-2 border-gray-300 rounded-md p-2 d-block w-full mt-2 mb-2'
            placeholder='Enter your phone number'
            type="text"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
          />
          <p className='text-red-500'>{errors.phone && touched.phone && errors.phone}</p>
         
          <button type="submit" disabled={isSubmitting} className='bg-blue-500 text-white rounded-md p-2 d-block w-full'>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>)

}


export default Basic;