"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CreditCard, CalendarCheck, Globe, Wallet, ArrowRight } from "lucide-react";

const HIGHLIGHTS = [
  { icon: CreditCard, label: "Sistem Kasir (POS)" },
  { icon: CalendarCheck, label: "Booking & Reservasi" },
  { icon: Globe, label: "Website & Toko Online" },
  { icon: Wallet, label: "Dashboard Keuangan" },
];

export default function UMKMPromo() {
  return (
    <section className="py-20 sm:py-24 bg-[#F8F9FB] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <span className="section-tag mb-3 inline-block">Solusi UMKM</span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#101828] mb-4 leading-snug"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Punya Bisnis Kecil-Menengah?{" "}
              <span className="gradient-text">Kami Punya Solusi Khusus</span>
            </h2>
            <p
              className="text-gray-600 text-base leading-relaxed mb-6 max-w-xl"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Baru sekitar 33,6% UMKM Indonesia yang benar-benar go-digital. Kami membantu sisanya naik kelas lewat sistem kasir, booking, toko online, hingga dashboard keuangan yang harganya menyesuaikan skala bisnis Anda — bukan tarif enterprise.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/umkm"
                className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold"
              >
                Lihat Solusi Lengkap untuk UMKM
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/62882015884006?text=Halo+Lumi+Beta+Works,+saya+pemilik+UMKM+dan+ingin+konsultasi+kebutuhan+sistem/website."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold border-2 border-gray-300 text-[#3D3E4A] hover:bg-white transition-all"
              >
                Konsultasi via WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-6 grid grid-cols-2 gap-4"
          >
            {HIGHLIGHTS.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.label}
                  className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col items-start gap-3 hover:shadow-lg hover:border-emerald-200/70 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-emerald-50 text-[#0E8B62]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className="text-sm font-bold text-[#101828] leading-snug"
                    style={{ fontFamily: "var(--font-rubik)" }}
                  >
                    {h.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
