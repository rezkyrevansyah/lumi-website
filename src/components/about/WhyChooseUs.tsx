"use client";

import { motion } from "framer-motion";

const PILLARS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
        <path d="M9.5 3.5C6 5 3.5 8.2 3.5 12" strokeLinecap="round" />
      </svg>
    ),
    title: "Inovatif & Kreatif",
    desc: "Pemikiran kreatif dan analitis tanpa batas untuk memecahkan masalah bisnismu dengan solusi yang elegan.",
    color: "#2DD9A4",
    bg: "rgba(45,217,164,0.1)",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Tim Berdedikasi",
    desc: "Pengembang berpengalaman yang sepenuh hati membangun solusi bisnismu — setiap sprint, setiap rilis.",
    color: "#6C63FF",
    bg: "rgba(108,99,255,0.1)",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="6" />
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
      </svg>
    ),
    title: "Teruji & Terpercaya",
    desc: "Telah berhasil merilis produk digital di berbagai industri — dari instansi pemerintah hingga startup.",
    color: "#3BB5C5",
    bg: "rgba(59,181,197,0.1)",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.35h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "Fokus pada Kamu",
    desc: "Bisnismu adalah prioritas kami. Komunikasi jujur dan hubungan jangka panjang adalah kunci kami.",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-tag mb-3">Keunggulan Kami</p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3D3E4A] mb-4"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Kenapa Klien{" "}
            <span className="gradient-text">Memilih Kami?</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-opensans)" }}>
            Tujuan kami sederhana:{" "}
            <strong className="text-[#3D3E4A]">memberdayakan bisnis kamu dengan solusi digital terbaik!</strong>
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#F8F9FB] rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon circle */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: p.bg, color: p.color }}
              >
                {p.icon}
              </div>
              <h3
                className="font-bold text-[#3D3E4A] text-lg mb-3"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
