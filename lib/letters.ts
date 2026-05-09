export const LETTER_SLUGS = [
  "alignment-before-automation",
  "operator-led-transformation",
  "discretion-judgment",
] as const;

export type LetterSlug = (typeof LETTER_SLUGS)[number];

export function isLetterSlug(value: string): value is LetterSlug {
  return (LETTER_SLUGS as readonly string[]).includes(value);
}
