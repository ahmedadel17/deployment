'use client'

import React from 'react'
import DashboardAddresses from './DashboardAddresess'

// Example usage of the Dashboard Addresses components
function AddressesExample() {
  // Example user data
  const user = {
    name: 'Ahmed Al-Rashid',
    email: 'ahmed@example.com',
    initials: 'AR'
  };

  // Example addresses data
  const exampleAddresses = [
    {
      id: 1,
      title: 'Home Address',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'Riyadh',
      state: 'Riyadh Province',
      postalCode: '12345',
      country: 'Saudi Arabia',
      isDefault: true
    },
    {
      id: 2,
      title: 'Work Address',
      addressLine1: '456 Business Avenue',
      addressLine2: 'Suite 100',
      city: 'Jeddah',
      state: 'Makkah Province',
      postalCode: '67890',
      country: 'Saudi Arabia',
      isDefault: false
    }
  ];

  return (
  <>
  

          {/* Main Content - Addresses List */}
          <DashboardAddresses 
            user={user}
            initialAddresses={exampleAddresses}
            />
            </>

  );
}



export default AddressesExample ;
