import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const [
    site,
    home,
    about,
    letters,
    letterDetail,
    contact,
    legal,
    landing,
    contextes,
    services,
    cabinet,
  ] = await Promise.all([
    import(`../messages/${locale}/site.json`),
    import(`../messages/${locale}/home.json`),
    import(`../messages/${locale}/about.json`),
    import(`../messages/${locale}/letters.json`),
    import(`../messages/${locale}/letter-detail.json`),
    import(`../messages/${locale}/contact.json`),
    import(`../messages/${locale}/legal.json`),
    import(`../messages/${locale}/landing.json`),
    import(`../messages/${locale}/contextes.json`),
    import(`../messages/${locale}/services.json`),
    import(`../messages/${locale}/cabinet.json`),
  ]);

  const messages = {
    ...site.default,
    ...about.default,
    ...letters.default,
    ...letterDetail.default,
    ...contact.default,
    ...legal.default,
    ...landing.default,
    ...contextes.default,
    ...services.default,
    ...cabinet.default,
    ...home.default,
  };

  return {
    locale,
    messages,
  };
});
