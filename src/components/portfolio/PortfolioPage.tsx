"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO } from "@/lib/data";
import { PortfolioCard } from "./PortfolioCard";

type Platform = "all" | "web" | "android" | "ios";

const PLATFORM_TABS: { value: Platform; label: string }[] = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "android", label: "Android" },
  { value: "ios", label: "iOS" },
];

const PER_PAGE = 6;

export default function PortfolioPage() {
  const [platform, setPlatform] = useState<Platform>("all");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const raw = PORTFOLIO.map((p) => p.category.split(" • ")[0].trim());
    return ["all", ...Array.from(new Set(raw))];
  }, []);

  const filtered = useMemo(() => {
    return PORTFOLIO.filter((p) => {
      const matchPlatform = platform === "all" || p.platforms.includes(platform);
      const matchCategory =
        category === "all" || p.category.split(" • ")[0].trim() === category;
      return matchPlatform && matchCategory;
    });
  }, [platform, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const hasFilters = platform !== "all" || category !== "all";

  // Reset to page 1 on filter change
  function handlePlatform(v: Platform) { setPlatform(v); setPage(1); }
  function handleCategory(v: string) { setCategory(v); setPage(1); }
  function handleReset() { setPlatform("all"); setCategory("all"); setPage(1); }

  return (
    <section className="pt-28 pb-24 bg-[#F8F9FB] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-sm text-gray-400 mb-8"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          <a href="/" className="hover:text-[#2DD9A4] transition-colors">Home</a>
          <span>/</span>
          <span className="text-[#3D3E4A] font-medium">View All Projects</span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-10"
        >
          <p className="section-tag mb-3">Our Work</p>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3D3E4A] mb-4"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            <span className="gradient-text">Projects</span>{" "}We&apos;re Proud Of
          </h1>
          <p
            className="text-gray-500 text-base md:text-lg max-w-2xl"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            We pride ourselves on our commitment to quality and delivering
            reliable, sustainable, and loveable digital products — across
            industries, platforms, and problem spaces.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="flex flex-wrap items-center gap-3 mb-10"
        >
          {/* Platform tabs */}
          <div className="flex items-center gap-1.5 bg-white rounded-xl p-1 border border-gray-100 shadow-sm">
            {PLATFORM_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handlePlatform(tab.value)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  platform === tab.value
                    ? "bg-[#2DD9A4] text-white shadow-sm"
                    : "text-gray-500 hover:text-[#3D3E4A]"
                }`}
                style={{ fontFamily: "var(--font-opensans)" }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category dropdown */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => handleCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-100 shadow-sm rounded-xl px-4 py-2 pr-8 text-sm font-medium text-gray-600 cursor-pointer focus:outline-none focus:border-[#2DD9A4] transition-colors"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All Category" : c}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* Reset */}
          {hasFilters && (
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-[#3D3E4A] border border-gray-100 bg-white hover:border-gray-300 transition-all duration-200"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Reset
            </button>
          )}

          {/* Count */}
          <span className="text-sm text-gray-400 ml-auto" style={{ fontFamily: "var(--font-opensans)" }}>
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {paginated.length > 0 ? (
            <motion.div
              key={`${platform}-${category}-${page}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
              className="text-center py-24"
            >
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <p className="text-gray-400 text-base" style={{ fontFamily: "var(--font-opensans)" }}>
                No projects found for this filter.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 text-sm text-[#2DD9A4] font-semibold hover:underline"
                style={{ fontFamily: "var(--font-opensans)" }}
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center justify-center gap-2 mt-12"
          >
            {/* Prev */}
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:border-[#2DD9A4] hover:text-[#2DD9A4] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  p === page
                    ? "bg-[#2DD9A4] text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-500 hover:border-[#2DD9A4] hover:text-[#2DD9A4]"
                }`}
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {p}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:border-[#2DD9A4] hover:text-[#2DD9A4] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
