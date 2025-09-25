'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { CartItem } from '@/types/cart';
import { useCart } from "@/context/CartContext";
import { useTranslations } from 'next-intl';
interface ProductCardProps {
  product: Product;
  carousel?: boolean;
}

export default function ProductCard({ product, carousel = false }: ProductCardProps) {
  const t = useTranslations();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(Boolean(product?.is_is_favourite));
  const [isComparing, setIsComparing] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };
  const { cartItems, setCartItems } = useCart();
  const addToCart = (item: Product) => {
    const cartItem: CartItem = {
      ...item,
      name: String(item.name ?? item.title),
      price_after_discount: Number(item.price_after_discount ?? item.price ?? 0),
      thumbnail: String(item.thumbnail ?? '/assets/images/placeholder.jpg'),
      quantity: 1,
      qty: 1,
    };
    setCartItems([...cartItems, cartItem]);
  };
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsComparing(!isComparing);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement quick view functionality
    console.log('Quick view for product:', product.id);
  };

  const getBadgeClasses = (type: string) => {
    const badgeClasses = {
      'new': 'bg-green-500/20 text-green-500',
      'sale': 'bg-red-500/20 text-red-500',
      'bestseller': 'bg-blue-500/20 text-blue-500',
      'limited': 'bg-purple-500/20 text-purple-500',
      'hot': 'bg-orange-500/20 text-orange-500',
    };
    return badgeClasses[type as keyof typeof badgeClasses] || 'bg-gray-500 text-white';
  };

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'blue': 'bg-blue-500',
      'black': 'bg-black',
      'gray': 'bg-gray-500',
      'white': 'bg-white border border-gray-300',
      'green': 'bg-green-500',
      'orange': 'bg-orange-500',
      'red': 'bg-red-500',
      'pink': 'bg-pink-500',
      'purple': 'bg-purple-500',
      'yellow': 'bg-yellow-500',
      'cream': 'bg-yellow-100',
      'navy': 'bg-navy-800',
      'beige': 'bg-yellow-100',
      'burgundy': 'bg-red-800',
      'gold': 'bg-yellow-400',
      'denim': 'bg-blue-600',
    };
    return colorMap[color] || 'bg-gray-400';
  };

  return (
    <div 
      className={`product-item group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-200 dark:border-gray-700 ${
        carousel ? 'flex-shrink-0' : ''
      }`}
      data-product-id={product.id}
      data-product-title={product.title}
      data-product-price={product.price}
      data-product-image={product.image}
      
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-white dark:bg-gray-800">
        <Link href={`/products/${product.id}`} className="product-thumbnail relative block overflow-hidden rounded-lg lg:rounded-t-lg lg:rounded-b-none group">
          {/* Product Badges */}
          {product.badges && product.badges.length > 0 && (
            <div className="product-badges absolute top-2 start-2 z-10 flex flex-col gap-1">
              {product.badges.map((badge, index) => (
                <span
                  key={index}
                  className={`product-badge px-2 py-1 text-xs font-semibold rounded-full ${getBadgeClasses(badge.type)}`}
                >
                  {badge.text}
                </span>
              ))}
            </div>
          )}

          {/* Hover Buttons - Center of Image */}
          <div className="product-hover-btns absolute inset-0 pointer-events-auto flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 z-20 gap-1">
            {/* Compare Button */}
            <button
              onClick={handleCompareToggle}
              className={`compare-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-all duration-200 flex items-center justify-center ${
                isComparing ? 'bg-primary-300 text-white' : ''
              }`}
              data-product-id={product.id}
              title="Add to Compare"
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                <path d="M11 18H8a2 2 0 0 1-2-2V9" />
              </svg>
            </button>

            {/* Quick View Button */}
            <button
              onClick={handleQuickView}
              className="quick-view-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-colors duration-200 flex items-center justify-center"
              title="Quick View"
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </button>
          </div>

          {/* Thumbnail Main Image */}
          <Image
            src={product?.thumbnail || '/assets/images/placeholder.jpg'}
            alt={product.name || ''}
            width={300}
            height={320}
            className="w-full h-full object-cover transition-all duration-500 ease-in-out transform min-h-[320px]"
            priority
          />

          {/* Thumbnail Flip Image */}
          {product.thumbnail && (
            <Image
              src={product.thumbnail}
              alt={`${product.name} hover image`}
              width={300}
              height={320}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            />
          )}
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary-500 transition-colors">
              {product.name}
            </h3>
          </Link>
          <Link href={`/products/${product.id}`}>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary-500 transition-colors">
              {product.short_description}
            </h4>
          </Link>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${product?.price_after_discount}
            </span>
            {product.min_price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.min_price }
              </span>
            )}
          </div>

          {/* Color Options */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-500">Colors:</span>
              <div className="flex gap-1">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-4 h-4 rounded-full border-2 transition-all ${
                      getColorClass(color)
                    } ${
                      selectedColor === color ? 'border-gray-900 dark:border-white' : 'border-gray-300'
                    }`}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Options */}
          {product.sizes && product.sizes.length > 1 && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-500">Sizes:</span>
              <div className="flex gap-1">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-2 py-1 text-xs border rounded transition-colors ${
                      selectedSize === size
                        ? 'border-blue-600 text-black bg-primary-50 dark:bg-blue-600 dark:text-white'
                        : 'border-gray-300 text-gray-600 dark:text-gray-400 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            disabled={isAddedToCart}
            className={`flex-1 py-2 px-4 rounded-lg font-medium duration-300 flex items-center justify-center gap-2 ${
              isAddedToCart
                ? 'bg-green-500 text-white'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
          >
            {isAddedToCart ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                {t("Add to Cart")}
              </>
            )}
          </button>

          <button
            onClick={handleWishlistToggle}
            className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
              isWishlisted
                ? 'border-red-500 bg-red-50 text-red-600 dark:bg-red-900/20'
                : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-red-400'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
