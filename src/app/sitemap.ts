import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getLanguageAlternates, getLocalizedPath, getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.locales.map((locale) => ({
    url: getSiteUrl(getLocalizedPath(locale)),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: getLanguageAlternates(),
    },
  }));
}
