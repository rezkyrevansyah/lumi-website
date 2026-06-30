"use client";

import { motion } from "framer-motion";

const BADGES = ["Terpercaya", "Andal", "Inovatif", "Terjangkau"];

const STATS = [
  { value: "20+", label: "Proyek" },
  { value: "15+", label: "Klien" },
  { value: "100%", label: "Tepat Waktu" },
  { value: "4.9", label: "Rating" },
];

export default function AboutHero() {
  return (
    <section className="relative pt-28 pb-24 bg-[#F8F9FB] overflow-hidden">
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(61,62,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(61,62,74,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Ambient glows */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(circle, #2DD9A4 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="section-tag mb-5">Tentang Kami</p>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.07 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3D3E4A] leading-tight mb-6"
          style={{ fontFamily: "var(--font-rubik)" }}
        >
          Kami Bangun Solusi Digital
          <br /><span className="gradient-text">yang Berdampak Nyata</span>
        </motion.h1>

        {/* Desc */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.13 }}
          className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          Investasi digital kamu penting bagi kami. Kami menghadirkan solusi
          website dan aplikasi yang modern, andal, dan teruji — dibangun dengan
          pendekatan product engineering yang dipercaya berbagai industri.
        </motion.p>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.19 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          {BADGES.map((b) => (
            <span
              key={b}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#2DD9A4]"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {b}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
        >
          <a
            href="/#contact"
            className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base group"
          >
            Mulai Konsultasi Gratis
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
              className="transition-transform duration-200 group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden border border-gray-200"
        >
          {STATS.map((s) => (
            <div key={s.label} className="bg-white py-6 px-4 text-center">
              <p
                className="text-3xl font-bold gradient-text mb-1"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {s.value}
              </p>
              <p
                className="text-xs text-gray-400 uppercase tracking-wide"
                style={{ fontFamily: "var(--font-opensans)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
