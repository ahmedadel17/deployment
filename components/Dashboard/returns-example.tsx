'use client'

import React from 'react'
import DashboardReturns from './DashboardReturns'
import DashboardSidebar from './DashboardSidebar'

// Example usage of the Dashboard Returns component
function ReturnsExample() {
  // Example user data
  const user = {
    name: 'Ahmed Al-Rashid',
    email: 'ahmed@example.com',
    initials: 'AR'
  };

  // Example orders data
  const exampleOrders = [
    {
      id: 'ORD-2024-001234',
      orderNumber: 'ORD-2024-001234',
      date: 'September 1, 2025',
      status: 'Delivered',
      items: [
        {
          id: 'item1',
          name: 'Straight-leg jeans',
          image: '/assets/images/product-1.jpg',
          size: 'M',
          color: 'Blue',
          quantity: 1,
          price: '65.00'
        },
        {
          id: 'item2',
          name: 'Cotton T-shirt',
          image: '/assets/images/product-2.jpg',
          size: 'L',
          color: 'White',
          quantity: 2,
          price: '130.00'
        }
      ]
    },
    {
      id: 'ORD-2024-001233',
      orderNumber: 'ORD-2024-001233',
      date: 'August 28, 2025',
      status: 'Delivered',
      items: [
        {
          id: 'item3',
          name: 'Designer Handbag',
          image: '/assets/images/product-3.jpg',
          size: 'One Size',
          color: 'Black',
          quantity: 1,
          price: '299.00'
        }
      ]
    }
  ];

  // Example return requests data
  const exampleReturnRequests = [
    {
      id: 'RET-2024-001',
      orderNumber: 'ORD-2024-001230',
      date: 'August 20, 2025',
      status: 'processing' as const,
      items: [
        {
          name: 'Denim Jacket',
          image: '/assets/images/product-3.jpg',
          reason: 'Wrong size received',
          type: 'exchange' as const,
          amount: '89.00'
        }
      ]
    },
    {
      id: 'RET-2024-002',
      orderNumber: 'ORD-2024-001229',
      date: 'August 15, 2025',
      status: 'completed' as const,
      items: [
        {
          name: 'Sneakers',
          image: '/assets/images/product-4.jpg',
          reason: 'Defective item',
          type: 'refund' as const,
          amount: '120.00'
        }
      ]
    }
  ];

  return (
   <>
   
   
   {/* Main Content - Returns */}
   <DashboardReturns 
     user={user}
     initialOrders={exampleOrders}
     initialReturnRequests={exampleReturnRequests}
   />
   </>


      
  );
}

export default ReturnsExample;
