import { siteConfig } from "@/config/site";

export function getPublicEnv() {
  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

  return {
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL ??
      (vercelUrl ? `https://${vercelUrl}` : siteConfig.siteUrl),
    defaultLocale: siteConfig.defaultLocale,
  } as const;
}
