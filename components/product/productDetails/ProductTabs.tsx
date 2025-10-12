'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    {
      id: 'description',
      label: 'Description',
      content: product?.description || product?.short_description || 'No description available for this product.'
    },
    {
      id: 'specifications',
      label: 'Specifications',
      content: product?.specifications ? (
        <div className="space-y-3">
          {Object.entries(product?.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="font-medium text-gray-900 dark:text-white">{key}:</span>
              <span className="text-gray-600 dark:text-gray-400">{value}</span>
            </div>
          ))}
        </div>
      ) : 'No specifications available for this product.'
    },
    {
      id: 'reviews',
      label: 'Reviews',
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {product?.rating || 4.2}
              </div>
              <div className="flex items-center justify-center space-x-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product?.rating || 4.2)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 fill-current'
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Based on {product?.reviews || 89} reviews
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {/* Sample Reviews */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">JD</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">John Doe</div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-3 h-3 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Great product! Exactly as described. Fast shipping and excellent quality.
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">AS</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Alice Smith</div>
                  <div className="flex items-center space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-3 h-3 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                    <svg className="w-3 h-3 text-gray-300 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Good quality and comfortable fit. Would recommend to others.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Tab Headers */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6 dark:text-gray-400">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}


