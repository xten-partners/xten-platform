import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HomeEditorial } from "@/components/home-editorial";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  const td = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      siteName: td("siteName"),
      locale,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeEditorial />;
}
