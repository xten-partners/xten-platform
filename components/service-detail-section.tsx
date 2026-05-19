"use client";

import { EditorialFadeIn } from "@/components/editorial-fade-in";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type ServicePricingRow = { label: string; value: string };

export type ServiceHighlight = { label: string; text: string };

export type ServiceDetailTableRow = {
  label: string;
  value: string;
  detail: string;
};

export type ServiceDetailBlock = {
  title: string;
  items?: string[];
  body?: string;
  rows?: ServiceDetailTableRow[];
};

export type ServiceDetailSectionProps = {
  index: number;
  eyebrow: string;
  quote: string;
  title: string;
  intro: string;
  highlights: ServiceHighlight[];
  pricingLabel: string;
  pricingLead: string;
  pricingRows: ServicePricingRow[];
  ctaLabel: string;
  muted?: boolean;
  introAsBlockquote?: boolean;
  introQuotes?: string[];
  detailSections?: ServiceDetailBlock[];
  splitLayout?: boolean;
};

const DETAIL_BODY_CLASS =
  "text-[15px] font-light leading-[1.78] text-muted-foreground sm:text-base sm:leading-[1.76]";

const BLOCKQUOTE_TEXT =
  "text-lg font-light italic leading-[1.72] text-foreground/88 sm:text-xl sm:leading-[1.7]";

const BLOCKQUOTE_WRAP = "border-l-2 border-foreground/12 pl-6 sm:pl-8";

