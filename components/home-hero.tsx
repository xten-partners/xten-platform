"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CinematicImage } from "@/components/cinematic-image";
import { EditorialFadeIn } from "@/components/editorial-fade-in";
import { HeroSearchBar } from "@/components/hero-search-bar";
import { editorialImages } from "@/lib/editorial-images";

function HeroTitle({
  main,
  sub,
  light,
}: {
  main: string;
  sub: string;
  light?: boolean;
}) {
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

  const textClass = light ? "xten-hero-text-on-image text-ivory" : "text-foreground";

  return (
    <h1 className={`mt-10 w-full max-w-5xl ${textClass}`}>
      <span
        ref={mainRef}
        className={`xten-display-title block w-fit max-w-full text-[2.05rem] leading-[1.08] sm:text-4xl sm:leading-[1.05] md:text-5xl lg:text-[3.15rem] lg:leading-[1.02] ${textClass}`}
      >
        {main}
      </span>
      <span
        ref={subRef}
        className={`xten-display-title-sub mt-5 block w-fit max-w-full whitespace-nowrap ${light ? "text-ivory/92" : "text-muted-foreground"}`}
      >
        {sub}
      </span>
    </h1>
  );
}

type HomeHeroProps = {
  eyebrow?: string;
  titleMain?: string;
  quoteBody?: string;
  quoteAttribution?: string;
  subtext?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  subtextItalic?: string;
  subtextPlain?: string;
  variant?: "cinematic" | "editorial";
  /** Homepage: statement lives in the section below the hero */
  omitSubtext?: boolean;
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
  variant = "cinematic",
  omitSubtext = false,
}: HomeHeroProps) {
  const t = useTranslations("Home");
  const eyebrowText = eyebrow ?? t("heroEyebrow");
  const mainTitle = titleMain ?? t("heroTitleMain");
  const useQuote = Boolean(quoteBody && quoteAttribution);
  const bodyText = subtext ?? t("heroSubtext");
  const useSplitSubtext = Boolean(subtextItalic && subtextPlain);
  const secondaryHrefResolved = secondaryHref ?? "/le-cabinet";
  const secondaryLabelResolved = secondaryLabel ?? t("ctaApproche");
  const isCinematic = variant === "cinematic";

  const bodyClass = isCinematic
    ? "text-sm font-light leading-[1.85] text-ivory/78 sm:text-base sm:leading-[1.8]"
    : "text-sm font-light leading-[1.85] text-muted-foreground sm:text-base sm:leading-[1.8]";

  const quoteBorder = isCinematic ? "border-ivory/20" : "border-foreground/12";
  const quoteText = isCinematic ? "text-ivory/78" : "text-muted-foreground";
  const quoteAttr = isCinematic ? "text-ivory/55" : "text-muted-foreground";

  const content = (
    <EditorialFadeIn>
      <p className={isCinematic ? "xten-eyebrow-on-image" : "xten-eyebrow"}>{eyebrowText}</p>
      <HeroTitle main={mainTitle} sub={t("heroTitleSub")} light={isCinematic} />
      {isCinematic ? <HeroSearchBar light onImage /> : null}
      {useQuote ? (
        <blockquote className={`mt-10 max-w-2xl border-l-2 ${quoteBorder} pl-6 sm:pl-8`}>
          <p className={`whitespace-pre-line text-lg font-light italic leading-[1.75] sm:text-xl sm:leading-[1.72] ${quoteText}`}>
            {quoteBody}
          </p>
          <footer className={`mt-6 text-[11px] font-medium uppercase tracking-[0.22em] ${quoteAttr}`}>
            <cite className="not-italic">{quoteAttribution}</cite>
          </footer>
        </blockquote>
      ) : useSplitSubtext ? (
        <div className={`mt-10 max-w-2xl ${bodyClass}`}>
          <p className="text-lg font-light italic sm:text-xl">{subtextItalic}</p>
          <p className="mt-3 not-italic">{subtextPlain}</p>
        </div>
      ) : omitSubtext ? null : (
        <p className={`mt-10 max-w-2xl whitespace-pre-line ${bodyClass}`}>{bodyText}</p>
      )}
      <div className="mt-16 flex flex-col gap-4 sm:mt-[4.5rem] sm:flex-row sm:items-center sm:gap-6">
        <Link
          href="/contact"
          className={isCinematic ? "xten-btn-primary bg-ivory text-charcoal hover:bg-ivory/92" : "xten-btn-primary"}
        >
          {t("ctaConversation")}
        </Link>
        <Link
          href={secondaryHrefResolved}
          className={
            isCinematic
              ? "xten-btn-outline-light hover:border-signature/50 hover:text-ivory"
              : "xten-btn-outline"
          }
        >
          {secondaryLabelResolved}
        </Link>
      </div>
    </EditorialFadeIn>
  );

  if (!isCinematic) {
    return (
      <section className="border-b border-border">
        <div className="xten-container xten-section-lg pt-28 sm:pt-32">{content}</div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <CinematicImage
        src={editorialImages.hero.src}
        alt={editorialImages.hero.alt}
        priority
        grade="hero"
        overlay="dark"
        objectPosition={editorialImages.hero.objectPosition}
      />
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <div className="absolute inset-0 xten-hero-overlay-horizontal" />
        <div className="absolute inset-0 xten-hero-overlay-vertical" />
      </div>
      <div className="relative z-10">
        <div className="xten-container xten-section-lg pt-28 sm:pt-32">
          <div className="xten-hero-content-zone">{content}</div>
        </div>
      </div>
    </section>
  );
}
