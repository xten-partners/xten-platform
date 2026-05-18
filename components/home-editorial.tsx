"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CinematicImage } from "@/components/cinematic-image";
import { EditorialFadeIn } from "@/components/editorial-fade-in";
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

      <section className="xten-surface-muted xten-section-xl border-b border-border">
        <div className="xten-container-wide">
          <EditorialFadeIn>
            <p className="xten-eyebrow">{t("servicesSectionTitle")}</p>
            <div className="mt-20 grid gap-20 lg:mt-28 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border">
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
                  <h3 className="xten-display-title text-xl leading-snug text-foreground sm:text-2xl lg:text-[1.65rem]">
                    {t(s.title)}
                  </h3>
                  <p className="mt-8 flex-1 xten-prose text-[15px] sm:text-base">
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

      <HomeCaiRoleSection />

      <section className="relative min-h-[52vh] overflow-hidden sm:min-h-[58vh]">
        <CinematicImage
          src={editorialImages.hero.src}
          alt={editorialImages.hero.alt}
          grade="hero"
          overlay="dark"
          objectPosition={editorialImages.hero.objectPosition}
        />
        <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
          <div className="absolute inset-0 xten-hero-overlay-horizontal" />
          <div className="absolute inset-0 xten-hero-overlay-vertical" />
        </div>
        <div className="relative z-10 flex min-h-[52vh] items-center justify-center sm:min-h-[58vh]">
          <div className="xten-container-narrow w-full py-20 sm:py-24">
            <div className="xten-hero-content-zone xten-hero-content-zone--center">
              <EditorialFadeIn>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                  <Link
                    href="/contact"
                    className="xten-btn-primary bg-ivory text-charcoal hover:bg-ivory/92"
                  >
                    {t("ctaConversation")}
                  </Link>
                  <Link
                    href="/le-cabinet"
                    className="xten-btn-outline-light hover:border-signature/50 hover:text-ivory"
                  >
                    {t("ctaApproche")}
                  </Link>
                </div>
              </EditorialFadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
