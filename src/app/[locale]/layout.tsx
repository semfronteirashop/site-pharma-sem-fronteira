import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { NavigationProgress } from "@/components/NavigationProgress";
import { JsonLd } from "@/components/JsonLd";
import { LocaleProvider } from "@/components/LocaleProvider";
import { CartProvider } from "@/lib/cart";
import { createMetadata, organizationJsonLd } from "@/lib/seo";
import { site, tSite } from "@/data/site";
import { isLocale, locales, type Locale } from "@/i18n/config";

const bodyFont = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;

  return {
    ...createMetadata({
      title: site.name,
      description: tSite(site.description, locale),
      path: "/",
      locale,
    }),
    metadataBase: new URL(site.url),
    icons: {
      icon: "/favicon.svg",
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <html lang={locale} className={`${bodyFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans text-foreground">
        <JsonLd data={organizationJsonLd(locale)} />
        <LocaleProvider locale={locale}>
          <CartProvider>
            <NavigationProgress />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <MobileBottomNav />
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
