"use client";

import { motion } from "framer-motion";

const PRINCIPLES = [
  {
    icon: "💬",
    title: "Komunikasi Manusiawi & Responsif",
    desc: "Kami menjelaskan konsep teknikal dengan bahasa yang sederhana. Anda selalu tahu perkembangan proyek tanpa harus mengejar-ngejar update.",
    color: "#2DD9A4",
  },
  {
    icon: "🎯",
    title: "Product Thinking, Bukan Sekadar Coding",
    desc: "Kami memahami tujuan bisnis Anda. Fitur yang dibangun difokuskan pada apa yang benar-benar memberi nilai dan mempermudah operasional.",
    color: "#6C63FF",
  },
  {
    icon: "🛡️",
    title: "Pengujian Kualitas Ketat (QA Standard)",
    desc: "Dengan latar belakang QA enterprise, kami menguji setiap fungsi, performa, dan responsivitas layar agar website Anda bebas dari bug saat rilis.",
    color: "#3BB5C5",
  },
  {
    icon: "🤝",
    title: "Garansi & Tanggung Jawab Nyata",
    desc: "Hubungan kerja sama tidak berhenti saat serah terima. Kami memberikan garansi perbaikan dan pendampingan teknikal agar Anda selalu tenang.",
    color: "#F59E0B",
  },
];

interface PrincipleItem {
  icon: string;
  title: string;
  description?: string | null;
  desc?: string | null;
  accentColor?: string | null;
  color?: string | null;
}

interface WorkPrinciplesProps {
  principles?: PrincipleItem[];
}

export default function WorkPrinciples({ principles }: WorkPrinciplesProps) {
  const displayPrinciples =
    principles && principles.length > 0
      ? principles.map((p) => ({
          icon: p.icon,
          title: p.title,
          desc: p.description || p.desc || "",
          color: p.accentColor || p.color || "#2DD9A4",
        }))
      : PRINCIPLES;
  return (
    <section className="py-20 md:py-28 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="section-tag mb-3 inline-block">Nilai &amp; Standar Kerja</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#101828] mb-4"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Kenapa Klien Merasa <span className="gradient-text">Nyaman Bersama Kami</span>
          </h2>
          <p
            className="text-gray-600 text-base md:text-lg"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            4 komitmen utama yang selalu kami pegang teguh di setiap proyek yang kami tangani.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPrinciples.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-gray-100 bg-[#F8F9FB] hover:bg-white hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  {p.icon}
                </div>
                <h3
                  className="font-bold text-[#101828] text-base mb-2 leading-snug"
                  style={{ fontFamily: "var(--font-rubik)" }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-gray-500 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-opensans)" }}
                >
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100/80 flex items-center gap-1.5 text-xs font-semibold text-[#0E8B62]">
                <span>✓ Standar Lumi</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
