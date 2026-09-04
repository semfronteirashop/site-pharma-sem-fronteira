"use client";

import Image from "next/image";
import type { PromoBanner as PromoBannerData } from "@/data/promoBanners";
import { promoBannerAlt } from "@/data/promoBanners";
import { AppLink } from "@/components/AppLink";
import { useLocale } from "@/components/LocaleProvider";

type PromoBannerProps = {
  banner: PromoBannerData;
  className?: string;
  priority?: boolean;
  variant?: "default" | "hero";
};

export function PromoBanner({
  banner,
  className = "",
  priority = false,
  variant = "default",
}: PromoBannerProps) {
  const { locale, href } = useLocale();
  const aspectRatio = banner.width / banner.height;

  const shellClass =
    variant === "hero"
      ? "block overflow-hidden rounded-2xl sm:rounded-[28px]"
      : "card-hover-lift block overflow-hidden rounded-2xl border border-border bg-brand-white shadow-[0_1px_0_rgba(74,22,140,0.04)]";

  return (
    <AppLink href={href(banner.href)} className={`${shellClass} ${className}`}>
      <div
        className="relative w-full"
        style={{ aspectRatio }}
      >
        <Image
          src={banner.image}
          alt={promoBannerAlt(banner, locale)}
          width={banner.width}
          height={banner.height}
          quality={100}
          unoptimized
          priority={priority}
          className="h-full w-full object-contain object-center"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </div>
    </AppLink>
  );
}
