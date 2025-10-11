import { Product } from '@/types/product';

function Price({product,productWithVariations,isUpdatingVariations}: {product: Product,productWithVariations?: Product | null,isUpdatingVariations?: boolean}) {

  return (
    <>
    {/* Price */}
    <div className="product-price flex items-baseline gap-2">
{!productWithVariations && product.variations && product.variations.length > 0 && <span className="text-3xl font-bold text-secondary-600">
    <span className="icon-riyal-symbol"></span>
    <span>{product.min_price}</span>
</span>}
    {product.old_price && (
      <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
        <span className="icon-riyal-symbol"></span>
        <span>{product.old_price}</span>
      </span>
    )}
           {isUpdatingVariations && (
                     <div className="flex items-center gap-2">
                         <svg className="animate-spin w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                         <span className="text-sm text-gray-500">Updating...</span>
                     </div>
                 )}
               
                     {productWithVariations && !isUpdatingVariations && (
                         <span className="text-3xl font-bold text-secondary-600">
                             <span className="icon-riyal-symbol"></span>
                             <span>{productWithVariations?.price_after_discount}</span>
                         </span>
                     )}
                 {productWithVariations && !isUpdatingVariations && <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                     <span className="icon-riyal-symbol"></span>
                     <span>{productWithVariations?.price_befor_discount}</span>
                 </span>}

  </div>
  </>

  )
}

export default Price
