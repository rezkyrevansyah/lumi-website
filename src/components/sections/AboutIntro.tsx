"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutIntro() {
  return (
    <section className="py-16 md:py-24 bg-[#F8F9FB] relative overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Logo Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-100 flex flex-col items-center text-center">
              <div className="relative w-full h-36 sm:h-44 mb-4">
                <Image
                  src="/logo1.png"
                  alt="Lumi Beta Works | Vendor IT & Jasa Buat Website Perusahaan"
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#0E8B62] text-xs font-semibold border border-emerald-200/60">
                <span className="w-2 h-2 rounded-full bg-[#2DD9A4]" />
                Vendor IT Perusahaan &amp; Instansi
              </div>
            </div>
          </motion.div>

          {/* Right Column: Concise B2B Messaging & Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col gap-5"
          >
            <div>
              <span className="section-tag mb-2.5 inline-block">Tentang Kami</span>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101828] leading-snug"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Mitra Vendor IT &amp; <span className="gradient-text">Website Perusahaan</span>
              </h2>
            </div>

            <p
              className="text-gray-600 text-sm sm:text-base leading-relaxed"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Lumi Beta Works adalah Software House &amp; Vendor IT terpercaya di Indonesia. Kami fokus mendampingi perusahaan, instansi pemerintah, dan bisnis berkembang dalam membangun sistem digital, website corporate, serta aplikasi mobile custom yang aman, responsif, dan tepat waktu.
            </p>

            {/* 3 Pillars */}
            <div className="grid sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                <div className="font-bold text-[#101828] text-xs mb-1 text-emerald-600">
                  ✓ Website Corporate
                </div>
                <p className="text-gray-500 text-[11px] leading-normal">
                  Jasa buat website perusahaan &amp; instansi berkinerja tinggi.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                <div className="font-bold text-[#101828] text-xs mb-1 text-emerald-600">
                  ✓ Aplikasi Custom
                </div>
                <p className="text-gray-500 text-[11px] leading-normal">
                  Pengembangan app Android/iOS enterprise terintegrasi.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                <div className="font-bold text-[#101828] text-xs mb-1 text-emerald-600">
                  ✓ QA &amp; Garansi SLA
                </div>
                <p className="text-gray-500 text-[11px] leading-normal">
                  Sistem teruji bebas bug dengan jaminan komitmen waktu.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="https://wa.me/62882015884006?text=Halo+Lumi+Beta+Works,+kami+ingin+konsultasi+kebutuhan+Vendor+IT+/+Jasa+Buat+Website+Perusahaan."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold shadow-md shadow-emerald-500/15"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Konsultasi Vendor IT (WhatsApp)
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
