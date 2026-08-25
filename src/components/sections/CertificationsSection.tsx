"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const CERTIFICATE_LOGOS = [
  { id: "cert-1", src: "/certificate/1.png", alt: "Dicoding Sertifikasi", isDark: false },
  { id: "cert-2", src: "/certificate/2.png", alt: "Bangkit Academy Sertifikasi", isDark: false },
  { id: "cert-3", src: "/certificate/3.png", alt: "Laskar AI Sertifikasi", isDark: true },
  { id: "cert-4", src: "/certificate/4.png", alt: "Google Sertifikasi", isDark: false },
];

export default function CertificationsSection() {
  return (
    <section className="py-20 md:py-28 bg-white border-y border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="section-tag mb-3 inline-block">Kredensial &amp; Sertifikasi Tim</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#101828] mb-5 leading-tight"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Talent Kita Bersertifikasi <span className="gradient-text">Internasional &amp; Standar Industri</span>
          </h2>
          <p
            className="text-gray-600 text-base md:text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            Kualitas eksekusi proyek Anda ditangani langsung oleh software engineer &amp; QA tester terverifikasi yang mengantongi sertifikasi resmi dari lembaga teknologi ternama dunia.
          </p>
        </motion.div>

        {/* Real Certificate Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {CERTIFICATE_LOGOS.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`group rounded-2xl p-6 border transition-all duration-300 flex items-center justify-center relative aspect-[4/3] ${
                cert.isDark
                  ? "bg-[#101828] border-gray-800 hover:border-[#2DD9A4] hover:shadow-2xl"
                  : "bg-[#F8F9FB] border-gray-100 hover:border-emerald-300 hover:bg-white hover:shadow-xl"
              }`}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300 p-2"
                  unoptimized
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
