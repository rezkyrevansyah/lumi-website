"use client";

import { motion } from "motion/react";

const STATS = [
  { value: "61%", label: "Kontribusi UMKM terhadap PDB Nasional" },
  { value: "65Jt+", label: "Unit Usaha UMKM di Seluruh Indonesia" },
  { value: "33,6%", label: "UMKM yang Sudah Benar-Benar Go-Digital" },
  { value: "30Jt+", label: "Pelaku UMKM Sudah Bertransaksi via QRIS" },
];

export default function UMKMStats() {
  return (
    <section className="py-16 sm:py-20 bg-[#101828]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <p className="section-tag mb-3">Kenapa Sekarang</p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Baru Sepertiga UMKM yang Benar-Benar Go-Digital
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3" style={{ fontFamily: "var(--font-opensans)" }}>
            Artinya, UMKM yang bertransformasi lebih awal punya keunggulan yang jauh lebih besar dari kompetitornya.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <p
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2DD9A4] mb-2"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {stat.value}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm leading-snug" style={{ fontFamily: "var(--font-opensans)" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-[11px] mt-10" style={{ fontFamily: "var(--font-opensans)" }}>
          Sumber: Kementerian Koordinator Bidang Perekonomian RI, riset Google-Temasek-Bain (data agregat 2025-2026).
        </p>
      </div>
    </section>
  );
}
