'use client';

import React from 'react';
import { ProductSortOption } from '@/types/product';

interface ProductSortProps {
  options: ProductSortOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSort({ options, value, onChange }: ProductSortProps) {
  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <label htmlFor="order" className="sr-only">
        Sort by:
      </label>
      <select
        id="order"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}