function IntroBlockquoteParagraph({
  paragraph,
  className,
}: {
  paragraph: string;
  className?: string;
}) {
  const lines = paragraph.split("\n").map((line) => line.trim()).filter(Boolean);
  const hasBulletLines =
    lines.length > 1 && lines.slice(1).every((line) => /^[—\-]\s/.test(line));

  if (hasBulletLines) {
    return (
      <div className={className}>
        <p className={BLOCKQUOTE_TEXT}>{lines[0]}</p>
        <ul className="mt-3 list-none space-y-2.5 sm:mt-4">
          {lines.slice(1).map((line) => (
            <li key={line} className={cn("flex gap-3", BLOCKQUOTE_TEXT)}>
              <span
                className="mt-[0.55em] h-px w-3 shrink-0 bg-foreground/35"
                aria-hidden
              />
              <span>{line.replace(/^[—\-]\s*/, "")}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <p className={cn(BLOCKQUOTE_TEXT, className)}>{paragraph}</p>;
}

function IntroBlockquote({ intro }: { intro: string }) {
  return (
    <blockquote className={BLOCKQUOTE_WRAP}>
      {intro.split(/\n\n+/).map((paragraph, i) => (
        <IntroBlockquoteParagraph
          key={paragraph.slice(0, 48)}
          paragraph={paragraph}
          className={i > 0 ? "mt-5 sm:mt-6" : undefined}
        />
      ))}
    </blockquote>
  );
}

function ServiceIntroContent({
  intro,
  introQuotes,
  introAsBlockquote,
}: {
  intro: string;
  introQuotes?: string[];
  introAsBlockquote?: boolean;
}) {
  const quotes = introQuotes?.filter((q) => q.trim().length) ?? [];

  return (
    <div className="max-w-3xl space-y-6 sm:space-y-7 lg:max-w-[42rem]">
      {intro.trim() ? (
        introAsBlockquote ? (
          <IntroBlockquote intro={intro} />
        ) : (
          <p className="xten-prose">{intro}</p>
        )
      ) : null}
      {quotes.map((quote) => (
        <blockquote key={quote.slice(0, 48)} className={BLOCKQUOTE_WRAP}>
          <p className={BLOCKQUOTE_TEXT}>{quote}</p>
        </blockquote>
      ))}
    </div>
  );
}

function ServiceConversationCta({
  label,
  centered = false,
  variant = "outline",
}: {
  label: string;
  centered?: boolean;
  variant?: "outline" | "primary";
}) {
  return (
    <p className={cn("mt-10 sm:mt-12", centered && "flex justify-center")}>
      <Link
        href="/contact"
        className={cn(
          variant === "primary" ? "xten-btn-primary" : "xten-btn-outline",
          centered ? "inline-flex min-w-[12rem]" : "inline-flex w-full sm:w-auto sm:min-w-[12rem]",
        )}
      >
        {label}
      </Link>
    </p>
  );
}

function ServiceDetailsColumn({
  detailSections,
  highlights,
  pricingLabel,
  pricingLead,
  pricingRows,
  ctaLabel,
  showCta = true,
  className,
}: {
  detailSections?: ServiceDetailBlock[];
  highlights: ServiceHighlight[];
  pricingLabel: string;
  pricingLead: string;
  pricingRows: ServicePricingRow[];
  ctaLabel: string;
  showCta?: boolean;
  className?: string;
}) {
  const useStructuredSections = Boolean(detailSections?.length);

  return (
    <div className={className}>
      <ul className="list-none space-y-6">
        {useStructuredSections
          ? detailSections!.map((section) => (
              <li
                key={section.title}
                className="border-t border-border/50 pt-6 first:border-t-0 first:pt-0"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-foreground/55">
                  {section.title}
                </p>
                {section.items?.length ? (
                  <ul className="mt-3 list-none space-y-2.5">
                    {section.items.map((item) => (
                      <li key={item} className={`flex gap-3 ${DETAIL_BODY_CLASS}`}>
                        <span
                          className="mt-[0.55em] h-px w-3 shrink-0 bg-foreground/35"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : section.rows?.length ? (
                  <div className="mt-5 overflow-hidden border border-border/70">
                    <table className="w-full border-collapse text-left text-sm">
                      <tbody>
                        {section.rows.map((row) => (
                          <tr key={row.label} className="border-t border-border/60 first:border-t-0">
                            <th
                              scope="row"
                              className="w-[28%] px-4 py-3 font-normal text-foreground/85 sm:px-5"
                            >
                              {row.label}
                            </th>
                            <td className="w-[18%] px-4 py-3 text-muted-foreground sm:px-5">
                              {row.value}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground sm:px-5">{row.detail}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className={cn("mt-2", DETAIL_BODY_CLASS)}>{section.body}</p>
                )}
              </li>
            ))
          : highlights.map((item) => (
              <li key={item.label} className="border-t border-border/50 pt-6 first:border-t-0 first:pt-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-foreground/55">
                  {item.label}
                </p>
                <p className={cn("mt-2", DETAIL_BODY_CLASS)}>{item.text}</p>
              </li>
            ))}
      </ul>

      {!useStructuredSections && pricingRows.length > 0 ? (
        <div className="mt-12 sm:mt-14">
          <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-foreground/55">
            {pricingLabel}
          </p>
          <p className="mt-3 xten-prose">{pricingLead}</p>
          <div className="mt-5 overflow-hidden border border-border/70">
            <table className="w-full border-collapse text-left text-sm">
              <tbody>
                {pricingRows.map((row) => (
                  <tr key={row.label} className="border-t border-border/60 first:border-t-0">
                    <th
                      scope="row"
                      className="w-[45%] px-4 py-3 font-normal text-foreground/85 sm:px-5"
                    >
                      {row.label}
                    </th>
                    <td className="px-4 py-3 text-muted-foreground sm:px-5">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {showCta ? <ServiceConversationCta label={ctaLabel} /> : null}
    </div>
  );
}

export function ServiceDetailSection({
  index,
  eyebrow,
  quote,
  title,
  intro,
  highlights,
  pricingLabel,
  pricingLead,
  pricingRows,
  ctaLabel,
  muted = false,
  introAsBlockquote = false,
  introQuotes,
  detailSections,
  splitLayout = false,
}: ServiceDetailSectionProps) {
  const sectionId = `service-${String(index + 1).padStart(2, "0")}`;
  const hasQuote = quote.trim().length > 0;
  const hasIntro = intro.trim().length > 0;
  const hasIntroColumn = hasIntro || Boolean(introQuotes?.length);
  const useSplit = splitLayout && hasIntroColumn;

  const detailsColumn = (
    <ServiceDetailsColumn
      detailSections={detailSections}
      highlights={highlights}
      pricingLabel={pricingLabel}
      pricingLead={pricingLead}
      pricingRows={pricingRows}
      ctaLabel={ctaLabel}
      showCta={!useSplit}
    />
  );

  return (
    <section
      id={sectionId}
      className={cn(
        "scroll-mt-24 xten-section-xl border-b border-border",
        muted ? "xten-surface-muted" : "bg-background",
      )}
      aria-labelledby={`${sectionId}-title`}
    >
      <div className="xten-container-wide">
        <EditorialFadeIn>
          <p className="xten-eyebrow">{eyebrow}</p>

          {hasQuote ? (
            <blockquote className={cn("mt-6 max-w-3xl sm:mt-8 lg:max-w-[42rem]", BLOCKQUOTE_WRAP)}>
              <p className={BLOCKQUOTE_TEXT}>{quote}</p>
            </blockquote>
          ) : null}

          <h2
            id={`${sectionId}-title`}
            className={cn(
              "xten-display-title text-2xl leading-snug text-foreground sm:text-3xl lg:text-[2.35rem] lg:leading-[1.12]",
              hasQuote ? "mt-8 sm:mt-10" : "mt-6 sm:mt-8",
            )}
          >
            {title}
          </h2>

          {useSplit ? (
            <div className="mt-8 grid grid-cols-1 gap-12 sm:mt-10 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
              <div className="flex flex-col lg:sticky lg:top-[5.5rem] lg:max-w-xl">
                <ServiceIntroContent
                  intro={intro}
                  introQuotes={introQuotes}
                  introAsBlockquote={introAsBlockquote}
                />
                <ServiceConversationCta label={ctaLabel} centered variant="primary" />
              </div>
              {detailsColumn}
            </div>
          ) : (
            <>
              {hasIntro || introQuotes?.length ? (
                <div className="mt-8 sm:mt-10">
                  <ServiceIntroContent
                    intro={intro}
                    introQuotes={introQuotes}
                    introAsBlockquote={introAsBlockquote}
                  />
                </div>
              ) : null}

              <div className="mt-10 max-w-3xl sm:mt-12 lg:max-w-[42rem]">{detailsColumn}</div>
            </>
          )}
        </EditorialFadeIn>
      </div>
    </section>
  );
}
