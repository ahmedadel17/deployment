'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DashboardSidebar from './DashboardSidebar'

interface Order {
  id: string;
  date: string;
  status: {
    text: string;
    color: string;
  };
  total: string;
}

interface WishlistItem {
  title: string;
  image: string;
  price: string;
}

interface DashboardData {
  user: {
    name: string;
    email: string;
    initials: string;
  };
  stats: {
    walletBalance: string;
    rewardPoints: number;
    totalSpent: string;
    wishlistItems: number;
    totalOrders: number;
  };
  loyalty: {
    currentLevel: string;
    nextLevel: string;
    pointsToNext: number;
    progressPercentage: number;
  };
  recentOrders: Order[];
  wishlistItems: WishlistItem[];
}

interface DashboardProps {
  data?: Partial<DashboardData>;
}

function Dashboard({ data }: DashboardProps) {
  // Default data
  const defaultData: DashboardData = {
    user: {
      name: 'Ahmed Al-Rashid',
      email: 'ahmed@example.com',
      initials: 'AR'
    },
    stats: {
      walletBalance: '50.00',
      rewardPoints: 1250,
      totalSpent: '65.00',
      wishlistItems: 12,
      totalOrders: 12
    },
    loyalty: {
      currentLevel: 'Silver',
      nextLevel: 'Gold',
      pointsToNext: 750,
      progressPercentage: 50
    },
    recentOrders: [
      { id: 'ORD-2024-001234', date: 'September 1, 2025', status: { text: 'Delivered', color: 'green' }, total: '65.00' },
      { id: 'ORD-2024-001233', date: 'August 28, 2025', status: { text: 'Shipped', color: 'blue' }, total: '85.00' },
      { id: 'ORD-2024-001232', date: 'August 20, 2025', status: { text: 'Processing', color: 'yellow' }, total: '45.00' }
    ],
    wishlistItems: [
      { title: 'Straight-leg jeans', image: '/assets/images/product-1.jpg', price: '65.00' },
      { title: 'Cotton T-shirt', image: '/assets/images/product-2.jpg', price: '65.00' },
      { title: 'Straight-leg jeans', image: '/assets/images/product-3.jpg', price: '65.00' },
      { title: 'Striped T-shirt', image: '/assets/images/product-4.jpg', price: '65.00' }
    ]
  };

  const dashboardData = { ...defaultData, ...data };

  const getStatusColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      green: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      blue: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      red: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
    };
    return colorMap[color] || colorMap.green;
  };

  return (
    <div className="lg:col-span-3 space-y-8">
            
    {/* Welcome Section */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Welcome back, {dashboardData.user.name.split(' ')[0]}!
      </h1>
      <p className="text-gray-600 dark:text-gray-400">Here&apos;s what&apos;s happening with your account</p>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Wallet Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
              <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
            </svg>
          </div>
          <div className="ms-4">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              <span>$</span><span>{dashboardData.stats.walletBalance}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Wallet Balance</p>
          </div>
        </div>
      </div>

      {/* Points Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <div className="ms-4">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{dashboardData.stats.rewardPoints.toLocaleString()}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Reward Points</p>
          </div>
        </div>
      </div>

      {/* Total Spent Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" width="13" height="15" viewBox="0 0 13 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.37833 14.7315L12.153 13.917L12.7727 12.3003L7.99858 13.1148L7.37833 14.7315Z"></path>
              <path d="M9.09164 8.45597L12.3802 7.89488L13 6.27819L9.14046 6.9369L9.31351 1.58047L7.7836 2.80667L7.6416 7.19279L6.19205 7.4403L6.40998 0.731445L4.88006 1.95765L4.69468 7.6952L1.52292 8.23656L0.903169 9.85325L4.64587 9.21476L4.58522 11.0933L0.664042 11.7623L0.0437927 13.3785L4.3244 12.6478C4.51817 12.6148 4.6932 12.5132 4.81794 12.3619L5.90559 11.0435C6.02097 10.9039 6.08654 10.7299 6.09246 10.5489L6.14373 8.95838L7.59328 8.71087L7.49714 11.6879L12.3142 10.866L12.9339 9.24927L9.04431 9.91291L9.09164 8.45498V8.45597Z"></path>
            </svg>
          </div>
          <div className="ms-4">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              <span className="icon-riyal-symbol"></span>
              <span>{dashboardData.stats.totalSpent}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
          </div>
        </div>
      </div>

      {/* Wishlist Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <div className="ms-4">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{dashboardData.stats.wishlistItems}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Wishlist Items</p>
          </div>
        </div>
      </div>

      {/* Total Orders Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <div className="ms-4">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{dashboardData.stats.totalOrders}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
          </div>
        </div>
      </div>
    </div>

    {/* Loyalty Level Section */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Loyalty Status</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You are currently a <span className="font-bold text-primary-600">{dashboardData.loyalty.currentLevel}</span> member.
            You&apos;re only <span className="font-bold">{dashboardData.loyalty.pointsToNext} points</span> away from reaching <span className="font-bold text-yellow-500">{dashboardData.loyalty.nextLevel}</span>!
          </p>
        </div>
        <Link href="/dashboard/rewards" className="text-primary-600 hover:text-primary-700 dark:text-primary-100 dark:hover:text-primary-400 text-sm font-medium">
          See Benefits
        </Link>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${dashboardData.loyalty.progressPercentage}%` }}
        ></div>
      </div>
    </div>

    {/* Recent Orders */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
        <Link href="/dashboard/orders" className="text-sm font-medium text-primary-600 hover:text-primary-700">
          View All
        </Link>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Order ID</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Total</th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentOrders.map((order, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{order.id}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColorClasses(order.status.color)}`}>
                      {order.status.text}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="icon-riyal-symbol text-xs"></span>
                    <span>{order.total}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href="#" className="font-medium text-primary-600 dark:text-primary-100 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Wishlist */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Wishlist</h2>
        <Link href="/dashboard/wishlist" className="text-sm font-medium text-primary-600 hover:text-primary-700">
          View All
        </Link>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dashboardData.wishlistItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden group">
              <div className="relative w-full aspect-square">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{item.title}</h3>
                <p className="text-base text-gray-900 dark:text-white font-semibold mt-1">
                  <span className="icon-riyal-symbol text-xs"></span>
                  <span>{item.price}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
}

export default Dashboard;
