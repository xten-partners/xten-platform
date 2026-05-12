import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { EditorialFadeIn } from "@/components/editorial-fade-in";

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
    <div className={showTopRule ? "border-t border-border/60 pt-16 sm:pt-20" : "pt-2 sm:pt-4"}>
      <p className="font-heading text-lg font-normal italic leading-relaxed text-foreground/90 sm:text-xl">{quote}</p>
      <h2 className="mt-6 font-heading text-2xl font-normal tracking-tight text-foreground sm:text-3xl">{title}</h2>
      <dl className="mt-10 space-y-8 text-[15px] leading-[1.75] sm:text-base">
        <div>
          <dt className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">{labels.scope}</dt>
          <dd className="mt-2 text-muted-foreground">{scope}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">{labels.duration}</dt>
          <dd className="mt-2 text-muted-foreground">{duration}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">{labels.pricing}</dt>
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
          <dt className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">{labels.mechanics}</dt>
          <dd className="mt-2 text-muted-foreground">{mechanics}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">{labels.guarantee}</dt>
          <dd className="mt-2 text-muted-foreground">{guarantee}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">{labels.payment}</dt>
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
    <article className="border-b border-border/50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <EditorialFadeIn>
          <h1 className="font-heading text-4xl font-normal tracking-tight text-foreground sm:text-5xl">{t("title")}</h1>
          <p className="mt-8 text-lg leading-[1.8] text-muted-foreground sm:text-xl">{t("lede")}</p>
        </EditorialFadeIn>

        <div className="mt-20 space-y-20 sm:space-y-24">
          {blocks.map((b, i) => (
            <EditorialFadeIn key={b.title}>
              <ServiceBlock {...b} labels={labels} showTopRule={i > 0} />
            </EditorialFadeIn>
          ))}
        </div>
      </div>
    </article>
  );
}
