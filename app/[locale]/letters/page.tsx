import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { LETTER_SLUGS } from "@/lib/letters";
import { EditorialDivider } from "@/components/editorial-divider";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Letters" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function LettersIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Letters");
  const c = await getTranslations("Common");

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {t("seriesBadge")}
      </p>
      <h1 className="mt-5 font-heading text-4xl font-normal tracking-tight text-foreground sm:text-[2.5rem]">
        {t("title")}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">{t("publicationLine")}</p>
      <p className="mt-10 max-w-2xl text-base leading-[1.8] text-foreground/90">
        {t("intro")}
      </p>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {t("previewNote")}
      </p>

      <EditorialDivider className="my-12 md:my-16" />

      <ul className="divide-y divide-border border-t border-border">
        {LETTER_SLUGS.map((slug) => (
          <li key={slug} className="py-12 first:pt-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {t(`items.${slug}.statusLine`)}
            </p>
            <h2 className="mt-3 font-heading text-2xl font-normal tracking-tight text-foreground">
              <Link
                href={`/letters/${slug}`}
                className="hover:underline hover:decoration-foreground/25 hover:underline-offset-4"
              >
                {t(`items.${slug}.title`)}
              </Link>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {t(`items.${slug}.excerpt`)}
            </p>
            <p className="mt-5">
              <Link
                href={`/letters/${slug}`}
                className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                {c("continueReading")}
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
