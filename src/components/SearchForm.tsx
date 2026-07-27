"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useLocale } from "@/components/LocaleProvider";

type SearchFormProps = {
  initialQuery?: string;
  className?: string;
  autoFocus?: boolean;
  /** Versão mais baixa para header mobile. */
  compact?: boolean;
};

export function SearchForm({
  initialQuery = "",
  className = "",
  autoFocus = false,
  compact = false,
}: SearchFormProps) {
  const router = useRouter();
  const { dictionary, href } = useLocale();
  const [query, setQuery] = useState(initialQuery);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const q = query.trim();
    if (!q) {
      router.push(href("/busca"));
      return;
    }
    router.push(`${href("/busca")}?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={onSubmit} className={`relative ${className}`}>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={dictionary.searchPlaceholder}
        autoFocus={autoFocus}
        className={`w-full rounded-full border border-transparent bg-[#eef2f7] text-sm outline-none ring-teal/30 placeholder:text-muted focus:border-teal focus:bg-white focus:ring-2 ${
          compact
            ? "h-9 pl-3.5 pr-20 text-[13px]"
            : "h-11 pl-4 pr-24"
        }`}
        aria-label={dictionary.search}
      />
      <button
        type="submit"
        className={`absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-blue font-bold text-white hover:bg-blue-hover ${
          compact ? "px-3 py-1 text-[11px]" : "right-1.5 px-3.5 py-1.5 text-xs"
        }`}
      >
        {dictionary.search}
      </button>
    </form>
  );
}
