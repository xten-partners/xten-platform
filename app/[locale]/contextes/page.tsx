import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContextHub" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ContextesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ContextHub");
  const tm = await getTranslations("Metadata");

  const cards = [
    { href: "/private-equity", title: t("cardPeTitle"), line: t("cardPeLine") },
    { href: "/eti", title: t("cardEtiTitle"), line: t("cardEtiLine") },
    { href: "/top500", title: t("cardTopTitle"), line: t("cardTopLine") },
    {
      href: "/international-subsidiaries",
      title: t("cardIntlTitle"),
      line: t("cardIntlLine"),
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:pb-24">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {tm("siteName")}
      </p>
      <h1 className="mt-5 font-heading text-[2rem] font-normal tracking-tight text-foreground sm:text-[2.65rem] sm:leading-tight">
        {t("title")}
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-[1.65] text-muted-foreground">
        {t("intro")}
      </p>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2">
        {cards.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className="group flex h-full flex-col border border-border/90 bg-card/60 p-7 transition-colors hover:border-foreground/20 hover:bg-card"
            >
              <span className="font-heading text-xl font-normal tracking-tight text-foreground group-hover:underline group-hover:decoration-foreground/25 group-hover:underline-offset-4">
                {card.title}
              </span>
              <span className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {card.line}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-16">
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {t("hubBack")}
        </Link>
      </p>
    </div>
  );
}
