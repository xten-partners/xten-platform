import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { EditorialDivider } from "@/components/editorial-divider";
import { EditorialOrgGraphic } from "@/components/editorial-org-graphic";

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

  const t = await getTranslations("Home");

  const situationsItems = t.raw("situationsItems") as string[];
  const selectivityLines = t.raw("selectivityLines") as string[];
  const methodsItems = t.raw("methodsItems") as string[];
  const servicesLead = t("servicesLead").trim();

  const contextCards = [
    { href: "/private-equity", label: t("contextsCardPeTitle"), line: t("contextsPe") },
    { href: "/eti", label: t("contextsCardEtiTitle"), line: t("contextsEti") },
    { href: "/top500", label: t("contextsCardTopTitle"), line: t("contextsTop") },
    {
      href: "/international-subsidiaries",
      label: t("contextsCardIntlTitle"),
      line: t("contextsIntl"),
    },
  ];

  return (
    <div className="relative">
      <div className="mx-auto max-w-6xl px-4 pb-28 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
        <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted/35 px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <EditorialOrgGraphic className="pointer-events-none absolute -right-4 top-6 h-28 w-auto opacity-90 sm:right-8 sm:top-10 sm:h-36 lg:h-44" />
          <div className="relative max-w-4xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              {t("eyebrow")}
            </p>
            <h1 className="mt-7 font-heading text-[2.1rem] font-normal leading-[1.08] tracking-tight text-foreground sm:text-5xl sm:leading-[1.05] lg:text-[3.5rem]">
              {t("headline")}
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-normal leading-snug text-muted-foreground sm:text-xl sm:leading-relaxed">
              {t("subhead")}
            </p>
            <p className="mt-7 max-w-3xl text-[15px] leading-[1.7] text-foreground/92 sm:text-base">
              {t("intro")}
            </p>

            <div className="mt-12 max-w-xl border-l-2 border-foreground/25 pl-6 sm:pl-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {t("foundationTitle")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/88 sm:text-[15px] sm:leading-relaxed">
                {t("foundationBody")}
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button asChild size="lg" className="h-11 px-8 text-sm font-medium">
                <Link href="/contact">{t("ctaContact")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 border-foreground/18 bg-background/85 px-8 text-sm font-medium backdrop-blur-[2px]"
              >
                <Link href="/letters">{t("ctaLetters")}</Link>
              </Button>
            </div>
          </div>
        </section>

        <EditorialDivider />

        <section className="scroll-mt-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            {t("servicesTitle")}
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-[1.65rem] font-normal tracking-tight text-foreground sm:text-3xl">
            {servicesLead}
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            <div className="border-l border-foreground/18 pl-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t("serviceSearchTitle")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/88">
                {t("serviceSearchBody")}
              </p>
            </div>
            <div className="border-l border-foreground/18 pl-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t("serviceAdvisoryTitle")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/88">
                {t("serviceAdvisoryBody")}
              </p>
            </div>
            <div className="border-l border-foreground/18 pl-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t("serviceIntelTitle")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/88">
                {t("serviceIntelBody")}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 border border-border/55 bg-card/50 px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("methodsTitle")}
          </p>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{t("methodsLead")}</p>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {methodsItems.map((item) => (
              <li
                key={item}
                className="rounded-md border border-border/70 bg-background/70 px-3.5 py-2 text-[13px] leading-none text-foreground/85"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <EditorialDivider />

        <section>
          <h2 className="max-w-3xl font-heading text-2xl font-normal tracking-tight text-foreground sm:text-[1.85rem]">
            {t("dualTitle")}
          </h2>
          <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t("dualOrgLead")}
              </p>
              <p className="mt-4 text-base leading-[1.72] text-foreground/88">{t("dualOrgBody")}</p>
            </div>
            <div className="border-t border-border pt-12 md:border-l md:border-t-0 md:pl-16 md:pt-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t("dualTalentLead")}
              </p>
              <p className="mt-4 text-base leading-[1.72] text-foreground/88">{t("dualTalentBody")}</p>
            </div>
          </div>
        </section>

        <EditorialDivider />

        <section className="max-w-3xl">
          <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground sm:text-[1.75rem]">
            {t("stallTitle")}
          </h2>
          <p className="mt-5 text-base leading-[1.75] text-muted-foreground">{t("stallBody")}</p>
        </section>

        <section className="mt-14 max-w-3xl border-l-2 border-foreground/22 pl-6 sm:pl-8">
          <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground sm:text-[1.75rem]">
            {t("missingRoleTitle")}
          </h2>
          <p className="mt-5 text-base leading-[1.75] text-muted-foreground">{t("missingRoleBody")}</p>
        </section>

        <div className="mt-20 rounded-xl border border-border/50 bg-muted/45 px-5 py-14 sm:px-10 sm:py-16">
          <section className="mx-auto max-w-3xl">
            <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground sm:text-[1.75rem]">
              {t("complexityTitle")}
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-muted-foreground">{t("complexityBody")}</p>
          </section>
        </div>

        <EditorialDivider />

        <section className="max-w-3xl">
          <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground sm:text-[1.75rem]">
            {t("situationsTitle")}
          </h2>
          <p className="mt-3 text-sm font-medium text-muted-foreground">{t("situationsLead")}</p>
          <ul className="mt-8 space-y-4 border-l border-border/85 pl-6">
            {situationsItems.map((item, i) => (
              <li key={i} className="text-[15px] leading-relaxed text-foreground/88">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground sm:text-[1.75rem]">
            {t("mandatesTitle")}
          </h2>
          <p className="mt-5 text-base leading-[1.75] text-muted-foreground">{t("mandatesBody")}</p>
        </section>

        <section className="mt-16 max-w-3xl border border-border/65 bg-card/55 px-6 py-10 sm:px-10">
          <h2 className="font-heading text-xl font-normal tracking-tight text-foreground">
            {t("confidentialTitle")}
          </h2>
          <p className="mt-5 text-base leading-[1.75] text-muted-foreground">{t("confidentialBody")}</p>
        </section>

        <section className="mt-20 max-w-3xl">
          <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground sm:text-[1.75rem]">
            {t("selectivityTitle")}
          </h2>
          <ul className="mt-8 space-y-4 border-l border-border/80 pl-6">
            {selectivityLines.map((line, i) => (
              <li key={i} className="text-[15px] leading-relaxed text-foreground/85">
                {line}
              </li>
            ))}
          </ul>
        </section>

        <blockquote className="mx-auto mt-20 max-w-3xl border-l-[3px] border-foreground/28 py-1 pl-8 font-heading text-[1.35rem] font-normal leading-snug tracking-tight text-foreground sm:mt-24 sm:text-2xl sm:leading-snug">
          {t("pullQuote")}
        </blockquote>

        <section id="contextes" className="mt-24 scroll-mt-24 sm:mt-28">
          <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground sm:text-[1.75rem]">
            {t("contextsTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("contextsLead")}
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {contextCards.map((card) => (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className="group flex flex-col border border-border/75 bg-card/50 p-7 transition-colors hover:border-foreground/22 hover:bg-card"
                >
                  <span className="font-heading text-lg font-normal text-foreground group-hover:underline group-hover:decoration-foreground/25 group-hover:underline-offset-4">
                    {card.label}
                  </span>
                  <span className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.line}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10">
            <Link
              href="/contextes"
              className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              {t("ctaContexts")}
            </Link>
          </p>
        </section>

        <section className="mt-20 max-w-3xl rounded-xl border border-dashed border-border/80 bg-muted/30 px-6 py-10 sm:px-9">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("lettersTeaserTitle")}
          </p>
          <p className="mt-5 text-base leading-[1.75] text-muted-foreground">{t("lettersTeaserBody")}</p>
          <p className="mt-8">
            <Link
              href="/letters"
              className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              {t("ctaLetters")}
            </Link>
          </p>
        </section>

        <p className="mt-16 text-center">
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {t("ctaSecondary")}
          </Link>
        </p>
      </div>
    </div>
  );
}
