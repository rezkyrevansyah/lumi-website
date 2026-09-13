"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  Star,
  Eye,
  EyeOff,
  FolderKanban,
  AlertTriangle,
} from "lucide-react";
import { deletePortfolioItem, movePortfolioItem } from "@/actions/admin/portfolio";
import { PortfolioFormDialog } from "./PortfolioFormDialog";

interface Row {
  id: number;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  category: "web-app" | "uiux" | "qa";
  imagePath: string;
  featured: boolean;
  isPublished: boolean;
}

const CATEGORY_LABELS: Record<string, { label: string; class: string }> = {
  "web-app": {
    label: "Web & Aplikasi",
    class: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
  },
  uiux: {
    label: "Desain UI/UX",
    class: "bg-purple-50 text-purple-800 border-purple-200/80",
  },
  qa: {
    label: "Rekayasa QA",
    class: "bg-blue-50 text-blue-800 border-blue-200/80",
  },
};

export function PortfolioList({ items }: { items: Row[] }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [itemToDelete, setItemToDelete] = useState<Row | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        item.titleId.toLowerCase().includes(search.toLowerCase()) ||
        item.titleEn.toLowerCase().includes(search.toLowerCase()) ||
        item.imagePath.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [items, search, categoryFilter]);

  async function handleDeleteConfirm() {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deletePortfolioItem(itemToDelete.id);
      setItemToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="mt-6 space-y-5">
      {/* Action Header & Search Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari judul proyek..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-white p-1">
            {[
              { id: "all", label: "Semua" },
              { id: "web-app", label: "Web & Apps" },
              { id: "uiux", label: "UI/UX" },
              { id: "qa", label: "QA" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                  categoryFilter === cat.id
                    ? "bg-zinc-900 text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <PortfolioFormDialog
          trigger={
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-zinc-800 active:scale-[0.98]">
              <Plus className="h-4 w-4" />
              <span>Tambah Proyek</span>
            </button>
          }
        />
      </div>

      {/* Items List */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white py-12 text-center">
          <div className="rounded-full bg-zinc-100 p-3 text-zinc-400">
            <FolderKanban className="h-6 w-6" />
          </div>
          <div className="mt-3 text-sm font-bold text-zinc-900">
            Tidak ada portofolio ditemukan
          </div>
          <p className="mt-1 max-w-sm text-xs text-zinc-500">
            {search
              ? `Tidak ada proyek yang cocok dengan kata kunci "${search}".`
              : "Belum ada item portofolio dalam kategori ini."}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredItems.map((item, index) => {
            const catInfo = CATEGORY_LABELS[item.category] || {
              label: item.category,
              class: "bg-zinc-100 text-zinc-700",
            };

            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between gap-3 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xs transition-all hover:border-zinc-300 sm:flex-row sm:items-center"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-center gap-3.5">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 shadow-2xs">
                    <Image
                      src={item.imagePath}
                      alt={item.titleId}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-zinc-900">
                        {item.titleId}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold ${catInfo.class}`}
                      >
                        {catInfo.label}
                      </span>
                      {item.featured && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-amber-200/80 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          Unggulan
                        </span>
                      )}
                      {!item.isPublished && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-500">
                          <EyeOff className="h-3 w-3" />
                          Draf
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                      <span className="font-mono text-[11px]">
                        {item.imagePath}
                      </span>
                      <span className="text-zinc-300">•</span>
                      <span className="italic">{item.titleEn}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  <button
                    onClick={() => movePortfolioItem(item.id, "up")}
                    disabled={index === 0}
                    title="Pindah ke atas"
                    className="rounded-lg border border-zinc-200 p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-30"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => movePortfolioItem(item.id, "down")}
                    disabled={index === filteredItems.length - 1}
                    title="Pindah ke bawah"
                    className="rounded-lg border border-zinc-200 p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-30"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>

                  <PortfolioFormDialog
                    initial={item}
                    trigger={
                      <button
                        title="Edit portofolio"
                        className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
                      >
                        <Pencil className="h-3.5 w-3.5 text-zinc-500" />
                        <span>Edit</span>
                      </button>
                    }
                  />

                  <button
                    onClick={() => setItemToDelete(item)}
                    title="Hapus portofolio"
                    className="rounded-lg border border-zinc-200 p-1.5 text-zinc-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => !isDeleting && setItemToDelete(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3 text-red-600">
              <div className="rounded-full bg-red-50 p-2">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900">
                Hapus Proyek Portofolio
              </h3>
            </div>
            <p className="mt-3 text-xs text-zinc-600">
              Anda yakin ingin menghapus proyek{" "}
              <strong className="text-zinc-900">{itemToDelete.titleId}</strong>?
              Tindakan ini permanen dan tidak dapat dibatalkan.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                disabled={isDeleting}
                className="rounded-xl border border-zinc-200 px-3.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Menghapus..." : "Hapus Proyek"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
