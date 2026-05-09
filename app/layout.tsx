import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const heading = Newsreader({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const locale = h.get("x-next-intl-locale") ?? routing.defaultLocale;

  return (
    <html
      lang={locale}
      className={`${sans.variable} ${heading.variable}`}
      suppressHydrationWarning
    >
      <body className="xten-atmosphere flex min-h-dvh flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
