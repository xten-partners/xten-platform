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
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <h1 className="font-heading text-3xl font-normal tracking-tight text-foreground sm:text-4xl">{t("title")}</h1>
      <p className="mt-8 text-base leading-[1.8] text-muted-foreground sm:text-lg">{t("intro")}</p>
      <ContactForm />
    </div>
  );
}
