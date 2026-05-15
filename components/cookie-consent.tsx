"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "xten-cookie-consent";

function subscribe(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const handler = () => onChange();
  window.addEventListener("storage", handler);
  window.addEventListener("xten-cookie-change", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("xten-cookie-change", handler);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    return !window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
}

function getServerSnapshot() {
  return false;
}

export function CookieConsent() {
  const t = useTranslations("CookieConsent");
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function acceptEssential() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "essential");
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event("xten-cookie-change"));
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background p-5 md:p-7"
    >
      <div className="xten-container flex w-full flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="max-w-xl">
          <p
            id="cookie-consent-title"
            className="font-sans text-base font-medium tracking-[0.1em] uppercase text-foreground"
          >
            {t("title")}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
          <Link
            href="/privacy#cookies"
            className="mt-3 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            {t("learnMore")}
          </Link>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <Button type="button" onClick={acceptEssential} className="w-full sm:w-auto">
            {t("essential")}
          </Button>
        </div>
      </div>
    </div>
  );
}
