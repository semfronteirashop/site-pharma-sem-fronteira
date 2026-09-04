"use client";

import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { useLocale } from "@/components/LocaleProvider";
import { stripLocalePrefix } from "@/i18n/paths";

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.182a8.18 8.18 0 0 1-4.178-1.145l-.3-.178-2.867.855.855-2.867-.178-.3A8.182 8.182 0 0 1 3.818 12c0-4.514 3.668-8.182 8.182-8.182S20.182 7.486 20.182 12 16.514 18.182 12 18.182z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function FloatingContactButtons() {
  const pathname = usePathname();
  const bare = stripLocalePrefix(pathname);
  const { dictionary } = useLocale();
  const onProductPage = bare.startsWith("/produto/");

  const whatsappUrl = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;
  const instagramUrl = site.instagram.url;

  const bottomOffset = onProductPage
    ? "bottom-[calc(10.5rem+env(safe-area-inset-bottom,0px))] md:bottom-[max(1.25rem,env(safe-area-inset-bottom))]"
    : "bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))] md:bottom-[max(1.25rem,env(safe-area-inset-bottom))]";

  return (
    <div
      className={`animate-float-in fixed right-[max(0.75rem,env(safe-area-inset-right))] z-[35] flex flex-col items-end gap-3 ${bottomOffset}`}
      role="group"
      aria-label={dictionary.floatingContact.groupLabel}
    >
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dictionary.floatingContact.instagramLabel}
        className="card-hover-lift inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-brand-white text-brand-purple shadow-[var(--shadow-soft)] transition hover:border-brand-purple/30 md:h-12 md:w-auto md:gap-2 md:px-4"
      >
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple md:h-8 md:w-8">
          <InstagramIcon />
        </span>
        <span className="hidden truncate text-sm font-bold md:inline">
          {site.instagram.handle}
        </span>
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dictionary.floatingContact.whatsappLabel}
        className="card-hover-lift inline-flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full bg-brand-green text-white shadow-[0_6px_20px_rgba(18,168,58,0.35)] transition hover:bg-brand-green-dark md:h-14 md:w-14"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}
