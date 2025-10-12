
import { Product } from '@/types/product';

function Description({product,productWithVariations}: {product: Product,productWithVariations?: Product | null}) {
  return (
    <>
    {/* Product Description */}
    <div className="product-desc">
   {!productWithVariations && <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
      {product?.description || "Experience ultimate comfort with our premium product. Made from high-quality materials with excellent craftsmanship that ensures durability and style."}
    </p>}
    {productWithVariations && (
      <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
        {productWithVariations?.description || "Experience ultimate comfort with our premium product. Made from high-quality materials with excellent craftsmanship that ensures durability and style."}
      </p>
    )}
  </div>

  <hr className="border-gray-300 dark:border-gray-800"/>
  </>
  )
}

export default Description
