
import React from 'react'

function HeaderSearch() {
  return (
    <div className="hidden lg:block w-96">
      <div className="relative">
        {/* Search icon inside the input (left side) */}
        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21 21-4.34-4.34"></path>
          <circle cx="11" cy="11" r="8"></circle>
        </svg>

        {/* Search input with padding for both icon and button */}
        <input 
          type="text" 
          id="navbar-search-ecommerce" 
          name="product_search" 
          className="w-full pl-10 pr-12 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200" 
          placeholder="Search products..." 
          autoComplete="off" 
          aria-label="Search products"
        />

        {/* Search button inside the input (right side) */}
        <button className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 bg-primary-200 hover:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-300 text-white rounded-lg transition-colors duration-200" aria-label="Search">
          <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21 21-4.34-4.34"></path>
            <circle cx="11" cy="11" r="8"></circle>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default HeaderSearch
