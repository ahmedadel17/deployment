"use client"
import React, { useEffect, useRef, useState } from "react";
import {useRouter} from 'next/navigation';
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import { getCountryDialCodeFromCountryCodeOrNameOrFlagEmoji } from "country-codes-flags-phone-codes";
import tokenGetter from "@/lib/tokenGetter";
export default function Otp2() {
  const [otp, setOtp] = useState(Array(5).fill("")); // 6-digit OTP
  const [registrationData, setRegistrationData] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone');
  const country:string|null=searchParams.get('country');
  useEffect(()=>{
    // Check if we're useEffect(() => {
      const token = tokenGetter()
      if(token){
        router.push('/')
      }
    if (typeof window !== 'undefined') {
      const registrationData = localStorage.getItem('registrationData');
      setRegistrationData(registrationData);
    }
  },[]);
  
const handleSubmit=async()=>{
  setIsSubmitting(true);
  try {
    // Always use registration data from localStorage if available (complete registration flow)
    if(registrationData){
      const newRegistrationData={...JSON.parse(registrationData), otp_code:String(otp.join(''))};
      console.log('Sending complete registration data:', newRegistrationData);
      const response=await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+"/auth/login-or-register", newRegistrationData);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', JSON.stringify(response.data.data.token));
        localStorage.removeItem('registrationData');
      }
      router.push("/");
    }else{
      const phoneCode = getCountryDialCodeFromCountryCodeOrNameOrFlagEmoji(country || '')
      // Fallback: if no registration data, use phone from URL (login flow)
      const newRegistrationData={phone: `${phoneCode}${phone}`, otp_code:String(otp.join(''))};
      console.log('Sending login data:', newRegistrationData);
      const response=await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+"/auth/login-or-register", newRegistrationData);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', JSON.stringify(response.data.data.token));
      }
      router.push("/");
    }
  } catch (error) {
    console.error('OTP verification failed:', error);
    // You can add error handling here (show error message, etc.)
  } finally {
    setIsSubmitting(false);
  }
}

const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // Array of refs for each input field

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const target = e.target as HTMLInputElement;
      const index = inputRefs.current.indexOf(target);
      
      // If current field has content, clear it
      if (target.value) {
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index),
          "",
          ...prevOtp.slice(index + 1),
        ]);
      } else if (index > 0) {
        // If current field is empty and not the first field, move to previous field
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index - 1),
          "",
          ...prevOtp.slice(index),
        ]);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    if (target.value) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    setOtp(digits);
  };

  return (
    <>
  
      <div className="container">
        <div>
        <div id="otp-form" className="space-y-6">
        <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onPaste={handlePaste}
                inputMode="numeric"
                pattern="\\d*"
                autoComplete="one-time-code"
                disabled={isSubmitting}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                className={`shadow-xs flex h-12 w-12 items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:h-14 sm:w-14 sm:text-3xl md:h-16 md:w-16 md:text-4xl dark:border-dark-3 dark:bg-white/5 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            ))}
          </div>
                   <div className="text-center">
   
                       <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center">
                          Enter the 6-digit code sent to your phone
                       </p>
                   </div>
   
                   <div className="text-center">
                       <button
                           type="button"
                           id="resend-otp"
                           className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
                           disabled={isSubmitting}>
                           <span id="resend-text">Resend code in </span>
                           <span id="countdown">60</span>s
                       </button>
                   </div>
   
                   <div className="flex flex-col gap-3 sm:flex-row sm:space-x-4">
                       <button
                           type="button"
                           id="back-to-phone-from-otp"
                           disabled={isSubmitting}
                           className={`te-btn te-btn-default sm:flex-1 ${
                             isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                           }`}>
                           Change Phone
                       </button>
                       <button
                           onClick={handleSubmit}
                           id="otp-submit"
                           disabled={isSubmitting}
                           className={`te-btn te-btn-primary flex-1 flex justify-center items-center ${
                             isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                           }`}>
                           {isSubmitting ? (
                             <>
                               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                               <span>Verifying...</span>
                             </>
                           ) : (
                             <span>Verify & Sign In</span>
                           )}
                       </button>
                   </div>
               </div>

         
        </div>
      </div>
      
    </>
   
  );
}
