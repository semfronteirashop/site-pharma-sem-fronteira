"use client";

import { HeroBannerCarousel } from "@/components/HeroBannerCarousel";
import { homeHeroBanners } from "@/data/promoBanners";

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-3 pt-3 sm:px-4 sm:pt-6 md:px-6 md:pt-8">
      <HeroBannerCarousel banners={homeHeroBanners} />
    </section>
  );
}
