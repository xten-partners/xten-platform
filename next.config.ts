import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/le-cabinet", permanent: true },
      { source: "/en/about", destination: "/en/le-cabinet", permanent: true },
      { source: "/approche", destination: "/", permanent: true },
      { source: "/correspondance", destination: "/", permanent: true },
      { source: "/archives", destination: "/", permanent: true },
      { source: "/en/approche", destination: "/en", permanent: true },
      { source: "/en/correspondance", destination: "/en", permanent: true },
      { source: "/en/archives", destination: "/en", permanent: true },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
