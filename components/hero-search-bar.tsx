"use client";

import { Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

type Props = {
  light?: boolean;
};

export function HeroSearchBar({ light = false }: Props) {
  const t = useTranslations("Home");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

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
      className="xten-hero-search mt-10 w-full max-w-[38rem]"
      role="search"
      aria-label={t("heroSearchAriaLabel")}
    >
      <label htmlFor="hero-search" className="sr-only">
        {t("heroSearchLabel")}
      </label>

      <div
        className={cn(
          "group/search relative flex h-[3.375rem] items-stretch sm:h-[3.5rem]",
          "rounded-full border transition-[border-color,box-shadow] duration-700",
          light
            ? cn(
                "border-ivory/18",
                "bg-[linear-gradient(180deg,oklch(0.995_0.004_85/0.98)_0%,oklch(0.955_0.01_82/0.96)_100%)]",
                "shadow-[0_1px_0_0_oklch(1_0_0/0.35)_inset,0_10px_40px_oklch(0.14_0.018_48/0.38),0_0_0_1px_oklch(0_0_0/0.04)]",
                focused &&
                  "border-signature/55 shadow-[0_1px_0_0_oklch(1_0_0/0.4)_inset,0_14px_48px_oklch(0.12_0.02_45/0.45),0_0_0_1px_oklch(0.6_0.048_58/0.28)]",
              )
            : cn(
                "border-border/70 bg-card",
                "shadow-[0_1px_0_0_oklch(1_0_0/0.5)_inset,0_6px_24px_oklch(0.2_0.02_50/0.08)]",
                focused &&
                  "border-signature/40 shadow-[0_1px_0_0_oklch(1_0_0/0.5)_inset,0_8px_28px_oklch(0.2_0.02_50/0.12),0_0_0_1px_oklch(0.6_0.048_58/0.2)]",
              ),
        )}
        style={{ transitionTimingFunction: ease }}
      >
        <span
          className={cn(
            "flex shrink-0 items-center pl-5 pr-2 sm:pl-6 sm:pr-3",
            "transition-colors duration-700",
            light
              ? "text-charcoal/28 group-focus-within/search:text-charcoal/42"
              : "text-muted-foreground/40 group-focus-within/search:text-muted-foreground/60",
          )}
          aria-label={t("heroSearchAiLabel")}
          title={t("heroSearchAiLabel")}
        >
          <Sparkles className="size-[0.95rem] stroke-[1.35] sm:size-4" aria-hidden />
        </span>

        <input
          id="hero-search"
          name="q"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={t("heroSearchPlaceholder")}
          autoComplete="off"
          className={cn(
            "min-w-0 flex-1 border-0 bg-transparent py-0 pl-0 pr-4 outline-none",
            "text-[15px] font-light leading-none tracking-[0.02em] sm:text-[0.9375rem]",
            "placeholder:font-normal placeholder:text-[10px] placeholder:uppercase placeholder:leading-none placeholder:tracking-[0.16em] sm:placeholder:text-[11px]",
            light
              ? "text-charcoal placeholder:text-charcoal/32"
              : "text-foreground placeholder:text-muted-foreground/45",
          )}
          style={{ transitionTimingFunction: ease }}
        />

        <span
          className={cn(
            "my-3.5 w-px shrink-0 self-center",
            light ? "bg-charcoal/10" : "bg-border/80",
          )}
          aria-hidden
        />

        <button
          type="submit"
          aria-label={t("heroSearchSubmitLabel")}
          className={cn(
            "flex shrink-0 items-center justify-center px-5 outline-none sm:px-6",
            "transition-[color,opacity] duration-700",
            "focus-visible:text-signature",
            light
              ? "text-charcoal/30 hover:text-signature/90"
              : "text-muted-foreground/45 hover:text-foreground/70",
          )}
          style={{ transitionTimingFunction: ease }}
        >
          <Search
            className="size-4 stroke-[1.85] sm:size-[1.125rem] sm:stroke-[2]"
            aria-hidden
          />
        </button>
      </div>
    </form>
  );
}
