"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCallback, useId, useState } from "react";

export type EditorialAccordionItem = {
  id: string;
  title: string;
  body: string;
};

type Props = {
  items: EditorialAccordionItem[];
  /** Section label for accessibility */
  ariaLabel: string;
};

export function EditorialAccordion({ items, ariaLabel }: Props) {
  const reduce = useReducedMotion();
  const baseId = useId();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = useCallback((id: string) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return (
    <div className="divide-y divide-border/70 border border-border/70" role="region" aria-label={ariaLabel}>
      {items.map((item) => {
        const isOpen = !!open[item.id];
        const panelId = `${baseId}-${item.id}-panel`;
        const headerId = `${baseId}-${item.id}-header`;

        return (
          <div key={item.id} className="bg-card/40">
            <h3 className="m-0">
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-start justify-between gap-6 px-5 py-5 text-left transition-colors hover:bg-muted/40 sm:px-6 sm:py-6"
              >
                <span className="font-heading text-lg font-medium leading-snug tracking-tight text-foreground sm:text-xl">
                  {item.title}
                </span>
                <span
                  className="mt-1 shrink-0 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
                  aria-hidden
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={reduce ? false : { opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-t border-border/60"
                >
                  <div className="px-5 pb-6 pt-3 text-[15px] leading-[1.75] text-muted-foreground sm:px-6 sm:pb-7 sm:pt-4 sm:text-base sm:leading-[1.78]">
                    {item.body}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
