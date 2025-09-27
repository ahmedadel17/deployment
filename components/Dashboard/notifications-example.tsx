// Example usage of the DashboardNotification component
import React from 'react';
import DashboardNotification from './dashboardNotification';

export default function NotificationsExample() {
  // Example with custom notifications data
  const customNotifications = [
    {
      id: 1,
      type: 'order' as const,
      title: 'Order Shipped',
      message: 'Your order #ORD-2024-001240 has been shipped and is on its way.',
      time: '1 hour ago',
      unread: true,
      icon: '🚚'
    },
    {
      id: 2,
      type: 'promotion' as const,
      title: 'Flash Sale',
      message: '50% off on all electronics! Sale ends in 2 hours.',
      time: '3 hours ago',
      unread: true,
      icon: '⚡'
    },
    {
      id: 3,
      type: 'system' as const,
      title: 'Account Verified',
      message: 'Your email address has been successfully verified.',
      time: '1 day ago',
      unread: false,
      icon: '✅'
    }
  ];

  const customSettings = {
    orderUpdates: true,
    promotions: false,
    systemUpdates: true
  };

  const customUser = {
    name: 'Sarah Al-Mansouri',
    email: 'sarah@example.com',
    initials: 'SM'
  };

  return (
    <div>
      {/* Using with default data */}
      <DashboardNotification />
      
      {/* Using with custom data */}
      {/* <DashboardNotification 
        user={customUser}
        initialNotifications={customNotifications}
        initialSettings={customSettings}
      /> */}
    </div>
  );
}
