"use client";

import { motion } from "motion/react";
import {
  CreditCard,
  Boxes,
  Wallet,
  Globe,
  CalendarCheck,
  Users,
  LayoutDashboard,
  Puzzle,
} from "lucide-react";

const USE_CASES = [
  {
    icon: CreditCard,
    title: "Sistem Kasir (POS) & QRIS",
    desc: "Kasir ringan berbasis web, catat transaksi, cetak struk, dukung QRIS & pembagian shift kasir.",
    tags: ["F&B / Cafe", "Toko Retail", "Minimarket"],
    highlight: true,
  },
  {
    icon: Boxes,
    title: "Manajemen Inventaris & Stok",
    desc: "Pantau stok real-time di satu atau banyak cabang, barcode, bahan baku, hingga stock opname.",
    tags: ["Multi-Cabang", "Barcode", "Stock Opname"],
    highlight: true,
  },
  {
    icon: Wallet,
    title: "Dashboard Keuangan Bisnis",
    desc: "Cashflow, laba-rugi, hutang-piutang, dan omzet tersaji jelas untuk keputusan yang lebih cepat.",
    tags: ["Cashflow", "Laba-Rugi", "Hutang/Piutang"],
    highlight: true,
  },
  {
    icon: Globe,
    title: "Website & Toko Online",
    desc: "Katalog produk, checkout mandiri, dan custom domain agar pelanggan bisa order tanpa antre chat.",
    tags: ["Katalog", "Checkout", "Custom Domain"],
  },
  {
    icon: CalendarCheck,
    title: "Booking & Reservasi",
    desc: "Jadwal otomatis 24/7 untuk klinik, salon, barbershop, atau rental — bebas dari jadwal bentrok.",
    tags: ["Klinik", "Salon & Spa", "Barbershop"],
  },
  {
    icon: Users,
    title: "CRM & Loyalitas Pelanggan",
    desc: "Kelola data pelanggan, program membership, dan otomatisasi pesan follow-up yang lebih personal.",
    tags: ["Membership", "Database Pelanggan", "Loyalty"],
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard Bisnis & Tim",
    desc: "Omzet, produk terlaris, absensi, dan shift karyawan terpantau dalam satu panel yang rapi.",
    tags: ["Omzet", "Absensi", "Shift Karyawan"],
  },
  {
    icon: Puzzle,
    title: "Sistem Custom & Integrasi Marketplace",
    desc: "Alur bisnis Anda unik? Kami rancang sistem custom, termasuk sinkronisasi stok & order marketplace.",
    tags: ["Custom Workflow", "Marketplace Sync"],
  },
];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  CreditCard,
  Boxes,
  Wallet,
  Globe,
  CalendarCheck,
  Users,
  LayoutDashboard,
  Puzzle,
};

interface DBUmkmUseCase {
  iconName?: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  desc?: string;
  tags?: string[] | null;
  isHighlighted?: boolean | null;
  highlight?: boolean;
}

interface UMKMUseCasesProps {
  useCases?: DBUmkmUseCase[];
}

export default function UMKMUseCases({ useCases }: UMKMUseCasesProps) {
  const displayUseCases =
    useCases && useCases.length > 0
      ? useCases.map((uc) => ({
          icon: (uc.iconName && ICON_MAP[uc.iconName]) || uc.icon || LayoutDashboard,
          title: uc.title,
          desc: uc.description || uc.desc || "",
          tags: uc.tags || [],
          highlight: uc.isHighlighted ?? uc.highlight ?? false,
        }))
      : USE_CASES;

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <span className="section-tag mb-3 inline-block">Sistem yang Kami Bangun</span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#101828] mb-4"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Apa yang Bisa Kami Bangun <span className="text-[#2DD9A4]">Untuk Anda?</span>
          </h2>
          <p className="text-gray-600 text-base" style={{ fontFamily: "var(--font-opensans)" }}>
            Dirangkum dari kebutuhan sistem yang paling banyak diminta bisnis skala kecil-menengah saat ini.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayUseCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
                className="relative bg-[#F8F9FB] rounded-2xl p-6 border border-gray-100 flex flex-col justify-between hover:shadow-lg hover:border-emerald-200/70 transition-all duration-300"
              >
                {uc.highlight && (
                  <span className="absolute -top-2.5 right-5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#2DD9A4] text-white shadow-sm">
                    Paling Dibutuhkan
                  </span>
                )}
                <div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-emerald-50 text-[#0E8B62]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3
                    className="text-lg font-bold text-[#101828] mb-2.5"
                    style={{ fontFamily: "var(--font-rubik)" }}
                  >
                    {uc.title}
                  </h3>
                  <p
                    className="text-gray-600 text-sm leading-relaxed mb-5"
                    style={{ fontFamily: "var(--font-opensans)" }}
                  >
                    {uc.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200/60">
                  {uc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
