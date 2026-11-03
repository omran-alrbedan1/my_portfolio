import "server-only";

import type { SiteLocale } from "@/config/site";

const dictionaries = {
  en: async () => ({
    common: (await import("@/messages/en/common.json")).default,
    forms: (await import("@/messages/en/forms.json")).default,
    home: (await import("@/messages/en/home.json")).default,
  }),
} as const;

export async function getMessages(locale: SiteLocale) {
  return dictionaries[locale]();
}
