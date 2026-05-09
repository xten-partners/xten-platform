import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MobileNav } from "@/components/mobile-nav";
import { LocaleSwitcher } from "@/components/locale-switcher";

export async function SiteHeader() {
  const t = await getTranslations("Nav");
  const tm = await getTranslations("Metadata");

  const items = [
    { href: "/", label: t("home") },
    { href: "/contextes", label: t("contexts") },
    { href: "/about", label: t("about") },
    { href: "/letters", label: t("letters") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/88 shadow-[0_1px_0_rgba(0,0,0,0.03)] backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-[3.35rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-heading text-lg font-medium tracking-tight text-foreground"
        >
          {tm("siteName")}
        </Link>
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Principal"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitcher className="hidden md:flex" />
          <MobileNav items={items} />
        </div>
      </div>
    </header>
  );
}
