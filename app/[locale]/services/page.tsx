import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HomeHero } from "@/components/home-hero";
import {
  ServiceDetailSection,
  type ServiceDetailBlock,
  type ServiceHighlight,
  type ServicePricingRow,
} from "@/components/service-detail-section";
import { HomeFinalCtaSection } from "@/components/home-final-cta-section";
import { ServicePageHashScroll } from "@/components/service-page-hash-scroll";
import { editorialImages } from "@/lib/editorial-images";

type Props = { params: Promise<{ locale: string }> };

type ServiceLabels = {
  scope: string;
  duration: string;
  pricing: string;
  mechanics: string;
  guarantee: string;
  payment: string;
};

type ServiceBlockData = {
  quote: string;
  title: string;
  scope: string;
  duration: string;
  pricingLead: string;
  rows: ServicePricingRow[];
  mechanics: string;
  guarantee: string;
  payment: string;
};

function buildHighlights(
  block: ServiceBlockData,
  labels: ServiceLabels,
): ServiceHighlight[] {
  return [
    { label: labels.duration, text: block.duration },
    { label: labels.mechanics, text: block.mechanics },
    { label: labels.guarantee, text: block.guarantee },
    { label: labels.payment, text: block.payment },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Services");
  const labels = t.raw("labels") as ServiceLabels;

  const s01DetailSections = t.raw("s01DetailSections") as ServiceDetailBlock[];
  const s02DetailSections = t.raw("s02DetailSections") as ServiceDetailBlock[];
  const s03DetailSections = t.raw("s03DetailSections") as ServiceDetailBlock[];
  const s04DetailSections = t.raw("s04DetailSections") as ServiceDetailBlock[];

  const blocks: ServiceBlockData[] = [
    {
      quote: t("s01Quote"),
      title: t("s01Title"),
      scope: t("s01Scope"),
      duration: "",
      pricingLead: "",
      rows: [],
      mechanics: "",
      guarantee: "",
      payment: "",
    },
    {
      quote: t("s02Quote"),
      title: t("s02Title"),
      scope: t("s02Scope"),
      duration: "",
      pricingLead: "",
      rows: [],
      mechanics: "",
      guarantee: "",
      payment: "",
    },
    {
      quote: t("s03Quote"),
      title: t("s03Title"),
      scope: t("s03Scope"),
      duration: "",
      pricingLead: "",
      rows: [],
      mechanics: "",
      guarantee: "",
      payment: "",
    },
    {
      quote: t("s04Quote"),
      title: t("s04Title"),
      scope: t("s04Scope"),
      duration: "",
      pricingLead: "",
      rows: [],
      mechanics: "",
      guarantee: "",
      payment: "",
    },
  ];

  const ctaLabel = t("sectionCta");

  return (
    <div className="bg-background">
      <ServicePageHashScroll />
      <HomeHero
        variant="editorial"
        backgroundImage={editorialImages.servicesHero}
        backgroundTreatment="hero"
        eyebrow={t("heroEyebrow")}
        titleMain={t("heroTitleMain")}
        subtextItalic={t("heroSubtextQuote")}
        subtextPlain={t("heroSubtextRest")}
      />

      {blocks.map((block, index) => (
        <ServiceDetailSection
          key={block.title}
          index={index}
          eyebrow={
            index === 0
              ? t("s01SectionEyebrow")
              : index === 1
                ? t("s02SectionEyebrow")
                : index === 2
                  ? t("s03SectionEyebrow")
                  : t("s04SectionEyebrow")
          }
          quote={block.quote}
          title={block.title}
          intro={block.scope}
          highlights={buildHighlights(block, labels)}
          pricingLabel={labels.pricing}
          pricingLead={block.pricingLead}
          pricingRows={block.rows}
          ctaLabel={ctaLabel}
          muted={index % 2 === 0}
          introAsBlockquote={index === 0 || index === 1 || index === 2 || index === 3}
          splitLayout={index === 0 || index === 1 || index === 2 || index === 3}
          detailSections={
            index === 0
              ? s01DetailSections
              : index === 1
                ? s02DetailSections
                : index === 2
                  ? s03DetailSections
                  : index === 3
                    ? s04DetailSections
                    : undefined
          }
        />
      ))}

      <HomeFinalCtaSection />
    </div>
  );
}
