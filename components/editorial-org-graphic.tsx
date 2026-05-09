/**
 * Abstract structural motif — not a data visualization.
 * Suggests nodes, relations, organizational tension; no stock imagery.
 */
export function EditorialOrgGraphic({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M20 60h40M60 30v60M100 20h50M100 20v20M100 100v20M100 100H60M150 40v20M100 40h50M100 80H60M60 80V30"
        className="stroke-foreground/12"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="60" cy="30" r="3" className="fill-foreground/18" />
      <circle cx="100" cy="20" r="3" className="fill-foreground/25" />
      <circle cx="100" cy="100" r="3" className="fill-foreground/18" />
      <circle cx="150" cy="40" r="3" className="fill-foreground/12" />
      <circle cx="20" cy="60" r="2.5" className="fill-foreground/10" />
    </svg>
  );
}
