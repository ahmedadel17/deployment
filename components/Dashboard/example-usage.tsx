// Example usage of the DashboardSidebar component
import React from 'react';
import DashboardSidebar from './DashboardSidebar';

export default function DashboardExample() {
  // Example with custom user data
  const userData = {
    name: 'Ahmed Al-Rashid',
    email: 'ahmed@example.com',
    initials: 'AR'
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <DashboardSidebar user={userData} />
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Dashboard Content
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                This is an example of how to use the converted DashboardSidebar component.
                The sidebar will automatically highlight the active page based on the current route.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
