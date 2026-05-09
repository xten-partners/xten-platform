import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { isLetterSlug, LETTER_SLUGS } from "@/lib/letters";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return LETTER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLetterSlug(slug)) {
    return {};
  }

  const tLetters = await getTranslations({ locale, namespace: "Letters" });
  const title = tLetters(`items.${slug}.title`);
  const description = tLetters(`items.${slug}.excerpt`);

  return {
    title,
    description,
  };
}

export default async function LetterPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLetterSlug(slug)) {
    notFound();
  }

  setRequestLocale(locale);

  const tLetters = await getTranslations("Letters");
  const tDetail = await getTranslations("LetterDetail");
  const c = await getTranslations("Common");

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {tLetters("letterPreviewKicker")}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        {tLetters(`items.${slug}.statusLine`)}
      </p>
      <h1 className="mt-8 font-heading text-4xl font-normal tracking-tight text-foreground sm:text-[2.65rem] sm:leading-tight">
        {tLetters(`items.${slug}.title`)}
      </h1>
      <p className="mt-8 text-base leading-[1.8] text-muted-foreground">
        {tLetters(`items.${slug}.excerpt`)}
      </p>
      <p className="mt-10 border-l-2 border-foreground/15 pl-6 text-base leading-[1.8] text-foreground/90">
        {tDetail(`${slug}.previewParagraph`)}
      </p>
      <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button asChild variant="outline" className="h-11 px-6">
          <Link href="/contact">{c("startConversation")}</Link>
        </Button>
        <Link
          href="/letters"
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline sm:pl-2"
        >
          {c("backToLetters")}
        </Link>
      </div>
    </article>
  );
}
