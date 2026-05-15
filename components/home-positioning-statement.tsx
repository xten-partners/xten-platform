"use client";

import { useTranslations } from "next-intl";
import { EditorialFadeIn } from "@/components/editorial-fade-in";

export function HomePositioningStatement() {
  const t = useTranslations("Home");

  return (
    <section
      className="xten-editorial-surface relative overflow-hidden border-b border-border"
      aria-labelledby="home-positioning-heading"
    >
      <div className="relative py-16 sm:py-20 lg:py-24">
        <div className="xten-container-wide">
          <EditorialFadeIn delay={0.1}>
            <div className="mx-auto w-full max-w-[40rem] text-left sm:max-w-[44rem] lg:max-w-[48rem]">
              <h2 id="home-positioning-heading" className="sr-only">
                {t("positioningLine1")} {t("positioningLine2")}
              </h2>

              <p className="xten-editorial-manifesto whitespace-pre-line">{t("positioningLine1")}</p>

              <p className="xten-editorial-manifesto mt-4 whitespace-pre-line sm:mt-5">
                {t("positioningLine2")}
              </p>
            </div>
          </EditorialFadeIn>
        </div>
      </div>
    </section>
  );
}
