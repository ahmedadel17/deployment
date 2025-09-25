'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';

interface ProductFiltersProps {
  products: Product[];
  selectedCategory: string;
  priceRange: [number, number];
  selectedColors: string[];
  selectedSizes: string[];
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onColorChange: (colors: string[]) => void;
  onSizeChange: (sizes: string[]) => void;
}

export default function ProductFilters({
  products,
  selectedCategory,
  priceRange,
  selectedColors,
  selectedSizes,
  onCategoryChange,
  onPriceRangeChange,
  onColorChange,
  onSizeChange,
}: ProductFiltersProps) {
  const [isExpanded, setIsExpanded] = useState({
    category: true,
    price: true,
    color: true,
    size: true,
  });

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Get unique colors
  const allColors = products.flatMap(p => p.colors);
  const uniqueColors = Array.from(new Set(allColors));

  // Get unique sizes
  const allSizes = products.flatMap(p => p.sizes);
  const uniqueSizes = Array.from(new Set(allSizes));

  // Get price range
  const prices = products.map(p => parseFloat(String(p.price).replace(',', '')));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const handleColorToggle = (color: string) => {
    if (selectedColors.includes(color)) {
      onColorChange(selectedColors.filter(c => c !== color));
    } else {
      onColorChange([...selectedColors, color]);
    }
  };

  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      onSizeChange(selectedSizes.filter(s => s !== size));
    } else {
      onSizeChange([...selectedSizes, size]);
    }
  };

  const toggleExpanded = (section: keyof typeof isExpanded) => {
    setIsExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleExpanded('category')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-medium text-gray-900 dark:text-white">Category</h3>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              isExpanded.category ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isExpanded.category && (
          <div className="mt-3 space-y-2">
            <button
              onClick={() => onCategoryChange('')}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                selectedCategory === ''
                  ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleExpanded('price')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-medium text-gray-900 dark:text-white">Price Range</h3>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              isExpanded.price ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isExpanded.price && (
          <div className="mt-3 space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => onPriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                placeholder="Min"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value) || maxPrice])}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                placeholder="Max"
              />
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Range: ${minPrice} - ${maxPrice}
            </div>
          </div>
        )}
      </div>

      {/* Color Filter */}
      {uniqueColors.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toggleExpanded('color')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-medium text-gray-900 dark:text-white">Color</h3>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isExpanded.color ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isExpanded.color && (
            <div className="mt-3 flex flex-wrap gap-2">
              {uniqueColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorToggle(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    selectedColors.includes(color)
                      ? 'border-primary-500 ring-2 ring-primary-200'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Size Filter */}
      {uniqueSizes.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toggleExpanded('size')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-medium text-gray-900 dark:text-white">Size</h3>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isExpanded.size ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isExpanded.size && (
            <div className="mt-3 flex flex-wrap gap-2">
              {uniqueSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`px-3 py-2 text-sm border rounded-md transition-all duration-200 ${
                    selectedSizes.includes(size)
                      ? 'border-primary-500 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Clear Filters */}
      {(selectedCategory || selectedColors.length > 0 || selectedSizes.length > 0 || priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
        <button
          onClick={() => {
            onCategoryChange('');
            onColorChange([]);
            onSizeChange([]);
            onPriceRangeChange([minPrice, maxPrice]);
          }}
          className="w-full py-2 px-4 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}


