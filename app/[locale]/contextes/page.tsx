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
    <div className="xten-container xten-section-lg">
      <p className="xten-eyebrow">{tm("siteName")}</p>
      <h1 className="xten-title-rule xten-display-title mt-8 text-4xl text-foreground sm:text-5xl lg:text-[3.25rem]">
        {t("title")}
      </h1>
      <p className="mt-10 max-w-2xl font-light text-lg leading-[1.8] text-muted-foreground">
        {t("intro")}
      </p>

      <ul className="mt-20 grid gap-8 sm:grid-cols-2">
        {cards.map((card) => (
          <li key={card.href}>
            <Link href={card.href} className="group xten-card flex h-full flex-col p-8 sm:p-9">
              <span className="xten-display-title text-xl text-foreground transition-[text-decoration-color] duration-500 group-hover:underline group-hover:decoration-signature/50 group-hover:underline-offset-[6px] sm:text-2xl">
                {card.title}
              </span>
              <span className="mt-5 text-sm font-light leading-relaxed text-muted-foreground">
                {card.line}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-20">
        <Link href="/" className="xten-link-quiet">
          {t("hubBack")}
        </Link>
      </p>
    </div>
  );
}
