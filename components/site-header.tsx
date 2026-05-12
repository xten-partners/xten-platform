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
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/88 backdrop-blur-md supports-[backdrop-filter]:bg-background/82">
      <div className="mx-auto flex h-[3.5rem] w-full max-w-5xl items-center justify-between gap-4 px-4 sm:h-14 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="rounded-sm font-heading text-[1.05rem] font-medium tracking-tight text-foreground transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-lg"
        >
          {tm("siteName")}
        </Link>
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Principal">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm px-3 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-200 hover:bg-muted/50 hover:text-foreground"
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
