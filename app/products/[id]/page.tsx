import React from 'react'
import Link from 'next/link'
import { get } from '@/lib/fetcher'
import ProductInfo from '@/components/product/ProductInfo'
import ProductGallery from '@/components/product/ProductGallery'
import ProductTabs from '@/components/product/ProductTabs'
import { Product } from '@/types/product'
import ProductMerchant from '@/components/product/ProductMerchant'
import {getTranslations} from 'next-intl/server'

interface PageProps {
  params: {
    id: string
  }
}

async function Page({ params }: PageProps) {
  const { id } = params;
  const t = await getTranslations();
  const productData = await get<{ data: Product }>(`/catalog/products/details/${id}`, { 
    next: { revalidate: 60 } // Cache for 60 seconds
  });
  
  const product = productData.data;
 return (
 <div className='container mx-auto py-4'>
   <div className="space-y-16">

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

    {/* <!-- Left Side - Image Slider --> */}
    <div>
        <div className="sticky top-8 space-y-6">
          <ProductGallery product={product} />
        </div>
    </div>

    {/* <!-- Right Side - Product Details --> */}
    <div>

        <div className="space-y-6">
            {/* <!-- Product Title and Rating --> */}
            <div>
                <h1 className="product-title text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>

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
                    <span className="product-stock text-sm text-green-600 dark:text-green-400">{t("In Stock")}</span>
                </div>
            </div>

            {/* <!-- Price --> */}
            <div className="product-price flex items-baseline gap-2">
                <span className="text-3xl font-bold text-secondary-600">
                    <span className="icon-riyal-symbol"></span>
                    <span>200.00</span>
                </span>
                <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                    <span className="icon-riyal-symbol"></span>
                    <span>300.00</span>
                </span>
            </div>

            {/* <!-- Product Description --> */}
            <div className="product-desc">
                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                    Experience ultimate comfort with our Mercer 7 Inch Chino Shorts. Made from 100% organic cotton with a soft, breathable fabric that's perfect for everyday wear. Features a classNameic fit and durable construction that maintains its shape wash after wash.
                </p>
            </div>

            <hr className="border-gray-300 dark:border-gray-800"/>

            {/* <!-- Quantity --> */}
            <div className="product-quantity">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{t("Quantity")}</h3>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="flex items-center rtl:flex-row-reverse border border-gray-300 dark:border-gray-600 rounded-md">
                        {/* <!-- Decrease Button --> */}
                        <button id="decreaseQty" className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                            </svg>
                        </button>

                        {/* <!-- Quantity Input --> */}
                        {/* <input id="quantity" type="number" value="1" min="1" max="10"
                            className="w-16 !rounded-none border-0 focus:outline-none"/> */}

                        {/* <!-- Increase Button --> */}
                        <button id="increaseQty" className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                        </button>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t("Only")} 5 {t("left in stock")}</span>
                </div>
            </div>

            {/* <!-- Size Selection --> */}
            <div className="product-size">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">{t("Size")}</h4>
                <div className="grid grid-cols-4 gap-2">
                    <button className="size-option" data-size="XS" aria-label="Select size XS">XS</button>
                    <button className="size-option" data-size="S" aria-label="Select size S">S</button>
                    <button className="size-option" data-size="M" aria-label="Select size M">M</button>
                    <button className="size-option" data-size="L" aria-label="Select size L">L</button>
                    <button className="size-option" data-size="XL" aria-label="Select size XL">XL</button>
                    <button className="size-option" data-size="XXL" aria-label="Select size XXL">XXL</button>
                </div>
            </div>

            {/* <!-- Color Selection --> */}
            <div className="product-color">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">{t("Color")}</h4>
                <div className="flex flex-wrap gap-3">
                    <button className="color-option" style={{backgroundColor: "brown"}} data-color="brown" title="Brown" aria-label="Select color brown">
                        <span className="sr-only">Brown</span>
                    </button>
                    <button className="color-option" style={{backgroundColor: "orange"}} data-color="orange" title="Orange" aria-label="Select color orange">
                        <span className="sr-only">Orange</span>
                    </button>
                    <button className="color-option" style={{backgroundColor: "black"}} data-color="black" title="Black" aria-label="Select color black">
                        <span className="sr-only">Black</span>
                    </button>
                    <button className="color-option" style={{backgroundColor: "white"}} data-color="white" title="White" aria-label="Select color white">
                        <span className="sr-only">White</span>
                    </button>
                    <button className="color-option" style={{backgroundColor: "gray"}} data-color="gray" title="Gray" aria-label="Select color gray">
                        <span className="sr-only">Gray</span>
                    </button>
                    <button className="color-option" style={{backgroundColor: "red"}} data-color="red" title="Red" aria-label="Select color red">
                        <span className="sr-only">Red</span>
                    </button>
                    <button className="color-option" style={{backgroundColor: "blue"}} data-color="blue" title="Blue" aria-label="Select color blue">
                        <span className="sr-only">Blue</span>
                    </button>
                    <button className="color-option" style={{backgroundColor: "green"}} data-color="green" title="Green" aria-label="Select color green">
                        <span className="sr-only">Green</span>
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-900 dark:text-white">Do you have another comment?</label>
                <textarea id="comment" name="comment" rows={3} className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500" placeholder="Enter your comment here..."></textarea>
            </div>
{/* 
              <!-- Action Buttons --> */}
            <div className="product-actions space-y-3">

                <button id="addToCart" className="w-full py-1 product-add-to-cart flex-1 te-btn te-btn-primary flex gap-2 items-center justify-center">
                    {/* <!-- Cart Icon --> */}
                    <svg className="icon-cart w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
                        <path d="M8 11V6a4 4 0 0 1 8 0v5" />
                    </svg>
                    <span>Add to Cart</span>
                </button>

                <a href="checkout.php" className="w-full py-1 te-btn flex gap-2 bg-gray-800 text-white hover:bg-gray-600 text-center block">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="8" cy="21" r="1"></circle>
                        <circle cx="19" cy="21" r="1"></circle>
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                    </svg>
                    <span>Buy Now</span>
                </a>

                {/* <!-- WhatsApp Button --> */}
                <button id="whatsappBtn" className="w-full py-3 bg-[#075E54] hover:bg-green-600 text-white font-medium rounded-md flex gap-2 items-center justify-center transition-colors">
                    {/* <!-- WhatsApp Icon --> */}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386" />
                    </svg>
                    Contact via WhatsApp
                </button>

            </div>

            {/* <!-- Product Meta --> */}
            <div className="product-meta text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <p><span className="font-medium text-gray-900 dark:text-white">SKU:</span> CHN-SHORTS-MRCR-BLUE-M</p>
                <p>
                    <span className="font-medium text-gray-900 dark:text-white">Category:</span>
                    <a href="/category/clothing" className="text-primary-600 dark:text-primary-200 hover:underline">Clothing</a>
                </p>
                <p>
                    <span className="font-medium text-gray-900 dark:text-white">Tags:</span>
                    <a href="/tag/shorts" className="text-primary-600 dark:text-primary-200 hover:underline">Shorts</a>,
                    <a href="/tag/chino" className="text-primary-600 dark:text-primary-200 hover:underline">Chino</a>,
                    <a href="/tag/casual" className="text-primary-600 dark:text-primary-200 hover:underline">Casual</a>,
                    <a href="/tag/men" className="text-primary-600 dark:text-primary-200 hover:underline">Men</a>
                </p>
            </div>

            {/* <!-- Merchant Details --> */}
            <ProductMerchant  />
            {/* <?php include 'template-parts/product/product-merchant.php'; ?> */}

            {/* <!-- Product Share --> */}
            {/* <?php include 'template-parts/product/product-share.php'; ?> */}

        </div>
    </div>


</div>
{/* <!-- Grid --> */}
<ProductTabs product={product} />



</div>
 </div>
 )
}

export default Page
