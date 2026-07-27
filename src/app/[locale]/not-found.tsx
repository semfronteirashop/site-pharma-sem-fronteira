import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";

export default function NotFound() {
  const dictionary = getDictionary(defaultLocale);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col justify-center px-4 py-16 md:px-6">
      <p className="text-sm font-semibold text-muted">{dictionary.notFound.code}</p>
      <h1 className="mt-2 text-3xl font-extrabold">{dictionary.notFound.title}</h1>
      <p className="mt-2 text-sm text-muted">{dictionary.notFound.lead}</p>
      <div className="mt-6 flex gap-3">
        <Link
          href={localizePath(defaultLocale, "/")}
          className="inline-flex h-11 items-center rounded-full bg-teal px-5 text-sm font-bold text-foreground"
        >
          {dictionary.notFound.home}
        </Link>
        <Link
          href={localizePath(defaultLocale, "/produtos")}
          className="inline-flex h-11 items-center rounded-full border border-border bg-surface px-5 text-sm font-bold"
        >
          {dictionary.notFound.products}
        </Link>
      </div>
    </div>
  );
}
