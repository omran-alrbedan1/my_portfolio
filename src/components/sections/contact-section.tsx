"use client";

import { Clock3, Mail, MapPin, MessageSquare, PhoneCall, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiX } from "react-icons/si";
import type { IconType } from "react-icons";

import { ContactForm } from "@/components/forms/contact-form";
import FadeIn from "@/components/animation/FadeIn";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { waLink } from "@/lib/whatsapp";

type ContactItem = {
  href?: string;
  kind: "email" | "phone" | "location" | "hours";
  label: string;
  value: string;
};

type SocialItem = {
  href: string;
  kind: "github" | "linkedin" | "x";
  label: string;
};

const contactIcons = {
  email: Mail,
  hours: Clock3,
  location: MapPin,
  phone: PhoneCall,
} as const;

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  x: SiX,
} satisfies Record<SocialItem["kind"], IconType>;

export function ContactSection() {
  const t = useTranslations("home.contact");
  const footerT = useTranslations("common.footer");
  const contactItems = footerT.raw("contact.items") as ContactItem[];
  const socialItems = footerT.raw("social.items") as SocialItem[];

  return (
    <Section id="contact" className="relative overflow-hidden bg-black">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <FadeIn>
          <header className="mb-14 text-center sm:mb-16">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
              <MessageSquare aria-hidden="true" className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium uppercase tracking-wider text-primary">
                {t("eyebrow")}
              </span>
            </span>
            <h2 className="mb-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
              {t("description")}
            </p>
          </header>
        </FadeIn>

        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
          <FadeIn delay={100}>
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-white">
                  {t("infoHeading")}
                </h3>
                <p className="leading-relaxed text-white/60">
                  {t("infoDescription")}
                </p>
              </div>

              <ul className="flex flex-col gap-5">
                {contactItems.map((item) => {
                  const Icon = contactIcons[item.kind];
                  const href =
                    item.href ??
                    (item.kind === "email"
                      ? `mailto:${item.value}`
                      : item.kind === "phone"
                        ? `tel:${item.value.replace(/\s/g, "")}`
                        : undefined);
                  const Wrapper = href ? "a" : "div";

                  return (
                    <li key={item.kind}>
                      <Wrapper
                        {...(href ? { href } : {})}
                        className="group flex items-center gap-4"
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors group-hover:border-primary/30">
                          <Icon
                            aria-hidden="true"
                            className="h-5 w-5 text-primary"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="mb-1 block text-sm text-white/60">
                            {item.label}
                          </span>
                          <span className="block break-words text-white transition-colors group-hover:text-primary">
                            {item.value}
                          </span>
                        </span>
                      </Wrapper>
                    </li>
                  );
                })}
              </ul>

              <div>
                <h4 className="mb-4 text-lg font-medium text-white">
                  {t("socialTitle")}
                </h4>
                <div className="flex gap-3">
                  {socialItems.map((item) => {
                    const Icon = socialIcons[item.kind];

                    return (
                      <a
                        key={item.kind}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                      >
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-black transition-colors hover:bg-primary/90"
              >
                {t("whatsappCta")}
                <Send aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-primary/30 sm:p-8">
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}

export default ContactSection;
