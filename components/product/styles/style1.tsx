'use client'

import React, {useEffect, useMemo, useState} from 'react'
import PriceWidget from '@/components/product/widgets/widget-price'
import CategoryWidget from '@/components/product/widgets/widget-category'
import VariableWidget from '@/components/product/widgets/widget-variable'
import ProductCard from '../ProductCard'
import ProductPagination from '../ProductPagination'
import { Product } from '@/types/product';
import getRequest from '@/lib/getter'
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

type Props = {
  // Optional: render your own products grid inside
  children?: React.ReactNode
}

export default function ProductStyle1({children}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState('default')
  const [perPage, setPerPage] = useState('9') // maps to columns
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({
    total: 0,
    count: 0,
    per_page: 10,
    current_page: 1,
    total_pages: 1
  })
  
  // Get current locale from next-intl
  const locale = useLocale();
  
  // Get search parameters from URL
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');

  const getProducts = async (page: number = currentPage) => {
    setIsLoading(true);
    try {
      // Build query parameters
      let queryParams = `page=${page}`;
      if (searchQuery) {
        queryParams += `&search=${encodeURIComponent(searchQuery)}`;
      }
      const token = JSON.parse(localStorage.getItem('token') || 'null');
      const productsData = await getRequest(`/catalog/products?${queryParams}`,{},locale,token,);
      
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
    setCurrentPage(1); // Reset to first page when search changes
    getProducts(1);
  }, [searchQuery]) // eslint-disable-line react-hooks/exhaustive-deps

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
    <section className="te-section  dark:bg-gray-900">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-4 gap-8">

          {/* Sidebar Filters */}
          <div className="lg:col-span-1 hidden xl:block">
            <div className="sticky top-8 space-y-6">
              <PriceWidget />
              <CategoryWidget />
              <VariableWidget />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="xl:col-span-3">
            <div className="space-y-6">

              {/* Product Header */}
              <div className="flex items-end justify-between mb-6 space-x-4 rtl:space-x-reverse">
                {/* Title and Count */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'Our Products'}
                  </h2>
                  {!isLoading && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {searchQuery ? `Found ${pagination.total} products` : `Showing ${pagination.count} of ${pagination.total} products`}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {/* Order Select */}
                  <form className="flex items-center space-x-2 rtl:space-x-reverse">
                    <label htmlFor="order" className="sr-only">Sort by:</label>
                    <select className='w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500' id="order" name="order" value={order} onChange={(e) => setOrder(e.target.value)}>
                      <option value="default">Default</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>
                  </form>

                  {/* Products Per Page / Grid Columns Select */}
                  <form className="hidden lg:flex items-center space-x-2 rtl:space-x-reverse">
                    <label htmlFor="per_page" className="sr-only">Products per page / grid columns:</label>
                    <select className='w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500' id="per_page" name="per_page" value={perPage} onChange={(e) => setPerPage(e.target.value)}>
                      <option value="6">2 Columns</option>
                      <option value="9">3 Columns</option>
                      <option value="12">4 Columns</option>
                    </select>
                  </form>
                </div>
              </div>

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
              <div />

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}


