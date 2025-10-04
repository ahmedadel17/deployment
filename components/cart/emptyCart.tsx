import Link from 'next/link'
import React from 'react'
import { useTranslations } from 'next-intl'
function EmptyCart() {
  const t = useTranslations();
  return (
    <div className="text-center py-12">
    <div className="text-gray-400 dark:text-gray-500 mb-4">
      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('Your cart is empty')}</h3>   
    <p className="text-gray-600 dark:text-gray-400 mb-4">{t('Add some items to get started')}</p>
    <Link href="/products" className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
      {t('Continue Shopping')}
    </Link>
  </div>
  )
}

export default EmptyCart
