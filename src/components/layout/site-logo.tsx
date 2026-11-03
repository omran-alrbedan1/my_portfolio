import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { images } from "@/constants/image";

type SiteLogoProps = {
  homeLabel: string;
  href: string;
  name: string;
  className?: string;
  compact?: boolean;
};

export function SiteLogo({
  homeLabel,
  href,
  name,
  className,
  compact = false,
}: SiteLogoProps) {
  return (
    <Link
      href={href}
      aria-label={homeLabel}
      className={cn(
        "inline-flex min-h-11 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong",
        className
      )}
    >
      <Image
        src={images.brand.logo}
        alt=""
        aria-hidden="true"
        width={compact ? 36 : 44}
        height={compact ? 36 : 44}
        unoptimized
        className="shrink-0"
      />
      <span
        className={cn(
          "font-black tracking-tight text-heading",
          compact ? "text-xl" : "text-2xl sm:text-3xl"
        )}
      >
        {name}
        <span className="text-brand">.</span>
      </span>
    </Link>
  );
}
