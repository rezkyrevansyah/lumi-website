"use client";

import { type Testimonial } from "@/lib/data";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex mb-3">
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#2DD9A4"
          className="mr-0.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-80 h-[210px] bg-white rounded-2xl p-5 mx-3 border border-gray-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        <StarRating count={t.rating} />
        <p
          className="text-gray-600 text-sm leading-relaxed italic line-clamp-3"
          style={{ fontFamily: "var(--font-opensans)" }}
          title={t.quote}
        >
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>
      <div className="pt-3 border-t border-gray-50">
        <p
          className="font-bold text-[#101828] text-sm truncate"
          style={{ fontFamily: "var(--font-rubik)" }}
        >
          {t.name}
        </p>
        <p
          className="text-xs text-gray-400 mt-0.5 truncate"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          {t.role}
        </p>
      </div>
    </div>
  );
}

export default function TestimonialsMarquee({ items }: { items: Testimonial[] }) {
  const row1 = [...items, ...items];
  const row2 = [...items, ...items].reverse();

  return (
    <div className="flex flex-col gap-4">
      {/* Row 1 — left to right */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee items-center">
          {row1.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee-reverse items-center">
          {row2.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
