
"use client"
import React, { useState } from 'react'
import {useTranslations} from 'next-intl';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

function HeaderSearch() {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const isRTL = locale === 'ar';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="hidden lg:block w-96">
      <form onSubmit={handleSearch} className="relative w-full" style={{ position: 'relative' }}>
        {/* Search icon inside the input (left side) */}
        <div 
          className="absolute ltr:left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" 
          style={{ 
            position: 'absolute', 
            zIndex: 30,
            left: isRTL ? 'auto' : '12px',
            right: isRTL ? '12px' : 'auto',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '16px',
            height: '16px'
          }}
        >
          <svg 
            className="w-full h-full" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m21 21-4.34-4.34"></path>
            <circle cx="11" cy="11" r="8"></circle>
          </svg>
        </div>

        {/* Search input with proper padding for both icon and button */}
        <input 
          type="text" 
          id="navbar-search-ecommerce" 
          name="product_search" 
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full ltr:pl-10 rtl:pr-10 ltr:pr-12 rtl:pl-12 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200" 
          style={{ 
            paddingLeft: isRTL ? '48px' : '40px',
            paddingRight: isRTL ? '40px' : '48px',
            position: 'relative',
            zIndex: 10
          }}
          placeholder={t("Search products")}
          autoComplete="off" 
          aria-label="Search products"
        />

        {/* Search button inside the input (right side) */}
        <button 
          type="submit"
          className="absolute ltr:right-1 rtl:left-1 top-1/2 transform -translate-y-1/2 p-1.5 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-md transition-colors duration-200" 
          style={{ 
            position: 'absolute',
            right: isRTL ? 'auto' : '4px',
            left: isRTL ? '4px' : 'auto',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 30,
            padding: '6px',
            backgroundColor: 'rgb(59 130 246)',
            color: 'white',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer'
          }}
          aria-label="Search"
        >
          <svg 
            className="w-4 h-4" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m21 21-4.34-4.34"></path>
            <circle cx="11" cy="11" r="8"></circle>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default HeaderSearch
