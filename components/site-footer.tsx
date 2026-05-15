import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-ivory/10 bg-charcoal text-ivory">
      <div className="xten-container-wide xten-section py-12 sm:py-14">
        <p className="max-w-lg text-sm font-light leading-relaxed text-ivory/70">{t("tagline")}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] font-medium uppercase tracking-[0.16em]">
          <Link
            href="/privacy"
            className="text-ivory/55 transition-colors duration-300 hover:text-ivory hover:decoration-signature"
          >
            {t("privacy")}
          </Link>
          <Link href="/terms" className="text-ivory/55 transition-colors duration-300 hover:text-ivory">
            {t("terms")}
          </Link>
          <Link
            href="/privacy#cookies"
            className="text-ivory/55 transition-colors duration-300 hover:text-ivory hover:decoration-signature"
          >
            {t("cookies")}
          </Link>
        </div>
        <p className="mt-12 text-xs font-light tracking-wide text-ivory/45">
          © {year} — {t("rights")}
        </p>
      </div>
    </footer>
  );
}
