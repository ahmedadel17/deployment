import React from 'react'
import PriceWidget from '@/components/product/widgets/widget-price'
import CategoryWidget from '@/components/product/widgets/widget-category'
import VariableWidget from '@/components/product/widgets/widget-variable'
import ProductInteractive from '@/components/product/styles/ProductInteractive'
import ProductGridServer from './ProductGridServer'
import { getTranslations, getLocale } from 'next-intl/server'
import getRequest from '@/lib/getter'
import { getServerToken } from '@/lib/serverTokenGetter'
import { Product } from '@/types/product'

interface ProductStyle1Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function ProductStyle1({ searchParams }: ProductStyle1Props) {
  const t = await getTranslations();
  const locale = await getLocale();
  
  // Fetch initial products on the server for SEO
  let initialProducts: Product[] = [];
  let initialPagination = {
    total: 0,
    count: 0,
    per_page: 10,
    current_page: 1,
    total_pages: 1
  };
  
  try {
    const searchQuery = searchParams?.search as string;
    let queryParams = 'page=1';
    if (searchQuery) {
      queryParams += `&search=${encodeURIComponent(searchQuery)}`;
    }
    
    // Get server-side token from cookies
    const serverToken = await getServerToken();
    console.log('Server token available:', !!serverToken);
    
    const productsData = await getRequest(`/catalog/products?${queryParams}`, {}, {}, locale, serverToken);
    
    if (productsData?.data) {
      initialProducts = productsData.data.items || [];
      initialPagination = productsData.data.paginate;
    }
  } catch (error) {
    console.error('Failed to fetch initial products:', error);
    // If unauthorized, we'll let the client component handle it with proper authentication
    console.log('Server-side fetch failed, client will handle with authentication');
  }

  return (
    <section className="te-section dark:bg-gray-900">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-4 gap-8">

          {/* Sidebar Filters - Server Rendered for SEO */}
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
              {/* Static Header - Server Rendered for SEO */}
              <div className="flex items-end justify-between mb-6 space-x-4 rtl:space-x-reverse">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {searchParams?.search ? `Search Results for "${searchParams.search}"` : t("Our Products")}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {searchParams?.search 
                      ? `${t('Found')} ${initialPagination.total} ${t('products')}` 
                      : `${t('Showing')} ${initialPagination.count} ${t('of')} ${initialPagination.total} ${t('products')}`
                    }
                  </p>
                </div>
              </div>

              {/* Server-Rendered Products for SEO */}
              <ProductGridServer 
                products={initialProducts} 
                pagination={initialPagination}
                searchQuery={searchParams?.search as string}
              />

              {/* Interactive Products Grid - Client Side for dynamic updates */}
              <ProductInteractive 
                initialProducts={initialProducts}
                initialPagination={initialPagination}
                searchQuery={searchParams?.search as string}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}


