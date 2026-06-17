"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type ImageFallbackProps = ImageProps & {
  priority?: boolean;
  fallbackClassName?: string;
  fallbackLabel?: string;
};

export function ImageFallback({
  src,
  alt,
  className,
  fallbackClassName,
  fallbackLabel,
  fill,
  priority,
  sizes,
  ...props
}: ImageFallbackProps) {
  const [hasError, setHasError] = useState(!src);

  if (hasError || !src) {
    return (
      <div
        className={cn(
          fill && "absolute inset-0",
          "flex items-center justify-center rounded-lg border border-gold/20 bg-[radial-gradient(circle_at_top,rgba(92,119,148,0.22),rgba(255,255,255,0.04)_36%,rgba(7,17,31,0.24))] text-center text-xs font-semibold uppercase tracking-[0.24em] text-gold/80",
          fallbackClassName,
          className
        )}
        role="img"
        aria-label={alt}
      >
        {fallbackLabel ?? alt}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
      fill={fill}
      priority={priority}
      sizes={sizes}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
