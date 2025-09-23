'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const mainImageRef = useRef<HTMLDivElement>(null);
  const zoomLensRef = useRef<HTMLDivElement>(null);

  const images = product.images || [product.thumbnail || product.image];
  const mainImage = images[selectedImageIndex];

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current || !zoomLensRef.current) return;

    const rect = mainImageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lensSize = 100;
    const lensX = Math.max(0, Math.min(x - lensSize / 2, rect.width - lensSize));
    const lensY = Math.max(0, Math.min(y - lensSize / 2, rect.height - lensSize));

    setZoomPosition({ x: lensX, y: lensY });
    zoomLensRef.current.style.left = `${lensX}px`;
    zoomLensRef.current.style.top = `${lensY}px`;
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="product-gallery relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div
          ref={mainImageRef}
          className="zoom-container aspect-square relative cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={mainImage}
            alt={product.name || product.title}
            fill
            className="zoom-image w-full h-full object-cover"
            priority
          />
          
          {/* Zoom Lens */}
          <div
            ref={zoomLensRef}
            className={`zoom-lens absolute w-24 h-24 border-2 border-white shadow-lg pointer-events-none transition-opacity duration-200 ${
              isZoomed ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${mainImage})`,
              backgroundSize: '400% 400%',
              backgroundPosition: `-${zoomPosition.x * 3}px -${zoomPosition.y * 3}px`,
            }}
          />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-full flex items-center justify-center shadow-md transition-all duration-200"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedImageIndex(selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-full flex items-center justify-center shadow-md transition-all duration-200"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
            {selectedImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`aspect-square relative rounded-md overflow-hidden border-2 transition-all duration-200 ${
                selectedImageIndex === index
                  ? 'border-primary-500 ring-2 ring-primary-200'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Image
                src={image}
                alt={`${product.name || product.title} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Share Button */}
      <div className="flex items-center justify-center pt-4">
        <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          <span className="text-sm">Share</span>
        </button>
      </div>
    </div>
  );
}


