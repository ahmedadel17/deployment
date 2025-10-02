import React from 'react'
import { get } from '@/lib/fetcher'
import ProductPageClient from '@/components/product/ProductPageClient'
import ProductTabs from '@/components/product/ProductTabs'
import { Product } from '@/types/product'
import getRequest from '@/lib/getter'
import { getLocale } from 'next-intl/server'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

async function Page({ params }: PageProps) {
  const { id } = await params;

  const locale = await getLocale();
  const productData= await getRequest(`/catalog/products/details/${id}`, {
    'Accept-Language': locale,
  },locale);
  
  const product = productData.data;
 
 return (
    <div className='dark:bg-gray-900'>

 <div className='container mx-auto py-4  '>
   <div className="space-y-16">

{/* Product Gallery and Variations */}
  <ProductPageClient 
    product={product} 
    variations={product.variations || []} 
  />

{/* <!-- Grid --> */}
<ProductTabs product={product} />



</div>
 </div>
    </div>
 )
}

export default Page
