"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { useLocale } from "next-intl";
import { CinematicImage } from "@/components/cinematic-image";
import { homeCaiRoleBundles, type CaiBlock, type CaiSection } from "@/content/home-cai-role-bundles";
import { editorialImages } from "@/lib/editorial-images";
import { motionDurations, motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

const revealStagger = 0.11;

const blockVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDurations.slow,
      delay: 0.22 + i * revealStagger,
      ease: motionEase,
    },
  }),
};

const CAI_CARD_CLASS = cn(
  "group relative w-full border border-ivory/12",
  "bg-charcoal/52 p-7 backdrop-blur-md sm:p-8",
  "shadow-[0_28px_80px_oklch(0.1_0.018_265/0.45)]",
  "transition-[border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
  "hover:border-ivory/22 hover:bg-charcoal/62",
);

function renderBlock(block: CaiBlock, key: string) {
  const pClass =
    "text-[15px] font-light leading-[1.78] text-ivory/72 sm:text-base sm:leading-[1.76]";
  const liClass =
    "text-[15px] font-light leading-[1.78] text-ivory/72 sm:text-base sm:leading-[1.76]";

  if (block.type === "p") {
    return (
      <p key={key} className={pClass}>
        {block.text}
      </p>
    );
  }
  return (
    <ul key={key} className="list-none space-y-2.5">
      {block.items.map((item) => (
        <li key={item} className={`flex gap-3 ${liClass}`}>
          <span className="mt-[0.55em] h-px w-3 shrink-0 bg-ivory/45" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CaiCard({
  section,
  index,
  locale,
  motionIndex,
  reduce,
}: {
  section: CaiSection;
  index: number;
  locale: "en" | "fr";
  motionIndex: number;
  reduce: boolean | null;
}) {
  const [open, setOpen] = useState(false);
  const baseId = useId();

  if (!section.subtitle) return null;
  const panelId = `${baseId}-panel`;
  const headerId = `${baseId}-header`;
  const expandLabel = locale === "en" ? "Show details" : "Afficher le détail";
  const collapseLabel = locale === "en" ? "Hide details" : "Masquer le détail";

  const motionProps = reduce
    ? { initial: false as const, animate: "visible" as const }
    : { initial: "hidden" as const, animate: "visible" as const };

  return (
    <motion.article
      custom={motionIndex}
      variants={blockVariants}
      {...motionProps}
      className={CAI_CARD_CLASS}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-ivory/20 to-transparent"
        aria-hidden
      />
      <h3 className="m-0">
        <button
          type="button"
          id={headerId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start justify-between gap-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ivory/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal/80"
        >
          <span className="min-w-0 flex-1 text-[10px] font-medium uppercase tracking-[0.26em] text-ivory/48">
            {section.subtitle}
          </span>
          <span className="sr-only">{open ? collapseLabel : expandLabel}</span>
          <span
            className="mt-0.5 shrink-0 text-[11px] font-medium uppercase tracking-[0.22em] text-ivory/45 transition-colors duration-500 group-hover:text-ivory/70"
            aria-hidden
          >
            {open ? "−" : "+"}
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: motionEase }}
            className="overflow-hidden"
          >
            <div className="mt-5 space-y-4 border-t border-ivory/10 pt-5">
              {section.blocks.map((block, j) => renderBlock(block, `card-${index}-${j}`))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

export function HomeCaiRoleSection() {
  const localeRaw = useLocale();
  const locale: "en" | "fr" = localeRaw === "en" ? "en" : "fr";
  const bundle = homeCaiRoleBundles[locale];
  const reduce = useReducedMotion();
  const image = editorialImages.mandate;

  const motionProps = reduce
    ? { initial: false as const, animate: "visible" as const }
    : { initial: "hidden" as const, animate: "visible" as const };

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="home-cai-role-heading"
    >
      <CinematicImage
        src={image.src}
        alt={image.alt}
        objectPosition={image.objectPosition}
        grade="night"
        overlay="none"
        className="min-h-[92vh] scale-105"
      />

      <motion.div
        className="absolute inset-0 xten-cinematic-mandate-overlay"
        aria-hidden
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0.88 },
              animate: { opacity: 1 },
              transition: { duration: motionDurations.cinematic, ease: motionEase },
            })}
      />
      <div className="absolute inset-0 xten-cinematic-vignette" aria-hidden />
      <div className="absolute inset-0 xten-cinematic-grain" aria-hidden />

      <div className="relative z-10">
        <div className="xten-container-wide py-20 sm:py-24 lg:py-28">
          <motion.h2
            id="home-cai-role-heading"
            custom={0}
            variants={blockVariants}
            {...motionProps}
            className="xten-eyebrow-on-image max-w-4xl"
          >
            {bundle.eyebrow}
          </motion.h2>

          <div className="mt-16 grid items-start gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-10 xl:gap-16">
            <div className="lg:col-span-8 lg:sticky lg:top-[5.5rem] xl:col-span-8">
              <motion.h3
                custom={1}
                variants={blockVariants}
                {...motionProps}
                className={cn(
                  "max-w-[14ch] font-medium tracking-[-0.038em] text-ivory xten-hero-text-on-image",
                  "text-[clamp(2.35rem,6.8vw,5.25rem)] leading-[0.94]",
                  "sm:leading-[0.93]",
                )}
              >
                <span className="block whitespace-pre-line">{bundle.headline}</span>
              </motion.h3>
              <motion.blockquote
                custom={2}
                variants={blockVariants}
                {...motionProps}
                className="mt-8 max-w-xl border-l-2 border-ivory/25 pl-6 sm:mt-10 sm:pl-8"
              >
                <p className="text-lg font-light italic leading-[1.72] text-ivory/78 sm:text-xl sm:leading-[1.7] xten-hero-text-on-image">
                  {bundle.subheadline}
                </p>
              </motion.blockquote>
              <motion.div
                custom={3}
                variants={blockVariants}
                {...motionProps}
                className="mt-8 space-y-4 sm:mt-10"
              >
                {bundle.leadBlocks.map((block, j) => renderBlock(block, `lead-${j}`))}
              </motion.div>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-4 xl:col-span-4">
              {bundle.sections.map((section, i) => (
                <CaiCard
                  key={section.subtitle}
                  section={section}
                  index={i}
                  locale={locale}
                  motionIndex={4 + i}
                  reduce={reduce}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

