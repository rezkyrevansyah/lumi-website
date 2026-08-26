"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, TrendingUp, Calendar, ShoppingBag, Bell, Smartphone, QrCode } from "lucide-react";

export default function UMKMHero({ whatsapp }: { whatsapp: string }) {
  return (
    <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-gray-50/80 via-white to-white border-b border-gray-100">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-gradient-to-tr from-[#2DD9A4]/15 via-[#6C63FF]/10 to-transparent filter blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Headline, Value Prop & Modern Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7"
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#101828] leading-[1.15] mb-6"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Sistem Digital yang Bikin{" "}
              <span className="gradient-text">Bisnis Anda Naik Kelas</span>
            </h1>

            <p
              className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Kami lahir dari semangat yang sama dengan Anda: memulai kecil dan ingin berkembang. Kami bangun sistem kasir, booking online, hingga dashboard keuangan yang benar-benar sesuai alur bisnis Anda, dengan harga yang masuk akal untuk skala UMKM.
            </p>

            {/* Redesigned Button Group */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <a
                href={`https://wa.me/${whatsapp}?text=Halo%20Lumi%20Beta%20Works,%20saya%20pemilik%20UMKM%20dan%20ingin%20konsultasi%20pembuatan%20sistem/website.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-[#0E8B62] hover:bg-[#0b6e4d] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-900/15 hover:shadow-emerald-900/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Konsultasi Kebutuhan Bisnis
                <ArrowRight className="w-4 h-4 text-[#2DD9A4]" />
              </a>

              <a
                href="#studi-kasus"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200/90 hover:border-emerald-300 text-[#101828] font-bold text-sm sm:text-base shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Lihat Studi Kasus
              </a>
            </div>

            {/* Quick Benefits Bullet */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Tanpa Biaya Bulanan Tersembunyi</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Pendampingan Sampai Tim Bisa Pakai</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Kustom Sesuai Alur Bisnis</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Sleek, High-Impact System Showcase Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            {/* Main Application Mockup Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100/90 shadow-xl shadow-gray-200/50 relative overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  <span className="text-xs font-semibold text-gray-400 ml-2">Lumi Smart POS &amp; Booking</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0E8B62] text-[11px] font-bold border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2DD9A4] animate-pulse" />
                  Sistem Aktif
                </div>
              </div>

              {/* Metric Highlights Row */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#F8F9FB] p-3.5 rounded-2xl border border-gray-100">
                  <div className="flex items-center justify-between text-gray-400 mb-1">
                    <span className="text-[11px] font-medium">Penjualan Hari Ini</span>
                    <TrendingUp className="w-3.5 h-3.5 text-[#0E8B62]" />
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-[#101828]" style={{ fontFamily: "var(--font-rubik)" }}>
                    Rp 3.850.000
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold">+18.4% vs kemarin</span>
                </div>

                <div className="bg-[#F8F9FB] p-3.5 rounded-2xl border border-gray-100">
                  <div className="flex items-center justify-between text-gray-400 mb-1">
                    <span className="text-[11px] font-medium">Booking Terjadwal</span>
                    <Calendar className="w-3.5 h-3.5 text-[#6C63FF]" />
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-[#101828]" style={{ fontFamily: "var(--font-rubik)" }}>
                    14 Pelanggan
                  </div>
                  <span className="text-[10px] text-[#6C63FF] font-semibold">100% Terkonfirmasi</span>
                </div>
              </div>

              {/* Interactive Module Cards Inside Mockup */}
              <div className="space-y-2.5">
                {/* Item 1: Live POS Kasir Item */}
                <div className="p-3 rounded-xl bg-gray-50/80 border border-gray-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#101828]">Athro Barbershop VIP Package</div>
                      <div className="text-[11px] text-gray-400">Pembayaran QRIS Sukses • 14:15 WIB</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    Lunas
                  </span>
                </div>

                {/* Item 2: Live Booking Queue */}
                <div className="p-3 rounded-xl bg-gray-50/80 border border-gray-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#101828]">YoonjaeSpace Studio Session</div>
                      <div className="text-[11px] text-gray-400">Jadwal Slot: 16:00 - 18:00 WIB</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    Booked
                  </span>
                </div>
              </div>

              {/* Bottom Quick Feature Badges */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-gray-400" />
                  Mobile &amp; Web Responsive
                </span>
                <span className="flex items-center gap-1.5 text-[#0E8B62] font-semibold">
                  <QrCode className="w-3.5 h-3.5" />
                  Auto Struk WhatsApp
                </span>
              </div>
            </div>

            {/* Floating Live Badge Top Right */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="absolute -top-4 -right-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-emerald-100 shadow-lg shadow-emerald-500/10 flex items-center gap-2.5"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                <Bell className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#101828]">Order Baru Masuk</div>
                <div className="text-[10px] text-emerald-600 font-medium">Robux Indo Store (#1092)</div>
              </div>
            </motion.div>

            {/* Floating Live Badge Bottom Left */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="absolute -bottom-4 -left-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-gray-100 shadow-lg shadow-gray-300/30 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-bold text-[#101828]">Laporan Keuangan Otomatis</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
