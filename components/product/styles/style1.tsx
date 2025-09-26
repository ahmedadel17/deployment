'use client'

import React, {useEffect, useMemo, useState} from 'react'
import PriceWidget from '@/components/product/widgets/widget-price'
import CategoryWidget from '@/components/product/widgets/widget-category'
import VariableWidget from '@/components/product/widgets/widget-variable'
import { products } from '@/data/products'
import ProductCard from '../ProductCard'
import ProductPagination from '../ProductPagination'
import { get } from "@/lib/fetcher";

type Props = {
  // Optional: render your own products grid inside
  children?: React.ReactNode
}

export default function ProductStyle1({children}: Props) {
  const getProducts = async () => {
    const productsData = await get<any>("/catalog/products", { next: { revalidate: 60 } }).catch(() => null);
   setProducts(productsData.data.items)
  }
  useEffect(() => {
    getProducts();
  }, [])
 const [products, setProducts] = useState<any[]>([]);
  const [order, setOrder] = useState('default')
  const [perPage, setPerPage] = useState('9') // maps to columns
  const [currentPage, setCurrentPage] = useState(1)

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
                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Products</h2>

                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {/* Order Select */}
                  <form className="flex items-center space-x-2 rtl:space-x-reverse">
                    <label htmlFor="order" className="sr-only">Sort by:</label>
                    <select id="order" name="order" value={order} onChange={(e) => setOrder(e.target.value)}>
                      <option value="default">Default</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>
                  </form>

                  {/* Products Per Page / Grid Columns Select */}
                  <form className="hidden lg:flex items-center space-x-2 rtl:space-x-reverse">
                    <label htmlFor="per_page" className="sr-only">Products per page / grid columns:</label>
                    <select id="per_page" name="per_page" value={perPage} onChange={(e) => setPerPage(e.target.value)}>
                      <option value="6">2 Columns</option>
                      <option value="9">3 Columns</option>
                      <option value="12">4 Columns</option>
                    </select>
                  </form>
                </div>
              </div>

              <div className="te-products">
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
              </div>

              {/* Pagination */}
              <ProductPagination 
                currentPage={currentPage} 
                totalPages={1} 
                onPageChange={(page) => setCurrentPage(Math.max(1, page))} 
              />
              <div />

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}


