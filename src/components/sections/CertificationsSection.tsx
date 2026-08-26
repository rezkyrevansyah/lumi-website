"use client";

import { motion } from "motion/react";
import Image from "next/image";

const FALLBACK_CERTS = [
  { id: 0, imageUrl: "/certificate/1.png", altText: "Dicoding Sertifikasi", isDark: false },
  { id: 1, imageUrl: "/certificate/2.png", altText: "Bangkit Academy Sertifikasi", isDark: false },
  { id: 2, imageUrl: "/certificate/3.png", altText: "Laskar AI Sertifikasi", isDark: true },
  { id: 3, imageUrl: "/certificate/4.png", altText: "Google Sertifikasi", isDark: false },
];

interface DBCertification {
  id: number;
  imageUrl: string;
  altText: string;
  isDark: boolean | null;
  sortOrder: number | null;
}

interface CertificationsSectionProps {
  certifications?: DBCertification[];
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  const certs =
    certifications && certifications.length > 0 ? certifications : FALLBACK_CERTS;

  return (
    <section className="py-20 md:py-28 bg-white border-y border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {certs.map((cert, i) => (
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
                  src={cert.imageUrl}
                  alt={cert.altText}
                  fill
                  sizes="(min-width: 768px) 240px, 45vw"
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
