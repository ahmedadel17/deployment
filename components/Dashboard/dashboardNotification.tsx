'use client'

import React, { useState } from 'react'
import DashboardSidebar from './DashboardSidebar'

interface Notification {
  id: number;
  type: 'order' | 'system' | 'promotion';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  icon: string;
}

interface NotificationSettings {
  orderUpdates: boolean;
  promotions: boolean;
  systemUpdates: boolean;
}

interface DashboardNotificationProps {
  user?: {
    name: string;
    email: string;
    initials: string;
  };
  initialNotifications?: Notification[];
  initialSettings?: NotificationSettings;
}

function DashboardNotification({ 
  user = { name: 'Ahmed Al-Rashid', email: 'ahmed@example.com', initials: 'AR' },
  initialNotifications,
  initialSettings = { orderUpdates: true, promotions: true, systemUpdates: true }
}: DashboardNotificationProps) {
  
  // Default notifications data
  const defaultNotifications: Notification[] = [
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #ORD-2024-001234 has been delivered successfully.',
      time: '2 hours ago',
      unread: true,
      icon: '📦'
    },
    {
      id: 2,
      type: 'system',
      title: 'Profile Updated',
      message: 'Your profile information has been updated successfully.',
      time: '1 day ago',
      unread: true,
      icon: '👤'
    },
    {
      id: 3,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #ORD-2024-001233 is on its way.',
      time: '2 days ago',
      unread: false,
      icon: '🚚'
    },
    {
      id: 4,
      type: 'promotion',
      title: 'Special Offer',
      message: 'Get 20% off on your next order. Limited time offer!',
      time: '3 days ago',
      unread: false,
      icon: '🎉'
    },
    {
      id: 5,
      type: 'system',
      title: 'Password Changed',
      message: 'Your password was changed successfully.',
      time: '5 days ago',
      unread: false,
      icon: '🔒'
    },
    {
      id: 6,
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order #ORD-2024-001232 has been confirmed and is being processed.',
      time: '1 week ago',
      unread: false,
      icon: '✅'
    }
  ];

  const [notifications, setNotifications] = useState<Notification[]>(
    initialNotifications || defaultNotifications
  );
  const [settings, setSettings] = useState<NotificationSettings>(initialSettings);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, unread: false }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const updateSetting = (key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
   <>
      {/* Main Content */}
      <div className="lg:col-span-3 space-y-8">
            
            {/* Notifications Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                    {unreadCount > 0 && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${
                        notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-4 rtl:space-x-reverse">
                        <div className="text-2xl">{notification.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className={`text-sm font-medium text-gray-900 dark:text-white ${
                              notification.unread ? 'font-semibold' : ''
                            }`}>
                              {notification.title}
                              {notification.unread && (
                                <span className="ms-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                              )}
                            </h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {notification.time}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                            {notification.message}
                          </p>
                          <div className="mt-2 flex space-x-2 rtl:space-x-reverse">
                            {notification.unread && (
                              <button 
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                              >
                                Mark as read
                              </button>
                            )}
                            <button 
                              onClick={() => deleteNotification(notification.id)}
                              className="text-xs text-red-600 dark:text-red-400 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  /* Empty State */
                  <div className="p-12 text-center">
                    <div className="text-6xl mb-4">🔔</div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No notifications
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      You&apos;re all caught up! Check back later for new notifications.
                    </p>
                  </div>
                )}

              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Notification Settings
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  
                  {/* Order Updates */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Order Updates
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Get notified about order status changes
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={settings.orderUpdates}
                        onChange={(e) => updateSetting('orderUpdates', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  {/* Promotions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Promotions
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive special offers and promotions
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={settings.promotions}
                        onChange={(e) => updateSetting('promotions', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  {/* System Updates */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        System Updates
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Important system and security notifications
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={settings.systemUpdates}
                        onChange={(e) => updateSetting('systemUpdates', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                </div>
              </div>
            </div>

          </div>
   </>
  );
}

export default DashboardNotification;
