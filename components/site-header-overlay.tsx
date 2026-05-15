"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string };

type SiteHeaderOverlayProps = {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  menuTitle: string;
};

export function SiteHeaderOverlay({ open, onClose, navItems, menuTitle }: SiteHeaderOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={menuTitle}>
      <button
        type="button"
        className="absolute inset-0 bg-background/40 backdrop-blur-[2px]"
        aria-label={menuTitle}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="xten-header-menu-panel relative flex h-full w-full flex-col bg-background outline-none"
      >
        <div className="xten-container-wide flex flex-1 flex-col pt-[5.5rem] pb-12 sm:pt-[6rem] sm:pb-16">
          <nav className="flex flex-col gap-1" aria-label={menuTitle}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="xten-header-menu-link group py-3 sm:py-3.5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto border-t border-border pt-10" role="navigation" aria-label="Language">
            <div className="flex gap-8">
              {routing.locales.map((loc) => {
                const isActive = loc === locale;
                return (
                  <Link
                    key={loc}
                    href={pathname}
                    locale={loc}
                    onClick={onClose}
                    hrefLang={loc}
                    lang={loc}
                    className={cn(
                      "text-sm font-medium uppercase tracking-[0.28em] transition-colors duration-300",
                      isActive
                        ? "text-foreground underline decoration-signature decoration-2 underline-offset-[6px]"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {loc.toUpperCase()}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
