'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false);
      // Show success message or redirect to cart
    }, 1000);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 fill-current'
        }`}
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div>
        <h1 className="product-title text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {product.title}
        </h1>

        <div className="product-rate flex items-center space-x-4">
          <div className="flex items-center">
            <div className="product-rating flex space-x-1">
              {product.rating ? renderStars(product.rating) : renderStars(4.2)}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2 rtl:ml-0 rtl:mr-2">
              {product.rating || 4.2} ({product.reviews || 89} reviews)
            </span>
          </div>
          <span className="product-stock text-sm text-green-600 dark:text-green-400">
            {product.stock || 'In Stock'}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="product-price flex items-baseline gap-2">
        <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
          ${product.price}
        </span>
        {product.old_price && (
          <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
            ${product.old_price}
          </span>
        )}
      </div>

      {/* Description */}
      {product.description && (
        <div className="product-description">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {product.description}
          </p>
        </div>
      )}

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="product-colors">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Color: <span className="text-gray-600 dark:text-gray-400">{selectedColor}</span>
          </h3>
          <div className="flex space-x-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === color
                    ? 'border-primary-500 ring-2 ring-primary-200'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="product-sizes">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Size: <span className="text-gray-600 dark:text-gray-400">{selectedSize}</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-2 text-sm border rounded-md transition-all duration-200 ${
                  selectedSize === size
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="product-quantity">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quantity</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="w-8 h-8 border border-gray-200 dark:border-gray-700 rounded-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg>
          </button>
          <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="w-8 h-8 border border-gray-200 dark:border-gray-700 rounded-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="product-actions space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={handleWishlistToggle}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-colors duration-200 border ${
              isWishlisted
                ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
          </button>
          
          <button className="flex-1 py-3 px-6 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
            Buy Now
          </button>
        </div>
      </div>

      {/* Product Features */}
      {product.features && product.features.length > 0 && (
        <div className="product-features">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Features</h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Merchant Info */}
      {product.merchant && (
        <div className="product-merchant">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Sold by</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{product.merchant}</p>
        </div>
      )}
    </div>
  );
}


