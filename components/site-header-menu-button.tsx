"use client";

import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  openLabel: string;
  closeLabel: string;
  onClick: () => void;
  /** light = traits blancs sur hero ; dark = traits charcoal sur fond clair */
  variant?: "light" | "dark";
};

export function SiteHeaderMenuButton({
  open,
  openLabel,
  closeLabel,
  onClick,
  variant = "light",
}: Props) {
  const isLight = variant === "light";
  const lineClass = cn(
    "absolute left-0 block h-px w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
    isLight ? "bg-white" : "bg-foreground",
  );

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-label={open ? closeLabel : openLabel}
      className={cn(
        "flex size-11 items-center justify-center outline-none transition-opacity duration-300",
        "hover:opacity-75 focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-2",
        isLight ? "focus-visible:ring-offset-transparent" : "focus-visible:ring-offset-background",
      )}
    >
      <span className="relative block h-2.5 w-7" aria-hidden>
        <span className={cn(lineClass, "top-0", open && "top-[5px] rotate-45")} />
        <span className={cn(lineClass, "top-[9px]", open && "top-[5px] -rotate-45")} />
      </span>
    </button>
  );
}
