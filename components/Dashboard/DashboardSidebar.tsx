'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  url: string;
}

interface DashboardSidebarProps {
  user?: {
    name: string;
    email: string;
    initials: string;
  };
}

function DashboardSidebar({ user = { name: 'John Doe', email: 'john.doe@example.com', initials: 'JD' } }: DashboardSidebarProps) {
  const pathname = usePathname();
  
  const menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>,
      url: '/dashboard',
    },
    {
      title: 'Notification',
      icon: (
        <>
          <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>
        </>
      ),
      url: '/dashboard/notification',
    },
    {
      title: 'My Rewards',
      icon: (
        <>
          <path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"></path>
          <circle cx="12" cy="12" r="10"></circle>
        </>
      ),
      url: '/dashboard/rewards',
    },
    {
      title: 'My Orders',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>,
      url: '/dashboard/orders',
    },
    {
      title: 'Track Order',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>,
      url: '/dashboard/track',
    },
    {
      title: 'Return Items',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>,
      url: '/dashboard/returns',
    },
    {
      title: 'Wishlist',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>,
      url: '/dashboard/wishlist',
    },
    {
      title: 'Addresses',
      icon: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </>
      ),
      url: '/dashboard/addresses',
    },
    {
      title: 'Account Settings',
      icon: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </>
      ),
      url: '/dashboard/settings',
    },
    {
      title: 'Logout',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>,
      url: '/logout',
    },
  ];

  const isActive = (url: string) => {
    return pathname === url || pathname.startsWith(url + '/');
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
    // You can add actual logout functionality like clearing tokens, redirecting, etc.
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          {/* User Profile */}
          <div className="flex items-center mb-6 pb-6 border-b border-gray-200 dark:border-gray-600">
            <div className="w-16 h-16 bg-primary-600 dark:bg-primary-300 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {user.initials}
            </div>
            <div className="ms-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {menuItems.map((item, index) => {
              const activeClass = isActive(item.url)
                ? 'bg-primary-50/20 dark:bg-primary-900/20 text-primary-600 dark:text-primary-100'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700';

              // Handle logout differently
              if (item.title === 'Logout') {
                return (
                  <button
                    key={index}
                    onClick={handleLogout}
                    className={`w-full flex gap-3 items-center px-3 py-2 text-sm font-medium rounded-md ${activeClass} transition-colors duration-200`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                    {item.title}
                  </button>
                );
              }

              return (
                <Link
                  key={index}
                  href={item.url}
                  className={`flex gap-3 items-center px-3 py-2 text-sm font-medium rounded-md ${activeClass} transition-colors duration-200`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
