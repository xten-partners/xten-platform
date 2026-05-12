"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { EditorialFadeIn } from "@/components/editorial-fade-in";
import { HomeCaiRoleSection } from "@/components/home-cai-role-section";

function HeroTitle({ main, sub }: { main: string; sub: string }) {
  const mainRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLSpanElement>(null);

  const fitSubFont = useCallback(() => {
    const mainEl = mainRef.current;
    const subEl = subRef.current;
    if (!mainEl || !subEl) return;

    const targetW = mainEl.offsetWidth;
    if (targetW < 1) return;

    subEl.style.fontSize = "16px";
    const intrinsic = subEl.scrollWidth;
    if (intrinsic < 1) return;

    const px = Math.max(11, 16 * (targetW / intrinsic));
    subEl.style.fontSize = `${px}px`;
  }, []);

  useLayoutEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    fitSubFont();
    const ro = new ResizeObserver(fitSubFont);
    ro.observe(mainEl);
    window.addEventListener("resize", fitSubFont);
    const fonts = document.fonts?.ready?.then(fitSubFont);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fitSubFont);
      void fonts;
    };
  }, [main, sub, fitSubFont]);

  return (
    <h1 className="mt-8 w-full max-w-4xl font-heading tracking-tight text-foreground">
      <span
        ref={mainRef}
        className="block w-fit max-w-full text-[2.05rem] font-semibold leading-[1.08] sm:text-4xl sm:leading-[1.05] md:text-5xl lg:text-[3.15rem] lg:leading-[1.02]"
      >
        {main}
      </span>
      <span
        ref={subRef}
        className="mt-3 block w-fit max-w-full whitespace-nowrap font-heading font-medium leading-none tracking-[0.06em] text-foreground"
      >
        {sub}
      </span>
    </h1>
  );
}

export function HomeEditorial() {
  const t = useTranslations("Home");

  return (
    <div className="bg-background">
      <section className="relative flex min-h-[70vh] flex-col justify-start border-b border-border/60 pb-10 pt-24 sm:min-h-[74vh] sm:pb-16 sm:pt-28">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <EditorialFadeIn>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground sm:text-[11px]">
              {t("heroEyebrow")}
            </p>
            <HeroTitle main={t("heroTitleMain")} sub={t("heroTitleSub")} />
            <p className="mt-6 max-w-2xl whitespace-pre-line text-sm font-normal leading-[1.75] text-muted-foreground sm:text-base sm:leading-[1.7]">
              {t("heroSubtext")}
            </p>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex h-11 w-fit items-center justify-center bg-primary px-7 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground transition-colors duration-200 hover:bg-primary/88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t("ctaConversation")}
              </Link>
              <Link
                href="/le-cabinet"
                className="inline-flex h-11 w-fit items-center justify-center border border-foreground/14 bg-background/80 px-7 text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-colors duration-200 hover:border-foreground/22 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t("ctaApproche")}
              </Link>
            </div>
          </EditorialFadeIn>
        </div>
      </section>

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

      <section className="border-b border-border/60 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <EditorialFadeIn>
            <p className="text-left text-[10px] font-medium uppercase tracking-[0.26em] text-muted-foreground sm:text-[11px]">
              {t("experiencesSectionTitle")}
            </p>
            <div className="mt-8 max-w-3xl space-y-6 text-left text-base leading-[1.82] text-muted-foreground sm:mt-10 sm:text-lg sm:leading-[1.78]">
              <p>{t("experiencesBody1")}</p>
              <p>{t("experiencesBody2")}</p>
            </div>
          </EditorialFadeIn>
        </div>
      </section>

      <section className="border-t border-border/50 bg-muted/15 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <EditorialFadeIn>
            <h2 className="font-heading text-2xl font-normal leading-snug tracking-tight text-foreground sm:text-3xl">
              {t("finalCtaTitle")}
            </h2>
            <p className="mt-6 text-base leading-[1.75] text-muted-foreground sm:text-lg">{t("finalCtaSub")}</p>
            <div className="mt-10">
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
