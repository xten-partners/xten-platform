"use client";

import { useEffect } from "react";

/** Scrolls to `#service-0x` when landing on /services from an in-app link with a hash. */
export function ServicePageHashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = decodeURIComponent(hash.slice(1));
    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    scrollToTarget();
    const t = window.setTimeout(scrollToTarget, 100);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
