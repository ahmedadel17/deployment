import React from 'react'
import Otp2 from '../Otp'

function OTP() {
  return (
        <div id="otp-step" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 ">
            <div className="mb-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Verify Your Phone</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    We sent a verification code to <span id="sent-to-phone" className="font-medium"></span>
                </p>
            </div>

            <form id="otp-form" className="space-y-6">
                <div className="text-center">
                   
                   <Otp2/>
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
                        type="submit"
                        id="otp-submit"
                        className="te-btn te-btn-primary flex-1 flex justify-center items-center">
                        <span id="otp-submit-text">Verify & Sign In</span>
                        <div id="otp-loading" className="hidden ml-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        </div>
                    </button>
                </div>
            </form>
        </div>
  )
}

export default OTP
