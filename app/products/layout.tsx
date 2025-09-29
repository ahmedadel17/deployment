import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Products - Asool Tech Commerce",
  description: "Browse our products",
};

export default function ProductsLayout({children}: Props) {
  return (
    <div className="products-layout">
      {children}
    </div>
  );
}
