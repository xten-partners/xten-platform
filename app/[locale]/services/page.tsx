import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { EditorialFadeIn } from "@/components/editorial-fade-in";
import { HomeHero } from "@/components/home-hero";
import { editorialImages } from "@/lib/editorial-images";

type Props = { params: Promise<{ locale: string }> };

type Row = { label: string; value: string };

type ServiceLabels = {
  scope: string;
  duration: string;
  pricing: string;
  mechanics: string;
  guarantee: string;
  payment: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

function ServiceBlock({
  quote,
  title,
  scope,
  duration,
  pricingLead,
  rows,
  mechanics,
  guarantee,
  payment,
  labels,
  showTopRule,
}: {
  quote: string;
  title: string;
  scope: string;
  duration: string;
  pricingLead: string;
  rows: Row[];
  mechanics: string;
  guarantee: string;
  payment: string;
  labels: ServiceLabels;
  showTopRule: boolean;
}) {
  return (
    <div className={showTopRule ? "border-t border-border/55 pt-20 sm:pt-24" : "pt-2 sm:pt-4"}>
      <p className="text-xl font-light italic leading-relaxed text-foreground/90 sm:text-2xl">{quote}</p>
      <h3 className="xten-display-title mt-8 text-2xl text-foreground sm:text-4xl">{title}</h3>
      <dl className="mt-12 space-y-10 text-[15px] font-light leading-[1.8] sm:text-base">
        <div>
          <dt className="xten-eyebrow">{labels.scope}</dt>
          <dd className="mt-2 text-muted-foreground">{scope}</dd>
        </div>
        <div>
          <dt className="xten-eyebrow">{labels.duration}</dt>
          <dd className="mt-2 text-muted-foreground">{duration}</dd>
        </div>
        <div>
          <dt className="xten-eyebrow">{labels.pricing}</dt>
          <dd className="mt-2 space-y-4 text-muted-foreground">
            <p>{pricingLead}</p>
            <div className="overflow-hidden border border-border/70">
              <table className="w-full border-collapse text-left text-sm">
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-t border-border/60 first:border-t-0">
                      <th scope="row" className="w-[45%] px-4 py-3 font-normal text-foreground/85 sm:px-5">
                        {r.label}
                      </th>
                      <td className="px-4 py-3 text-muted-foreground sm:px-5">{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </dd>
        </div>
        <div>
          <dt className="xten-eyebrow">{labels.mechanics}</dt>
          <dd className="mt-2 text-muted-foreground">{mechanics}</dd>
        </div>
        <div>
          <dt className="xten-eyebrow">{labels.guarantee}</dt>
          <dd className="mt-2 text-muted-foreground">{guarantee}</dd>
        </div>
        <div>
          <dt className="xten-eyebrow">{labels.payment}</dt>
          <dd className="mt-2 text-muted-foreground">{payment}</dd>
        </div>
      </dl>
    </div>
  );
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Services");
  const labels = t.raw("labels") as ServiceLabels;

  const blocks = [
    {
      quote: t("s01Quote"),
      title: t("s01Title"),
      scope: t("s01Scope"),
      duration: t("s01Duration"),
      pricingLead: t("s01PricingLead"),
      rows: t.raw("s01PricingRows") as Row[],
      mechanics: t("s01Mechanics"),
      guarantee: t("s01Guarantee"),
      payment: t("s01Payment"),
    },
    {
      quote: t("s02Quote"),
      title: t("s02Title"),
      scope: t("s02Scope"),
      duration: t("s02Duration"),
      pricingLead: t("s02PricingLead"),
      rows: t.raw("s02PricingRows") as Row[],
      mechanics: t("s02Mechanics"),
      guarantee: t("s02Guarantee"),
      payment: t("s02Payment"),
    },
    {
      quote: t("s03Quote"),
      title: t("s03Title"),
      scope: t("s03Scope"),
      duration: t("s03Duration"),
      pricingLead: t("s03PricingLead"),
      rows: t.raw("s03PricingRows") as Row[],
      mechanics: t("s03Mechanics"),
      guarantee: t("s03Guarantee"),
      payment: t("s03Payment"),
    },
    {
      quote: t("s04Quote"),
      title: t("s04Title"),
      scope: t("s04Scope"),
      duration: t("s04Duration"),
      pricingLead: t("s04PricingLead"),
      rows: t.raw("s04PricingRows") as Row[],
      mechanics: t("s04Mechanics"),
      guarantee: t("s04Guarantee"),
      payment: t("s04Payment"),
    },
  ];

  return (
    <div className="bg-background">
      <HomeHero
        variant="editorial"
        backgroundImage={editorialImages.servicesHero}
        backgroundTreatment="hero"
        eyebrow={t("heroEyebrow")}
        titleMain={t("heroTitleMain")}
        subtextItalic={t("heroSubtextQuote")}
        subtextPlain={t("heroSubtextRest")}
      />
      <article className="border-b border-border/50">
        <div className="xten-container-narrow xten-section">
          <section className="border-t border-border/40 pt-14 sm:pt-16" aria-labelledby="services-heading">
            <EditorialFadeIn>
              <h2
                id="services-heading"
                className="xten-title-rule xten-display-title text-4xl text-foreground sm:text-5xl lg:text-[3.25rem]"
              >
                {t("title")}
              </h2>
              <p className="mt-10 font-light text-lg leading-[1.85] text-muted-foreground sm:text-xl">{t("lede")}</p>
            </EditorialFadeIn>
          </section>

          <div className="mt-24 space-y-24 sm:space-y-28">
            {blocks.map((b, i) => (
              <EditorialFadeIn key={b.title}>
                <ServiceBlock {...b} labels={labels} showTopRule={i > 0} />
              </EditorialFadeIn>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
