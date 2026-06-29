"use client";

import { motion } from "framer-motion";

const CLIENTS = ["GovDKI", "TechMart", "FinFlow", "EduBright", "RetailX"];

const STEPS = [
  { label: "Discovery", color: "#2DD9A4" },
  { label: "Design", color: "#6C63FF" },
  { label: "Development", color: "#3BB5C5" },
  { label: "Released", color: "#2DD9A4", highlight: true },
];

export default function EngineeringFramework() {
  return (
    <section className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a1040 0%, #0d1a2d 100%)" }}>
      {/* Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #2DD9A4 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — pipeline illustration */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            {STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-4">
                {/* Connector line */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full" style={{ background: step.color }} />
                  {i < STEPS.length - 1 && (
                    <div className="w-px h-10 mt-1" style={{ background: `${step.color}44` }} />
                  )}
                </div>
                <div
                  className={`flex-1 rounded-2xl px-5 py-4 flex items-center gap-3 ${step.highlight ? "shadow-lg" : ""}`}
                  style={{
                    background: step.highlight
                      ? `linear-gradient(135deg, ${step.color}22 0%, ${step.color}11 100%)`
                      : "rgba(255,255,255,0.05)",
                    border: `1px solid ${step.color}33`,
                  }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${step.color}22` }}>
                    {step.highlight ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      <span className="text-xs font-bold" style={{ color: step.color }}>{i + 1}</span>
                    )}
                  </div>
                  <span
                    className={`font-semibold ${step.highlight ? "text-lg" : "text-sm"}`}
                    style={{ color: step.highlight ? step.color : "rgba(255,255,255,0.7)", fontFamily: "var(--font-rubik)" }}
                  >
                    {step.highlight ? "🚀 " : ""}{step.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="section-tag mb-4">Our Approach</p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Modern{" "}
              <span className="gradient-text">Engineering</span>
              {" "}Framework
            </h2>
            <p
              className="text-white/60 text-base leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Designed to optimize the engineering process by integrating
              cutting-edge technologies and best practices, resulting in faster
              development cycles and higher-quality outputs. Highly flexible and
              customizable — ideal and scalable for projects of any size or
              complexity, enabling your software development to adapt to the
              market&apos;s ever-changing demands.
            </p>

            {/* Adopted by */}
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-opensans)" }}>
                Trusted by our clients
              </p>
              <div className="flex flex-wrap gap-2">
                {CLIENTS.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-white/70"
                    style={{ background: "rgba(255,255,255,0.08)", fontFamily: "var(--font-opensans)" }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
