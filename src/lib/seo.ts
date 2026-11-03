import { getPublicEnv } from "@/config/env";
import { siteConfig, type SiteLocale } from "@/config/site";
import { images } from "@/constants/image";

const LOCALIZED_SITE_NAMES: Record<SiteLocale, string> = {
  en: siteConfig.name,
};

function normalizeSiteUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getSiteUrl(path = "") {
  const env = getPublicEnv();
  return new URL(path, `${normalizeSiteUrl(env.siteUrl)}/`).toString();
}

export function getLocalizedPath(locale: SiteLocale, path = "") {
  return `/${locale}${path}`;
}

export function getLanguageAlternates(path = "") {
  return {
    en: getLocalizedPath("en", path),
    "x-default": getLocalizedPath(siteConfig.defaultLocale, path),
  };
}

export function getMetadataKeywords(
  baseKeywords: string[],
  title: string,
  extraKeywords: string[] = []
) {
  return Array.from(
    new Set([
      ...baseKeywords,
      ...extraKeywords,
      title,
      siteConfig.name,
      siteConfig.brandName,
      siteConfig.arabicName,
    ])
  );
}

type SchemaInput = {
  locale: SiteLocale;
  description: string;
};

export function buildWebsiteSchema({ locale, description }: SchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl(getLocalizedPath(locale))}#website`,
    inLanguage: locale,
    name: `${LOCALIZED_SITE_NAMES[locale]} | ${siteConfig.brandName}`,
    alternateName: [siteConfig.arabicName, siteConfig.brandName],
    description,
    url: getSiteUrl(getLocalizedPath(locale)),
    image: getSiteUrl(images.brand.ogShare),
    publisher: {
      "@id": `${getSiteUrl(getLocalizedPath(locale))}#person`,
    },
  };
}

export function buildPersonSchema({ locale, description }: SchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${getSiteUrl(getLocalizedPath(locale))}#person`,
    name: LOCALIZED_SITE_NAMES[locale],
    alternateName: [siteConfig.arabicName, siteConfig.brandName],
    jobTitle: siteConfig.role,
    url: getSiteUrl(getLocalizedPath(locale)),
    description,
    email: siteConfig.contactEmail,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressCountry: siteConfig.country,
    },
    sameAs: [
      siteConfig.githubUrl,
      siteConfig.linkedinUrl,
      siteConfig.twitterUrl,
    ],
  };
}

type WebPageSchemaInput = {
  locale: SiteLocale;
  path: string;
  title: string;
  description: string;
};

export function buildWebPageSchema({
  locale,
  path,
  title,
  description,
}: WebPageSchemaInput) {
  const url = getSiteUrl(getLocalizedPath(locale, path));

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: `${title} | ${siteConfig.brandName}`,
    description,
    inLanguage: locale,
    isPartOf: {
      "@id": `${getSiteUrl(getLocalizedPath(locale))}#website`,
    },
    about: {
      "@id": `${getSiteUrl(getLocalizedPath(locale))}#person`,
    },
  };
}
