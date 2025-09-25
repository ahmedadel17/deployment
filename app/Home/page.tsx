import BannersSection from '@/components/Banners/bannersSection';
import FlexBanner from '@/components/Banners/FlexBanner';
import LargeBanner from '@/components/Banners/LargeBanner';
import FeaturedSection from '@/components/FeaturedSection';
import Gallery from '@/components/Gallery';
import ProductSlider from '@/components/ProductSlider';
import Slider from '@/components/slider';
import { get } from "@/lib/fetcher";
import React from 'react'

async function page() {
    const homeData = await get<any>("/home-v2", { next: { revalidate: 60 } }).catch(() => null);
  return (
    <div>
        <Slider slides={homeData.data.sections.sliders.data} />
      <ProductSlider products={homeData.data.sections.featured_products.data} />
      <Gallery />
      
      <BannersSection />
      {/* <ProductSlider /> */}
      <LargeBanner />
      {/* <ProductSlider /> */}
      <FlexBanner />
      {/* <ProductSlider /> */}

      <FeaturedSection />
    </div>
  )
}

export default page
