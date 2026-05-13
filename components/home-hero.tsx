"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { EditorialFadeIn } from "@/components/editorial-fade-in";

function HeroTitle({ main, sub }: { main: string; sub: string }) {
  const mainRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLSpanElement>(null);

  const fitSubFont = useCallback(() => {
    const mainEl = mainRef.current;
    const subEl = subRef.current;
    if (!mainEl || !subEl) return;

    const targetW = mainEl.offsetWidth;
    if (targetW < 1) return;

    subEl.style.fontSize = "16px";
    const intrinsic = subEl.scrollWidth;
    if (intrinsic < 1) return;

    const px = Math.max(11, 16 * (targetW / intrinsic));
    subEl.style.fontSize = `${px}px`;
  }, []);

  useLayoutEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    fitSubFont();
    const ro = new ResizeObserver(fitSubFont);
    ro.observe(mainEl);
    window.addEventListener("resize", fitSubFont);
    const fonts = document.fonts?.ready?.then(fitSubFont);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fitSubFont);
      void fonts;
    };
  }, [main, sub, fitSubFont]);

  return (
    <h1 className="mt-8 w-full max-w-4xl font-heading tracking-tight text-foreground">
      <span
        ref={mainRef}
        className="block w-fit max-w-full text-[2.05rem] font-semibold leading-[1.08] sm:text-4xl sm:leading-[1.05] md:text-5xl lg:text-[3.15rem] lg:leading-[1.02]"
      >
        {main}
      </span>
      <span
        ref={subRef}
        className="mt-3 block w-fit max-w-full whitespace-nowrap font-heading font-medium leading-none tracking-[0.06em] text-foreground"
      >
        {sub}
      </span>
    </h1>
  );
}

type HomeHeroProps = {
  /** When set, overrides the default Home hero eyebrow (e.g. on /le-cabinet). */
  eyebrow?: string;
  /** When set, overrides the default Home hero main title line (e.g. "Xten Partners" on /le-cabinet). */
  titleMain?: string;
  /** When set (with quoteAttribution), replaces the default hero body with a block quotation. */
  quoteBody?: string;
  quoteAttribution?: string;
  /** When set (and quote mode off), replaces the default Home heroSubtext paragraph. */
  subtext?: string;
  /** When both set (and quote mode off), two-line hero body: first line italic, second line roman. */
  subtextItalic?: string;
  subtextPlain?: string;
  /** When set, overrides the secondary CTA href (default `/le-cabinet`). */
  secondaryHref?: string;
  /** When set, overrides the secondary CTA label (default Home `ctaApproche`). */
  secondaryLabel?: string;
};

export function HomeHero({
  eyebrow,
  titleMain,
  quoteBody,
  quoteAttribution,
  subtext,
  secondaryHref,
  secondaryLabel,
  subtextItalic,
  subtextPlain,
}: HomeHeroProps) {
  const t = useTranslations("Home");
  const eyebrowText = eyebrow ?? t("heroEyebrow");
  const mainTitle = titleMain ?? t("heroTitleMain");
  const useQuote = Boolean(quoteBody && quoteAttribution);
  const bodyText = subtext ?? t("heroSubtext");
  const useSplitSubtext = Boolean(subtextItalic && subtextPlain);
  const secondaryHrefResolved = secondaryHref ?? "/le-cabinet";
  const secondaryLabelResolved = secondaryLabel ?? t("ctaApproche");

  return (
    <section className="relative flex min-h-[70vh] flex-col justify-start border-b border-border/60 pb-10 pt-24 sm:min-h-[74vh] sm:pb-16 sm:pt-28">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <EditorialFadeIn>
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground sm:text-[11px]">
            {eyebrowText}
          </p>
          <HeroTitle main={mainTitle} sub={t("heroTitleSub")} />
          {useQuote ? (
            <blockquote className="mt-6 max-w-2xl border-l-2 border-foreground/12 pl-5 sm:pl-6">
              <p className="whitespace-pre-line text-sm font-normal italic leading-[1.75] text-muted-foreground sm:text-base sm:leading-[1.7]">
                {quoteBody}
              </p>
              <footer className="mt-5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                <cite className="not-italic">{quoteAttribution}</cite>
              </footer>
            </blockquote>
          ) : useSplitSubtext ? (
            <div className="mt-6 max-w-2xl text-sm font-normal leading-[1.75] text-muted-foreground sm:text-base sm:leading-[1.7]">
              <p className="italic">{subtextItalic}</p>
              <p className="mt-2 not-italic">{subtextPlain}</p>
            </div>
          ) : (
            <p className="mt-6 max-w-2xl whitespace-pre-line text-sm font-normal leading-[1.75] text-muted-foreground sm:text-base sm:leading-[1.7]">
              {bodyText}
            </p>
          )}
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex h-11 w-fit items-center justify-center bg-primary px-7 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground transition-colors duration-200 hover:bg-primary/88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("ctaConversation")}
            </Link>
            <Link
              href={secondaryHrefResolved}
              className="inline-flex h-11 w-fit items-center justify-center border border-foreground/14 bg-background/80 px-7 text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-colors duration-200 hover:border-foreground/22 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {secondaryLabelResolved}
            </Link>
          </div>
        </EditorialFadeIn>
      </div>
    </section>
  );
}
