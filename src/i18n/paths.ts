import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export function localizePath(locale: Locale, path = "/"): string {
  const url = new URL(path, "https://local.test");
  const pathname = url.pathname || "/";
  const localized =
    pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return `${localized}${url.search}${url.hash}`;
}

export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (maybeLocale && isLocale(maybeLocale)) {
    const rest = `/${segments.slice(2).join("/")}`;
    return rest === "/" ? "/" : rest.replace(/\/$/, "") || "/";
  }
  return pathname || "/";
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const maybe = pathname.split("/")[1];
  return maybe && isLocale(maybe) ? maybe : null;
}

export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const bare = stripLocalePrefix(pathname);
  return localizePath(nextLocale, bare);
}

export function resolveLocale(input?: string | null): Locale {
  if (input && isLocale(input)) return input;
  return defaultLocale;
}
