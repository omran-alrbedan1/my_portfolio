import type { Metadata } from "next";

import { images } from "@/constants/image";
import type { SiteLocale } from "@/config/site";
import { siteConfig } from "@/config/site";
import { getLanguageAlternates, getMetadataKeywords, getSiteUrl } from "@/lib/seo";

const SOCIAL_IMAGE_PATH = images.brand.ogShare;

type PageMetadataInput = {
  locale: SiteLocale;
  path: string;
  title: string;
  description: string;
  classification: string;
  openGraphAlt: string;
  keywords?: string[];
};

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  classification,
  openGraphAlt,
  keywords = [],
}: PageMetadataInput): Metadata {
  const url = `/${locale}${path}`;

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.legalName,
    referrer: "origin-when-cross-origin",
    keywords: getMetadataKeywords(keywords, title),
    classification,
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: url,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      title: `${title} | ${siteConfig.brandName}`,
      description,
      url: getSiteUrl(url),
      type: "website",
      siteName: `${siteConfig.brandName} | ${siteConfig.name}`,
      locale: "en_US",
      images: [
        {
          url: getSiteUrl(SOCIAL_IMAGE_PATH),
          width: 1200,
          height: 630,
          alt: openGraphAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.brandName}`,
      description,
      images: [
        {
          url: getSiteUrl(SOCIAL_IMAGE_PATH),
          alt: openGraphAlt,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
