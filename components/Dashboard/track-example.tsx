'use client'

import React from 'react'
import DashboardTrack from './DashboardTrack'
import DashboardSidebar from './DashboardSidebar'

// Example usage of the Dashboard Track component
function TrackExample() {
  // Example user data
  const user = {
    name: 'Ahmed Al-Rashid',
    email: 'ahmed@example.com',
    initials: 'AR'
  };

  // Example recent orders data
  const exampleRecentOrders = [
    { id: 'ORD-2024-001234', orderNumber: 'ORD-2024-001234', date: 'Placed Sep 1, 2025' },
    { id: 'ORD-2024-001235', orderNumber: 'ORD-2024-001235', date: 'Placed Aug 28, 2025' },
    { id: 'ORD-2024-001236', orderNumber: 'ORD-2024-001236', date: 'Placed Aug 25, 2025' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <DashboardSidebar user={user} />

          {/* Main Content - Track */}
          <DashboardTrack 
            user={user}
            initialRecentOrders={exampleRecentOrders}
          />

        </div>
      </div>
    </div>
  );
}

export default TrackExample;

