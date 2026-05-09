export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "https://xten.partners";
  try {
    return new URL(raw);
  } catch {
    return new URL("https://xten.partners");
  }
}
