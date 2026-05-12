import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang={locale} className={sans.variable} suppressHydrationWarning>
      <body className="xten-atmosphere flex min-h-dvh flex-col bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
