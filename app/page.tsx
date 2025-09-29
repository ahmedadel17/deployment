import ProductSlider from '@/components/ProductSlider';
import Slider from '@/components/slider';
import getRequest from '@/lib/getter';
import { getLocale } from 'next-intl/server';
import React from 'react'

// Main page component with loading states
async function page() {
  const locale = await getLocale();
  const homeData = await getRequest(`/home-v2`, {
    'Accept-Language': locale,
  });
  console.log(homeData);

  return (
    <div>
      <Slider slides={homeData.data.sections.sliders.data} />
      <ProductSlider products={homeData.data.sections.featured_products.data} />
      {/* <Gallery /> */}
      
      {/* <BannersSection /> */}
      {/* <ProductSlider /> */}
      {/* <LargeBanner /> */}
      {/* <ProductSlider /> */}
      {/* <FlexBanner /> */}
      {/* <ProductSlider /> */}

      {/* <FeaturedSection /> */}
    </div>
  )
}

export default page
