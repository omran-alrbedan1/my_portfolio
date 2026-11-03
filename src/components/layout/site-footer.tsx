import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Clock3, Heart, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";

import FadeIn from "@/components/animation/FadeIn";
import { getNavigation } from "@/config/navigation";
import { Container } from "@/components/layout/container";
import { images } from "@/constants/image";

type ContactItemKind = "phone" | "email" | "location" | "hours";
type SocialKind = "github" | "linkedin" | "x";

export function SiteFooter() {
  const locale = useLocale();
  const t = useTranslations("common");
  const contactItems = t.raw("footer.contact.items") as Array<{
    href?: string;
    kind: ContactItemKind;
    label: string;
    value: string;
  }>;
  const socialItems = t.raw("footer.social.items") as Array<{
    href: string;
    kind: SocialKind;
    label: string;
  }>;

  const quickLinks = getNavigation(locale).map((link) => ({
    label: t(`navigation.${link.labelKey}`),
    href: link.href,
  }));
  const brandContactItems = contactItems.filter(
    (item) => item.kind === "email" || item.kind === "location"
  );

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-primary/10 opacity-30 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-primary/10 opacity-30 blur-3xl" />
      </div>

      <Container className="relative py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-3">
          <FadeIn delay={0}>
            <div>
              <Link
                href={`/${locale}`}
                aria-label={t("brand.homeLabel")}
                className="inline-flex items-center gap-3"
              >
                <Image
                  src={images.brand.logo}
                  alt=""
                  aria-hidden="true"
                  width={44}
                  height={44}
                  unoptimized
                />
                <span className="bg-linear-to-r from-primary/80 via-primary to-primary/80 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                  {t("brand.name")}
                </span>
              </Link>
              <p className="mb-6 mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                {t("footer.description")}
              </p>

              <div className="space-y-3">
                {brandContactItems.map((item) => (
                  <ContactItem
                    key={item.kind}
                    icon={getContactIcon(item.kind)}
                    label={item.label}
                    value={item.value}
                    href={item.href}
                  />
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div>
              <FooterHeading>{t("footer.quickLinksTitle")}</FooterHeading>
              <nav className="mt-6">
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex w-fit items-center gap-2 text-sm text-white/60 transition-colors hover:text-primary"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white/30 transition-colors group-hover:bg-primary" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div>
              <FooterHeading>{t("footer.socialTitle")}</FooterHeading>
              <p className="mb-6 mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                {t("footer.socialDescription")}
              </p>
              <div className="flex flex-wrap gap-3">
                {socialItems.map((item) => (
                  <a
                    key={item.kind}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-primary/30 hover:bg-white/10"
                  >
                    <SocialIcon
                      kind={item.kind}
                      className="relative z-10 h-5 w-5 text-white/60 transition-colors group-hover:text-primary"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/0 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-center text-sm md:flex-row md:text-start">
          <p className="text-white/50">
            © {new Date().getFullYear()} {t("brand.name")}. {t("footer.rightsReserved")}
          </p>
          <p className="flex items-center gap-1 text-white/50">
            {t("footer.builtWithPrefix")}
            <Heart
              aria-hidden="true"
              className="h-4 w-4 animate-pulse fill-red-500 text-red-500"
            />
            {t("footer.builtWith")}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function getContactIcon(kind: ContactItemKind) {
  switch (kind) {
    case "phone":
      return <Phone className="h-5 w-5" />;
    case "email":
      return <Mail className="h-5 w-5" />;
    case "location":
      return <MapPin className="h-5 w-5" />;
    case "hours":
      return <Clock3 className="h-5 w-5" />;
  }
}

function SocialIcon({
  kind,
  className,
}: {
  kind: SocialKind;
  className?: string;
}) {
  switch (kind) {
    case "github":
      return <GithubIcon className={className} />;
    case "linkedin":
      return <LinkedinIcon className={className} />;
    case "x":
      return <XIcon className={className} />;
  }
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.68 5.38-5.24 5.67.41.35.77 1.05.77 2.12v3.14c0 .3.21.67.8.55A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" />
    </svg>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold text-white">{children}</h2>;
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex w-fit items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-primary/30 hover:bg-white/10">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-white/50">{label}</p>
        <p className="mt-0.5 break-words whitespace-pre-line text-sm text-white/70 transition-colors group-hover:text-white">
          {value}
        </p>
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <a href={href} className="block">
      {content}
    </a>
  );
}
