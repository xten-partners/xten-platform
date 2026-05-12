"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { useLocale } from "next-intl";
import { EditorialFadeIn } from "@/components/editorial-fade-in";
import { homeCaiRoleBundles, type CaiBlock, type CaiSection } from "@/content/home-cai-role-bundles";

function renderBlock(block: CaiBlock, key: string, compact?: boolean) {
  const pClass = compact
    ? "text-sm leading-[1.75] text-muted-foreground sm:text-[15px] sm:leading-[1.78]"
    : "text-base leading-[1.82] text-muted-foreground sm:text-[17px] sm:leading-[1.8]";
  const liClass = compact
    ? "text-sm leading-[1.68] text-muted-foreground sm:text-[15px]"
    : "text-base leading-[1.75] text-muted-foreground sm:text-[17px]";

  if (block.type === "p") {
    return (
      <p key={key} className={pClass}>
        {block.text}
      </p>
    );
  }
  return (
    <ul key={key} className={`list-none ${compact ? "space-y-2" : "space-y-2.5"}`}>
      {block.items.map((item) => (
        <li key={item} className={`flex gap-2.5 ${liClass}`}>
          <span className="mt-[0.55em] h-px w-2.5 shrink-0 bg-foreground/35" aria-hidden />
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
        <h3 className="font-heading text-lg font-semibold leading-snug text-foreground sm:text-xl">{section.subtitle}</h3>
      ) : null}
      <div className={section.subtitle ? "mt-6 space-y-5" : "space-y-5"}>
        {section.blocks.map((block, j) => renderBlock(block, `${index}-${j}`))}
      </div>
    </EditorialFadeIn>
  );
}

function CaiCard({ section, index, locale }: { section: CaiSection; index: number; locale: "en" | "fr" }) {
  if (!section.subtitle) return null;

  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const headerId = `${baseId}-header`;
  const expandLabel = locale === "en" ? "Show details" : "Afficher le détail";
  const collapseLabel = locale === "en" ? "Hide details" : "Masquer le détail";

  return (
    <EditorialFadeIn key={section.subtitle}>
      <article className="flex flex-col rounded-sm border border-border/70 bg-card/80 shadow-[0_1px_0_oklch(0.2_0.03_41/0.05)] transition-[border-color,box-shadow] duration-200 hover:border-border hover:shadow-[0_2px_12px_oklch(0.2_0.03_41/0.06)] p-5 sm:p-6">
        <h3 className="m-0">
          <button
            type="button"
            id={headerId}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="group flex w-full items-start justify-between gap-3 rounded-sm text-left outline-none ring-offset-background transition-colors duration-200 hover:bg-muted/35 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 -m-1 p-1 sm:-m-1 sm:p-1.5"
          >
            <span className="min-w-0 flex-1 font-heading text-[0.95rem] font-semibold leading-snug text-foreground sm:text-base">
              {section.subtitle}
            </span>
            <span className="sr-only">{open ? collapseLabel : expandLabel}</span>
            <span
              className="mt-0.5 shrink-0 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-200 group-hover:text-foreground"
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
              initial={reduce ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 border-t border-border/60 pt-4"
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
    <section className="border-b border-border/60 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <EditorialFadeIn>
          <h2 className="max-w-4xl text-left font-medium uppercase tracking-[0.26em] text-muted-foreground text-[10px] sm:text-[11px]">
            {bundle.headline}
          </h2>
          <p className="mt-6 max-w-3xl text-left text-base leading-[1.75] text-muted-foreground sm:text-lg">{bundle.lead}</p>
        </EditorialFadeIn>

        <div className="mt-14 sm:mt-16">
          <div className="grid items-start gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
            {bundle.sections.slice(0, 6).map((section, i) => (
              <CaiCard key={i} section={section} index={i} locale={locale} />
            ))}
          </div>

          {bundle.sections.length > 6 ? (
            <div className="mt-16 max-w-3xl border-t border-border/60 pt-16 sm:mt-20 sm:pt-20">
              {bundle.sections.slice(6).map((section, i) => renderSection(section, 100 + i))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
