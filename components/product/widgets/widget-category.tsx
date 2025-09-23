'use client'

import React, {useMemo, useState} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'

type SubCategory = {
  name: string
  slug: string
  count: number
}

type Category = {
  name: string
  count: number
  slug: string
  sub?: SubCategory[]
}

const DEFAULT_CATEGORIES: Category[] = [
  {
    name: 'Men',
    count: 45,
    slug: 'men',
    sub: [
      {name: 'T-Shirts', slug: 't-shirts', count: 12},
      {name: 'Jeans', slug: 'jeans', count: 18},
      {name: 'Shirts', slug: 'shirts', count: 15}
    ]
  },
  {
    name: 'Women',
    count: 31,
    slug: 'women',
    sub: [
      {name: 'T-Shirts', slug: 't-shirts', count: 6},
      {name: 'Jeans', slug: 'jeans', count: 88},
      {name: 'Shirts', slug: 'shirts', count: 120}
    ]
  },
  {
    name: 'Kids',
    count: 69,
    slug: 'kid',
    sub: [
      {name: 'T-Shirts', slug: 't-shirts', count: 45},
      {name: 'Jeans', slug: 'jeans', count: 21},
      {name: 'Shirts', slug: 'shirts', count: 10}
    ]
  },
  {
    name: 'Accessories',
    count: 23,
    slug: 'accessories',
    sub: [
      {name: 'Bags', slug: 'bags', count: 8},
      {name: 'Belts', slug: 'belts', count: 9},
      {name: 'Hats', slug: 'hats', count: 6}
    ]
  },
  {name: 'Sports', count: 22, slug: 'sports'}
]

type Props = {
  categories?: Category[]
}

export default function CategoryWidget({categories}: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const currentCategory = params.get('category') || ''
  const data = useMemo(() => categories ?? DEFAULT_CATEGORIES, [categories])
  const [open, setOpen] = useState<Record<string, boolean>>({})

  const toggle = (slug: string) => {
    setOpen(prev => ({...prev, [slug]: !prev[slug]}))
  }

  const goTo = (slug: string) => {
    const search = new URLSearchParams(params.toString())
    search.set('category', slug)
    router.push(`/products?${search.toString()}`)
  }

  return (
    <div className="category-widget w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Categories</h3>
      </div>

      <div className="space-y-1">
        {data.map(cat => {
          const hasSub = Array.isArray(cat.sub) && cat.sub.length > 0
          const isActive = currentCategory === cat.slug
          const isOpen = open[cat.slug] ?? false
          return (
            <div key={cat.slug} className="category-group">
              <div
                className={`flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer ${isActive ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                onClick={() => (hasSub ? toggle(cat.slug) : goTo(cat.slug))}
              >
                <div className="flex items-center gap-3" onClick={(e) => {e.stopPropagation(); goTo(cat.slug)}}>
                  <span className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">{cat.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{cat.count}</span>
                  {hasSub && (
                    <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 rtl:scale-x-[-1] ${isOpen ? 'rotate-90' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </div>

              {hasSub && (
                <div className={`pl-6 space-y-1 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                  {cat.sub!.map(sub => {
                    const subActive = currentCategory === sub.slug
                    return (
                      <div key={sub.slug}
                           className={`flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer ${subActive ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                           onClick={() => goTo(sub.slug)}>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">{sub.name}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{sub.count}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}


