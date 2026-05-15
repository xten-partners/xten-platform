"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { useLocale } from "next-intl";
import { EditorialFadeIn } from "@/components/editorial-fade-in";
import { homeCaiRoleBundles, type CaiBlock, type CaiSection } from "@/content/home-cai-role-bundles";
import { motionEase } from "@/lib/motion";

function renderBlock(block: CaiBlock, key: string, compact?: boolean) {
  const pClass = compact
    ? "text-sm font-light leading-[1.78] text-muted-foreground sm:text-[15px]"
    : "text-base font-light leading-[1.85] text-muted-foreground sm:text-[17px]";
  const liClass = compact
    ? "text-sm font-light leading-[1.7] text-muted-foreground sm:text-[15px]"
    : "text-base font-light leading-[1.78] text-muted-foreground sm:text-[17px]";

  if (block.type === "p") {
    return (
      <p key={key} className={pClass}>
        {block.text}
      </p>
    );
  }
  return (
    <ul key={key} className={`list-none ${compact ? "space-y-2.5" : "space-y-3"}`}>
      {block.items.map((item) => (
        <li key={item} className={`flex gap-3 ${liClass}`}>
          <span className="mt-[0.6em] h-px w-3 shrink-0 bg-signature/70" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function renderSection(section: CaiSection, index: number) {
  return (
    <EditorialFadeIn key={index}>
      {section.subtitle ? (
        <h3 className="xten-display-title text-xl leading-snug text-foreground sm:text-2xl">
          {section.subtitle}
        </h3>
      ) : null}
      <div className={section.subtitle ? "mt-8 space-y-6" : "space-y-6"}>
        {section.blocks.map((block, j) => renderBlock(block, `${index}-${j}`))}
      </div>
    </EditorialFadeIn>
  );
}

function CaiCard({ section, index, locale }: { section: CaiSection; index: number; locale: "en" | "fr" }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const baseId = useId();

  if (!section.subtitle) return null;
  const panelId = `${baseId}-panel`;
  const headerId = `${baseId}-header`;
  const expandLabel = locale === "en" ? "Show details" : "Afficher le détail";
  const collapseLabel = locale === "en" ? "Hide details" : "Masquer le détail";

  return (
    <EditorialFadeIn key={section.subtitle}>
      <article className="flex flex-col border-t border-border bg-transparent pt-6 sm:pt-7">
        <h3 className="m-0">
          <button
            type="button"
            id={headerId}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="group flex w-full items-start justify-between gap-4 text-left outline-none transition-colors duration-300 hover:bg-foreground/[0.025] focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-2 focus-visible:ring-offset-background -m-1.5 p-1.5"
          >
            <span className="xten-display-title min-w-0 flex-1 text-base leading-snug text-foreground sm:text-lg">
              {section.subtitle}
            </span>
            <span className="sr-only">{open ? collapseLabel : expandLabel}</span>
            <span
              className="mt-1 shrink-0 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-500 group-hover:text-foreground"
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
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.55, ease: motionEase }}
              className="mt-5 border-t border-border pt-5"
            >
              <div className="space-y-4">
                {section.blocks.map((block, j) => renderBlock(block, `card-${index}-${j}`, true))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </article>
    </EditorialFadeIn>
  );
}

export function HomeCaiRoleSection() {
  const localeRaw = useLocale();
  const locale: "en" | "fr" = localeRaw === "en" ? "en" : "fr";
  const bundle = homeCaiRoleBundles[locale];

  return (
    <section className="xten-section-xl border-y border-border bg-background">
      <div className="xten-container-wide">
        <EditorialFadeIn>
          <h2 className="xten-eyebrow max-w-4xl">{bundle.headline}</h2>
          <p className="mt-10 max-w-3xl text-[1.65rem] font-light leading-[1.22] tracking-[-0.015em] text-foreground sm:text-[2.1rem] lg:text-[2.45rem]">
            {bundle.lead}
          </p>
        </EditorialFadeIn>

        <div className="mt-16 sm:mt-20">
          <div className="grid items-start gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
            {bundle.sections.slice(0, 6).map((section, i) => (
              <CaiCard key={i} section={section} index={i} locale={locale} />
            ))}
          </div>

          {bundle.sections.length > 6 ? (
            <div className="mt-20 max-w-3xl border-t border-border pt-20 sm:mt-24 sm:pt-24">
              {bundle.sections.slice(6).map((section, i) => renderSection(section, 100 + i))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
