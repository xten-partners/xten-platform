import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MobileNav } from "@/components/mobile-nav";
import { LocaleSwitcher } from "@/components/locale-switcher";

export async function SiteHeader() {
  const t = await getTranslations("Nav");
  const tm = await getTranslations("Metadata");

  const items = [
    { href: "/services", label: t("services") },
    { href: "/le-cabinet", label: t("cabinet") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <div className="xten-container flex h-16 w-full items-center justify-between gap-6 sm:h-[4.25rem]">
        <Link
          href="/"
          className="font-sans text-xl font-medium tracking-[0.12em] text-foreground uppercase transition-opacity duration-500 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-[1.35rem]"
        >
          {tm("siteName")}
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-[color,background-color] duration-500 hover:bg-foreground/[0.04] hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <LocaleSwitcher className="hidden md:flex" />
          <MobileNav items={items} />
        </div>
      </div>
    </header>
  );
}
