"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  Code2,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { type PortfolioItem } from "@/lib/data";
import { PortfolioCard } from "./PortfolioCard";

type Platform = "all" | "web" | "android" | "ios";
type ServiceCategory = "all" | "web" | "mobile" | "qa" | "ai";

const SERVICE_TABS: { value: ServiceCategory; label: string }[] = [
  { value: "all", label: "Semua Solusi" },
  { value: "web", label: "Website & Portal" },
  { value: "mobile", label: "Aplikasi Mobile" },
  { value: "qa", label: "QA & Reliability" },
  { value: "ai", label: "AI & Innovation" },
];

const PLATFORM_TABS: { value: Platform; label: string }[] = [
  { value: "all", label: "Semua Platform" },
  { value: "web", label: "Web" },
  { value: "android", label: "Android" },
  { value: "ios", label: "iOS" },
];

const PER_PAGE = 6;

const TRUST_METRICS = [
  {
    icon: ShieldCheck,
    title: "Vendor IT Terverifikasi",
    desc: "Melayani BAZNAS, Kemenparekraf, Erafone, & TBIG",
  },
  {
    icon: Zap,
    title: "Performa Tinggi & SEO",
    desc: "Speed index < 1s & Lighthouse score 95+",
  },
  {
    icon: Code2,
    title: "Full-Cycle QA Testing",
    desc: "Pengujian fungsional & stabilitas sebelum rilis",
  },
  {
    icon: Clock,
    title: "100% On-Time Delivery",
    desc: "Milestone terstruktur & progres transparan",
  },
];

const ENGINEERING_PILLARS = [
  {
    title: "Clean & Scalable Architecture",
    desc: "Kode tersusun modular, terdokumentasi rapi, dan mudah dikembangkan untuk jangka panjang tanpa technical debt yang menumpuk.",
  },
  {
    title: "Enterprise Security Standard",
    desc: "Proteksi data berlapis, sanitasi input, enkripsi sesi token, dan audit kerentanan sebelum sistem dirilis ke publik.",
  },
  {
    title: "Comprehensive QA Testing",
    desc: "Pengujian fungsional manual dan otomatis (E2E, API, load test) untuk menjamin zero-critical-bug pada hari peluncuran.",
  },
  {
    title: "Direct Access to Tech Lead",
    desc: "Komunikasi langsung dengan arsitek dan developer utama tanpa perantara birokrasi, memastikan revisi dan eksekusi berjalan cepat.",
  },
];

