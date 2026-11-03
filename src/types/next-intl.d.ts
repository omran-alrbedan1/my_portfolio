import type common from "@/messages/en/common.json";
import type forms from "@/messages/en/forms.json";
import type home from "@/messages/en/home.json";
import type { SiteLocale } from "@/config/site";

declare module "next-intl" {
  interface AppConfig {
    Locale: SiteLocale;
    Messages: {
      common: typeof common;
      forms: typeof forms;
      home: typeof home;
    };
  }
}
