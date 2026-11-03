import { siteConfig } from "@/config/site";

const whatsappNumber = siteConfig.phone.replace(/\D/g, "");

export function waLink(message?: string): string {
  const base = `https://wa.me/${whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
