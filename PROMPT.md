# Omran Portfolio — Rebuild Prompt

Rebuild this Next.js base as a **single-page personal portfolio** for
**Omran — عمران**, software developer. Replaces the WAF corporate site while
keeping the same architecture, layout system, and design language.

## Persona & positioning

- **Name:** Omran / عمران
- **Role:** Software developer (full-stack web)
- **Tagline:** "I build web products that are fast, reliable, and ready to grow."
- **Positioning:** one developer covering database → API → UI → deploy;
  freelancing-friendly, remote-first, based in Saudi Arabia.
- **Contact:** email, WhatsApp, GitHub, LinkedIn, X — all in
  `src/config/site.ts` + footer social items in `messages/*/common.json`
  (currently placeholders).

## Site shape (one page)

All content lives on `/[locale]` as anchored sections:

| Anchor | Section | Source component |
|---|---|---|
| top | hero slideshow + CTAs | `components/sections/hero-section` |
| — | quick-facts strip | `features/home/trust-bar` |
| `#about` | bio + portrait + 4 points | `features/home/about-section` |
| `#services` | "what I do" 4 cards | `features/home/services-section` |
| `#stack` | tech stack grid + WhatsApp card | `features/home/stack-section` |
| `#process` | 5-step how-I-work timeline | `features/home/process-section` |
| `#projects` | filterable project grid → GitHub | `features/home/projects-section` |
| — | scrolling tech chips marquee | `features/home/tools-marquee-section` |
| — | by-the-numbers stats | `features/home/stats-section` |
| — | FAQ accordion | `features/home/faq-section` |
| `#contact` | info panel + working contact form | `features/home/contact-section` |

Header nav + footer quick links use `/{locale}#anchor` hrefs. Floating
WhatsApp button and theme/language toggles retained.

## Architecture to KEEP (do not remove)

- `src/app/[locale]` i18n routing + root `page.tsx` locale redirect
  (ar default, RTL)
- `next-intl` setup: `src/i18n`, `src/messages/{ar,en}/{common,home,forms}.json`
- SEO infra: `sitemap.ts`, `robots.ts`, `manifest.ts`, icons,
  `components/seo/json-ld.tsx`, `generateMetadata` on the home page
- JSON-LD: `WebSite` + `Person` (not Organization/LocalBusiness) +
  `WebPage` on home
- Layout system: `container`, `section`, `site-header/footer`,
  `website-layout`, text-based `site-logo` ("Omran.")
- UI primitives: `button`, `optimized-image`, `reveal-panel`, `motion-presets`
- Forms: `components/forms/contact-form` → `POST /api/contact` (JSON,
  honeypot + dedupe + `CONTACT_WEBHOOK_URL` delivery)
- Config layer: `src/config/{site,navigation,env}.ts`, `src/lib`,
  `src/types`, `src/constants`
- Tooling: Tailwind v4, prettier, eslint, `scripts/`, tsconfig paths

## Removed from the WAF base

- Routes: `about/`, `services/` (+`[slug]`), `execution/`, `works/`, `contact/`
- `api/service-request` (replaced by `api/contact`, name/email/message)
- Features: `about`, `contact`, `execution`, `services`, `works` dirs;
  home `cities`, `clients` (logo marquee → text-chip tools marquee),
  Saudi governorates map
- WAF client logos, workshop photos, brand logo images
  (`public/images/waf` → `public/images/portfolio`, digital images kept as
  project/section placeholders)

## Design direction

Same visual system as the base: dark-first theme with light mode, bold
Arabic typography (Noto Kufi Arabic + Geist), grid patterns, framer-motion
reveals — **accent color changed to blue `#3b82f6`** (`--brand` in
`globals.css`, plus `arrow-blue.svg` cursor).

## SEO requirements

- Arabic-first (`ar` default locale, `dir="rtl"`, lang alternates en/ar)
- `metadata`/`generateMetadata` on the single page + canonical + OG image
- `sitemap.ts` covers `/ar` and `/en` with hreflang alternates
- `robots.ts` allows crawl, disallows `/api/`, points at sitemap
- Single h1 (hero), semantic sections, descriptive alt text both locales
