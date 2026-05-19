"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function HomeServicesEditorial() {
  const t = useTranslations("Home");

  return (
    <div
      className="mt-12 sm:mt-14 lg:mt-16"
      aria-labelledby="home-services-editorial"
    >
      <div className="max-w-3xl space-y-8 sm:space-y-10 lg:max-w-[42rem]">
        <p id="home-services-editorial" className="xten-prose">
          {t("servicesEditorialLead")}
        </p>
        <p
          className={cn(
            "border-l-2 border-foreground/12 pl-6",
            "text-[15px] font-normal leading-[1.78] text-foreground/85",
            "sm:pl-8 sm:text-base sm:leading-[1.76]",
          )}
        >
          {t("servicesEditorialInsight")}
        </p>
      </div>
    </div>
  );
}
