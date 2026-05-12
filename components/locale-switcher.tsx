"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-xs font-medium tracking-wide text-muted-foreground",
        className,
      )}
      role="navigation"
      aria-label="Language"
    >
      {routing.locales.map((loc) => {
        const isActive = loc === locale;
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            className={cn(
              "rounded-md px-2 py-1 transition-colors duration-200",
              isActive
                ? "bg-foreground/[0.08] text-foreground"
                : "hover:bg-muted/70 hover:text-foreground",
            )}
            hrefLang={loc}
            lang={loc}
          >
            {loc.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
