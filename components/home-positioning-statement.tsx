"use client";

import { useTranslations } from "next-intl";
import { EditorialFadeIn } from "@/components/editorial-fade-in";

const lineClass =
  "text-[1.35rem] font-light leading-[1.35] tracking-[-0.01em] text-foreground/88 sm:text-[1.65rem] sm:leading-[1.32] lg:text-[1.85rem]";

export function HomePositioningStatement() {
  const t = useTranslations("Home");

  return (
    <section
      className="xten-editorial-surface relative overflow-hidden border-b border-border/40"
      aria-labelledby="home-positioning-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[oklch(0.22_0.02_52/0.12)] to-transparent sm:h-14"
        aria-hidden
      />

      <div className="relative py-12 sm:py-14 lg:py-16">
        <div className="xten-container-narrow relative">
          <EditorialFadeIn delay={0.08}>
            <div className="mx-auto w-full max-w-[40rem] text-left sm:max-w-[44rem]">
              <h2 id="home-positioning-heading" className="sr-only">
                {t("positioningLine1")} {t("positioningLine2")}
              </h2>

              <p className={lineClass}>{t("positioningLine1")}</p>

              <p className={`mt-4 sm:mt-5 ${lineClass}`}>{t("positioningLine2")}</p>

              <p className={`mt-6 sm:mt-7 ${lineClass}`}>{t("positioningLine3")}</p>

              <p className={`mt-6 sm:mt-7 ${lineClass}`}>{t("positioningLine4")}</p>
            </div>
          </EditorialFadeIn>
        </div>
      </div>
    </section>
  );
}
