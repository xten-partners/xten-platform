import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

type LegalSection = { heading: string; body: string; id?: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Privacy");
  const sections = t.raw("sections") as LegalSection[];

  return (
    <article className="xten-container-narrow xten-section">
      <h1 className="xten-display-title text-4xl text-foreground">
        {t("title")}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">{t("updated")}</p>
      <div className="mt-12 space-y-12">
        {sections.map((section) => (
          <section key={section.heading} id={section.id}>
            <h2 className="xten-display-title text-xl text-foreground">
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
