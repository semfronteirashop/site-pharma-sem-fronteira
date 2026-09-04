"use client";

import Image from "next/image";
import { institutionalHrefs, navHrefs, site } from "@/data/site";
import { AppLink } from "@/components/AppLink";
import { useLocale } from "@/components/LocaleProvider";

export function Footer() {
  const { dictionary, href } = useLocale();
  const whatsappUrl = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;

  return (
    <footer className="mt-auto border-t border-border bg-brand-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:gap-10 md:px-6 lg:grid-cols-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-purple">
            {dictionary.footer.brandName}
          </h2>
          <AppLink href={href("/")} className="mt-3 inline-flex items-center gap-3">
            <span className="relative block h-11 w-[3.65rem]">
              <Image
                src="/brand/logo.png"
                alt="Sem Fronteira"
                fill
                className="object-contain object-left"
                sizes="58px"
              />
            </span>
            <span className="sr-only">Sem Fronteira {dictionary.brandSubtitle}</span>
          </AppLink>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {dictionary.footer.brandDescription}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
            {dictionary.footer.explore}
          </h2>
          <ul className="mt-3 space-y-2">
            {navHrefs.map((link) => (
              <li key={link.href}>
                <AppLink
                  href={href(link.href)}
                  className="text-sm text-muted hover:text-brand-purple"
                >
                  {dictionary.nav[link.key]}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
            {dictionary.footer.institutional}
          </h2>
          <ul className="mt-3 space-y-2">
            {institutionalHrefs.map((link) => (
              <li key={`${link.href}-${link.key}`}>
                <AppLink
                  href={href(link.href)}
                  className="text-sm text-muted hover:text-brand-purple"
                >
                  {link.key === "about"
                    ? dictionary.nav.about
                    : dictionary.footer[link.key]}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
            {dictionary.footer.contacts}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-green-dark hover:text-brand-green"
              >
                WhatsApp {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-purple hover:text-brand-purple-hover"
              >
                Instagram {site.instagram.handle}
              </a>
            </li>
            <li className="text-muted">
              {dictionary.footer.supportHours}: {site.supportHours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted md:px-6">
        {dictionary.footer.copyright(new Date().getFullYear(), site.name)}
      </div>
    </footer>
  );
}
