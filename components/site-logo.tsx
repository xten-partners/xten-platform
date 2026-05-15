import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  homeLabel: string;
  /** light = blanc sur hero ; dark = charcoal sur fond clair */
  variant?: "light" | "dark";
  className?: string;
};

export function SiteLogo({ homeLabel, variant = "light", className }: SiteLogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      aria-label={homeLabel}
      className={cn(
        "xten-logo-lockup text-[2.36rem] transition-[color,opacity] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-85 sm:text-[2.48rem]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-2",
        isLight ? "focus-visible:ring-offset-transparent" : "focus-visible:ring-offset-background",
        className,
      )}
    >
      <span className={cn("xten-logo-main", isLight ? "text-white" : "text-foreground")}>
        XTEN
      </span>
      <span className={cn("xten-logo-sub", isLight ? "text-white/95" : "text-foreground/75")}>
        PARTNERS
      </span>
    </Link>
  );
}
