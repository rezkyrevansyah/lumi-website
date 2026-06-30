"use client";

import { motion } from "framer-motion";

type HeroBadge = { icon: string; label: string };
type ActiveProject = { name: string; type: string; progress: number; color: string };

interface HeroProps {
  badges?: HeroBadge[];
  activeProjects?: ActiveProject[];
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
});

export default function Hero({ badges = [], activeProjects = [] }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#F8F9FB]"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(61,62,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(61,62,74,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, #2DD9A4 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
        {/* Left column */}
        <div className="flex flex-col gap-5 md:gap-6">
          <motion.div {...fadeUp(0)}>
            <span className="section-tag">Buka untuk proyek baru</span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#3D3E4A]"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            <span className="gradient-text">Website & Aplikasi</span>
            <br />
            Profesional,
            <br />
            Harga Terjangkau.
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-base md:text-lg text-gray-500 leading-relaxed max-w-lg"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            Dari UMKM hingga enterprise — kami hadirkan jasa pembuatan website,
            aplikasi, QA testing, dan tech consulting dengan hasil berkualitas,
            transparan, dan harga yang masuk akal.
          </motion.p>

          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <a
              href="#contact"
              className="btn-primary inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Konsultasi Gratis
            </a>
            <a
              href="#portfolio"
              className="btn-outline inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base"
            >
              Lihat Portfolio
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            {...fadeUp(0.4)}
            className="flex items-center gap-4 md:gap-6 pt-1 flex-wrap"
          >
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-sm text-gray-400"
                style={{ fontFamily: "var(--font-opensans)" }}
              >
                <span>{badge.icon}</span>
                <span>{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — floating card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative flex justify-center lg:justify-end mt-8 lg:mt-0"
        >
          <div className="relative">
            {/* Rating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="absolute -top-5 -left-4 sm:-top-6 sm:-left-6 bg-white rounded-2xl shadow-lg px-3 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2 z-10"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#2DD9A4">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
                  4.9 / 5.0
                </p>
                <p className="text-xs text-gray-400" style={{ fontFamily: "var(--font-opensans)" }}>
                  Rating Klien
                </p>
              </div>
            </motion.div>

            {/* Projects badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.4 }}
              className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-[#3D3E4A] text-white rounded-2xl shadow-lg px-3 py-2.5 sm:px-4 sm:py-3 z-10"
            >
              <p className="text-base sm:text-lg font-bold" style={{ fontFamily: "var(--font-rubik)" }}>
                20+
              </p>
              <p className="text-xs text-white/60" style={{ fontFamily: "var(--font-opensans)" }}>
                Proyek Selesai
              </p>
            </motion.div>

            {/* Main active projects card */}
            <div className="w-72 sm:w-80 bg-white rounded-3xl shadow-2xl p-5 sm:p-6 animate-float">
              <div className="flex items-center justify-between mb-4">
                <span className="section-tag">Proyek Aktif</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#2DD9A4] animate-pulse" />
              </div>

              <div className="space-y-3">
                {activeProjects.map((proj) => (
                  <div key={proj.name} className="bg-[#F8F9FB] rounded-2xl p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-sm text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
                          {proj.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "var(--font-opensans)" }}>
                          {proj.type}
                        </p>
                      </div>
                      <span className="text-xs font-bold" style={{ color: proj.color, fontFamily: "var(--font-rubik)" }}>
                        {proj.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{ width: `${proj.progress}%`, background: proj.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
