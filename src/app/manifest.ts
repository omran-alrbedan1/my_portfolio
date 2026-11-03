import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { images } from "@/constants/image";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} | ${siteConfig.brandName} — ${siteConfig.role}`,
    short_name: siteConfig.brandName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0d",
    theme_color: "#08090a",
    icons: [
      {
        src: images.brand.appIcon,
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
