"use client";

import { ChevronDown, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  SiNestjs,
  SiNextdotjs,
  SiPrisma,
  SiReact,
  SiTypescript,
} from "react-icons/si";

import FadeIn from "@/components/animation/FadeIn";
import RadialGradientBackground from "@/components/backgrounds/RadialGradientBackground";
import { Container } from "@/components/layout/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { images } from "@/constants/image";
import { scrollToSection } from "@/hooks/useScrollSpy";

type StatItem = {
  value: string;
  label: string;
};

const TECH_ICONS = [
  { Icon: SiReact, color: "#61DAFB", name: "React" },
  { Icon: SiNextdotjs, color: "#FFFFFF", name: "Next.js" },
  { Icon: SiNestjs, color: "#E0234E", name: "NestJS" },
  { Icon: SiTypescript, color: "#3178C6", name: "TypeScript" },
  { Icon: SiPrisma, color: "#71D9C9", name: "Prisma" },
] as const;

export function HeroSection() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const stats = t.raw("hero.stats") as StatItem[];

  return (
    <section className="relative flex min-h-screen items-center overflow-x-hidden bg-page-deep pb-16 pt-16">
      <RadialGradientBackground variant="hero" />

      <Container className="relative z-10 w-full pb-16 pt-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left column — content */}
          <div className="text-start">
            <FadeIn delay={0}>
              <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                <span className="text-sm text-body-strong">
                  {t("hero.eyebrow")}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="mb-6 text-5xl font-light leading-[1.1] tracking-tight text-heading md:text-6xl lg:text-7xl">
                {t("hero.title")}
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-body md:text-xl">
                {t("hero.description")}
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="mb-14 inline-flex items-center justify-center rounded-xl bg-heading px-7 py-3.5 text-base font-medium text-background transition-all duration-300 hover:opacity-95"
              >
                {tCommon("header.bookNow")}
              </button>
            </FadeIn>

            {/* Fixed stats layout using flex */}
            <FadeIn delay={400}>
              <div className="flex flex-wrap items-center gap-6 sm:flex-nowrap sm:justify-between">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="flex items-center">
                    <div className="flex flex-col pe-6 sm:pe-8">
                      <div className="mb-1 text-3xl font-semibold text-primary">
                        {stat.value}
                      </div>
                      <p className="max-w-[110px] text-sm leading-tight text-body">
                        {stat.label}
                      </p>
                    </div>

                    {index !== stats.length - 1 && (
                      <div className="hidden h-10 w-px bg-line sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right column — portrait & tech */}
          <FadeIn delay={200}>
            <div className="relative mt-12 pb-12 lg:mt-0 lg:pb-0">
              <div className="group relative mx-auto aspect-[4/5] max-w-[500px] overflow-hidden rounded-2xl lg:ms-auto">
                <div className="animate-spin-slow absolute inset-[-2px] rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary" />
                <div className="absolute inset-[2px] z-0 rounded-2xl bg-page-deep" />
                <div className="relative z-10 m-[2px] h-full w-full overflow-hidden rounded-2xl">
                  <OptimizedImage
                    src={images.home.hero}
                    alt={t("hero.imageAlt")}
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    priority
                    className="h-full w-full rounded-none border-0 shadow-none"
                    imageClassName="h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Floating Tech Icons Badge */}
              <div className="absolute -bottom-2 left-1/2 z-20 w-[90%] max-w-[420px] -translate-x-1/2 sm:-bottom-6">
                <FadeIn delay={500}>
                  <div className="flex items-center justify-between rounded-2xl border border-line bg-panel-solid/95 px-6 py-4 shadow-2xl backdrop-blur-md">
                    {TECH_ICONS.map(({ Icon, color, name }) => (
                      <div
                        key={name}
                        title={name}
                        className="cursor-pointer rounded-xl bg-chip p-2 transition-colors hover:bg-muted"
                      >
                        <Icon
                          className="h-6 w-6 sm:h-7 sm:w-7"
                          style={{ color }}
                          aria-label={name}
                        />
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>

      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 animate-bounce lg:block">
        <button
          type="button"
          onClick={() => scrollToSection("about")}
          className="text-faint transition-colors hover:text-heading"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-6 w-6 text-primary" />
        </button>
      </div>
    </section>
  );
}