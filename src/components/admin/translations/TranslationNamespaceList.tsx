"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Search,
  Languages,
  Filter,
  CheckCircle2,
  FileCode,
  Sparkles,
} from "lucide-react";
import { NamespaceMeta } from "@/lib/content/translation-registry";
import { TranslationForm } from "./TranslationForm";

interface Row {
  id: number;
  key: string;
  valueId: string;
  valueEn: string;
}

export function TranslationNamespaceList({
  namespace,
  rows,
  meta,
}: {
  namespace: string;
  rows: Row[];
  meta: NamespaceMeta;
}) {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string>("all");

  // Extract all distinct groups from keyMeta
  const availableGroups = useMemo(() => {
    const groups = new Set<string>();
    for (const r of rows) {
      const kMeta = meta.keyMeta?.[r.key];
      if (kMeta?.group) {
        groups.add(kMeta.group);
      }
    }
    return Array.from(groups);
  }, [rows, meta]);

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      const kMeta = meta.keyMeta?.[r.key];

      // Group filtering
      if (activeGroup !== "all") {
        if (kMeta?.group !== activeGroup) {
          return false;
        }
      }

      // Search filtering
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      const label = kMeta?.label?.toLowerCase() || "";
      const hint = kMeta?.hint?.toLowerCase() || "";

      return (
        r.key.toLowerCase().includes(q) ||
        r.valueId.toLowerCase().includes(q) ||
        r.valueEn.toLowerCase().includes(q) ||
        label.includes(q) ||
        hint.includes(q)
      );
    });
  }, [rows, search, activeGroup, meta]);

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/80 pb-4">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
          <Link
            href="/admin/translations"
            className="inline-flex items-center gap-1 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Teks Statis</span>
          </Link>
          <span>/</span>
          <span className="text-zinc-700 font-semibold">{meta.categoryLabel}</span>
          <span>/</span>
          <span className="text-zinc-900 font-bold">{meta.label}</span>
        </div>

        {/* Live Preview Button */}
        {meta.livePath && (
          <Link
            href={meta.livePath}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-xs hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-800 transition-all active:scale-[0.98]"
          >
            <span>Buka di Halaman Asli</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {/* Namespace Header Info Card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              {meta.positionLabel && (
                <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200/60">
                  {meta.positionLabel}
                </span>
              )}
              <span className="font-mono text-xs text-zinc-400">
                namespace: {namespace}
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
              {meta.label}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {meta.desc}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-3.5 py-2 text-right">
              <span className="block text-[10px] font-medium text-zinc-500">Jumlah Teks</span>
              <span className="font-mono text-base font-bold text-zinc-900">
                {rows.length} Kunci
              </span>
            </div>
          </div>
        </div>

        {/* Group Filter Pills (if any groups exist in this namespace) */}
        {availableGroups.length > 0 && (
          <div className="mt-5 pt-4 border-t border-zinc-100">
            <span className="mb-2 block text-[11px] font-semibold text-zinc-500">
              Filter Bagian / Sub-kelompok:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setActiveGroup("all")}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeGroup === "all"
                    ? "bg-zinc-900 text-white shadow-xs"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                }`}
              >
                Semua ({rows.length})
              </button>
              {availableGroups.map((grp) => {
                const countInGrp = rows.filter(
                  (r) => meta.keyMeta?.[r.key]?.group === grp
                ).length;
                return (
                  <button
                    key={grp}
                    onClick={() => setActiveGroup(grp)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                      activeGroup === grp
                        ? "bg-emerald-700 text-white shadow-xs"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                    }`}
                  >
                    {grp} ({countInGrp})
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          placeholder="Cari kunci, label visual, atau teks dalam bahasa Indonesia / English..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-xs text-zinc-900 placeholder:text-zinc-400 shadow-xs focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-400 hover:text-zinc-700"
          >
            Bersihkan
          </button>
        )}
      </div>

      {/* Items List */}
      {filteredRows.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white py-14 text-center shadow-xs">
          <div className="rounded-full bg-zinc-100 p-3 text-zinc-400">
            <Languages className="h-6 w-6" />
          </div>
          <h3 className="mt-3 text-sm font-bold text-zinc-900">
            Tidak ada teks yang cocok
          </h3>
          <p className="mt-1 max-w-sm text-xs text-zinc-500">
            Tidak ditemukan kunci atau konten teks dengan kata kunci &ldquo;{search}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveGroup("all");
            }}
            className="mt-4 inline-flex items-center rounded-xl bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
          >
            Tampilkan Semua Kunci
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRows.map((row, index) => {
            const kMeta = meta.keyMeta?.[row.key];
            return (
              <TranslationForm
                key={row.id}
                row={row}
                keyMeta={kMeta}
                orderIndex={index + 1}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
