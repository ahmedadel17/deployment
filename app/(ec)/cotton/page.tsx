import React from 'react';
import { Header } from '@/components/header';

export default function CottonPage() {
  return (
    <div id="body" className="bg-gray-50 text-base font-ltr rtl:font-rtl dark:text-white dark:bg-gray-900 min-h-screen flex flex-col" lang="ar" dir="rtl">
      <Header showTopbar showBreadcrumb={false} />

      <div id="content" className="flex-1 site-content" role="main">
        <div id="primary">
          <main id="main" role="main">
            {/* Hero slider placeholder - port JS slider to React later */}
            <section className="relative overflow-hidden group">
              <div className="relative container z-20 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1.618fr] items-center">
                  <div className="col-span-1">
                    <div className="space-y-6">
                      <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                        اكتشف أفضل المنتجات بأسلوب عصري وأنيق
                      </h2>
                      <p className="hidden lg:block text-base lg:text-xl text-gray-600 dark:text-gray-300">
                        قطن كلاود تقدم لك منتجات قطنية عالية الجودة، مصممة لتوفر لك الراحة والأناقة في كل تفصيلة.
                      </p>
                      <a href="#" className="te-btn te-btn-primary">تسوق الآن</a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Feature grid (trimmed for brevity) */}
            <section className="te-section bg-white dark:bg-gray-800">
              <div className="container">
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.618fr] gap-6">
                  <div className="xl:row-span-1">
                    <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden group h-full">
                      <div className="absolute top-3 end-3 bg-yellow-500 text-white px-3 py-1 rounded-md text-sm font-semibold z-10">خصم 25%</div>
                      <img src="/ec/assets/images/cotton/banner-2.jpg" alt="" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 start-0 end-0 bg-black/50 text-white p-6">
                        <h3 className="font-semibold text-2xl">لباد صوف طبيعي عالي الجودة</h3>
                        <p className="text-base mt-2">استمتع بالدفء والراحة...</p>
                        <button className="mt-6 te-btn te-btn-primary">تسوق الآن</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}



