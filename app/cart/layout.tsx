// app/layout.tsx
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
  return (

   <>
        {children}
   </>
    
  );
}
