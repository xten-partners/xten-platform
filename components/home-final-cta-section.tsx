"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CinematicImage } from "@/components/cinematic-image";
import { EditorialFadeIn } from "@/components/editorial-fade-in";
import { editorialImages } from "@/lib/editorial-images";

export function HomeFinalCtaSection() {
  const t = useTranslations("Home");

  return (
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
  );
}
