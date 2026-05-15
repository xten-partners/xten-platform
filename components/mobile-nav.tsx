"use client";

import { MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LocaleSwitcher } from "@/components/locale-switcher";

type NavItem = { href: string; label: string };

export function MobileNav({ items }: { items: NavItem[] }) {
  const t = useTranslations("Nav");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          aria-label={t("openMenu")}
        >
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(100%,22rem)] border-border bg-background">
        <SheetHeader>
          <SheetTitle className="xten-display-title text-left text-xl">
            {t("menuTitle")}
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-10 flex flex-col gap-0.5" aria-label="Mobile">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:bg-foreground/[0.03] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-10 border-t border-border pt-8">
          <LocaleSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
}
