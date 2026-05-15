type EditorialDividerProps = {
  label?: string;
  className?: string;
};

export function EditorialDivider({ label, className }: EditorialDividerProps) {
  return (
    <div
      className={`my-14 flex items-center gap-6 md:my-20 ${className ?? ""}`}
      aria-hidden
    >
      <div className="h-px flex-1 bg-border" />
      {label ? (
        <span className="max-w-[12rem] text-center text-[10px] font-medium uppercase leading-snug tracking-[0.26em] text-muted-foreground">
          {label}
        </span>
      ) : (
        <span className="inline-flex size-1 shrink-0 bg-foreground/25" />
      )}
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
