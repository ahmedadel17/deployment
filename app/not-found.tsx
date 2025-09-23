'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
 function NotFound() {
  const t =  useTranslations()
  const handleGoBack = () => {
    window.history.back()
  }
  return (
    <div>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
    <div className="max-w-md mx-auto text-center">

        {/* <!-- 404 Number --> */}
        <div className="mb-8">
            <span className="text-8xl font-light text-gray-200 dark:text-gray-700 select-none">
                404
            </span>
        </div>

        {/* <!-- Icon --> */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 dark:bg-gray-700 rounded-full mb-6">
            <svg className="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                <line x1="9" x2="9.01" y1="9" y2="9"></line>
                <line x1="15" x2="15.01" y1="9" y2="9"></line>
            </svg>
        </div>

        {/* <!-- Heading --> */}
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-3">
            {t("Page not found")}
            </h1>

        {/* <!-- Description --> */}
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
            {t("The page you're looking for doesn't exist or has been moved")}. 
            </p>

        {/* <!-- Action Buttons --> */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="te-btn te-btn-primary">
                {t("Go Home")}
                </Link>
            <button onClick={handleGoBack} className="te-btn te-btn-default gap-2 rtl:flex-row-reverse">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 19-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                </svg>
               {t("Go Back")}
                </button>
        </div>

        {/* <!-- Search Box (Optional) --> */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <form role="search" method="get" action="#" className="relative">
                <input type="search" name="s" placeholder="Search..." className="w-full"/>
                <button type="submit" aria-label="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
                    <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m21 21-4.34-4.34"></path>
                        <circle cx="11" cy="11" r="8"></circle>
                    </svg>
                </button>
            </form>
        </div>

        {/* <!-- Help Text --> */}
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-6">
           {t("Still having trouble? Contact support for assistance")}
             </p>
    </div>
</div>
    </div>
  )
}

export default NotFound
