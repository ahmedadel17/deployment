'use client'

import React, {useEffect, useMemo, useState} from 'react'
import ProductCard from '../ProductCard'
import ProductPagination from '../ProductPagination'
import { Product } from '@/types/product';
import getRequest from '@/lib/getter'
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useToken } from '@/context/Token';

interface ProductInteractiveProps {
  initialProducts?: Product[]
  initialPagination?: {
    total: number
    count: number
    per_page: number
    current_page: number
    total_pages: number
  }
  searchQuery?: string
}

export default function ProductInteractive({ 
  initialProducts = [], 
  initialPagination = {
    total: 0,
    count: 0,
    per_page: 10,
    current_page: 1,
    total_pages: 1
  },
  searchQuery: initialSearchQuery
}: ProductInteractiveProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false); // Start with false since we have initial data
  const [order, setOrder] = useState('default')
  const [perPage, setPerPage] = useState('9') // maps to columns
  const [currentPage, setCurrentPage] = useState(initialPagination.current_page)
  const [pagination, setPagination] = useState(initialPagination)
  
  // Get current locale from next-intl
  const locale = useLocale();
  const { token, isInitialized } = useToken();
  
  // Get search parameters from URL
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get('search');
  const searchQuery = urlSearchQuery || initialSearchQuery;

  const getProducts = async (page: number = currentPage) => {
    setIsLoading(true);
    try {
      // Build query parameters
      let queryParams = `page=${page}`;
      if (searchQuery) {
        queryParams += `&search=${encodeURIComponent(searchQuery)}`;
      }
      const productsData = await getRequest(`/catalog/products?${queryParams}`,{},{},locale,token);
      
      if (productsData?.data) {
        setProducts(productsData.data.items || []);
        setPagination(productsData.data.paginate);
        console.log('Products loaded successfully:', productsData.data.items.length, 'items', searchQuery ? `for search: "${searchQuery}"` : '');
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // Only fetch if search query changed from initial AND token is initialized
    if (urlSearchQuery !== initialSearchQuery && isInitialized) {
      setCurrentPage(1); // Reset to first page when search changes
      getProducts(1);
    }
  }, [urlSearchQuery, initialSearchQuery, isInitialized]) // eslint-disable-line react-hooks/exhaustive-deps

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getProducts(page);
  }

  const gridCols = useMemo(() => {
    if (perPage === '6') return 2
    if (perPage === '12') return 4
    return 3
  }, [perPage])

  const gapClass = useMemo(() => {
    return perPage === '12' ? 'lg:gap-4' : 'lg:gap-6'
  }, [perPage])

  return (
    <>
      {/* Dynamic Header with Search Results */}
      {searchQuery && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Search Results for &quot;{searchQuery}&quot;
          </h3>
          {!isLoading && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Found {pagination.total} products
            </p>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-end space-x-1 rtl:space-x-reverse mb-6">
        {/* Order Select */}
        <form className="flex items-center space-x-2 rtl:space-x-reverse">
          <label htmlFor="order" className="sr-only">Sort by:</label>
          <select 
            className='w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500' 
            id="order" 
            name="order" 
            value={order} 
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </form>

        {/* Products Per Page / Grid Columns Select */}
        <form className="hidden lg:flex items-center space-x-2 rtl:space-x-reverse">
          <label htmlFor="per_page" className="sr-only">Products per page / grid columns:</label>
          <select 
            className='w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500' 
            id="per_page" 
            name="per_page" 
            value={perPage} 
            onChange={(e) => setPerPage(e.target.value)}
          >
            <option value="6">2 Columns</option>
            <option value="9">3 Columns</option>
            <option value="12">4 Columns</option>
          </select>
        </form>
      </div>

      {/* Products Grid */}
      <div className="te-products">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
            </div>
          </div>
        ) : (
          <div
            id="products-grid"
            className={`grid gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-${gridCols} ${gapClass}`}
          >
            {products?.map((product) => (
              <div
                key={product.id}
                className="embla__slide flex-shrink-0 py-1 [flex:0_0_calc(50%-0.75rem)] md:[flex:0_0_calc(33.333%-0.75rem)] lg:[flex:0_0_calc(25%-1.2rem)]"
              >
                <ProductCard product={product} carousel={false} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && pagination.total_pages > 1 && (
        <ProductPagination 
          currentPage={pagination.current_page} 
          totalPages={pagination.total_pages} 
          onPageChange={handlePageChange} 
        />
      )}
    </>
  )
}
