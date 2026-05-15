import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Contact");

  return (
    <div className="xten-container-narrow xten-section-lg">
      <h1 className="xten-title-rule xten-display-title text-4xl text-foreground sm:text-5xl">{t("title")}</h1>
      <p className="mt-10 font-light text-base leading-[1.85] text-muted-foreground sm:text-lg">{t("intro")}</p>
      <ContactForm />
    </div>
  );
}
