import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LandingTop500" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function Top500Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("LandingTop500");
  const c = await getTranslations("Common");

  return (
    <article className="xten-container-narrow xten-section-lg">
      <h1 className="xten-title-rule xten-display-title text-4xl text-foreground sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-10 text-lg leading-[1.65] text-muted-foreground">{t("lede")}</p>
      <p className="mt-8 text-base leading-[1.8] text-foreground/90">{t("body")}</p>
      <p className="mt-10 text-base leading-[1.75] text-muted-foreground">{t("closing")}</p>
      <div className="mt-14">
        <Button asChild variant="outline" className="h-11 border-foreground/15 px-7">
          <Link href="/contact">{c("startConversation")}</Link>
        </Button>
      </div>
    </article>
  );
}
