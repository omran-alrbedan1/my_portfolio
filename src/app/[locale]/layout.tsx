import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { WebsiteLayout } from "@/components/layout/website-layout";
import { DocumentLocale } from "@/components/providers/document-locale";
import { JsonLd } from "@/components/seo/json-ld";
import { getDirection, isValidLocale } from "@/lib/i18n";
import { getSeoMessages } from "@/lib/seo-messages";
import { buildPersonSchema, buildWebsiteSchema } from "@/lib/seo";
import { siteConfig, type SiteLocale } from "@/config/site";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as SiteLocale;
  setRequestLocale(typedLocale);
  const seo = await getSeoMessages();

  return (
    <div
      lang={typedLocale}
      dir={getDirection()}
      className={`${geist.variable} brand-cursor`}
    >
      <JsonLd
        data={buildWebsiteSchema({
          locale: typedLocale,
          description: seo.schema.websiteDescription,
        })}
      />
      <JsonLd
        data={buildPersonSchema({
          locale: typedLocale,
          description: seo.schema.personDescription,
        })}
      />
      <NextIntlClientProvider>
        <DocumentLocale />
        <WebsiteLayout>
          {children}
        </WebsiteLayout>
      </NextIntlClientProvider>
    </div>
  );
}
