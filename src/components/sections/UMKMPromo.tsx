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
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
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
              Baru sekitar 33,6% UMKM Indonesia yang benar-benar go-digital. Kami membantu pelaku usaha naik kelas melalui sistem kasir, booking, toko online, hingga dashboard keuangan dengan investasi fleksibel sesuai kapasitas bisnis Anda tanpa beban biaya enterprise.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/umkm"
                className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold shadow-md shadow-emerald-500/15 transition-transform duration-150 active:scale-[0.96]"
              >
                Lihat Solusi Lengkap untuk UMKM
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/62882015884006?text=Halo+Lumi+Beta+Works,+saya+pemilik+UMKM+dan+ingin+konsultasi+kebutuhan+sistem/website."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold border-2 border-gray-300 text-[#3D3E4A] hover:bg-gray-50 hover:border-gray-400 transition-all duration-150 active:scale-[0.96]"
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
                  className="bg-[#F8F9FB] rounded-2xl p-5 border border-gray-200/70 flex flex-col items-start gap-3 shadow-2xs hover:shadow-md hover:border-emerald-300/80 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-emerald-500/10 text-[#0E8B62]">
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
