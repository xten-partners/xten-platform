"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { EditorialFadeIn } from "@/components/editorial-fade-in";
import { HomeCaiRoleSection } from "@/components/home-cai-role-section";
import { HomeFinalCtaSection } from "@/components/home-final-cta-section";
import { HomeHero } from "@/components/home-hero";
import { HomePositioningStatement } from "@/components/home-positioning-statement";
import { HomeServicesEditorial } from "@/components/home-services-editorial";

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
            <HomeServicesEditorial />
            <div className="mt-20 grid gap-20 lg:mt-28 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border">
              {[
                { title: "service01Title", body: "service01Body", href: "/services#service-01" },
                { title: "service02Title", body: "service02Body", href: "/services#service-02" },
                { title: "service03Title", body: "service03Body", href: "/services#service-03" },
                { title: "service04Title", body: "service04Body", href: "/services#service-04" },
              ].map((s, i) => (
                <div
                  key={s.title}
                  className={`flex flex-col ${i === 0 ? "lg:pr-8 xl:pr-10" : ""} ${i === 3 ? "lg:pl-8 xl:pl-10" : "lg:px-8 xl:px-10"}`}
                >
                  <h3 className="xten-display-title text-center text-base leading-snug text-foreground sm:text-lg lg:text-[1.2rem]">
                    {t(s.title)}
                  </h3>
                  <p className="mt-8 flex-1 whitespace-pre-line xten-prose text-[15px] sm:text-base">
                    {t(s.body)}
                  </p>
                  <p className="mt-10">
                    <Link href={s.href} className="xten-link-quiet">
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

      <HomeFinalCtaSection />
    </div>
  );
}
