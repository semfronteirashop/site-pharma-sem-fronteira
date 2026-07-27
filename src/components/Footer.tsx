"use client";

import Link from "next/link";
import { site, tSite } from "@/data/site";
import { buildSupportMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { useLocale } from "@/components/LocaleProvider";

export function Footer() {
  const { dictionary, href, locale } = useLocale();
  const supportUrl = buildWhatsAppUrl(
    buildSupportMessage(locale, dictionary.whatsappMsg.defaultTopic),
  );

  const institutional = [
    { href: "/autenticidade", label: dictionary.footer.company },
    { href: "/checkout", label: dictionary.footer.myOrder },
    { href: "/autenticidade", label: dictionary.footer.supportLink },
  ];
  const politicas = [
    { href: "/privacidade", label: dictionary.footer.terms },
    { href: "/privacidade", label: dictionary.footer.privacy },
    { href: "/autenticidade", label: dictionary.footer.shipping },
    { href: "/privacidade", label: dictionary.footer.refunds },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 text-lg font-extrabold text-blue">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal text-sm text-white">
              +
            </span>
            Sem Fronteira
          </p>
          <p className="mt-1 text-sm text-muted">{dictionary.brandSubtitle}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground/80">
            {tSite(site.tagline, locale)} {tSite(site.description, locale)}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
            {dictionary.footer.institutional}
          </h2>
          <ul className="mt-3 space-y-2">
            {institutional.map((link) => (
              <li key={link.label}>
                <Link href={href(link.href)} className="text-sm text-muted hover:text-teal-deep">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
            {dictionary.footer.policies}
          </h2>
          <ul className="mt-3 space-y-2">
            {politicas.map((link) => (
              <li key={link.label}>
                <Link href={href(link.href)} className="text-sm text-muted hover:text-teal-deep">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
            {dictionary.footer.support}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              {dictionary.footer.support}: {site.supportHours}
            </li>
            <li>
              <a
                href={supportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-teal-deep hover:underline"
              >
                WhatsApp {site.whatsappDisplay}
              </a>
            </li>
          </ul>
          <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-foreground">
            {dictionary.footer.payments}
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {dictionary.footer.paymentMethods.map((method) => (
              <li key={method}>{method}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted md:px-6">
        {dictionary.footer.copyright(new Date().getFullYear(), site.name)}
      </div>
    </footer>
  );
}
