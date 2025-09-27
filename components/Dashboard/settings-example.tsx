'use client'

import React from 'react'
import DashboardSettings from './DashboardSettings'
import DashboardSidebar from './DashboardSidebar'

// Example usage of the Dashboard Settings component
function SettingsExample() {
  // Example user data
  const user = {
    name: 'Ahmed Al-Rashid',
    email: 'ahmed@example.com',
    initials: 'AR'
  };

  // Example settings data
  const exampleSettings = {
    firstName: 'Ahmed',
    lastName: 'Al-Rashid',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    profilePicture: '/assets/images/default-avatar.jpg',
    dateOfBirth: '1990-01-01',
    gender: 'male',
    language: 'en',
    timezone: 'Asia/Riyadh',
    notifications: {
      email: true,
      sms: true,
      push: true,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <DashboardSidebar user={user} />

          {/* Main Content - Settings */}
          <DashboardSettings 
            user={user}
            initialSettings={exampleSettings}
          />

        </div>
      </div>
    </div>
  );
}

export default SettingsExample;
