"use client";

import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { useCart } from "@/lib/cart";
import { AppLink } from "@/components/AppLink";
import { useLocale } from "@/components/LocaleProvider";
import { stripLocalePrefix } from "@/i18n/paths";
import { hasActiveSaleProducts } from "@/lib/catalog";

function IconHome({ active }: { active?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 0.15 : 0}
      />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconTag() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12.5V5h7.5L20 13.5 12.5 21 4 12.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="9" r="1.2" fill="currentColor" />
    </svg>
  );
}

function IconCart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
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
  );
}

function IconChat() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 18.5 6.2 15A7.5 7.5 0 1 1 9 19.2L5 18.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const bare = stripLocalePrefix(pathname);
  const { href, dictionary } = useLocale();
  const { itemCount, openCart } = useCart();

  const items = [
    {
      key: "home",
      label: dictionary.nav.home,
      href: href("/"),
      active: bare === "/",
      icon: <IconHome active={bare === "/"} />,
    },
    {
      key: "products",
      label: dictionary.nav.products,
      href: href("/produtos"),
      active:
        bare.startsWith("/produtos") ||
        bare.startsWith("/produto") ||
        bare.startsWith("/categoria") ||
        bare.startsWith("/lancamentos") ||
        bare.startsWith("/mais-procurados") ||
        bare.startsWith("/mas-vendidos"),
      icon: <IconGrid />,
    },
    ...(hasActiveSaleProducts()
      ? [
          {
            key: "offers" as const,
            label: dictionary.nav.offers,
            href: href("/ofertas"),
            active: bare.startsWith("/ofertas"),
            icon: <IconTag />,
          },
        ]
      : []),
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "max(0.35rem, env(safe-area-inset-bottom))" }}
    >
      <div
        className={`mx-auto grid max-w-lg gap-0.5 px-1.5 pt-1.5 ${
          hasActiveSaleProducts() ? "grid-cols-5" : "grid-cols-4"
        }`}
      >
        {items.map((item) => (
          <AppLink
            key={item.key}
            href={item.href}
            className={`flex min-h-12 flex-col items-center justify-center rounded-xl text-[10px] font-semibold ${item.active ? "bg-brand-purple/10 text-brand-purple" : "text-muted"
              }`}
          >
            {item.icon}
            <span className="mt-1 truncate px-0.5">{item.label}</span>
          </AppLink>
        ))}

        <button
          type="button"
          onClick={openCart}
          className="relative flex min-h-12 flex-col items-center justify-center rounded-xl text-[10px] font-semibold text-muted"
        >
          <IconCart />
          <span className="mt-1">{dictionary.cart}</span>
          {itemCount > 0 ? (
            <span className="absolute right-1.5 top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-sale px-1 text-[10px] font-bold text-white">
              {itemCount}
            </span>
          ) : null}
        </button>

        <a
          href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 flex-col items-center justify-center rounded-xl text-[10px] font-semibold text-brand-green"
        >
          <IconChat />
          <span className="mt-1">{dictionary.whatsapp}</span>
        </a>
      </div>
    </nav>
  );
}
