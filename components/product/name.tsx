import { Product } from "@/types/product";

function Name({product, productWithVariations}: {product: Product, productWithVariations?: Product | null}) {
  return (
    <>
    <h1 className="product-title text-3xl font-bold text-gray-900 dark:text-white mb-2">{product?.name}</h1>
    {productWithVariations && (
        <h1 className="product-title text-3xl font-bold text-gray-900 dark:text-white mb-2">{productWithVariations?.name}</h1>
    )}
    </>

  )
}

export default Name
