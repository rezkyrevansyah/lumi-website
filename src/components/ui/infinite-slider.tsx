"use client";

import { cn } from "@/lib/utils";
import React from "react";

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 24,
  duration = 35,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={cn(
        "group flex overflow-hidden select-none",
        isHorizontal ? "flex-row" : "flex-col",
        className
      )}
      style={
        {
          "--marquee-gap": `${gap}px`,
          "--marquee-duration": `${duration}s`,
          gap: `${gap}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-around group-hover:[animation-play-state:paused] [will-change:transform]",
          isHorizontal ? "flex-row animate-marquee" : "flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]"
        )}
        style={{ gap: `${gap}px` }}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 items-center justify-around group-hover:[animation-play-state:paused] [will-change:transform]",
          isHorizontal ? "flex-row animate-marquee" : "flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]"
        )}
        style={{ gap: `${gap}px` }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

