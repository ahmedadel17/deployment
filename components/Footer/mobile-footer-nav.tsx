'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useToken } from '@/context/Token'
import { useTranslations } from 'next-intl'
import { Home, ShoppingBag, Heart, User } from 'lucide-react'

function MobileFooterNav() {
  const pathname = usePathname()
  const { isAuthenticated } = useToken()
  const t = useTranslations()

  const navItems = [
    {
      href: '/',
      icon: Home,
      label: t('Home'),
      active: pathname === '/'
    },
    {
      href: '/cart',
      icon: ShoppingBag,
      label: t('Cart'),
      active: pathname === '/cart',
      requireAuth: true
    },
    {
      href: '/wishlist',
      icon: Heart,
      label: t('Wishlist'),
      active: pathname === '/wishlist',
      requireAuth: true
    },
    {
      href: '/profile',
      icon: User,
      label: t('Profile'),
      active: pathname === '/profile',
      requireAuth: true
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600 lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.active
          const showItem = !item.requireAuth || isAuthenticated

          if (!showItem) return null

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 transition-colors duration-200 ${
                isActive 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`} />
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : 'font-normal'}`}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default MobileFooterNav
