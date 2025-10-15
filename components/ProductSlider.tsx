'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './product/ProductCard';
import { useTranslations } from 'next-intl';
export default function ProductSlider({ products }: { products: any[] }) {
  console.log('products',products);
  const [isRTL, setIsRTL] = useState(false);
  const t = useTranslations();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    containScroll: false,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
    direction: isRTL ? 'rtl' : 'ltr',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // RTL Detection
  useEffect(() => {
    const checkDirection = () => {
      const htmlDir = document.documentElement.getAttribute('dir');
      setIsRTL(htmlDir === 'rtl');
    };

    // Check on mount
    checkDirection();

    // Watch for changes
    const observer = new MutationObserver(checkDirection);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir']
    });

    return () => observer.disconnect();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = () => {
      // In RTL mode, scroll in the opposite direction for natural flow
      if (isRTL) {
        emblaApi.scrollPrev();
      } else {
        emblaApi.scrollNext();
      }
    };

    const interval = setInterval(autoplay, 4000); // Auto-advance every 4 seconds

    return () => clearInterval(interval);
  }, [emblaApi, isRTL]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="te-products">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="product-title text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('Featured Products')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t('Discover our carefully curated collection of premium products')}
              </p>
            </div>

            <div className="embla-control flex gap-1">
              <button
                onClick={scrollPrev}
                className="embla-prev bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label={isRTL ? "Next" : "Previous"}
              >
                {isRTL ? (
                  <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>

              <button
                onClick={scrollNext}
                className="embla-next bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label={isRTL ? "Previous" : "Next"}
              >
                {isRTL ? (
                  <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Embla Carousel Wrapper */}
          <div className="embla overflow-hidden relative" ref={emblaRef}>
            <div className="embla__container flex gap-3 lg:gap-6 py-1">
              {products.map((product, index) => {
                // Group products in pairs for two products per slide
                if (index % 2 === 0) {
                  const nextProduct = products[index + 1];
                  return (
                    <div
                      key={`slide-${index}`}
                      className="embla__slide flex-shrink-0 py-1 w-full flex gap-3"
                    >
                      <div className="flex-1">
                        <ProductCard product={product} carousel={true} />
                      </div>
                      {nextProduct && (
                        <div className="flex-1">
                          <ProductCard product={nextProduct} carousel={true} />
                        </div>
                      )}
                    </div>
                  );
                }
                return null; // Skip odd indices as they're handled in the pair above
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
