import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { getSiteUrl } from "@/lib/seo";
import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteConfig.name} | ${siteConfig.brandName}`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang={siteConfig.defaultLocale}
      className="dark"
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
