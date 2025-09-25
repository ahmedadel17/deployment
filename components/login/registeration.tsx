"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'
function Registeration() {
    const searchParams = useSearchParams()
    const phone = searchParams.get('phone')
    console.log(phone)
  return (
    <div>
          {/* <!-- Registration Step (Hidden by default) --> */}
        <div id="register-step" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 ">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Your Account</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">We need a few more details to get started</p>
            </div>

            <form id="register-form" className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-3 py-2"
                        placeholder="Enter your full name"
                        />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-3 py-2"
                        required
                        placeholder="Enter your email address"/>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Phone Number
                    </label>
                    <div className="mt-1 relative">
                        <div className="absolute inset-y-0 start-00 ps-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 dark:text-gray-400 text-sm">+966</span>
                        </div>
                        <input
                            type="tel"
                            id="register-phone"
                            name="register_phone"
                            className="block w-full ps-12 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300"/>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"/>
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="text-gray-700 dark:text-gray-200">
                            I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms of Service</a>
                            and <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
                        </label>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <button
                        type="button"
                        id="back-to-phone"
                        className="te-btn te-btn-default">
                        Back
                    </button>
                    <button
                        type="submit"
                        id="register-submit"
                        className="te-btn te-btn-primary flex-1 flex justify-center items-center">
                        <span id="register-submit-text">Create Account</span>
                        <div id="register-loading" className="hidden ml-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        </div>
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Registeration
