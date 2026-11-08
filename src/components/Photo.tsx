"use client";
import { useState } from "react";
import type { SiteImage } from "@/lib/images";

type Props = {
  image: SiteImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Plain <img> with a graceful gradient fallback when the file isn't present yet. */
export default function Photo({ image, className = "", priority }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={`img-fallback flex items-end p-4 text-xs text-white/70 ${className}`}
      >
        {image.alt}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image.src}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
