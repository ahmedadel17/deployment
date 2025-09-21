'use client';

import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/data/products';
import ProductCard from './product/ProductCard';

export default function ProductsSection() {
  const featuredProducts = getProducts({ limit: 8 });

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our carefully curated collection of premium products designed for your lifestyle.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 items-start">
          {featuredProducts.map((product) => (
            <div key={product.id} className="h-[520px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

    
      </div>
    </section>
  );
}
