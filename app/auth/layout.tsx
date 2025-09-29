import type { Metadata } from "next";
import ThemeInitializer from '@/components/ThemeInitializer';
import FooterStyle1 from '@/components/Footer/styles/style1';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Authentication - Asool Tech Commerce",
  description: "Sign in to your account",
};

export default async function AuthLayout({children}: Props) {
  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen flex flex-col">
        <ThemeInitializer />
        
        {/* Main content area */}
        <div className="flex-1 flex justify-center items-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md border border-gray-200 dark:border-gray-700 mx-auto text-center bg-white dark:bg-gray-800 px-4 sm:px-8 py-10 rounded-xl shadow">
            {children}
          </div>
        </div>
        
        {/* Footer at bottom */}
        <FooterStyle1 />
      </body>
    </html>
  );
}
