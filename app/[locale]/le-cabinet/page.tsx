import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { EditorialFadeIn } from "@/components/editorial-fade-in";

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
  const listD = t.raw("listD") as string[];

  return (
    <article className="border-b border-border/50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <header>
          <EditorialFadeIn>
            <h1 className="font-heading text-4xl font-normal tracking-tight text-foreground sm:text-5xl">{t("title")}</h1>
            <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.26em] text-muted-foreground sm:mt-8 sm:text-[11px]">
              {t("strap2")}
            </p>
          </EditorialFadeIn>
        </header>

        <section className="mt-14 border-t border-border/40 pt-14 sm:mt-16 sm:pt-16" aria-labelledby="cabinet-niche-heading">
          <EditorialFadeIn>
            <h2 id="cabinet-niche-heading" className="text-[10px] font-medium uppercase tracking-[0.26em] text-muted-foreground sm:text-[11px]">
              {t("strap1")}
            </h2>
          </EditorialFadeIn>

          <div className="mt-10 space-y-10 text-base leading-[1.82] text-muted-foreground sm:text-[17px] sm:leading-[1.8]">
          <EditorialFadeIn>
            <div className="max-w-3xl space-y-2">
              {listA.map((line) => (
                <p key={line} className="font-medium leading-snug text-foreground sm:text-lg">
                  {line}
                </p>
              ))}
            </div>
          </EditorialFadeIn>
          <EditorialFadeIn>
            <p className="max-w-3xl">{t("p1")}</p>
          </EditorialFadeIn>
          <EditorialFadeIn>
            <div className="max-w-3xl space-y-2">
              {listB.map((line) => (
                <p key={line} className="font-medium leading-snug text-foreground sm:text-lg">
                  {line}
                </p>
              ))}
            </div>
          </EditorialFadeIn>
          <EditorialFadeIn>
            <p className="max-w-3xl">{t("p2")}</p>
          </EditorialFadeIn>
          <EditorialFadeIn>
            <div className="max-w-3xl space-y-2">
              {listC.map((line) => (
                <p key={line} className="font-medium leading-snug text-foreground sm:text-lg">
                  {line}
                </p>
              ))}
            </div>
          </EditorialFadeIn>
          <EditorialFadeIn>
            <p className="max-w-3xl">{t("p3")}</p>
          </EditorialFadeIn>
          <EditorialFadeIn>
            <div className="max-w-3xl space-y-2">
              {listD.map((line) => (
                <p key={line} className="font-medium leading-snug text-foreground sm:text-lg">
                  {line}
                </p>
              ))}
            </div>
          </EditorialFadeIn>
          <EditorialFadeIn>
            <p className="max-w-3xl font-heading text-lg font-normal leading-snug text-foreground sm:text-xl">{t("p4")}</p>
          </EditorialFadeIn>
          </div>
        </section>

        <section className="mt-14 border-t border-border/40 pt-14 sm:mt-16 sm:pt-16" aria-labelledby="cabinet-founder-heading">
          <EditorialFadeIn>
            <h2
              id="cabinet-founder-heading"
              className="font-heading text-2xl font-normal leading-snug tracking-tight text-foreground sm:text-3xl"
            >
              {t("founderTitle")}
            </h2>
          </EditorialFadeIn>
        </section>
      </div>
    </article>
  );
}
