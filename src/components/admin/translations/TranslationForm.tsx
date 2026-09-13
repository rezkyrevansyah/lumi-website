"use client";

import { useState, useTransition, KeyboardEvent } from "react";
import {
  Check,
  Loader2,
  Save,
  Copy,
  RotateCcw,
  Type,
  AlignLeft,
  MousePointerClick,
  Sparkles,
  BarChart3,
  Tag,
  Search,
} from "lucide-react";
import { updateTranslation } from "@/actions/admin/translations";
import { KeyMeta } from "@/lib/content/translation-registry";

interface Row {
  id: number;
  key: string;
  valueId: string;
  valueEn: string;
}

export function TranslationForm({
  row,
  keyMeta,
  orderIndex,
}: {
  row: Row;
  keyMeta?: KeyMeta;
  orderIndex?: number;
}) {
  const [valueId, setValueId] = useState(row.valueId);
  const [valueEn, setValueEn] = useState(row.valueEn);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  const hasChanged = valueId !== row.valueId || valueEn !== row.valueEn;

  function handleSave() {
    if (!hasChanged && !saved) return;
    startTransition(async () => {
      await updateTranslation(row.id, valueId, valueEn);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  function handleReset() {
    setValueId(row.valueId);
    setValueEn(row.valueEn);
    setSaved(false);
  }

  function handleCopyIdToEn() {
    setValueEn(valueId);
    setSaved(false);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  }

  // Determine element type badge info
  const type = keyMeta?.type || "label";
  const typeBadgeMap: Record<
    string,
    { label: string; icon: React.ReactNode; color: string }
  > = {
    heading: {
      label: "Judul Utama",
      icon: <Type className="h-3 w-3" />,
      color: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
    },
    subheading: {
      label: "Subjudul",
      icon: <Type className="h-3 w-3" />,
      color: "bg-sky-50 text-sky-700 border-sky-200/80",
    },
    paragraph: {
      label: "Paragraf / Deskripsi",
      icon: <AlignLeft className="h-3 w-3" />,
      color: "bg-zinc-100 text-zinc-700 border-zinc-200/80",
    },
    button: {
      label: "Tombol Aksi",
      icon: <MousePointerClick className="h-3 w-3" />,
      color: "bg-amber-50 text-amber-800 border-amber-200/80",
    },
    badge: {
      label: "Badge / Kicker",
      icon: <Sparkles className="h-3 w-3" />,
      color: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    },
    stat: {
      label: "Statistik",
      icon: <BarChart3 className="h-3 w-3" />,
      color: "bg-teal-50 text-teal-800 border-teal-200/80",
    },
    meta: {
      label: "SEO & Tag Tab",
      icon: <Search className="h-3 w-3" />,
      color: "bg-violet-50 text-violet-800 border-violet-200/80",
    },
    label: {
      label: "Label Elemen",
      icon: <Tag className="h-3 w-3" />,
      color: "bg-zinc-50 text-zinc-600 border-zinc-200/80",
    },
  };

  const badgeInfo = typeBadgeMap[type] || typeBadgeMap.label;

  // Decide if input should be single-line or multi-line
  const isMultiLine =
    type === "paragraph" ||
    valueId.length > 70 ||
    valueEn.length > 70 ||
    valueId.includes("\n") ||
    valueEn.includes("\n");

  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-xs transition-all ${
        saved
          ? "border-emerald-400 ring-2 ring-emerald-500/10"
          : hasChanged
          ? "border-amber-300 ring-2 ring-amber-500/10"
          : "border-zinc-200/80 hover:border-zinc-300 hover:shadow-sm"
      }`}
    >
      {/* Field Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-3.5">
        <div className="flex flex-wrap items-center gap-2">
          {/* Visual Order Number */}
          {orderIndex !== undefined && (
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-zinc-100 font-mono text-[10px] font-bold text-zinc-600">
              #{String(orderIndex).padStart(2, "0")}
            </span>
          )}

          {/* Semantic Type Badge */}
          <span
            className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-bold ${badgeInfo.color}`}
          >
            {badgeInfo.icon}
            <span>{badgeInfo.label}</span>
          </span>

          {/* Sub-group Pill */}
          {keyMeta?.group && (
            <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600">
              {keyMeta.group}
            </span>
          )}

          {/* Technical Key */}
          <span className="rounded-md bg-zinc-50 px-2 py-0.5 font-mono text-[11px] font-semibold text-zinc-500 border border-zinc-200/60">
            {row.key}
          </span>

          {/* Save status badge */}
          {hasChanged && !saved && (
            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800 border border-amber-200/60">
              Belum Disimpan
            </span>
          )}
          {saved && (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 border border-emerald-200/60">
              <Check className="h-3 w-3 text-emerald-600" />
              Tersimpan Berhasil
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {hasChanged && (
            <button
              onClick={handleReset}
              disabled={pending}
              title="Batalkan perubahan"
              className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Batal</span>
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={pending || (!hasChanged && !saved)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold shadow-xs transition-all active:scale-[0.98] ${
              saved
                ? "bg-emerald-600 text-white"
                : hasChanged
                ? "bg-zinc-900 text-white hover:bg-zinc-800"
                : "bg-zinc-100 text-zinc-400 cursor-not-allowed shadow-none"
            }`}
          >
            {pending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : saved ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Tersimpan</span>
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" />
                <span>Simpan</span>
                <span className="hidden sm:inline font-mono text-[10px] opacity-70">
                  (Ctrl+Enter)
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Field Human Label & Hint */}
      {keyMeta?.label && (
        <div className="mt-2.5">
          <h4 className="text-xs font-bold text-zinc-900">
            {keyMeta.label}
          </h4>
          {keyMeta.hint && (
            <p className="text-[11px] text-zinc-500 mt-0.5">
              {keyMeta.hint}
            </p>
          )}
        </div>
      )}

      {/* Inputs in Two Columns: ID & EN */}
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Indonesian Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
              <span>Bahasa Indonesia (ID)</span>
            </label>
            <span className="font-mono text-[10px] text-zinc-400">
              {valueId.length} karakter
            </span>
          </div>

          {isMultiLine ? (
            <textarea
              value={valueId}
              onChange={(e) => {
                setValueId(e.target.value);
                setSaved(false);
              }}
              onKeyDown={handleKeyDown}
              rows={3}
              placeholder="Masukkan teks dalam Bahasa Indonesia..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 leading-relaxed transition-all"
            />
          ) : (
            <input
              type="text"
              value={valueId}
              onChange={(e) => {
                setValueId(e.target.value);
                setSaved(false);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Masukkan teks dalam Bahasa Indonesia..."
              className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          )}
        </div>

        {/* English Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
                <span>English (EN)</span>
              </label>
              {/* Copy helper */}
              {!valueEn && valueId && (
                <button
                  type="button"
                  onClick={handleCopyIdToEn}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
                >
                  <Copy className="h-2.5 w-2.5" />
                  <span>Salin dari ID</span>
                </button>
              )}
            </div>
            <span className="font-mono text-[10px] text-zinc-400">
              {valueEn.length} karakter
            </span>
          </div>

          {isMultiLine ? (
            <textarea
              value={valueEn}
              onChange={(e) => {
                setValueEn(e.target.value);
                setSaved(false);
              }}
              onKeyDown={handleKeyDown}
              rows={3}
              placeholder="Enter text in English..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 leading-relaxed transition-all"
            />
          ) : (
            <input
              type="text"
              value={valueEn}
              onChange={(e) => {
                setValueEn(e.target.value);
                setSaved(false);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter text in English..."
              className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          )}
        </div>
      </div>
    </div>
  );
}
