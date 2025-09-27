// Example usage of the DashboardWishlist component
import React from 'react';
import DashboardWishlist from './DashboardWishlist';

export default function WishlistExample() {
  // Example with custom wishlist data
  const customWishlistItems = [
    {
      id: 1,
      title: 'Premium Wireless Headphones',
      image: '/assets/images/headphones-1.jpg',
      price: '299.00',
      originalPrice: '399.00',
      discount: '25%',
      inStock: true,
      variant: 'Black, Noise Cancelling'
    },
    {
      id: 2,
      title: 'Smart Fitness Watch',
      image: '/assets/images/watch-1.jpg',
      price: '199.00',
      inStock: true,
      variant: 'Silver, 44mm'
    },
    {
      id: 3,
      title: 'Limited Edition Sneakers',
      image: '/assets/images/sneakers-1.jpg',
      price: '149.00',
      inStock: false,
      variant: 'White, Size 10'
    }
  ];

  const customUser = {
    name: 'Sarah Al-Mansouri',
    email: 'sarah@example.com',
    initials: 'SM'
  };

  return (
    <div>
      {/* Using with default data */}
      <DashboardWishlist />
      
      {/* Using with custom data */}
      {/* <DashboardWishlist 
        user={customUser}
        initialWishlistItems={customWishlistItems}
      /> */}
    </div>
  );
}
