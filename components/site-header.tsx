import { getTranslations } from "next-intl/server";
import { SiteHeaderClient } from "@/components/site-header-client";

export async function SiteHeader() {
  const t = await getTranslations("Nav");
  const tm = await getTranslations("Metadata");

  const navItems = [
    { href: "/services", label: t("services") },
    { href: "/le-cabinet", label: t("cabinet") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <SiteHeaderClient
      homeLabel={tm("siteName")}
      navItems={navItems}
      menuTitle={t("menuTitle")}
      openMenuLabel={t("openMenu")}
      closeMenuLabel={t("closeMenu")}
    />
  );
}
