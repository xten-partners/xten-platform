import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

type LegalSection = { heading: string; body: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Terms");
  const sections = t.raw("sections") as LegalSection[];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <h1 className="font-heading text-4xl font-normal tracking-tight text-foreground">
        {t("title")}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">{t("updated")}</p>
      <div className="mt-12 space-y-12">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-heading text-xl font-medium tracking-tight text-foreground">
              {section.heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
