"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { EditorialFadeIn } from "@/components/editorial-fade-in";
import { HomeCaiRoleSection } from "@/components/home-cai-role-section";
import { HomeHero } from "@/components/home-hero";

export function HomeEditorial() {
  const t = useTranslations("Home");

  return (
    <div className="bg-background">
      <HomeHero />

      <section className="border-b border-border/60 bg-muted/25 pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <EditorialFadeIn>
            <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-muted-foreground sm:text-[11px]">
              {t("servicesSectionTitle")}
            </p>
            <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border/60 lg:pt-0">
              {[
                { title: "service01Title", body: "service01Body" },
                { title: "service02Title", body: "service02Body" },
                { title: "service03Title", body: "service03Body" },
                { title: "service04Title", body: "service04Body" },
              ].map((s, i) => (
                <div key={s.title} className={`flex flex-col lg:px-6 xl:px-8 ${i === 0 ? "lg:pl-0" : ""} ${i === 3 ? "lg:pr-0" : ""}`}>
                  <h3 className="font-heading text-lg font-semibold leading-snug text-foreground sm:text-xl">{t(s.title)}</h3>
                  <p className="mt-5 flex-1 text-[15px] leading-[1.75] text-muted-foreground sm:text-base">{t(s.body)}</p>
                  <p className="mt-8">
                    <Link
                      href="/services"
                      className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/75 underline-offset-[5px] transition-colors duration-200 hover:text-foreground hover:underline"
                    >
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

      <section className="border-t border-border/50 bg-muted/15 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <EditorialFadeIn>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center bg-primary px-8 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground transition-colors duration-200 hover:bg-primary/88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t("finalCtaButton")}
              </Link>
            </div>
          </EditorialFadeIn>
        </div>
      </section>
    </div>
  );
}
