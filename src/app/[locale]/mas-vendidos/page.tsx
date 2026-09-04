import { notFound, redirect } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";

type Params = Promise<{ locale: string }>;

export default async function LegacyBestSellersRedirect({
  params,
}: {
  params: Params;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  redirect(localizePath(raw as Locale, "/mais-procurados"));
}
