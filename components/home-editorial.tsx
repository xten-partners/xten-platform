"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { EditorialFadeIn } from "@/components/editorial-fade-in";
import { EditorialImageBand } from "@/components/editorial-image-band";
import { HomeCaiRoleSection } from "@/components/home-cai-role-section";
import { HomeHero } from "@/components/home-hero";
import { HomePositioningStatement } from "@/components/home-positioning-statement";
import { editorialImages } from "@/lib/editorial-images";

export function HomeEditorial() {
  const t = useTranslations("Home");

  return (
    <div className="bg-background">
      <HomeHero omitSubtext />

      <HomePositioningStatement />

      <section className="xten-editorial-surface xten-section-lg border-b border-border/50">
        <div className="xten-container">
          <EditorialFadeIn>
            <p className="xten-eyebrow">{t("servicesSectionTitle")}</p>
            <div className="mt-16 grid gap-16 lg:mt-20 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border/55">
              {[
                { title: "service01Title", body: "service01Body" },
                { title: "service02Title", body: "service02Body" },
                { title: "service03Title", body: "service03Body" },
                { title: "service04Title", body: "service04Body" },
              ].map((s, i) => (
                <div
                  key={s.title}
                  className={`flex flex-col ${i === 0 ? "lg:pr-8 xl:pr-10" : ""} ${i === 3 ? "lg:pl-8 xl:pl-10" : "lg:px-8 xl:px-10"}`}
                >
                  <h3 className="xten-display-title text-xl leading-snug text-foreground sm:text-2xl">
                    {t(s.title)}
                  </h3>
                  <p className="mt-6 flex-1 text-[15px] font-light leading-[1.8] text-muted-foreground sm:text-base">
                    {t(s.body)}
                  </p>
                  <p className="mt-10">
                    <Link href="/services" className="xten-link-quiet">
                      {t("serviceDetailLink")}
                    </Link>
                  </p>
                </div>
              ))}
            </div>
          </EditorialFadeIn>
        </div>
      </section>

      <EditorialImageBand image={editorialImages.services} />

      <HomeCaiRoleSection />

      <EditorialImageBand image={editorialImages.mandate} />

      <EditorialImageBand image={editorialImages.atmosphere} />

      <section className="xten-section-lg border-t border-border/40">
        <div className="xten-container-narrow text-center">
          <EditorialFadeIn>
            <Link href="/contact" className="xten-btn-primary">
              {t("finalCtaButton")}
            </Link>
          </EditorialFadeIn>
        </div>
      </section>
    </div>
  );
}
