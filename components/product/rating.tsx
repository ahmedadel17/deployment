import { useTranslations } from 'next-intl';
import { Product } from '@/types/product';
function Rating({product, productWithVariations}: {product: Product, productWithVariations?: Product | null}) {
  const t = useTranslations();
  return (
        <div className="product-rate flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="product-rating flex space-x-1">
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2 rtl:ml-0 rtl:mr-2">4.2 (89 {t("reviews")})</span>
                  </div>
                  {productWithVariations?.out_of_stock && <span className="product-stock text-sm text-red-600 dark:text-red-400">{t("Out of Stock")}</span>}
                  {!productWithVariations?.out_of_stock && <span className="product-stock text-sm text-green-600 dark:text-green-400">{t("In Stock")}</span>}
                </div>
  )
}

export default Rating
