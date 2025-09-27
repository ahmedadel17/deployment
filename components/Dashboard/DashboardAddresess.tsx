
'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface Address {
  id: number;
  title: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

interface DashboardAddressesProps {
  user?: {
    name: string;
    email: string;
    initials: string;
  };
  initialAddresses?: Address[];
}

function DashboardAddresses({ 
  initialAddresses
}: DashboardAddressesProps) {
  
  // Default addresses data
  const defaultAddresses: Address[] = [
    {
      id: 1,
      title: 'Home Address',
      addressLine1: '123 Main Street',
      city: 'Anytown',
      state: 'CA',
      postalCode: '12345',
      country: 'United States',
      isDefault: true
    },
    {
      id: 2,
      title: 'Work Address',
      addressLine1: '456 Business Avenue',
      addressLine2: 'Suite 100',
      city: 'Cityville',
      state: 'NY',
      postalCode: '67890',
      country: 'United States',
      isDefault: false
    },
    {
      id: 3,
      title: 'Shipping Address',
      addressLine1: '789 Oak Street',
      city: 'Springfield',
      state: 'IL',
      postalCode: '62701',
      country: 'United States',
      isDefault: false
    }
  ];

  const [addresses, setAddresses] = useState<Address[]>(
    initialAddresses || defaultAddresses
  );

  const deleteAddress = (id: number) => {
    if (confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(address => address.id !== id));
    }
  };

  const setDefaultAddress = (id: number) => {
    setAddresses(prev => prev.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
  };

  return (
    <>
      <div className="lg:col-span-3 space-y-8">
        
        {/* Addresses Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Addresses</h1>
              <Link 
                href="/dashboard/addresses/edit" 
                className="te-btn te-btn-primary"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add New Address
              </Link>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div key={address.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{address.title}</h3>
                        {address.isDefault && (
                          <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{address.addressLine1}</p>
                        {address.addressLine2 && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">{address.addressLine2}</p>
                        )}
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{address.country}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      {!address.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(address.id)}
                          className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2 rtl:space-x-reverse">
                    <Link 
                      href={`/dashboard/addresses/edit?id=${address.id}`}
                      className="text-sm font-medium text-primary-600 dark:text-primary-100 hover:underline"
                    >
                      Edit
                    </Link>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <button
                      onClick={() => deleteAddress(address.id)}
                      className="text-sm font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📍</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No addresses saved
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Add your first address to make checkout faster!
                </p>
                <Link 
                  href="/dashboard/addresses/edit"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Address
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Address Management Tips */}
        {addresses.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Address Management Tips
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Set a default address for faster checkout</li>
              <li>• Keep your addresses up to date for accurate delivery</li>
              <li>• You can have multiple addresses for different purposes</li>
            </ul>
          </div>
        )}

      </div>
    </>
  );
}

export default DashboardAddresses;
