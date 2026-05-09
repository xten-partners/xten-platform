import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const year = new Date().getFullYear();

  const landing = [
    { href: "/private-equity", label: t("privateEquity") },
    { href: "/eti", label: t("eti") },
    { href: "/top500", label: t("top500") },
    { href: "/international-subsidiaries", label: t("internationalSubsidiaries") },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {t("tagline")}
        </p>
        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t("sectionContexts")}
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/contextes"
                  className="text-sm text-foreground underline-offset-4 hover:underline"
                >
                  {t("contextsOverview")}
                </Link>
              </li>
              {landing.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t("sectionInfo")}
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-foreground underline-offset-4 hover:underline"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-foreground underline-offset-4 hover:underline"
                >
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-foreground underline-offset-4 hover:underline"
                >
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-12 text-xs text-muted-foreground">
          © {year} — {t("rights")}
        </p>
      </div>
    </footer>
  );
}
