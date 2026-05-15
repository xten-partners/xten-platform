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
              "rounded-none px-2.5 py-1 transition-colors duration-300",
              isActive
                ? "bg-signature/10 text-foreground ring-1 ring-signature/35"
                : "hover:text-foreground hover:underline hover:decoration-signature hover:underline-offset-4",
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
