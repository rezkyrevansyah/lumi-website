"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const FASTWORK_URL = "https://fastwork.id/user/revansyah?source=web_chat_user-profile-modal";

const DEFAULT_METRICS = [
  { value: "36+", label: "Pesanan Selesai", desc: "100% tepat waktu" },
  { value: "24+", label: "Klien Puas", desc: "Dari UMKM s/d Instansi" },
  { value: "13+", label: "Dipekerjakan Ulang", desc: "Tingkat repeat order tinggi" },
  { value: "5.0", label: "Rating Sempurna", desc: "Ulasan kepuasan 5 bintang" },
];

interface MetricItem {
  value: string;
  label: string;
  description?: string | null;
  desc?: string | null;
}

interface AboutHeroV2Props {
  metrics?: MetricItem[];
}

export default function AboutHeroV2({ metrics }: AboutHeroV2Props) {
  const displayMetrics =
    metrics && metrics.length > 0
      ? metrics.map((m) => ({
          value: m.value,
          label: m.label,
          desc: m.description || m.desc || "",
        }))
      : DEFAULT_METRICS;
  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 bg-[#F8F9FB] border-b border-gray-100 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
        {/* Badge & Fastwork Link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <a
            href={FASTWORK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-[#101828] shadow-sm hover:border-[#2DD9A4] hover:shadow-md transition-all group"
          >
            <span className="w-2 h-2 rounded-full bg-[#2DD9A4] animate-pulse" />
            <span className="text-gray-500">Verified Freelancer di</span>
            <span className="font-bold text-[#0E8B62] group-hover:underline">Fastwork.id</span>
            <span className="text-amber-500 font-bold">★ 5.0</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-400 group-hover:translate-x-0.5 transition-transform">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#101828] leading-[1.18] tracking-tight mb-6"
          style={{ fontFamily: "var(--font-rubik)" }}
        >
          Dari Freelancer Terpercaya di Fastwork Menjadi{" "}
          <span className="gradient-text">Partner Teknologi Pilihan Anda</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          Lumi Beta Works lahir dari dedikasi mendengarkan kebutuhan klien secara personal, mengeksekusi proyek dengan presisi teknikal tinggi, dan membangun relasi kerja yang nyaman tanpa birokrasi kaku.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="https://wa.me/62882015884006?text=Halo+Lumi+Beta+Works,+saya+ingin+tahu+lebih+banyak+tentang+layanan+website+/+aplikasi."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-emerald-500/20 w-full sm:w-auto"
          >
            Konsultasi Kebutuhan Anda
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href={FASTWORK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold bg-white border-gray-200 text-[#3D3E4A] hover:bg-gray-50 w-full sm:w-auto"
          >
            Lihat Portofolio Fastwork
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {displayMetrics.map((m) => (
            <div
              key={m.label}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col justify-center"
            >
              <p
                className="text-3xl sm:text-4xl font-extrabold gradient-text mb-1"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {m.value}
              </p>
              <p
                className="font-bold text-xs sm:text-sm text-[#101828] mb-0.5"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {m.label}
              </p>
              <p
                className="text-[11px] text-gray-400"
                style={{ fontFamily: "var(--font-opensans)" }}
              >
                {m.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
