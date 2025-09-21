import BannersSection from "@/components/Banners/bannersSection";
import FlexBanner from "@/components/Banners/FlexBanner";
import LargeBanner from "@/components/Banners/LargeBanner";
import FeaturedSection from "@/components/FeaturedSection";
import ProductSlider from "@/components/ProductSlider";
import Slider from "@/components/slider";

export default function Home() {
  return (
    <>
      <Slider />
      <ProductSlider />
      <BannersSection />
      <ProductSlider />
      <LargeBanner />
      <ProductSlider />
      <FlexBanner />
      <ProductSlider />

      <FeaturedSection />
    </>
  );
}
