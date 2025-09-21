"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const HeaderBreadCrumb: React.FC = () => {
  const pathname = usePathname(); // e.g. "/checkout-page"
  const page = pathname.split("/").filter(Boolean).pop() || "Home";

  // Format: replace "-" or "." with space, then uppercase words
  const formattedPage = page
    .replace(/[-.]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <nav className="mb-8">
      <div className="flex flex-wrap items-center space-x-3 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-400">
        <Link
          href="/"
          className="hover:text-primary-600 dark:hover:text-primary-400"
        >
          Home
        </Link>

        {/* Arrow Icon */}
        <svg
          className="w-4 h-4 rtl:scale-x-[-1]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>

        {/* Current Page */}
        <span className="text-gray-900 dark:text-white font-medium">
          {formattedPage}
        </span>
      </div>
    </nav>
  );
};

export default  HeaderBreadCrumb;
