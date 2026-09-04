"use client";

import { useCallback, useEffect, useState } from "react";
import type { PromoBanner as PromoBannerData } from "@/data/promoBanners";
import { PromoBanner } from "@/components/PromoBanner";

const AUTO_INTERVAL_MS = 5000;

type HeroBannerCarouselProps = {
  banners: PromoBannerData[];
};

export function HeroBannerCarousel({ banners }: HeroBannerCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = banners.length;

  const goTo = useCallback(
    (index: number) => {
      if (slideCount <= 0) return;
      setActiveIndex((index + slideCount) % slideCount);
    },
    [slideCount],
  );

  useEffect(() => {
    if (slideCount <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, AUTO_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [slideCount]);

  if (slideCount === 0) return null;

  if (slideCount === 1) {
    return <PromoBanner banner={banners[0]!} variant="hero" priority />;
  }

  const activeBanner = banners[activeIndex]!;
  const aspectRatio = activeBanner.width / activeBanner.height;

  return (
    <div className="relative">
      <div
        className="relative w-full transition-[aspect-ratio] duration-700 ease-in-out"
        style={{ aspectRatio }}
      >
        {banners.map((banner, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive
                  ? "z-10 opacity-100"
                  : "pointer-events-none z-0 opacity-0"
              }`}
              aria-hidden={!isActive}
            >
              <PromoBanner
                banner={banner}
                variant="hero"
                priority={index === 0}
                className="h-full"
              />
            </div>
          );
        })}
      </div>

      <div
        className="mt-2 flex justify-center gap-1.5 sm:mt-2.5"
        role="tablist"
        aria-label="Banners promocionais"
      >
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Banner ${index + 1}`}
            onClick={() => goTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-5 bg-brand-purple"
                : "w-1.5 bg-brand-purple/30 hover:bg-brand-purple/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
