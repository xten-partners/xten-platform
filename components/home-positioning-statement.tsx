"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { EditorialFadeIn } from "@/components/editorial-fade-in";
import { cn } from "@/lib/utils";

const POSITIONING_INSIGHT_BULLET_KEYS = [
  "positioningInsight3Bullet1",
  "positioningInsight3Bullet2",
  "positioningInsight3Bullet3",
  "positioningInsight3Bullet4",
] as const;

const POSITIONING_INSIGHT_PANELS = [
  {
    titleKey: "positioningInsight1Title" as const,
    bodyKey: "positioningInsight1" as const,
    hasBullets: false,
  },
  {
    titleKey: "positioningInsight2Title" as const,
    bodyKey: "positioningInsight2" as const,
    hasBullets: false,
  },
  {
    titleKey: "positioningInsight3Title" as const,
    bodyKey: "positioningInsight3" as const,
    hasBullets: true,
  },
] as const;

const PANEL_COUNT = POSITIONING_INSIGHT_PANELS.length;
const LG_MEDIA_QUERY = "(min-width: 1024px)";
/** Intervalle entre deux positions de cartes (−35 % puis −35 %, puis −33 % entre blocs) */
const PANEL_SCROLL_GAP_PX = Math.round(56 * 0.65 * 0.65 * (2 / 3));
/** Part du panelStep réservée au scroll « pause » après le dernier cadre */
const PANEL_LAST_CARD_HOLD_STEP_RATIO = 1.35;
/** Espace sous la piste pour que l’ombre portée du dernier cadre ne soit pas coupée */
const CARD_SHADOW_BLEED_PX = 56;

const CARD_BODY_TEXT =
  "text-[15px] font-light leading-[1.78] text-ivory/80 sm:text-base sm:leading-[1.76]";

/** Repère éditorial unique — losange creux ivoire */
function PositioningBulletMark() {
  return (
    <span
      className="relative mt-[0.5em] flex size-2 shrink-0 items-center justify-center"
      aria-hidden
    >
      <span className="absolute size-[5px] rotate-45 border border-ivory/45" />
      <span className="size-px rotate-45 bg-ivory/55" />
    </span>
  );
}

type PanelContent = {
  title: string;
  body: string;
  bullets?: string[];
};

type SectionMetrics = {
  stickyHeight: number;
  visibleTrackHeight: number;
  cardTrackHeight: number;
  maxCardHeight: number;
  lastCardHeight: number;
  lastCardOverflow: number;
  panelStep: number;
};

