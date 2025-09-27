// app/layout.tsx
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Shop",
  description: "E-commerce App with Cart Context",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    
      const dashboardData = { ...defaultData };
  return (

   <>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

   <DashboardSidebar user={dashboardData.user}/>
  
        {children}
        </div>
        </div>
        </div>
   </>
    
  );
}
