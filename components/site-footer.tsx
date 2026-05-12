import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/20">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">{t("tagline")}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-medium uppercase tracking-[0.14em]">
          <Link href="/privacy" className="text-muted-foreground transition-colors duration-200 hover:text-foreground">
            {t("privacy")}
          </Link>
          <Link href="/terms" className="text-muted-foreground transition-colors duration-200 hover:text-foreground">
            {t("terms")}
          </Link>
          <Link href="/privacy#cookies" className="text-muted-foreground transition-colors duration-200 hover:text-foreground">
            {t("cookies")}
          </Link>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          © {year} — {t("rights")}
        </p>
      </div>
    </footer>
  );
}
