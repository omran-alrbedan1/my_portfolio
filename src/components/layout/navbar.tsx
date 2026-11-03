"use client";

import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Container } from "@/components/layout/container";
import { SiteLogo } from "@/components/layout/site-logo";
import { getNavigation } from "@/config/navigation";
import type { SiteLocale } from "@/config/site";
import { scrollToSection, useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

const SECTION_IDS = ["about", "services", "projects", "contact"];

export function Navbar() {
  const locale = useLocale() as SiteLocale;
  const t = useTranslations("common");
  const links = getNavigation(locale);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    const sectionId = href.split("#")[1];

    if (sectionId) {
      scrollToSection(sectionId);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full py-4 transition-all duration-300",
        isScrolled
          ? "border-b border-line bg-background/95 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <Container className="flex items-center justify-between gap-4">
        <SiteLogo
          href={`/${locale}`}
          homeLabel={t("brand.homeLabel")}
          name={t("brand.name")}
          className="shrink-0"
        />

        <nav
          aria-label={t("navigation.ariaLabel")}
          className="hidden items-center gap-7 md:flex"
        >
          {links.map((link) => {
            const sectionId = link.href.split("#")[1];
            const isActive = sectionId
              ? activeSection === sectionId
              : activeSection === "";

            return (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "text-base font-medium transition-colors duration-300",
                  isActive ? "text-heading" : "text-body hover:text-heading"
                )}
              >
                {t(`navigation.${link.labelKey}`)}
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="min-h-11 rounded-md bg-heading px-6 text-base font-medium text-background transition-opacity duration-300 hover:opacity-90"
          >
            {t("header.bookNow")}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={
            isMenuOpen
              ? t("mobileMenu.closeLabel")
              : t("mobileMenu.openLabel")
          }
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line bg-chip text-heading transition hover:border-brand-strong/70 md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {isMenuOpen ? (
        <div className="absolute inset-x-0 top-full border-b border-line bg-background/98 px-6 py-5 shadow-2xl backdrop-blur-xl md:hidden">
          <nav
            id="mobile-nav"
            aria-label={t("navigation.mobileAriaLabel")}
            className="flex flex-col gap-2"
          >
            {links.map((link) => {
              const sectionId = link.href.split("#")[1];
              const isActive = sectionId
                ? activeSection === sectionId
                : activeSection === "";

              return (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "rounded-md border border-transparent px-4 py-3 text-start text-lg font-medium transition-colors",
                    isActive
                      ? "border-line bg-chip text-heading"
                      : "text-body hover:text-heading"
                  )}
                >
                  {t(`navigation.${link.labelKey}`)}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => handleNavClick("#contact")}
              className="mt-2 min-h-11 w-full rounded-md bg-heading px-6 text-base font-medium text-background transition-opacity duration-300 hover:opacity-90"
            >
              {t("header.bookNow")}
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
