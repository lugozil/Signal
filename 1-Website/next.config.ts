import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Allows the dev server (HMR, etc.) to work when opened from the "Network"
  // URL `npm run dev` prints, not just from localhost.
  allowedDevOrigins: ["192.168.100.234"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.cdn.filesafe.space",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
