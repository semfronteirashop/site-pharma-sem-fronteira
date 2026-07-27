"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { navHrefs, site } from "@/data/site";
import { useCart } from "@/lib/cart";
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
    <header className="sticky top-0 z-40">
      <div className="bg-topbar text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-xs md:px-6 md:text-sm">
          <p className="truncate">
            <span className="sm:hidden">Brasil / Paraguay</span>
            <span className="hidden sm:inline">
              {dictionary.topbar} {site.supportHours}
            </span>
          </p>
          <a
            href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-semibold underline-offset-2 hover:underline"
          >
            <span className="sm:hidden">WhatsApp</span>
            <span className="hidden sm:inline">{site.whatsappDisplay}</span>
          </a>
        </div>
      </div>

      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 md:gap-5 md:px-6 md:py-4">
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-lg lg:hidden"
            aria-label={dictionary.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <Link href={href("/")} className="min-w-0 shrink">
            <span className="flex items-center gap-2">
              <span className="relative h-8 w-24 sm:h-9 sm:w-28">
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
          </Link>

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
              className="relative inline-flex h-10 items-center justify-center gap-2 rounded-full bg-blue px-3 text-sm font-bold text-white hover:bg-blue-hover sm:h-11 sm:px-4"
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

        <div className="border-t border-border px-3 py-2 sm:px-4 md:hidden md:px-6">
          <SearchForm />
        </div>

        <nav className="hidden border-t border-border lg:block">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 md:px-6">
            {navHrefs.map((link) => (
              <Link
                key={link.href + link.key}
                href={href(link.href)}
                className="px-3 py-3 text-sm font-medium text-foreground/80 hover:text-teal-deep"
              >
                {dictionary.nav[link.key]}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile quick chips */}
        <div className="border-t border-border px-3 py-2 lg:hidden">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navHrefs.map((link) => (
              <Link
                key={`chip-${link.href}-${link.key}`}
                href={href(link.href)}
                className="shrink-0 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground"
              >
                {dictionary.nav[link.key]}
              </Link>
            ))}
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-border bg-surface px-3 py-4 lg:hidden sm:px-4">
            <div className="mb-4 sm:hidden">
              <Suspense fallback={null}>
                <LanguageSwitcher />
              </Suspense>
            </div>
            <nav className="flex flex-col gap-1">
              {navHrefs.map((link) => (
                <Link
                  key={link.href + link.key}
                  href={href(link.href)}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-3 py-3.5 text-base font-medium hover:bg-background"
                >
                  {dictionary.nav[link.key]}
                </Link>
              ))}
            </nav>
            <a
              href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex h-12 items-center justify-center rounded-full bg-whatsapp text-sm font-bold text-white"
              onClick={() => setMenuOpen(false)}
            >
              {dictionary.whatsapp}
            </a>
          </div>
        ) : null}
      </div>
    </header>
  );
}
