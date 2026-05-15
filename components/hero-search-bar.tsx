"use client";

import { Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
  light?: boolean;
  /** Ombre renforcée sur hero photographique */
  onImage?: boolean;
};

export function HeroSearchBar({ light = false, onImage = false }: Props) {
  const t = useTranslations("Home");
  const router = useRouter();
  const [query, setQuery] = useState("");
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/contact?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/contact");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 w-full max-w-[44rem] sm:mt-14"
      role="search"
      aria-label={t("heroSearchAriaLabel")}
    >
      <label htmlFor="hero-search" className="sr-only">
        {t("heroSearchLabel")}
      </label>

      <div
        className={cn(
          "xten-hero-search-shell group/search",
          onImage && "xten-hero-search-on-image",
        )}
      >
        <span
          className="xten-hero-search-icon flex shrink-0 items-center pl-5 sm:pl-6"
          aria-hidden
        >
          <Sparkles className="size-[1.125rem] stroke-[1.25]" />
        </span>

        <input
          id="hero-search"
          name="q"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("heroSearchPlaceholder")}
          autoComplete="off"
          className={cn(
            "min-w-0 flex-1 border-0 bg-transparent py-0 pl-3 pr-2 outline-none sm:pl-3.5",
            "text-[14px] font-normal leading-none tracking-[0.02em] sm:text-[15px]",
            "placeholder:font-normal placeholder:text-[10px] placeholder:uppercase placeholder:leading-none placeholder:tracking-[0.2em] sm:placeholder:text-[11px]",
            light ? "text-charcoal" : "text-foreground",
          )}
        />

        <button
          type="submit"
          aria-label={t("heroSearchSubmitLabel")}
          className={cn(
            "xten-hero-search-icon flex shrink-0 items-center justify-center pr-5 pl-2 outline-none sm:pr-6 sm:pl-2.5",
            "transition-colors duration-300",
            "hover:text-[oklch(0.55_0.03_72)] focus-visible:text-signature",
          )}
        >
          <Search className="size-[1.125rem] stroke-[1.25]" aria-hidden />
        </button>
      </div>
    </form>
  );
}
