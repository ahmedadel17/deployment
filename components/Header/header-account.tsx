"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {useTranslations} from 'next-intl';

type MenuItem = {
  title: string;
  icon: string; // raw SVG path(s) as string
  url: string;
};

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>`,
    url: "/dashboard",
  },
  {
    title: "My Rewards",
    icon: `<path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 1 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"></path><circle cx="12" cy="12" r="10"></circle>`,
    url: "/dashboard-points",
  },
  {
    title: "My Orders",
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>`,
    url: "/dashboard-orders",
  },
  {
    title: "Track Order",
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>`,
    url: "/dashboard-track",
  },
  {
    title: "Return Items",
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>`,
    url: "/dashboard-returns",
  },
  {
    title: "Wishlist",
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>`,
    url: "/dashboard-wishlist",
  },
  {
    title: "Addresses",
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>`,
    url: "/dashboard-addresses",
  },
  {
    title: "Account Settings",
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>`,
    url: "/dashboard-settings",
  },
  {
    title: "Logout",
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>`,
    url: "/logout",
  },
];

const HeaderAccount: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations()
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="te-navbar-dropdown" ref={dropdownRef}>
      <div
        className="header-account relative flex items-center gap-3 cursor-pointer"
        data-dropdown="account"
        onClick={toggleDropdown}
      >
        {/* Account Icon */}
        <div className="account-icon">
          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 flex justify-center items-center rounded-full relative">
            <svg
              className="w-5 h-5 text-gray-600 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
          </div>
        </div>

        {/* Greeting */}
        <div className="grid">
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            {t("My Account")}
          </span>
          <span className="text-gray-900 dark:text-gray-100 text-sm font-medium">
            {t("Hi")}, Ahmed
          </span>
        </div>

        {/* Dropdown */}
        <div className={`account-drop-down te-navbar-dropdown-content ${isOpen ? 'te-dropdown-show' : ''}`}>
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 mb-2 bg-white dark:bg-gray-800">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              Ahmed
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              john@example.com
            </div>
          </div>

          {/* Menu Items */}
          <div className="grid gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.url;
              const activeClass = isActive
                ? "bg-primary-50/20 dark:bg-primary-900/20 text-primary-600 dark:text-primary-100"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700";

              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`flex gap-2 items-center px-4 py-2 text-sm rounded-md ${activeClass}`}
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAccount;