function PositioningInsightBullets({ bullets }: { bullets: string[] }) {
  return (
    <ul className="mt-5 space-y-2.5 border-t border-ivory/8 pt-5">
      {bullets.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="flex w-4 shrink-0 justify-center">
            <PositioningBulletMark />
          </span>
          <span className={CARD_BODY_TEXT}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PositioningEditorialCard({
  title,
  body,
  bullets,
  ctaLabel,
  className,
}: PanelContent & { ctaLabel?: string; className?: string }) {
  return (
    <article
      className={cn(
        "group relative w-full border border-ivory/12 bg-charcoal",
        "px-7 py-8 sm:px-8 sm:py-9",
        "shadow-[0_16px_40px_oklch(0.12_0.018_265/0.22),0_4px_14px_oklch(0.12_0.018_265/0.1)]",
        "transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:border-ivory/20 hover:shadow-[0_20px_52px_oklch(0.11_0.018_265/0.28),0_6px_18px_oklch(0.11_0.018_265/0.12)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-ivory/20 to-transparent"
        aria-hidden
      />
      <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-ivory/48">{title}</p>
      <p className={cn("mt-5", CARD_BODY_TEXT)}>{body}</p>
      {bullets?.length ? <PositioningInsightBullets bullets={bullets} /> : null}
      {ctaLabel ? (
        <p className="mt-8 border-t border-ivory/10 pt-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-ivory/88 transition-[color,gap] duration-300 group-hover:gap-3 group-hover:text-ivory"
          >
            {ctaLabel}
            <span
              className="text-ivory/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-ivory/80"
              aria-hidden
            >
              →
            </span>
          </Link>
        </p>
      ) : null}
    </article>
  );
}

function ScrollingEditorialCard({
  index,
  scrollYProgress,
  panelStep,
  lastCardOverflow,
  stepAria,
  children,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
  panelStep: number;
  lastCardOverflow: number;
  stepAria: string;
  children: ReactNode;
}) {
  const lastPhaseStart = (PANEL_COUNT - 2) / (PANEL_COUNT - 1);

  const y = useTransform(scrollYProgress, (progress) => {
    const base = (index - progress * (PANEL_COUNT - 1)) * panelStep;
    if (index !== PANEL_COUNT - 1 || lastCardOverflow <= 0) return base;

    const settle =
      progress <= lastPhaseStart
        ? 0
        : (progress - lastPhaseStart) / (1 - lastPhaseStart);

    return base - lastCardOverflow * settle;
  });

  return (
    <motion.div
      className="absolute inset-x-0 top-0 will-change-transform"
      style={{ y }}
      aria-label={stepAria}
    >
      {children}
    </motion.div>
  );
}

function PositioningQuoteColumn() {
  const t = useTranslations("Home");

  return (
    <div>
      <h2 id="home-positioning-heading" className="sr-only">
        {t("positioningLine1")} {t("positioningLine2")}
      </h2>
      <blockquote className="max-w-xl border-l-2 border-signature/40 pl-6 sm:pl-8">
        <p
          className={cn(
            "font-medium italic tracking-[-0.032em] text-foreground/[0.9]",
            "text-[clamp(1.65rem,3.8vw,2.75rem)] leading-[1.12]",
          )}
        >
          {t("positioningLine1")}
        </p>
        <p
          className={cn(
            "mt-6 font-medium italic tracking-[-0.028em] text-foreground/[0.82] sm:mt-8",
            "text-[clamp(1.35rem,2.8vw,2.1rem)] leading-[1.16]",
          )}
        >
          {t("positioningLine2")}
        </p>
      </blockquote>
    </div>
  );
}

function StaticInsightPanels({ panels, ctaLabel }: { panels: PanelContent[]; ctaLabel: string }) {
  return (
    <div className="flex flex-col gap-[0.67rem] pb-12 sm:gap-[0.7rem] sm:pb-14">
      {panels.map((panel, index) => (
        <EditorialFadeIn key={POSITIONING_INSIGHT_PANELS[index].bodyKey} delay={index * 0.08}>
          <PositioningEditorialCard {...panel} ctaLabel={ctaLabel} />
        </EditorialFadeIn>
      ))}
    </div>
  );
}

function useIsLgViewport() {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(LG_MEDIA_QUERY);
    const update = () => setIsLg(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isLg;
}

function PositioningScrollExperience({
  panels,
  stepAria,
}: {
  panels: PanelContent[];
  stepAria: (current: number) => string;
}) {
  const t = useTranslations("Home");
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const quoteColRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardTrackRef = useRef<HTMLDivElement>(null);
  const cardMeasureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [metrics, setMetrics] = useState<SectionMetrics>({
    stickyHeight: 0,
    visibleTrackHeight: 0,
    cardTrackHeight: 0,
    maxCardHeight: 0,
    lastCardHeight: 0,
    lastCardOverflow: 0,
    panelStep: 0,
  });

  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end start"],
  });

  useLayoutEffect(() => {
    const quoteEl = quoteColRef.current;
    const stickyEl = stickyRef.current;
    const cardTrackEl = cardTrackRef.current;
    if (!quoteEl || !stickyEl || !cardTrackEl) return;

    const measure = () => {
      const stickyHeight = stickyEl.offsetHeight;
      const cardHeights = cardMeasureRefs.current.map((el) => el?.offsetHeight ?? 0);
      const maxCardHeight = Math.max(0, ...cardHeights);
      const lastCardHeight = cardHeights[cardHeights.length - 1] ?? maxCardHeight;
      const visibleTrackHeight = cardTrackEl.offsetHeight;
      const cardTrackHeight = Math.max(visibleTrackHeight, maxCardHeight);
      const lastCardOverflow = Math.max(0, lastCardHeight - visibleTrackHeight);
      const trackSlack = Math.max(0, visibleTrackHeight - maxCardHeight);
      const panelStep =
        maxCardHeight + PANEL_SCROLL_GAP_PX + Math.round(trackSlack * (2 / 3));
      setMetrics((prev) =>
        prev.stickyHeight === stickyHeight &&
        prev.visibleTrackHeight === visibleTrackHeight &&
        prev.cardTrackHeight === cardTrackHeight &&
        prev.maxCardHeight === maxCardHeight &&
        prev.lastCardHeight === lastCardHeight &&
        prev.lastCardOverflow === lastCardOverflow &&
        prev.panelStep === panelStep
          ? prev
          : {
              stickyHeight,
              visibleTrackHeight,
              cardTrackHeight,
              maxCardHeight,
              lastCardHeight,
              lastCardOverflow,
              panelStep,
            },
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(quoteEl);
    ro.observe(stickyEl);
    ro.observe(cardTrackEl);
    cardMeasureRefs.current.forEach((el) => {
      if (el) ro.observe(el);
    });
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [panels]);

  const scrollReady =
    metrics.stickyHeight > 0 && metrics.cardTrackHeight > 0 && metrics.panelStep > 0;

  const lastCardHoldPx = scrollReady
    ? Math.round(metrics.panelStep * PANEL_LAST_CARD_HOLD_STEP_RATIO)
    : 0;
  const panelTransitionPx = scrollReady ? (PANEL_COUNT - 1) * metrics.panelStep : 0;
  const stickyScrollSpan = scrollReady ? panelTransitionPx + lastCardHoldPx : 1;
  const transitionEndProgress = scrollReady
    ? panelTransitionPx / stickyScrollSpan
    : 1;

  const cardScrollProgress = useTransform(scrollYProgress, (progress) =>
    transitionEndProgress > 0 ? Math.min(progress / transitionEndProgress, 1) : 0,
  );

  const trackHeight = scrollReady
    ? metrics.stickyHeight + panelTransitionPx + lastCardHoldPx
    : undefined;

  return (
    <div ref={scrollTrackRef} className="relative" style={trackHeight ? { height: trackHeight } : undefined}>
      {/* Mesure hauteur max des cartes (hors flux) */}
      <div className="pointer-events-none absolute -left-[9999px] top-0 w-full max-w-md opacity-0" aria-hidden>
        {panels.map((panel, index) => (
          <div
            key={POSITIONING_INSIGHT_PANELS[index].bodyKey}
            ref={(el) => {
              cardMeasureRefs.current[index] = el;
            }}
            className="w-full"
          >
            <PositioningEditorialCard
              {...panel}
              ctaLabel={t("positioningCardCta")}
            />
          </div>
        ))}
      </div>

      <div
        ref={stickyRef}
        className="sticky top-[4rem] z-0 min-h-[88vh] py-16 sm:top-[4.5rem] sm:py-20 lg:min-h-[90vh] lg:py-24"
      >
        <div className="xten-container-wide h-full min-h-[inherit]">
          <motion.div className="grid min-h-[calc(88vh-8rem)] grid-cols-1 items-stretch gap-14 lg:grid-cols-12 lg:gap-12 xl:min-h-[calc(90vh-10rem)] xl:gap-16">
            <div ref={quoteColRef} className="flex items-center lg:col-span-6 xl:col-span-6">
              <PositioningQuoteColumn />
            </div>

            <div className="relative min-h-[22rem] lg:col-span-6 lg:min-h-0 xl:col-span-6">
              <div
                ref={cardTrackRef}
                className={cn(
                  "relative h-full min-h-[inherit] w-full overflow-hidden transition-opacity duration-500",
                  "lg:absolute lg:inset-0 lg:flex lg:justify-end",
                  scrollReady ? "opacity-100" : "opacity-0",
                )}
                style={
                  metrics.maxCardHeight > 0
                    ? { minHeight: metrics.maxCardHeight + CARD_SHADOW_BLEED_PX }
                    : undefined
                }
                aria-live="polite"
                aria-atomic="true"
              >
                <div
                  className="relative h-full w-full max-w-md lg:max-w-[24rem] xl:max-w-[26rem]"
                  style={
                    metrics.maxCardHeight > 0
                      ? {
                          minHeight: metrics.maxCardHeight,
                          paddingBottom: CARD_SHADOW_BLEED_PX,
                        }
                      : undefined
                  }
                >
                  {scrollReady
                    ? panels.map((panel, index) => (
                        <ScrollingEditorialCard
                          key={POSITIONING_INSIGHT_PANELS[index].bodyKey}
                          index={index}
                          scrollYProgress={cardScrollProgress}
                          panelStep={metrics.panelStep}
                          lastCardOverflow={metrics.lastCardOverflow}
                          stepAria={stepAria(index + 1)}
                        >
                          <PositioningEditorialCard
                            {...panel}
                            ctaLabel={t("positioningCardCta")}
                          />
                        </ScrollingEditorialCard>
                      ))
                    : (
                      <div className="h-full min-h-[22rem] animate-pulse bg-foreground/[0.03]" />
                    )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function HomePositioningStatement() {
  const t = useTranslations("Home");
  const reduce = useReducedMotion();
  const isLg = useIsLgViewport();

  const insight3Bullets = POSITIONING_INSIGHT_BULLET_KEYS.map((key) => t(key));
  const panels: PanelContent[] = POSITIONING_INSIGHT_PANELS.map((config) => ({
    title: t(config.titleKey),
    body: t(config.bodyKey),
    bullets: config.hasBullets ? insight3Bullets : undefined,
  }));

  const stepAria = (current: number) =>
    t("positioningStepAria", { current: String(current), total: String(PANEL_COUNT) });

  const useScrollSequence = isLg && !reduce;

  if (useScrollSequence) {
    return (
      <section
        className="xten-editorial-surface relative"
        aria-labelledby="home-positioning-heading"
      >
        <PositioningScrollExperience panels={panels} stepAria={stepAria} />
      </section>
    );
  }

  return (
    <section
      className="xten-editorial-surface relative"
      aria-labelledby="home-positioning-heading"
    >
      <div className="py-16 sm:py-20 lg:py-24">
        <div className="xten-container-wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-14 xl:gap-20">
            <EditorialFadeIn>
              <PositioningQuoteColumn />
            </EditorialFadeIn>
            <StaticInsightPanels panels={panels} ctaLabel={t("positioningCardCta")} />
          </div>
        </div>
      </div>
    </section>
  );
}
