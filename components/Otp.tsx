"use client"
import React, { useEffect, useRef, useState } from "react";
import {useRouter} from 'next/navigation';
import axios from "axios";
import { useSearchParams } from 'next/navigation';
export default function Otp2() {
  const [otp, setOtp] = useState(Array(5).fill("")); // Array with 6 empty strings
  const [registrationData, setRegistrationData] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone');
  useEffect(()=>{
    const registrationData = localStorage.getItem('registrationData');
    setRegistrationData(registrationData);
  },[]);
  
const handleSubmit=async()=>{
  if(!phone){
    const newRegistrationData={...JSON.parse(registrationData || '{}'), otp_code:String(otp.join(''))};
    const response=await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+"/auth/login-or-register", newRegistrationData);
    localStorage.setItem('token', JSON.stringify(response.data.data.token));
  localStorage.removeItem('registrationData');
  router.push("/");



  }else{
    const newRegistrationData={phone:phone, otp_code:String(otp.join(''))};
    const response=await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+"/auth/login-or-register", newRegistrationData);
    localStorage.setItem('token', JSON.stringify(response.data.data.token));
  localStorage.removeItem('registrationData');
  router.push("/");


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
        <div id="otp-form" className="flex gap-2">
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
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                className="shadow-xs flex w-[64px] items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl dark:border-dark-3 dark:bg-white/5"
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
                           disabled>
                           <span id="resend-text">Resend code in </span>
                           <span id="countdown">60</span>s
                       </button>
                   </div>
   
                   <div className="flex space-x-4">
                       <button
                           type="button"
                           id="back-to-phone-from-otp"
                           className="te-btn te-btn-default">
                           Change Phone
                       </button>
                       <button
                           onClick={handleSubmit}
                           id="otp-submit"
                           className="te-btn te-btn-primary flex-1 flex justify-center items-center">
                           <span id="otp-submit-text">Verify & Sign In</span>
                           <div id="otp-loading" className="hidden ml-2">
                               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                           </div>
                       </button>
                   </div>
               </div>

         
        </div>
      </div>
      
    </>
   
  );
}
