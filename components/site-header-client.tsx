"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "@/i18n/navigation";
import { SiteLogo } from "@/components/site-logo";
import { SiteHeaderMenuButton } from "@/components/site-header-menu-button";
import { SiteHeaderOverlay, type NavItem } from "@/components/site-header-overlay";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 80;
const HERO_PAST_RATIO = 0.72;

function subscribeScroll(onStoreChange: () => void) {
  let ticking = false;
  const handle = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      onStoreChange();
    });
  };
  window.addEventListener("scroll", handle, { passive: true });
  return () => window.removeEventListener("scroll", handle);
}

function getScrollSnapshot() {
  return window.scrollY;
}

function subscribeViewport(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange);
  return () => window.removeEventListener("resize", onStoreChange);
}

function getViewportSnapshot() {
  return window.innerHeight;
}

type SiteHeaderClientProps = {
  homeLabel: string;
  navItems: NavItem[];
  menuTitle: string;
  openMenuLabel: string;
  closeMenuLabel: string;
};

export function SiteHeaderClient({
  homeLabel,
  navItems,
  menuTitle,
  openMenuLabel,
  closeMenuLabel,
}: SiteHeaderClientProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const scrollY = useSyncExternalStore(subscribeScroll, getScrollSnapshot, () => 0);
  const viewportHeight = useSyncExternalStore(
    subscribeViewport,
    getViewportSnapshot,
    () => 0,
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const prevScrollY = useRef(0);

  const solid =
    !isHome || (viewportHeight > 0 && scrollY > viewportHeight * HERO_PAST_RATIO);

  /* Scroll-driven visibility — synced from window scroll */
  useEffect(() => {
    if (menuOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- scroll overlay state
      setHidden(false);
      prevScrollY.current = scrollY;
      return;
    }

    if (scrollY <= SCROLL_THRESHOLD) {
      setHidden(false);
    } else if (scrollY > prevScrollY.current + 4) {
      setHidden(true);
    } else if (scrollY < prevScrollY.current - 4) {
      setHidden(false);
    }

    prevScrollY.current = scrollY;
  }, [scrollY, menuOpen]);

  const logoVariant = solid ? "dark" : "light";
  const showHeader = !hidden || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          !showHeader && "-translate-y-full pointer-events-none",
          solid
            ? "border-b border-border/70 bg-background/98"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="xten-container-wide flex h-[4rem] items-center justify-between sm:h-[4.5rem]">
          <SiteLogo homeLabel={homeLabel} variant={logoVariant} />
          <SiteHeaderMenuButton
            open={menuOpen}
            openLabel={openMenuLabel}
            closeLabel={closeMenuLabel}
            variant={logoVariant}
            onClick={() => setMenuOpen((v) => !v)}
          />
        </div>
      </header>

      <SiteHeaderOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navItems={navItems}
        menuTitle={menuTitle}
      />
    </>
  );
}
