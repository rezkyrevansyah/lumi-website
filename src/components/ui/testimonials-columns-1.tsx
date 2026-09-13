"use client";

import React from "react";
import { Star } from "lucide-react";
import { getAvatarPalette } from "@/lib/avatar";

interface TestimonialColumnItem {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialColumnItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <div
        className="flex flex-col gap-6 pb-6 select-none animate-scroll-vertical group-hover:[animation-play-state:paused] [will-change:transform]"
        style={
          {
            "--scroll-duration": `${props.duration || 24}s`,
          } as React.CSSProperties
        }
      >
        {[0, 1].map((dup) => (
          <React.Fragment key={dup}>
            {props.testimonials.map(({ quote, name, role, rating }, i) => {
              const palette = getAvatarPalette(name);
              return (
                <div
                  key={`${dup}-${name}-${i}`}
                  aria-hidden={dup === 1}
                  className="w-full max-w-xs rounded-2xl border border-zinc-100 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                >
                  <div
                    className="mb-3 flex items-center gap-0.5"
                    role="img"
                    aria-label={`${rating} dari 5 bintang`}
                  >
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`h-3.5 w-3.5 ${
                          starIndex < rating
                            ? "fill-accent-500 text-accent-500"
                            : "fill-none text-zinc-200"
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <p title={quote} className="line-clamp-5 text-sm leading-relaxed text-text-secondary">
                    {quote}
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ${palette.bg} ${palette.text}`}
                      aria-hidden="true"
                    >
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-display font-bold leading-5 tracking-tight text-text-primary">
                        {name}
                      </div>
                      <div className="text-xs leading-5 tracking-tight text-text-muted">{role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

