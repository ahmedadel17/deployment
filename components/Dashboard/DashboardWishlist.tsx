'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DashboardSidebar from './DashboardSidebar'

interface WishlistItem {
  id: number;
  title: string;
  image: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  inStock: boolean;
  variant?: string;
}

interface DashboardWishlistProps {
  user?: {
    name: string;
    email: string;
    initials: string;
  };
  initialWishlistItems?: WishlistItem[];
}

function DashboardWishlist({ 
  user = { name: 'Ahmed Al-Rashid', email: 'ahmed@example.com', initials: 'AR' },
  initialWishlistItems
}: DashboardWishlistProps) {
  
  // Default wishlist data
  const defaultWishlistItems: WishlistItem[] = [
    {
      id: 1,
      title: 'Straight-leg jeans',
      image: '/assets/images/product-1.jpg',
      price: '65.00',
      originalPrice: '85.00',
      discount: '23%',
      inStock: true,
      variant: 'Blue, Size M'
    },
    {
      id: 2,
      title: 'Cotton T-shirt',
      image: '/assets/images/product-2.jpg',
      price: '45.00',
      inStock: true,
      variant: 'White, Size L'
    },
    {
      id: 3,
      title: 'Designer Handbag',
      image: '/assets/images/product-3.jpg',
      price: '299.00',
      originalPrice: '399.00',
      discount: '25%',
      inStock: true,
      variant: 'Black Leather'
    },
    {
      id: 4,
      title: 'Silk Scarf',
      image: '/assets/images/product-4.jpg',
      price: '89.00',
      inStock: false,
      variant: 'Red Pattern'
    },
    {
      id: 5,
      title: 'Leather Shoes',
      image: '/assets/images/product-5.jpg',
      price: '199.00',
      inStock: true,
      variant: 'Brown, Size 42'
    },
    {
      id: 6,
      title: 'Gold Watch',
      image: '/assets/images/product-6.jpg',
      price: '599.00',
      inStock: true,
      variant: 'Gold, 40mm'
    }
  ];

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(
    initialWishlistItems || defaultWishlistItems
  );
  const [addingToCart, setAddingToCart] = useState<Set<number>>(new Set());

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const addToCart = async (item: WishlistItem) => {
    setAddingToCart(prev => new Set(prev).add(item.id));
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically call your API to add item to cart
      console.log('Adding to cart:', item);
      
      // Show success feedback (you could add a toast notification here)
      alert(`${item.title} added to cart successfully!`);
      
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setAddingToCart(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }
  };

  const totalItems = wishlistItems.length;
  const inStockItems = wishlistItems.filter(item => item.inStock).length;
  const totalValue = wishlistItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
   <>
     <div className="lg:col-span-3 space-y-8">
            
            {/* Wishlist Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {totalItems} item{totalItems !== 1 ? 's' : ''} • {inStockItems} in stock
                    </p>
                  </div>
                  {totalItems > 0 && (
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        <span className="icon-riyal-symbol text-sm"></span>
                        {totalValue.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="product-wished group relative bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        
                        {/* Remove button */}
                        <button 
                          onClick={() => removeFromWishlist(item.id)}
                          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors z-10"
                          title="Remove from wishlist"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>

                        {/* Out of stock overlay */}
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center z-10">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Out of Stock
                            </span>
                          </div>
                        )}

                        {/* Product image */}
                        <div className="aspect-square bg-gray-100 dark:bg-gray-600 rounded-lg mb-4 overflow-hidden">
                          <Image 
                            src={item.image} 
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>

                        {/* Product info */}
                        <div className="space-y-2">
                          <h3 className="text-md font-medium text-gray-900 dark:text-white line-clamp-2">
                            {item.title}
                          </h3>
                          
                          {item.variant && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {item.variant}
                            </p>
                          )}

                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              <span className="icon-riyal-symbol text-xs"></span>
                              {item.price}
                            </p>
                            {item.originalPrice && (
                              <>
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-through">
                                  <span className="icon-riyal-symbol text-xs"></span>
                                  {item.originalPrice}
                                </p>
                                {item.discount && (
                                  <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded-full">
                                    -{item.discount}
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        {/* Add to cart button */}
                        <button 
                          onClick={() => addToCart(item)}
                          disabled={!item.inStock || addingToCart.has(item.id)}
                          className={`product-add-to-cart flex-1 te-btn te-btn-primary flex items-center justify-center gap-2 w-full mt-4 ${
                            !item.inStock ? 'opacity-50 cursor-not-allowed' : ''
                          } ${addingToCart.has(item.id) ? 'opacity-75' : ''}`}
                        >
                          {addingToCart.has(item.id) ? (
                            <>
                              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span className="hidden lg:block">Adding...</span>
                            </>
                          ) : (
                            <>
                              <svg className="icon-cart w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
                                <path d="M8 11V6a4 4 0 0 1 8 0v5" />
                              </svg>
                              <span className="hidden lg:block">
                                {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💝</div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Your wishlist is empty
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      Start adding items you love to your wishlist!
                    </p>
                    <Link 
                      href="/products"
                      className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Browse Products
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            {wishlistItems.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h2>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => {
                      const inStockItems = wishlistItems.filter(item => item.inStock);
                      if (inStockItems.length > 0) {
                        alert(`Adding ${inStockItems.length} in-stock items to cart...`);
                      } else {
                        alert('No in-stock items to add to cart.');
                      }
                    }}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Add All In-Stock to Cart
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm('Are you sure you want to clear your entire wishlist?')) {
                        setWishlistItems([]);
                      }
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Clear Wishlist
                  </button>
                  <Link 
                    href="/products"
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}

          </div>
   </>
  );
}

export default DashboardWishlist;
