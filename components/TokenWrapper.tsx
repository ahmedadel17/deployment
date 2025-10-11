"use client";
import { useToken } from "@/context/Token";
import { useEffect, useState } from "react";

interface TokenWrapperProps {
  children: React.ReactNode;
}

export default function TokenWrapper({ children }: TokenWrapperProps) {
  const { isInitialized } = useToken();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render children until both client-side and token are initialized
  if (!isClient || !isInitialized) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}
