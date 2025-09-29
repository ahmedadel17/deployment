'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import useEmblaCarousel from 'embla-carousel-react';

interface ProductGalleryProps {
  product: Product;
  selectedVariations?: { [attributeId: string]: string };
  productWithVariations?: Product | null;
}


export default function ProductGallery({ product, selectedVariations, productWithVariations }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);

  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    containScroll: 'trimSnaps',
    align: 'start',
    skipSnaps: false,
    dragFree: false,
  });

  // Get images from product or variations
  const getImages = () => {
    if (productWithVariations?.gallery && productWithVariations.gallery.length > 0) {
      return productWithVariations.gallery.map((item: string | { url: string; alt?: string }) => ({
        url: typeof item === 'string' ? item : item.url,
        alt: typeof item === 'string' ? product.name || product.title : item.alt || product.name || product.title
      }));
    }
    
    // Fallback to product images or create from main image
    if (product.images && product.images.length > 0) {
      return product.images.map(img => ({ url: img, alt: product.name || product.title }));
    }
    
    // For simulation, create multiple images from the main image
    const mainImage = product.thumbnail || product.image;
 
    
    return [{ url: mainImage, alt: product.name || product.title }];
  };

  const images = getImages();

  // Embla Carousel navigation functions
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedImageIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Embla Carousel event listeners
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Auto-advance functionality
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [emblaApi, images.length]);

  // Reset selectedImageIndex if it's out of bounds


  // Update zoom lens background image when slide changes
 


  // Console log variations when they change (no API call)
  useEffect(() => {
    if (selectedVariations && Object.keys(selectedVariations).length > 0) {
      console.log('Selected variations in ProductGallery:', selectedVariations);
    }
  }, [selectedVariations]);

  const handleThumbnailClick = (index: number) => {
    scrollTo(index);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const image = e.currentTarget.querySelector('.zoom-image') as HTMLImageElement;
    if (image) {
      setIsZoomed(!isZoomed);
      if (!isZoomed) {
        image.style.transform = 'scale(2)';
      } else {
        image.style.transform = 'scale(1)';
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const image = target.querySelector('.zoom-image') as HTMLImageElement;
    
    if (!image) return;

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isZoomed) {
      image.style.transformOrigin = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
    }
  };

  const handleMouseEnter = () => {
    // Pause auto-sliding on hover (handled by Embla)
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Carousel */}
      <div className="product-gallery relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {images.map((image, index) => (
              <div key={index} className="embla__slide flex-shrink-0 w-full min-w-0">
                <div 
                  ref={index === selectedImageIndex ? mainImageRef : null}
                  className={`zoom-container aspect-square relative cursor-zoom-in ${isZoomed ? 'zoomed cursor-zoom-out' : ''}`}
                  onClick={handleImageClick}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || `${product.name || product.title} ${index + 1}`}
                    fill
                    className="zoom-image w-full h-full object-cover"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="embla__prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="embla__next absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  index === selectedImageIndex ? 'bg-white' : 'bg-white bg-opacity-25'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="product-thumbnail embla-thumbs overflow-hidden">
          <div className="embla-thumbs__container flex gap-3">
            {images.map((image, index) => (
              <div key={index} className="embla-thumbs__slide flex-none">
                <button 
                  type="button" 
                  className="block"
                  onClick={() => handleThumbnailClick(index)}
                >
                  <Image
                    className={`embla-thumbs__slide__img w-20 aspect-square object-cover rounded-md border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? 'border-primary-500 opacity-100'
                        : 'border-transparent hover:border-primary-300 opacity-60 hover:opacity-80'
                    }`}
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                  />
                </button>
              </div>
            ))}
          </div>
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


