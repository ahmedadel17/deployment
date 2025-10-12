import React from 'react'
import ProductCard from '../ProductCard'
import { Product } from '@/types/product'

interface ProductGridServerProps {
  products: Product[]
  pagination: {
    total: number
    count: number
    per_page: number
    current_page: number
    total_pages: number
  }
  searchQuery?: string
}

export default function ProductGridServer({ products, pagination, searchQuery }: ProductGridServerProps) {
  return (
    <>
      {/* Server-rendered products for SEO - hidden on client, shown for crawlers */}
      <div className="hidden" aria-hidden="true">
        <div className="grid gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={`server-${product.id}`} className="embla__slide flex-shrink-0 py-1">
              <ProductCard product={product} carousel={false} />
            </div>
          ))}
        </div>
      </div>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": searchQuery ? `Search Results for ${searchQuery}` : "Our Products",
            "description": "Browse our amazing collection of products",
            "numberOfItems": pagination.total,
            "itemListElement": products.map((product, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": product.name || product.title,
                "description": product.description || product.short_description,
                "image": product.thumbnail || product.image,
                "offers": {
                  "@type": "Offer",
                  "price": product.price_after_discount || product.price,
                  "priceCurrency": "USD",
                  "availability": product.stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
                }
              }
            }))
          })
        }}
      />

      {/* Meta information for SEO */}
      <div className="sr-only">
        <h1>{searchQuery ? `Search Results for ${searchQuery}` : "Our Products"}</h1>
        <p>Total products: {pagination.total}</p>
        <p>Current page: {pagination.current_page} of {pagination.total_pages}</p>
        {products.map((product) => (
          <div key={`meta-${product.id}`}>
            <h2>{product.name || product.title}</h2>
            <p>{product.description || product.short_description}</p>
            <p>Price: ${product.price_after_discount || product.price}</p>
          </div>
        ))}
      </div>
    </>
  )
}