export default function PortfolioPage({
  projects,
}: {
  projects: (PortfolioItem & { imageUrl?: string; demoUrl?: string })[];
}) {
  const [serviceType, setServiceType] = useState<ServiceCategory>("all");
  const [platform, setPlatform] = useState<Platform>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      // Platform filter
      const matchPlatform = platform === "all" || p.platforms.includes(platform);

      // Service category filter
      let matchService = true;
      if (serviceType === "web") {
        matchService =
          p.category.toLowerCase().includes("web") ||
          p.category.toLowerCase().includes("portal") ||
          p.platforms.includes("web");
      } else if (serviceType === "mobile") {
        matchService =
          p.category.toLowerCase().includes("mobile") ||
          p.platforms.includes("android") ||
          p.platforms.includes("ios");
      } else if (serviceType === "qa") {
        matchService =
          p.category.toLowerCase().includes("qa") ||
          p.category.toLowerCase().includes("testing") ||
          p.tags.some((t) => t.toLowerCase().includes("qa"));
      } else if (serviceType === "ai") {
        matchService =
          p.category.toLowerCase().includes("ai") ||
          p.tags.some((t) => t.toLowerCase().includes("ai") || t.toLowerCase().includes("ml") || t.toLowerCase().includes("python"));
      }

      // Search query filter
      let matchSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchSearch =
          p.title.toLowerCase().includes(q) ||
          p.client.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q));
      }

      return matchPlatform && matchService && matchSearch;
    });
  }, [projects, platform, serviceType, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const hasActiveFilters = platform !== "all" || serviceType !== "all" || searchQuery.trim() !== "";

  function handleReset() {
    setPlatform("all");
    setServiceType("all");
    setSearchQuery("");
    setPage(1);
  }

  return (
    <div className="pt-28 pb-20 bg-[#F8F9FB] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-[#2DD9A4] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#101828] font-medium" aria-current="page">
              Portofolio Proyek &amp; Studi Kasus
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="mb-14 text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#0E8B62] text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#2DD9A4]" />
              Portofolio &amp; Pengembangan Perangkat Lunak
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#101828] tracking-tight max-w-4xl leading-tight"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Membangun Solusi Digital Kritis untuk{" "}
              <span className="gradient-text">Instansi, Korporat, &amp; Bisnis Berkembang</span>
            </h1>
            <p
              className="text-gray-600 text-base sm:text-lg max-w-3xl mt-4 leading-relaxed"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Jelajahi rekam jejak pembuatan website corporate berkinerja tinggi, aplikasi mobile skala nasional,
              dan pengujian software QA testing enterprise berstandar industri tinggi.
            </p>
          </motion.div>

          {/* Trust Metric Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200/80"
          >
            {TRUST_METRICS.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.title}
                  className="p-4 rounded-2xl bg-white border border-gray-100/90 shadow-xs flex items-start gap-3.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-[#0E8B62]">
                    <Icon className="w-4 h-4 text-[#2DD9A4]" />
                  </div>
                  <div>
                    <h2
                      className="text-xs font-bold text-[#101828]"
                      style={{ fontFamily: "var(--font-rubik)" }}
                    >
                      {metric.title}
                    </h2>
                    <p
                      className="text-[11px] text-gray-500 mt-0.5"
                      style={{ fontFamily: "var(--font-opensans)" }}
                    >
                      {metric.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </header>

        {/* All Projects Archive Header & Controls */}
        <section id="semua-proyek" className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#24B285] mb-1.5" style={{ fontFamily: "var(--font-rubik)" }}>
                Koleksi Lengkap
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#101828] tracking-tight"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Eksplorasi <span className="gradient-text">Seluruh Portofolio</span>
              </h2>
            </div>

            {/* Live Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Cari proyek, klien, teknologi..."
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#2DD9A4] focus:ring-2 focus:ring-emerald-500/10 shadow-xs transition-all"
                style={{ fontFamily: "var(--font-opensans)" }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Hapus pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-3 rounded-2xl bg-white border border-gray-100 shadow-xs">
            {/* Service Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {SERVICE_TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setServiceType(tab.value);
                    setPage(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    serviceType === tab.value
                      ? "bg-[#2DD9A4] text-[#053324] shadow-xs"
                      : "text-gray-600 hover:text-[#101828] hover:bg-gray-50"
                  }`}
                  style={{ fontFamily: "var(--font-rubik)" }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Platform & Reset Controls */}
            <div className="flex items-center gap-2 ml-auto">
              <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 border border-gray-100">
                {PLATFORM_TABS.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => {
                      setPlatform(tab.value);
                      setPage(1);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      platform === tab.value
                        ? "bg-white text-[#101828] shadow-xs font-semibold"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-500 hover:text-red-600 border border-gray-200 bg-white hover:border-red-200 transition-colors"
                >
                  Reset
                </button>
              )}

              <span className="text-xs text-gray-400 pl-2 font-medium">
                {filtered.length} Proyek
              </span>
            </div>
          </div>

          {/* Project Grid */}
          <AnimatePresence mode="wait">
            {paginated.length > 0 ? (
              <motion.div
                key={`${serviceType}-${platform}-${searchQuery}-${page}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
              >
                {paginated.map((proj, i) => (
                  <PortfolioCard key={proj.title} proj={proj} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-gray-800 mb-1" style={{ fontFamily: "var(--font-rubik)" }}>
                  Tidak ada proyek yang sesuai
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto" style={{ fontFamily: "var(--font-opensans)" }}>
                  Coba gunakan kata kunci lain atau hapus filter aktif untuk melihat seluruh portofolio.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-[#2DD9A4] text-[#053324] hover:opacity-90 transition-opacity"
                >
                  Tampilkan Semua Proyek
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Halaman sebelumnya"
                className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-[#2DD9A4] hover:text-[#0E8B62] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    p === page
                      ? "bg-[#2DD9A4] text-[#053324] shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-[#2DD9A4] hover:text-[#0E8B62]"
                  }`}
                  style={{ fontFamily: "var(--font-rubik)" }}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Halaman selanjutnya"
                className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-[#2DD9A4] hover:text-[#0E8B62] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>

        {/* Engineering Standards Section (Why Clients Trust Lumi) */}
        <section className="mb-20 p-8 sm:p-12 rounded-3xl bg-white border border-gray-100 shadow-sm">
          <div className="max-w-3xl mb-10">
            <span className="section-tag mb-3">Standar Kualitas Rekayasa</span>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#101828] tracking-tight"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Bagaimana Kami Menjamin <span className="gradient-text">Keberhasilan Proyek Anda</span>
            </h2>
            <p className="text-sm text-gray-500 mt-2" style={{ fontFamily: "var(--font-opensans)" }}>
              Setiap baris kode dan arsitektur yang kami rancang mengikuti standar industri software engineering yang ketat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ENGINEERING_PILLARS.map((pillar, idx) => (
              <div key={pillar.title} className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#24B285] mb-2 block" style={{ fontFamily: "var(--font-rubik)" }}>
                    0{idx + 1}.
                  </span>
                  <h3 className="text-sm font-bold text-[#101828] mb-2" style={{ fontFamily: "var(--font-rubik)" }}>
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "var(--font-opensans)" }}>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* High-Conversion Bottom CTA Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-[#0F172A] text-white p-8 sm:p-12 lg:p-16 shadow-xl">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#2DD9A4]/15 filter blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#6C63FF]/20 filter blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
              <MessageCircle className="w-3.5 h-3.5 text-[#2DD9A4]" />
              Konsultasi &amp; Estimasi Proyek
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-snug"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Punya Kebutuhan Sistem atau Website Serupa untuk Organisasi Anda?
            </h2>
            <p
              className="text-gray-300 text-sm sm:text-base mt-4 leading-relaxed"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Diskusikan arsitektur teknis, pemilihan tech stack, dan timeline pengerjaan langsung bersama Lead Developer kami. Kami berikan estimasi transparan dan konsultasi 100% gratis tanpa komitmen.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href="https://wa.me/62882015884006?text=Halo%20Lumi%20Beta%20Works,%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20proyek%20sistem/website%20serupa%20dengan%20portofolio%20Anda."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#2DD9A4] to-[#24B285] text-[#053324] hover:opacity-95 transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi Proyek via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/layanan"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                <span>Pelajari Paket Layanan Kami</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-white/10 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2DD9A4]" />
                <span>Estimasi Budget &amp; Timeline dalam 24 Jam</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2DD9A4]" />
                <span>Non-Disclosure Agreement (NDA) Aman</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2DD9A4]" />
                <span>Dukungan Pemeliharaan Pasca-Rilis</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
