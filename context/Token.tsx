"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type TokenContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  isAuthenticated: boolean;
  isInitialized: boolean;
};

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load token from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          const parsedToken = JSON.parse(storedToken);
          setTokenState(parsedToken);
          console.log('Token loaded from localStorage:', parsedToken);
        }
      } catch (error) {
        console.error('Error parsing token from localStorage:', error);
        setTokenState(null);
      } finally {
        setIsInitialized(true);
      }
    }
  }, []);

  // Save token to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('token', JSON.stringify(token));
        console.log('Token saved to localStorage:', token);
      } else {
        localStorage.removeItem('token');
        console.log('Token removed from localStorage');
      }
    }
  }, [token]);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
  };

  const clearToken = () => {
    setTokenState(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <TokenContext.Provider value={{ 
      token, 
      setToken, 
      clearToken, 
      isAuthenticated,
      isInitialized
    }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used inside TokenProvider");
  }
  return context;
};

// Safe version that doesn't throw if context is not available
export const useTokenSafe = () => {
  const context = useContext(TokenContext);
  return context || {
    token: null,
    setToken: () => {},
    clearToken: () => {},
    isAuthenticated: false,
    isInitialized: false
  };
};
