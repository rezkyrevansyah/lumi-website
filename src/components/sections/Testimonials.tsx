"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS, type Testimonial } from "@/lib/data";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex mb-4">
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
    <div className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 mx-3 border border-gray-100 shadow-sm">
      <StarRating count={t.rating} />
      <p
        className="text-gray-600 text-sm leading-relaxed mb-5 italic"
        style={{ fontFamily: "var(--font-opensans)" }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>
      <div>
        <p
          className="font-bold text-[#3D3E4A] text-sm"
          style={{ fontFamily: "var(--font-rubik)" }}
        >
          {t.name}
        </p>
        <p
          className="text-xs text-gray-400 mt-0.5"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          {t.role}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const row1 = [...TESTIMONIALS, ...TESTIMONIALS];
  const row2 = [...TESTIMONIALS, ...TESTIMONIALS].reverse();

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="section-tag mb-3">What People Say</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#3D3E4A]"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Why Clients{" "}
            <span className="gradient-text">Trust Us</span>
          </h2>
        </motion.div>
      </div>

      {/* Row 1 — left to right */}
      <div className="relative flex overflow-hidden mb-5">
        <div className="flex animate-marquee">
          {row1.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee-reverse">
          {row2.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
