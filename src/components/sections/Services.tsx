"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Service } from "@/lib/data";

function ServiceIcon({ iconType, iconPath, size = 30 }: { iconType: string; iconPath: string; size?: number }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 as number };
  if (iconType === "polylines") {
    return (
      <svg {...props}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }
  if (iconType === "circle-clock") {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d={iconPath} />
    </svg>
  );
}

const SPRING = { type: "spring", stiffness: 300, damping: 36, mass: 1 } as const;

export default function Services({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);

  return (
    <section id="service" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-tag mb-3">Layanan Kami</p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3D3E4A] mb-5"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Solusi Digital untuk
            <span className="gradient-text"> Semua Skala Bisnis</span>
          </h2>
          <p
            className="text-gray-500 text-base md:text-lg max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            UMKM, startup, atau enterprise — kami punya layanan yang sesuai
            dengan kebutuhanmu dan anggaran yang kamu miliki.
          </p>
        </motion.div>

        {/* Mobile: stacked cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {services.map((service, i) => {
            const isActive = active === i;
            return (
              <div
                key={service.title}
                onClick={() => setActive(i)}
                className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-300
                  ${isActive
                    ? "bg-white border-2 border-[#6C63FF] shadow-lg shadow-indigo-100/60"
                    : "bg-[#F0EFFF] border-2 border-transparent"
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(108,99,255,0.12)", color: "#6C63FF" }}
                  >
                    <ServiceIcon iconType={service.iconType} iconPath={service.iconPath} size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#3D3E4A] text-base" style={{ fontFamily: "var(--font-rubik)" }}>
                      {service.title}
                    </h3>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-500 text-sm leading-relaxed mt-2 mb-3" style={{ fontFamily: "var(--font-opensans)" }}>
                            {service.desc}
                          </p>
                          <a
                            href="#contact"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6C63FF]"
                            style={{ fontFamily: "var(--font-opensans)" }}
                          >
                            Pelajari Lebih Lanjut
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: horizontal accordion */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="hidden md:flex gap-3 h-[280px]"
        >
          {services.map((service, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={service.title}
                layout
                onClick={() => setActive(i)}
                animate={{ flex: isActive ? 3.2 : 1 }}
                transition={SPRING}
                className={`relative rounded-2xl p-6 cursor-pointer overflow-hidden flex flex-col
                  ${isActive
                    ? "bg-white border-2 border-[#6C63FF] shadow-xl shadow-indigo-100/60"
                    : "bg-[#F0EFFF] border-2 border-transparent hover:border-[#6C63FF]/20"
                  }`}
                style={{ minWidth: 0 }}
              >
                {/* Decorative: vertical line + dot */}
                <div className="absolute top-3 right-5 flex flex-col items-center gap-0">
                  <div className="w-px h-8" style={{ background: isActive ? "#6C63FF" : "#f97316" }} />
                  <div className="w-3 h-3 rounded-full mt-0.5" style={{ background: isActive ? "#6C63FF" : "#f97316" }} />
                </div>

                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 flex-shrink-0"
                  style={{ background: "rgba(108,99,255,0.12)", color: "#6C63FF" }}
                >
                  <ServiceIcon iconType={service.iconType} iconPath={service.iconPath} size={30} />
                </div>

                {/* Title */}
                <h3
                  className="font-bold text-[#3D3E4A] leading-snug flex-shrink-0 text-xl"
                  style={{ fontFamily: "var(--font-rubik)" }}
                >
                  {service.title}
                </h3>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className="mt-3 flex flex-col gap-4 flex-1"
                    >
                      <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "var(--font-opensans)" }}>
                        {service.desc}
                      </p>
                      <a
                        href="#contact"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#6C63FF] group w-fit"
                        style={{ fontFamily: "var(--font-opensans)" }}
                      >
                        Pelajari Lebih Lanjut
                        <svg
                          width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.2"
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
