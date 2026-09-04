"use client";

import Image from "next/image";
import { instagramFeaturedPosts } from "@/data/instagram";
import { site } from "@/data/site";
import { FadeInSection } from "@/components/FadeInSection";
import { useLocale } from "@/components/LocaleProvider";

export function InstagramSection() {
  const { dictionary } = useLocale();
  const instagramUrl = site.instagram.url;

  return (
    <FadeInSection className="border-t border-border bg-brand-white" delayMs={180}>
      <div className="mx-auto max-w-7xl px-3 py-5 sm:px-4 sm:py-6 md:px-6 md:py-7">
        <div className="mb-4 text-center sm:mb-5">
          <h2 className="text-lg font-extrabold text-brand-purple sm:text-xl md:text-2xl">
            {dictionary.instagramSection.title}
          </h2>
          <p className="mt-1 text-xs text-muted sm:text-sm">
            {dictionary.instagramSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 md:mx-auto md:max-w-3xl md:gap-4">
          {instagramFeaturedPosts.map((post) => (
            <a
              key={post.id}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dictionary.instagramSection.cardLabel(post.id)}
              className="card-hover-lift overflow-hidden rounded-xl border border-border/70 bg-brand-light shadow-[0_1px_0_rgba(74,22,140,0.04)] transition hover:border-brand-purple/20 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="relative aspect-[9/16] w-full">
                <Image
                  src={post.image}
                  alt={dictionary.instagramSection.placeholderAlt(post.id)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 30vw, 200px"
                />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-4 text-center sm:mt-5">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dictionary.instagramSection.viewCta}
            className="inline-flex h-10 items-center rounded-full border border-brand-purple/20 px-5 text-sm font-bold text-brand-purple transition hover:border-brand-purple/40 hover:bg-brand-purple/5"
          >
            {dictionary.instagramSection.viewCta}
          </a>
        </div>
      </div>
    </FadeInSection>
  );
}
