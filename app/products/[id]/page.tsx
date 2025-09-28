import React from 'react'
import { get } from '@/lib/fetcher'
import ProductPageClient from '@/components/product/ProductPageClient'
import ProductTabs from '@/components/product/ProductTabs'
import { Product } from '@/types/product'

interface PageProps {
  params: {
    id: string
  }
}

async function Page({ params }: PageProps) {
  const { id } = params;
  const productData = await get<{ data: Product }>(`/catalog/products/details/${id}`, { 
    next: { revalidate: 60 } // Cache for 60 seconds
  });
  
  const product = productData.data;
 
 return (
    <div className='dark:bg-gray-900'>

 <div className='container mx-auto py-4  '>
   <div className="space-y-16">

{/* Product Gallery and Variations */}
{product?.variations && product.variations.length > 0 ? (
  <ProductPageClient 
    product={product} 
    variations={product.variations} 
  />
) : (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
    {/* Left Side - Image Slider */}
    <div>
      <div className="sticky top-8 space-y-6">
        {/* <ProductGallery product={product} /> */}
      </div>
    </div>
    {/* Right Side - Product Details */}
    <div>
      <div className="space-y-6">
        {/* Product without variations */}
      </div>
    </div>
  </div>
)}
{/* <!-- Grid --> */}
<ProductTabs product={product} />



</div>
 </div>
    </div>
 )
}

export default Page
