'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface TrackingStep {
  label: string;
  date: string;
  status: 'completed' | 'current' | 'pending';
  icon: React.ReactNode;
}

interface OrderItem {
  id: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: string;
}

interface ShippingInfo {
  address: {
    name: string;
    street: string;
    city: string;
    country: string;
  };
  method: {
    name: string;
    duration: string;
    carrier: string;
    trackingNumber: string;
  };
}

interface OrderData {
  orderNumber: string;
  date: string;
  status: string;
  delivery: string;
  items: OrderItem[];
  steps: TrackingStep[];
  shipping: ShippingInfo;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  date: string;
}

interface DashboardTrackProps {
  user?: {
    name: string;
    email: string;
    initials: string;
  };
  initialRecentOrders?: RecentOrder[];
}

function DashboardTrack({ 
  user = { name: 'Ahmed Al-Rashid', email: 'ahmed@example.com', initials: 'AR' },
  initialRecentOrders
}: DashboardTrackProps) {
  
  // Default recent orders data
  const defaultRecentOrders: RecentOrder[] = [
    { id: 'ORD-2024-001234', orderNumber: 'ORD-2024-001234', date: 'Placed Sep 1, 2025' },
    { id: 'ORD-2024-001235', orderNumber: 'ORD-2024-001235', date: 'Placed Aug 28, 2025' },
    { id: 'ORD-2024-001236', orderNumber: 'ORD-2024-001236', date: 'Placed Aug 25, 2025' }
  ];

  const [recentOrders] = useState<RecentOrder[]>(initialRecentOrders || defaultRecentOrders);
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Mock order data
  const mockOrderData: Record<string, OrderData> = {
    'ORD-2024-001234': {
      orderNumber: 'ORD-2024-001234',
      date: 'September 1, 2025',
      status: 'In Transit',
      delivery: 'September 5, 2025',
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
      ],
      steps: [
        {
          label: 'Order Confirmed',
          date: 'Sep 1, 2025 - 10:30 AM',
          status: 'completed',
          icon: (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          )
        },
        {
          label: 'Order Shipped',
          date: 'Sep 2, 2025 - 2:15 PM',
          status: 'completed',
          icon: (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          )
        },
        {
          label: 'In Transit',
          date: 'Sep 3, 2025 - 8:45 AM',
          status: 'current',
          icon: (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
          )
        },
        {
          label: 'Out for Delivery',
          date: 'Expected: Sep 5, 2025',
          status: 'pending',
          icon: (
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          )
        },
        {
          label: 'Delivered',
          date: 'Expected: Sep 5, 2025',
          status: 'pending',
          icon: (
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 18H9" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
              <circle cx="17" cy="18" r="2" />
              <circle cx="7" cy="18" r="2" />
            </svg>
          )
        }
      ],
      shipping: {
        address: {
          name: 'John Doe',
          street: '123 Main Street',
          city: 'Anytown, USA 12345',
          country: 'United States'
        },
        method: {
          name: 'Standard Shipping',
          duration: '3-5 Business Days',
          carrier: 'FedEx',
          trackingNumber: 'TRK123456789'
        }
      }
    },
    'ORD-2024-001235': {
      orderNumber: 'ORD-2024-001235',
      date: 'August 28, 2025',
      status: 'Out for Delivery',
      delivery: 'September 2, 2025',
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
      ],
      steps: [
        {
          label: 'Order Confirmed',
          date: 'Aug 28, 2025 - 9:00 AM',
          status: 'completed',
          icon: (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          )
        },
        {
          label: 'Order Shipped',
          date: 'Aug 28, 2025 - 4:00 PM',
          status: 'completed',
          icon: (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          )
        },
        {
          label: 'In Transit',
          date: 'Aug 30, 2025 - 11:00 AM',
          status: 'completed',
          icon: (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          )
        },
        {
          label: 'Out for Delivery',
          date: 'Sep 1, 2025 - 7:30 AM',
          status: 'current',
          icon: (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          )
        },
        {
          label: 'Delivered',
          date: 'Expected: Sep 2, 2025',
          status: 'pending',
          icon: (
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 18H9" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
              <circle cx="17" cy="18" r="2" />
              <circle cx="7" cy="18" r="2" />
            </svg>
          )
        }
      ],
      shipping: {
        address: {
          name: 'John Doe',
          street: '123 Main Street',
          city: 'Anytown, USA 12345',
          country: 'United States'
        },
        method: {
          name: 'Express Shipping',
          duration: '1-2 Business Days',
          carrier: 'DHL',
          trackingNumber: 'TRK987654321'
        }
      }
    },
    'ORD-2024-001236': {
      orderNumber: 'ORD-2024-001236',
      date: 'August 25, 2025',
      status: 'Delivered',
      delivery: 'August 29, 2025',
      items: [
        {
          id: 'item4',
          name: 'Sneakers',
          image: '/assets/images/product-4.jpg',
          size: '42',
          color: 'White',
          quantity: 1,
          price: '120.00'
        }
      ],
      steps: [
        {
          label: 'Order Confirmed',
          date: 'Aug 25, 2025 - 2:00 PM',
          status: 'completed',
          icon: (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          )
        },
        {
          label: 'Order Shipped',
          date: 'Aug 26, 2025 - 11:00 AM',
          status: 'completed',
          icon: (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          )
        },
        {
          label: 'In Transit',
          date: 'Aug 27, 2025 - 3:00 PM',
          status: 'completed',
          icon: (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          )
        },
        {
          label: 'Out for Delivery',
          date: 'Aug 29, 2025 - 8:00 AM',
          status: 'completed',
          icon: (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          )
        },
        {
          label: 'Delivered',
          date: 'Aug 29, 2025 - 2:00 PM',
          status: 'completed',
          icon: (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 18H9" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
              <circle cx="17" cy="18" r="2" />
              <circle cx="7" cy="18" r="2" />
            </svg>
          )
        }
      ],
      shipping: {
        address: {
          name: 'John Doe',
          street: '123 Main Street',
          city: 'Anytown, USA 12345',
          country: 'United States'
        },
        method: {
          name: 'Standard Shipping',
          duration: '3-5 Business Days',
          carrier: 'UPS',
          trackingNumber: 'TRK456789123'
        }
      }
    }
  };

  const handleTrackOrder = async () => {
    if (!orderId.trim()) {
      setError('Please enter an order ID to track');
      return;
    }

    setIsLoading(true);
    setError('');
    setShowResults(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const orderData = mockOrderData[orderId.toUpperCase()];
      
      if (orderData) {
        setTrackingData(orderData);
        setShowResults(true);
      } else {
        setError('Order not found. Please check the ID and try again.');
      }
    } catch (error) {
      setError('Failed to track order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSelect = (orderId: string) => {
    setOrderId(orderId);
    setError('');
    setShowResults(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'out for delivery':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'in transit':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'processing':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-primary-600';
      case 'current':
        return 'bg-primary-600';
      default:
        return 'bg-gray-300 dark:bg-gray-600';
    }
  };

  const getTextColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'current':
        return 'text-gray-900 dark:text-white';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  const getSecondaryTextColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'current':
        return 'text-gray-600 dark:text-gray-400';
      default:
        return 'text-gray-500 dark:text-gray-500';
    }
  };

  const totalAmount = trackingData?.items.reduce((sum, item) => sum + parseFloat(item.price), 0) || 0;

  return (
    <>
      <div className="lg:col-span-3 space-y-8">
        
        {/* Track Order Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Track Your Order</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Enter your order ID to track your package</p>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter Order ID (e.g., ORD-2024-001234)"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
                />
              </div>
              <button
                onClick={handleTrackOrder}
                disabled={isLoading}
                className={`te-btn te-btn-primary ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Tracking...
                  </>
                ) : (
                  'Track Order'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Select */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Select</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Choose from your recent orders to quickly view tracking details.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentOrders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => handleQuickSelect(order.orderNumber)}
                  className="flex flex-col items-start p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white">#{order.orderNumber}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{order.date}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4 text-sm text-red-700 dark:text-red-200">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.5-1.63 1.768-2.91L13.768 4.31a2 2 0 00-3.536 0L4.31 16.09c-.732 1.28.228 2.91 1.768 2.91z"></path>
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Tracking Results */}
        {showResults && trackingData && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Order #{trackingData.orderNumber}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Placed on {trackingData.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(trackingData.status)}`}>
                    {trackingData.status}
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Expected Delivery</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{trackingData.delivery}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Items</h3>
              <div className="space-y-4">
                {trackingData.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Size: {item.size}, Color: {item.color}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">
                        <span className="icon-riyal-symbol text-xs"></span>
                        {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                  <span>Total:</span>
                  <span>
                    <span className="icon-riyal-symbol"></span>
                    {totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Tracking Progress */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Tracking Progress</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-primary-600"></div>
                <div className="space-y-8">
                  {trackingData.steps.map((step, index) => (
                    <div key={index} className="relative flex items-start">
                      <div className={`flex-shrink-0 w-8 h-8 ${getStepColor(step.status)} rounded-full flex items-center justify-center`}>
                        {step.icon}
                      </div>
                      <div className="ms-4 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h4 className={`text-sm font-medium ${getTextColor(step.status)}`}>{step.label}</h4>
                            <p className={`text-sm ${getSecondaryTextColor(step.status)}`}>{step.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shipping Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Shipping Address</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>{trackingData.shipping.address.name}</p>
                    <p>{trackingData.shipping.address.street}</p>
                    <p>{trackingData.shipping.address.city}</p>
                    <p>{trackingData.shipping.address.country}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Shipping Method</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>{trackingData.shipping.method.name}</p>
                    <p>{trackingData.shipping.method.duration}</p>
                    <p className="mt-2">
                      <span className="font-medium">Carrier:</span> {trackingData.shipping.method.carrier}
                    </p>
                    <p>
                      <span className="font-medium">Tracking Number:</span> {trackingData.shipping.method.trackingNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="#" className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Contact Support</span>
              </Link>
              <Link href="/dashboard/returns" className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Return Item</span>
              </Link>
              <Link href="/dashboard/orders" className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <span className="text-sm font-medium text-gray-900 dark:text-white">View All Orders</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default DashboardTrack;
