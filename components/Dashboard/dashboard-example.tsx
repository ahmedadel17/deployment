// Example usage of the Dashboard component
import React from 'react';
import Dashboard from './dashboard';

export default function DashboardExample() {
  // Example with custom data
  const customData = {
    user: {
      name: 'Sarah Al-Mansouri',
      email: 'sarah@example.com',
      initials: 'SM'
    },
    stats: {
      walletBalance: '125.50',
      rewardPoints: 2500,
      totalSpent: '450.75',
      wishlistItems: 8,
      totalOrders: 25
    },
    loyalty: {
      currentLevel: 'Gold',
      nextLevel: 'Platinum',
      pointsToNext: 500,
      progressPercentage: 75
    },
    recentOrders: [
      { id: 'ORD-2024-001240', date: 'October 15, 2024', status: { text: 'Delivered', color: 'green' }, total: '125.00' },
      { id: 'ORD-2024-001239', date: 'October 10, 2024', status: { text: 'Shipped', color: 'blue' }, total: '89.50' },
      { id: 'ORD-2024-001238', date: 'October 5, 2024', status: { text: 'Processing', color: 'yellow' }, total: '67.25' }
    ],
    wishlistItems: [
      { title: 'Designer Handbag', image: '/assets/images/handbag-1.jpg', price: '299.00' },
      { title: 'Silk Scarf', image: '/assets/images/scarf-1.jpg', price: '89.00' },
      { title: 'Leather Shoes', image: '/assets/images/shoes-1.jpg', price: '199.00' },
      { title: 'Gold Watch', image: '/assets/images/watch-1.jpg', price: '599.00' }
    ]
  };

  return (
    <div>
      {/* Using with default data */}
      <Dashboard />
      
      {/* Using with custom data */}
      {/* <Dashboard data={customData} /> */}
    </div>
  );
}
