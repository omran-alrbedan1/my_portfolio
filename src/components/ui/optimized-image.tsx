import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

type OptimizedImageProps = {
  src: StaticImageData | string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function OptimizedImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  priority = false,
}: OptimizedImageProps) {
  const placeholder =
    typeof src === "string" || !src.blurDataURL ? "empty" : "blur";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-line bg-ink/80 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_16px_40px_rgba(0,0,0,0.12)]",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        priority={priority}
        placeholder={placeholder}
        fill
        sizes={sizes}
        className={cn("h-full w-full object-cover", imageClassName)}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.02),rgba(5,5,5,0.4))]" />
    </div>
  );
}
