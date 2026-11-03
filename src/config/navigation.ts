import type { SiteLocale } from "@/config/site";

export function getNavigation(locale: SiteLocale) {
  return [
    { href: `/${locale}`, labelKey: "home" },
    { href: `/${locale}#about`, labelKey: "about" },
    { href: `/${locale}#services`, labelKey: "services" },
    { href: `/${locale}#projects`, labelKey: "projects" },
    { href: `/${locale}#contact`, labelKey: "contact" },
  ] as const;
}
