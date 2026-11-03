import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { JsonLd } from "@/components/seo/json-ld";
import { isValidLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { getSeoMessages } from "@/lib/seo-messages";
import { buildWebPageSchema } from "@/lib/seo";
import AboutSection from "@/components/sections/about-section";
import SkillsSection from "@/components/sections/skills-section";
import Projects from "@/components/sections/projects-section";
import Services from "@/components/sections/services-section";
import Testimonials from "@/components/sections/testimonials-section";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "home" });
  const seo = await getSeoMessages();

  return buildMetadata(locale, {
    title: t("metadata.title"),
    description: t("metadata.description"),
    classification: seo.classification,
    openGraphAlt: seo.ogImageAlt,
    keywords: [...seo.keywords.default, ...seo.keywords.routes.home],
  });
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          locale,
          path: "",
          title: t("metadata.title"),
          description: t("metadata.description"),
        })}
      />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <Projects />
      <Services/>
      <Testimonials/>
      <ContactSection />
    </>
  );
}
