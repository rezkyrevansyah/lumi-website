"use client";

import { motion } from "framer-motion";

export default function QuoteBanner() {
  return (
    <section className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d0e14 0%, #1a1b24 100%)" }}>
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[200px] opacity-10"
          style={{ background: "radial-gradient(ellipse, #2DD9A4 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Quote marks */}
          <div className="text-8xl leading-none text-[#2DD9A4]/20 font-serif mb-4 select-none">&ldquo;</div>
          <p
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug -mt-10"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            We don&apos;t just build applications.{" "}
            <span className="gradient-text">We set the standard</span>
            {" "}for application-building.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#2DD9A4]/40" />
            <span className="text-[#2DD9A4] text-sm font-semibold" style={{ fontFamily: "var(--font-opensans)" }}>
              Lumi Beta Works
            </span>
            <div className="h-px w-12 bg-[#2DD9A4]/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
