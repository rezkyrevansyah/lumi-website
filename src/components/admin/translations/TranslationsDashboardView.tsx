"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Layers,
  Search,
  Globe,
  Sparkles,
  LayoutTemplate,
  Compass,
  FileCode2,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import {
  NamespaceCategory,
  NamespaceMeta,
  NAMESPACE_CATEGORIES,
} from "@/lib/content/translation-registry";

interface Item {
  namespace: string;
  count: number;
  meta: NamespaceMeta;
}

export function TranslationsDashboardView({ items }: { items: Item[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const homepageItems = useMemo(
    () => items.filter((it) => it.meta.category === "homepage"),
    [items]
  );
  const pagesItems = useMemo(
    () => items.filter((it) => it.meta.category === "pages"),
    [items]
  );
  const globalItems = useMemo(
    () => items.filter((it) => it.meta.category === "global"),
    [items]
  );
  const systemItems = useMemo(
    () => items.filter((it) => it.meta.category === "system"),
    [items]
  );

  const filteredItems = useMemo(() => {
    let result = items;
    if (selectedCategory !== "all") {
      result = result.filter((it) => it.meta.category === selectedCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (it) =>
          it.namespace.toLowerCase().includes(q) ||
          it.meta.label.toLowerCase().includes(q) ||
          it.meta.desc.toLowerCase().includes(q) ||
          (it.meta.positionLabel && it.meta.positionLabel.toLowerCase().includes(q))
      );
    }
    return result;
  }, [items, selectedCategory, search]);

  const totalKeys = useMemo(
    () => items.reduce((acc, curr) => acc + curr.count, 0),
    [items]
  );

  return (
    <div className="space-y-8">
      {/* Header section with Stats & Context */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
            <Globe className="h-3.5 w-3.5" />
            <span>Manajemen Teks Statis & Salinan Kata (Copywriting)</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Teks Statis & Lokalisasi
          </h1>
          <p className="mt-1 max-w-2xl text-xs text-zinc-600 sm:text-sm leading-relaxed">
            Semua salinan kata disusun berurutan dari atas ke bawah mengikuti posisi visual asli website, lengkap dengan pembeda visual antar halaman dan komponen global.
          </p>
        </div>

        {/* Global Key Stats */}
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-zinc-200/80 bg-white px-4 py-2.5 text-right shadow-xs">
            <span className="block text-[11px] font-medium text-zinc-500">Total Bagian</span>
            <span className="font-mono text-lg font-bold text-zinc-900">{items.length} Bagian</span>
          </div>
          <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 px-4 py-2.5 text-right shadow-xs">
            <span className="block text-[11px] font-semibold text-emerald-800">Total Kunci Teks</span>
            <span className="font-mono text-lg font-bold text-emerald-700">{totalKeys} Kunci</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-white p-2.5 shadow-xs lg:flex-row lg:items-center lg:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
              selectedCategory === "all"
                ? "bg-zinc-900 text-white shadow-xs"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Semua Bagian</span>
            <span
              className={`ml-1 rounded-md px-1.5 py-0.2 font-mono text-[10px] ${
                selectedCategory === "all"
                  ? "bg-zinc-700 text-zinc-200"
                  : "bg-zinc-100 text-zinc-600"
              }`}
            >
              {items.length}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory("homepage")}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
              selectedCategory === "homepage"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
          >
            <LayoutTemplate className="h-3.5 w-3.5" />
            <span>Alur Beranda</span>
            <span
              className={`ml-1 rounded-md px-1.5 py-0.2 font-mono text-[10px] ${
                selectedCategory === "homepage"
                  ? "bg-emerald-800 text-emerald-100"
                  : "bg-emerald-50 text-emerald-800"
              }`}
            >
              {homepageItems.length}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory("pages")}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
              selectedCategory === "pages"
                ? "bg-sky-600 text-white shadow-xs"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Halaman Khusus</span>
            <span
              className={`ml-1 rounded-md px-1.5 py-0.2 font-mono text-[10px] ${
                selectedCategory === "pages"
                  ? "bg-sky-800 text-sky-100"
                  : "bg-sky-50 text-sky-800"
              }`}
            >
              {pagesItems.length}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory("global")}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
              selectedCategory === "global"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Komponen Global</span>
            <span
              className={`ml-1 rounded-md px-1.5 py-0.2 font-mono text-[10px] ${
                selectedCategory === "global"
                  ? "bg-amber-800 text-amber-100"
                  : "bg-amber-50 text-amber-800"
              }`}
            >
              {globalItems.length}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory("system")}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
              selectedCategory === "system"
                ? "bg-violet-600 text-white shadow-xs"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>SEO & Sistem</span>
            <span
              className={`ml-1 rounded-md px-1.5 py-0.2 font-mono text-[10px] ${
                selectedCategory === "system"
                  ? "bg-violet-800 text-violet-100"
                  : "bg-violet-50 text-violet-800"
              }`}
            >
              {systemItems.length}
            </span>
          </button>
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[260px] lg:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari bagian, rute, atau deskripsi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/70 py-2 pl-9 pr-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>
      </div>

      {/* Main Content Area */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white py-16 text-center shadow-xs">
          <div className="rounded-full bg-zinc-100 p-3 text-zinc-400">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="mt-3 text-sm font-bold text-zinc-900">Tidak ada bagian yang cocok</h3>
          <p className="mt-1 max-w-sm text-xs text-zinc-500">
            Tidak ditemukan bagian dengan kueri &ldquo;{search}&rdquo;. Silakan gunakan kata kunci lain.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
            }}
            className="mt-4 inline-flex items-center rounded-xl bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
          >
            Reset Pencarian
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {/* SECTION 1: ALUR BERANDA (HOMEPAGE FLOW) */}
          {(selectedCategory === "all" || selectedCategory === "homepage") && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <LayoutTemplate className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-zinc-900">
                      Alur Halaman Utama (Beranda)
                    </h2>
                    <p className="text-xs text-zinc-500">
                      Disusun runtut dari bagian atas hingga bawah halaman Beranda.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 border border-emerald-200">
                    10 Seksi Berurutan
                  </span>
                  <Link
                    href="/"
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-emerald-700 transition-colors"
                  >
                    <span>Pratinjau Beranda</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Vertical Stepper Container */}
              <div className="relative pl-6 sm:pl-8 before:absolute before:left-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-zinc-200 sm:before:left-4">
                <div className="space-y-4">
                  {items
                    .filter((it) => it.meta.category === "homepage")
                    .map((item) => (
                      <div key={item.namespace} className="relative group">
                        {/* Stepper Node Icon */}
                        <div className="absolute -left-6 sm:-left-8 top-5 flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-600 font-mono text-[10px] sm:text-xs font-bold text-white shadow-xs group-hover:scale-110 transition-transform">
                          {item.meta.stepNumber ? String(item.meta.stepNumber).padStart(2, "0") : "•"}
                        </div>

                        {/* Card Component */}
                        <Link
                          href={`/admin/translations/${item.namespace}`}
                          className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs transition-all hover:border-emerald-300 hover:shadow-md hover:ring-1 hover:ring-emerald-500/20 sm:flex-row sm:items-center"
                        >
                          <div className="space-y-1.5 sm:max-w-2xl">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-100">
                                {item.meta.positionLabel}
                              </span>
                              <span className="font-mono text-[10px] text-zinc-400">
                                namespace: {item.namespace}
                              </span>
                            </div>

                            <h3 className="text-sm font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors">
                              {item.meta.label}
                            </h3>
                            <p className="text-xs text-zinc-500 leading-relaxed">
                              {item.meta.desc}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-4 border-t border-zinc-100 pt-3 sm:mt-0 sm:border-0 sm:pt-0 sm:justify-end">
                            <span className="rounded-lg bg-zinc-100 px-2.5 py-1 font-mono text-xs font-bold text-zinc-700">
                              {item.count} Teks
                            </span>
                            <div className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700 group-hover:text-emerald-700 transition-colors">
                              <span>Buka Editor</span>
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: HALAMAN KHUSUS (DEDICATED FULL PAGES) */}
          {(selectedCategory === "all" || selectedCategory === "pages") && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                    <Compass className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-zinc-900">
                      Halaman Khusus (Halaman Penuh Tersendiri)
                    </h2>
                    <p className="text-xs text-zinc-500">
                      Halaman yang memiliki URL rute mandiri di luar halaman Beranda.
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-semibold text-sky-800 border border-sky-200">
                  4 Halaman Tersendiri
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {items
                  .filter((it) => it.meta.category === "pages")
                  .map((item) => (
                    <Link
                      key={item.namespace}
                      href={`/admin/translations/${item.namespace}`}
                      className="group flex flex-col justify-between rounded-2xl border-2 border-sky-100 bg-gradient-to-br from-sky-50/30 via-white to-white p-5 shadow-xs transition-all hover:border-sky-300 hover:shadow-md hover:ring-1 hover:ring-sky-500/20"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center gap-1.5 rounded-lg bg-sky-100/80 px-2.5 py-1 font-mono text-[11px] font-bold text-sky-800">
                            <FileCode2 className="h-3.5 w-3.5" />
                            <span>{item.meta.positionLabel}</span>
                          </div>
                          <span className="rounded-lg bg-sky-100/50 px-2 py-0.5 font-mono text-[11px] font-bold text-sky-900">
                            {item.count} Teks
                          </span>
                        </div>

                        <h3 className="mt-3 text-base font-bold text-zinc-900 group-hover:text-sky-800 transition-colors">
                          {item.meta.label}
                        </h3>
                        <div className="font-mono text-[10px] text-zinc-400">
                          namespace: {item.namespace}
                        </div>
                        <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                          {item.meta.desc}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-sky-100 pt-3 text-xs font-semibold text-sky-700 group-hover:text-sky-900">
                        <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                          <span>Target: {item.meta.livePath}</span>
                        </span>
                        <div className="inline-flex items-center gap-1">
                          <span>Kelola Wording</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          )}

          {/* SECTION 3: KOMPONEN GLOBAL (GLOBAL COMPONENTS) */}
          {(selectedCategory === "all" || selectedCategory === "global") && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
                    <SlidersHorizontal className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-zinc-900">
                      Komponen Global (Semua Halaman)
                    </h2>
                    <p className="text-xs text-zinc-500">
                      Komponen yang muncul di bagian atas (Navbar) dan paling bawah (Footer) di setiap halaman.
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 border border-amber-200">
                  Tampil Lintas Halaman
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {items
                  .filter((it) => it.meta.category === "global")
                  .map((item) => (
                    <Link
                      key={item.namespace}
                      href={`/admin/translations/${item.namespace}`}
                      className="group flex flex-col justify-between rounded-2xl border-2 border-amber-100 bg-gradient-to-br from-amber-50/20 via-white to-white p-5 shadow-xs transition-all hover:border-amber-300 hover:shadow-md hover:ring-1 hover:ring-amber-500/20"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="rounded-md bg-amber-100/70 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                            {item.meta.positionLabel}
                          </span>
                          <span className="rounded-lg bg-zinc-100 px-2 py-0.5 font-mono text-[11px] font-bold text-zinc-700">
                            {item.count} Teks
                          </span>
                        </div>

                        <h3 className="mt-3 text-base font-bold text-zinc-900 group-hover:text-amber-800 transition-colors">
                          {item.meta.label}
                        </h3>
                        <div className="font-mono text-[10px] text-zinc-400">
                          namespace: {item.namespace}
                        </div>
                        <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                          {item.meta.desc}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-amber-100/80 pt-3 text-xs font-semibold text-zinc-700 group-hover:text-amber-800">
                        <span className="text-[11px] text-zinc-400">Komponen Tetap</span>
                        <div className="inline-flex items-center gap-1">
                          <span>Buka Editor Teks</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          )}

          {/* SECTION 4: SEO & SISTEM */}
          {(selectedCategory === "all" || selectedCategory === "system") && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-zinc-900">
                      SEO & Konfigurasi Sistem
                    </h2>
                    <p className="text-xs text-zinc-500">
                      Judul tab peramban dan deskripsi snippet pencarian mesin pencari.
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-[11px] font-semibold text-violet-800 border border-violet-200">
                  Head Tag & Snippet
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {items
                  .filter((it) => it.meta.category === "system")
                  .map((item) => (
                    <Link
                      key={item.namespace}
                      href={`/admin/translations/${item.namespace}`}
                      className="group flex flex-col justify-between rounded-2xl border-2 border-violet-100 bg-gradient-to-br from-violet-50/20 via-white to-white p-5 shadow-xs transition-all hover:border-violet-300 hover:shadow-md hover:ring-1 hover:ring-violet-500/20"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="rounded-md bg-violet-100/70 px-2 py-0.5 text-[10px] font-bold text-violet-800">
                            {item.meta.positionLabel}
                          </span>
                          <span className="rounded-lg bg-zinc-100 px-2 py-0.5 font-mono text-[11px] font-bold text-zinc-700">
                            {item.count} Teks
                          </span>
                        </div>

                        <h3 className="mt-3 text-base font-bold text-zinc-900 group-hover:text-violet-800 transition-colors">
                          {item.meta.label}
                        </h3>
                        <div className="font-mono text-[10px] text-zinc-400">
                          namespace: {item.namespace}
                        </div>
                        <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                          {item.meta.desc}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-violet-100/80 pt-3 text-xs font-semibold text-zinc-700 group-hover:text-violet-800">
                        <span className="text-[11px] text-zinc-400">Google & Social Share</span>
                        <div className="inline-flex items-center gap-1">
                          <span>Buka Editor SEO</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
