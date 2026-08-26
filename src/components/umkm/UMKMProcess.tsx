"use client";

import { motion } from "motion/react";

const STEPS = [
  {
    step: "01",
    title: "Konsultasi Gratis",
    desc: "Ceritakan kendala operasional bisnis Anda, kami bantu petakan sistem yang paling dibutuhkan lebih dulu.",
  },
  {
    step: "02",
    title: "Rancang Sesuai Anggaran",
    desc: "Kami susun fitur dan skema kerja yang realistis dengan anggaran UMKM, tanpa fitur mubazir.",
  },
  {
    step: "03",
    title: "Development Cepat & Terpantau",
    desc: "Progres transparan dengan update berkala, sehingga Anda tahu persis sistem sudah sejauh mana.",
  },
  {
    step: "04",
    title: "Serah Terima & Pendampingan",
    desc: "Pelatihan pemakaian untuk tim Anda, plus garansi perbaikan bila ada kendala setelah rilis.",
  },
];

export default function UMKMProcess() {
  return (
    <section className="py-20 sm:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <span className="section-tag mb-3 inline-block">Cara Kerja</span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#101828]"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Proses Kerja Bersama Kami
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative bg-[#F8F9FB] rounded-2xl p-6 border border-gray-100"
            >
              <span
                className="text-4xl font-extrabold text-[#2DD9A4]/25 block mb-3"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {s.step}
              </span>
              <h3
                className="font-bold text-[#101828] text-base mb-2"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {s.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "var(--font-opensans)" }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
