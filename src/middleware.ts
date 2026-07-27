import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookie,
  locales,
  type Locale,
} from "@/i18n/config";

function detectFromHeader(header: string | null): Locale {
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return {
        tag: tag.toLowerCase(),
        q: q ? Number(q) : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const item of preferred) {
    if (item.tag.startsWith("pt")) return "pt";
    if (item.tag.startsWith("es")) return "es";
  }

  return defaultLocale;
}

function hasFileExtension(pathname: string): boolean {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/favicon.ico" ||
    hasFileExtension(pathname)
  ) {
    return NextResponse.next();
  }

  const segment = pathname.split("/")[1];
  if (segment && isLocale(segment)) {
    const response = NextResponse.next();
    response.cookies.set(localeCookie, segment, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    response.headers.set("x-locale", segment);
    return response;
  }

  const cookieLocale = request.cookies.get(localeCookie)?.value;
  const locale: Locale =
    cookieLocale && isLocale(cookieLocale)
      ? cookieLocale
      : detectFromHeader(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(localeCookie, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};

// Keep locales referenced for clarity in future expansion.
void locales;
