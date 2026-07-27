"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { navHrefs, site } from "@/data/site";
import { useCart } from "@/lib/cart";
import { AppLink } from "@/components/AppLink";
import { SearchForm } from "@/components/SearchForm";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/components/LocaleProvider";

export function Header() {
  const { itemCount, openCart } = useCart();
  const { dictionary, href } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Fora do sticky no mobile: não compete por altura fixa */}
      <div className="hidden bg-topbar text-white sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2 text-xs md:px-6 md:text-sm">
          <p className="truncate">
            {dictionary.topbar} {site.supportHours}
          </p>
          <a
            href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-semibold underline-offset-2 hover:underline"
          >
            {site.whatsappDisplay}
          </a>
        </div>
      </div>

      <header className="relative sticky top-0 z-40 border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3 md:gap-5 md:px-6 md:py-4">
          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-base lg:hidden"
            aria-label={dictionary.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <AppLink href={href("/")} prefetch className="min-w-0 shrink">
            <span className="flex items-center gap-2">
              <span className="relative h-7 w-20 sm:h-9 sm:w-28">
                <Image
                  src="/brand/logo.png"
                  alt="Sem Fronteira"
                  fill
                  className="object-contain object-left"
                  sizes="112px"
                  priority
                />
              </span>
              <span className="sr-only">
                Sem Fronteira {dictionary.brandSubtitle}
              </span>
            </span>
          </AppLink>

          <div className="mx-auto hidden w-full max-w-xl flex-1 md:block">
            <SearchForm />
          </div>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <div className="hidden sm:block">
              <Suspense fallback={null}>
                <LanguageSwitcher />
              </Suspense>
            </div>
            <a
              href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center rounded-full bg-whatsapp px-3 text-sm font-bold text-white sm:inline-flex sm:h-11 sm:px-4"
            >
              {dictionary.whatsapp}
            </a>
            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex h-9 items-center justify-center gap-2 rounded-full bg-blue px-2.5 text-sm font-bold text-white hover:bg-blue-hover sm:h-11 sm:px-4"
              aria-label={dictionary.openCart}
            >
              <span className="hidden sm:inline">{dictionary.cart}</span>
              <span className="sm:hidden" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3.5 5h2l1.2 10.2A2 2 0 0 0 8.7 17H17a2 2 0 0 0 2-1.7L20 8H7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="9" cy="20" r="1.2" fill="currentColor" />
                  <circle cx="17" cy="20" r="1.2" fill="currentColor" />
                </svg>
              </span>
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-blue">
                {itemCount}
              </span>
            </button>
          </div>
        </div>

        <div className="px-3 pb-1.5 md:hidden">
          <SearchForm compact />
        </div>

        <div className="px-3 pb-2 lg:hidden">
          <div className="-mx-0.5 flex gap-1.5 overflow-x-auto px-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navHrefs.map((link) => (
              <AppLink
                key={`chip-${link.href}-${link.key}`}
                href={href(link.href)}
                className="shrink-0 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-semibold leading-none text-foreground"
              >
                {dictionary.nav[link.key]}
              </AppLink>
            ))}
          </div>
        </div>

        <nav className="hidden border-t border-border lg:block">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 md:px-6">
            {navHrefs.map((link) => (
              <AppLink
                key={link.href + link.key}
                href={href(link.href)}
                className="px-3 py-3 text-sm font-medium text-foreground/80 hover:text-teal-deep"
              >
                {dictionary.nav[link.key]}
              </AppLink>
            ))}
          </div>
        </nav>

        {menuOpen ? (
          <div className="absolute inset-x-0 top-full z-50 max-h-[min(70vh,520px)] overflow-y-auto border-b border-border bg-surface px-3 py-3 shadow-[var(--shadow-soft)] lg:hidden sm:px-4">
            <div className="mb-3 sm:hidden">
              <Suspense fallback={null}>
                <LanguageSwitcher />
              </Suspense>
            </div>
            <nav className="flex flex-col gap-0.5">
              {navHrefs.map((link) => (
                <AppLink
                  key={link.href + link.key}
                  href={href(link.href)}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-[15px] font-medium hover:bg-background"
                >
                  {dictionary.nav[link.key]}
                </AppLink>
              ))}
            </nav>
            <a
              href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex h-11 items-center justify-center rounded-full bg-whatsapp text-sm font-bold text-white"
              onClick={() => setMenuOpen(false)}
            >
              {dictionary.whatsapp}
            </a>
          </div>
        ) : null}
      </header>
    </>
  );
}
