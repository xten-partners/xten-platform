"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CinematicImage } from "@/components/cinematic-image";
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

export function HomeCinematicMandate() {
  const t = useTranslations("Home");
  const reduce = useReducedMotion();
  const image = editorialImages.cinematicMandate;

  const motionProps = reduce
    ? { initial: false as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        animate: "visible" as const,
      };

  return (
    <section
      className="relative min-h-[90vh] overflow-hidden border-b border-ivory/8"
      aria-labelledby="home-cinematic-mandate-heading"
    >
      <CinematicImage
        src={image.src}
        alt={image.alt}
        objectPosition={image.objectPosition}
        grade="night"
        overlay="none"
        className="scale-105"
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

      <div className="relative z-10 flex min-h-[90vh] items-center">
        <div className="xten-container-wide w-full py-20 sm:py-24 lg:py-28">
          <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-16">
            <div className="lg:col-span-7 xl:col-span-7">
              <motion.p
                custom={0}
                variants={blockVariants}
                {...motionProps}
                className="xten-eyebrow-on-image max-w-xl"
              >
                {t("cinematicMandateEyebrow")}
              </motion.p>

              <motion.h2
                id="home-cinematic-mandate-heading"
                custom={1}
                variants={blockVariants}
                {...motionProps}
                className={cn(
                  "mt-8 max-w-[14ch] font-medium tracking-[-0.038em] text-ivory xten-hero-text-on-image",
                  "text-[clamp(2.35rem,6.8vw,5.25rem)] leading-[0.94]",
                  "sm:mt-10 sm:leading-[0.93]",
                )}
              >
                <span className="block whitespace-pre-line">{t("cinematicMandateHeadline")}</span>
              </motion.h2>

              <motion.p
                custom={2}
                variants={blockVariants}
                {...motionProps}
                className="mt-8 max-w-lg text-base font-light leading-[1.78] text-ivory/72 sm:mt-10 sm:max-w-xl sm:text-[17px] sm:leading-[1.76] xten-hero-text-on-image"
              >
                {t("cinematicMandateSubheadline")}
              </motion.p>
            </div>

            <motion.div
              custom={3}
              variants={blockVariants}
              {...motionProps}
              className="lg:col-span-5 lg:flex lg:justify-end xl:col-span-5"
            >
              <motion.article
                className={cn(
                  "group relative w-full max-w-md border border-ivory/12",
                  "bg-charcoal/52 p-7 backdrop-blur-md sm:p-8 lg:max-w-[22.5rem] xl:max-w-[24rem]",
                  "shadow-[0_28px_80px_oklch(0.1_0.018_265/0.45)]",
                  "transition-[border-color,background-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "hover:border-ivory/22 hover:bg-charcoal/62",
                  "hover:shadow-[0_32px_90px_oklch(0.1_0.018_265/0.52)]",
                  !reduce && "hover:-translate-y-0.5",
                )}
              >
                <div
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-ivory/20 to-transparent"
                  aria-hidden
                />
                <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-ivory/48">
                  {t("cinematicMandateCardTitle")}
                </p>
                <p className="mt-5 text-[15px] font-light leading-[1.78] text-ivory/80 sm:text-base sm:leading-[1.76]">
                  {t("cinematicMandateCardBody")}
                </p>
                <p className="mt-8 border-t border-ivory/10 pt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-ivory/88 transition-[color,gap] duration-300 group-hover:gap-3 group-hover:text-ivory"
                  >
                    {t("cinematicMandateCta")}
                    <span
                      className="text-ivory/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-ivory/80"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                </p>
              </motion.article>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
