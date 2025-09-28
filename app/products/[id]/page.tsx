import React from 'react'
import { get } from '@/lib/fetcher'
import ProductPageClient from '@/components/product/ProductPageClient'
import ProductTabs from '@/components/product/ProductTabs'
import { Product } from '@/types/product'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

async function Page({ params }: PageProps) {
  const { id } = await params;
  const productData = await get<{ data: Product }>(`/catalog/products/details/${id}`, { 
    next: { revalidate: 60 } // Cache for 60 seconds
  });
  
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
