"use client";

import { motion } from "framer-motion";

const FASTWORK_URL = "https://fastwork.id/user/revansyah?source=web_chat_user-profile-modal";

const MILESTONES = [
  {
    step: "01",
    title: "Awal Perjalanan di Fastwork",
    desc: "Berangkat dari seorang personal freelancer yang menangani puluhan pesanan website & QA dengan rating sempurna 5.0 dan ulasan kepuasan tinggi.",
    badge: "The Foundation",
    color: "#2DD9A4",
  },
  {
    step: "02",
    title: "Lahirnya Lumi Beta Works",
    desc: "Melihat kebutuhan klien akan partner digital yang solutif tanpa birokrasi kaku, kami melangkah maju membangun studio teknologi mandiri dengan nama sendiri.",
    badge: "The Transformation",
    color: "#6C63FF",
  },
  {
    step: "03",
    title: "Mimpi Besar & Partner Ternyaman",
    desc: "Visi kami sederhana namun berani: Menjadi partner teknologi paling terpercaya dan paling nyaman untuk setiap bisnis, instansi, dan enterprise di Indonesia.",
    badge: "The Big Dream",
    color: "#3BB5C5",
  },
];

export default function OurStory() {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative Copywriting */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="section-tag">Kisah &amp; Visi Kami</span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#101828] leading-tight"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Berawal dari Reputasi Nyata, Bertumbuh Menjadi{" "}
              <span className="gradient-text">Partner yang Nyaman</span>
            </h2>

            <p
              className="text-gray-600 text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Lumi Beta Works tidak dimulai dari ruang rapat formal yang kaku. Kami berangkat dari rekam jejak nyata di lapangan — dipercaya oleh puluhan klien di platform{" "}
              <a
                href={FASTWORK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#0E8B62] underline hover:text-[#2DD9A4] transition-colors"
              >
                Fastwork Indonesia
              </a>{" "}
              untuk membangun aplikasi, website corporate, hingga pengujian software berstandar tinggi.
            </p>

            <p
              className="text-gray-600 text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Seiring bertambahnya kepercayaan dan proyek bernilai strategis, kami menyadari satu hal penting: <strong className="text-[#101828]">klien tidak hanya butuh orang yang bisa coding</strong>, mereka butuh partner kerja yang komunikatif, jujur dalam estimasi, dan membuat seluruh proses pengerjaan terasa tenang dan menyenangkan.
            </p>

            <div className="pt-2">
              <div className="p-5 rounded-2xl bg-[#F8F9FB] border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 font-bold text-lg">
                  💡
                </div>
                <div>
                  <h3 className="font-bold text-[#101828] text-sm mb-1" style={{ fontFamily: "var(--font-rubik)" }}>
                    Mimpi Besar Kami
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed" style={{ fontFamily: "var(--font-opensans)" }}>
                    Membuktikan bahwa studio teknologi asal Indonesia mampu memberikan kualitas berkelas enterprise dengan kehangatan komunikasi personal yang bikin betah.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Milestone Steps Cards */}
          <div className="lg:col-span-6 space-y-4">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className="p-6 rounded-2xl border border-gray-100 bg-[#F8F9FB] hover:bg-white hover:border-emerald-300 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-md text-white"
                    style={{ backgroundColor: m.color }}
                  >
                    {m.badge}
                  </span>
                  <span className="text-2xl font-extrabold text-gray-200 group-hover:text-gray-400 transition-colors" style={{ fontFamily: "var(--font-rubik)" }}>
                    {m.step}
                  </span>
                </div>
                <h3
                  className="text-lg font-bold text-[#101828] mb-2"
                  style={{ fontFamily: "var(--font-rubik)" }}
                >
                  {m.title}
                </h3>
                <p
                  className="text-sm text-gray-500 leading-relaxed"
                  style={{ fontFamily: "var(--font-opensans)" }}
                >
                  {m.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
