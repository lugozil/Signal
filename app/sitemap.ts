import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://viralsignal.net";
const PAGES = ["", "/services", "/about", "/work", "/pricing", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((page) =>
    routing.locales.map((locale) => ({
      url:
        locale === routing.defaultLocale
          ? `${BASE_URL}${page}`
          : `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
    })),
  );
}
