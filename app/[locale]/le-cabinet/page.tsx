import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { EditorialFadeIn } from "@/components/editorial-fade-in";
import { HomeHero } from "@/components/home-hero";
import { editorialImages } from "@/lib/editorial-images";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Cabinet" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function LeCabinetPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Cabinet");
  const listA = t.raw("listA") as string[];
  const listB = t.raw("listB") as string[];
  const listC = t.raw("listC") as string[];

  return (
    <div className="bg-background">
      <HomeHero
        variant="editorial"
        backgroundImage={editorialImages.cabinetHero}
        backgroundTreatment="hero"
        eyebrow={t("heroEyebrow")}
        titleMain={t("title")}
        quoteBody={t("heroQuote")}
        quoteAttribution={t("heroQuoteAttribution")}
        secondaryHref="/services"
        secondaryLabel={t("heroSecondaryCta")}
      />
      <article className="border-b border-border/50">
        <div className="xten-container-narrow xten-section">
          <section className="border-t border-border/40 pt-14 sm:pt-16" aria-labelledby="cabinet-niche-heading">
            <EditorialFadeIn>
              <h2 id="cabinet-niche-heading" className="xten-eyebrow">
                {t("strap1")}
              </h2>
            </EditorialFadeIn>

            <div className="mt-10 space-y-10 text-base leading-[1.82] text-muted-foreground sm:text-[17px] sm:leading-[1.8]">
              <EditorialFadeIn>
                <p className="max-w-3xl whitespace-pre-line">{t("p3")}</p>
              </EditorialFadeIn>
              <EditorialFadeIn>
                <div className="max-w-3xl grid grid-cols-1 gap-10 md:max-w-none md:grid-cols-3 md:gap-0 md:divide-x md:divide-border/55">
                  <div className="space-y-2 md:pr-6 lg:pr-8">
                    {listB.map((line) => (
                      <p key={line} className="font-medium leading-snug text-foreground sm:text-lg">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="space-y-2 md:px-6 lg:px-8">
                    {listA.map((line) => (
                      <p key={line} className="font-medium leading-snug text-foreground sm:text-lg">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="space-y-2 md:pl-6 lg:pl-8">
                    {listC.map((line) => (
                      <p key={line} className="font-medium leading-snug text-foreground sm:text-lg">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </EditorialFadeIn>
              <EditorialFadeIn>
                <p className="max-w-3xl">{t("p1")}</p>
              </EditorialFadeIn>
            </div>
          </section>

          <section className="mt-14 border-t border-border/40 pt-14 sm:mt-16 sm:pt-16" aria-labelledby="cabinet-experiences-heading">
            <EditorialFadeIn>
              <h2
                id="cabinet-experiences-heading"
                className="xten-eyebrow"
              >
                {t("experiencesSectionTitle")}
              </h2>
            </EditorialFadeIn>
            <div className="mt-8 max-w-3xl space-y-6 text-base leading-[1.82] text-muted-foreground sm:mt-10 sm:text-[17px] sm:leading-[1.8]">
              <EditorialFadeIn>
                <p>{t("experiencesBody1")}</p>
              </EditorialFadeIn>
              <EditorialFadeIn>
                <p>{t("experiencesBody2")}</p>
              </EditorialFadeIn>
            </div>
          </section>

          <section className="mt-14 border-t border-border/40 pt-14 sm:mt-16 sm:pt-16" aria-labelledby="cabinet-founder-heading">
            <EditorialFadeIn>
              <h2
                id="cabinet-founder-heading"
                className="xten-display-title text-2xl leading-snug text-foreground sm:text-3xl"
              >
                {t("founderTitle")}
              </h2>
            </EditorialFadeIn>
          </section>
        </div>
      </article>
    </div>
  );
}
