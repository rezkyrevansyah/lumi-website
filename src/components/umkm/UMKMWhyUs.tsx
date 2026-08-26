"use client";

import { motion } from "motion/react";
import { Wallet, HeartHandshake, Puzzle, ShieldCheck } from "lucide-react";

const REASONS = [
  {
    icon: Wallet,
    title: "Harga Menyesuaikan Skala Bisnis",
    desc: "Paket dan skema kerja kami dirancang untuk kemampuan UMKM, bukan disamakan dengan tarif proyek enterprise.",
    color: "#2DD9A4",
    bg: "rgba(45,217,164,0.1)",
  },
  {
    icon: HeartHandshake,
    title: "Lahir dari Freelancer, Mengerti UMKM",
    desc: "Kami tahu rasanya bisnis kecil yang ingin naik kelas, karena Lumi sendiri mulai dari sana.",
    color: "#6C63FF",
    bg: "rgba(108,99,255,0.1)",
  },
  {
    icon: Puzzle,
    title: "Sistem Custom, Bukan Template Kaku",
    desc: "Dibangun mengikuti alur bisnis Anda yang sebenarnya, bukan dipaksa masuk ke SaaS generik.",
    color: "#3BB5C5",
    bg: "rgba(59,181,197,0.1)",
  },
  {
    icon: ShieldCheck,
    title: "Pendampingan Pasca Rilis",
    desc: "Tidak lepas tangan setelah serah terima — ada garansi perbaikan dan panduan pakai untuk tim Anda.",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
  },
];

export default function UMKMWhyUs() {
  return (
    <section className="py-20 sm:py-24 bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <span className="section-tag mb-3 inline-block">Alasan Bekerja Sama</span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#101828]"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Kenapa UMKM Lebih Baik{" "}
            <span className="gradient-text">Bersama Kami</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: r.bg, color: r.color }}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3
                  className="font-bold text-[#101828] text-base mb-2.5"
                  style={{ fontFamily: "var(--font-rubik)" }}
                >
                  {r.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "var(--font-opensans)" }}>
                  {r.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
