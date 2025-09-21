'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Eye, BarChart3 } from 'lucide-react';
import { Product } from '@/data/products';
import { useApp } from '@/contexts/AppContext';

interface ProductCardProps {
  product: Product;
  carousel?: boolean;
}

export default function ProductCard({ product, carousel = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { addToCart } = useApp();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    });
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'sale':
        return 'bg-red-500 text-white';
      case 'bestseller':
        return 'bg-green-500 text-white';
      case 'new':
        return 'bg-blue-500 text-white';
      case 'hot':
        return 'bg-orange-500 text-white';
      case 'limited':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-white dark:bg-gray-800">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image || '/assets/images/placeholder.jpg'}
            alt={product.title}
            fill
            className={`object-cover transition-all duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
          {product.hover && (
            <Image
              src={product.hover}
              alt={product.title}
              fill
              className={`object-cover transition-all duration-500 absolute inset-0 ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </Link>

        {/* Badges */}
        {product.badges && (
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.badges.map((badge, index) => (
              <span
                key={index}
                className={`px-2 py-1 text-xs font-semibold rounded-full ${getBadgeColor(badge.type)}`}
              >
                {badge.text}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}>
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full bg-white/90 dark:bg-gray-700/90 shadow-lg hover:bg-white dark:hover:bg-gray-600 hover:scale-110 transition-all duration-200 ${
              isWishlisted ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button 
            className="p-2 rounded-full bg-white/90 dark:bg-gray-700/90 shadow-lg hover:bg-white dark:hover:bg-gray-600 hover:scale-110 transition-all duration-200 text-gray-700 dark:text-gray-300"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
         
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary-500 transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
            {product.old_price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.old_price}
              </span>
            )}
          </div>

          {/* Color Options */}
          {product.colors.length > 1 && (
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
          {product.sizes.length > 1 && (
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

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddedToCart}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
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
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
