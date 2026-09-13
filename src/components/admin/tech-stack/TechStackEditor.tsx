"use client";

import { useState } from "react";
import { Plus, X, Trash2, Boxes, AlertTriangle, Layers } from "lucide-react";
import {
  createTechStackCategory,
  deleteTechStackCategory,
  addTechStackItem,
  deleteTechStackItem,
} from "@/actions/admin/tech-stack";

interface Category {
  id: number;
  key: string;
  labelId: string;
  labelEn: string;
}
interface Item {
  id: number;
  categoryId: number;
  name: string;
}

export function TechStackEditor({
  categories,
  items,
}: {
  categories: Category[];
  items: Item[];
}) {
  const [newItemName, setNewItemName] = useState<Record<number, string>>({});
  const [newCategory, setNewCategory] = useState({
    key: "",
    labelId: "",
    labelEn: "",
  });
  const [catToDelete, setCatToDelete] = useState<Category | null>(null);
  const [isDeletingCat, setIsDeletingCat] = useState(false);

  async function handleDeleteCat() {
    if (!catToDelete) return;
    setIsDeletingCat(true);
    try {
      await deleteTechStackCategory(catToDelete.id);
      setCatToDelete(null);
    } finally {
      setIsDeletingCat(false);
    }
  }

  return (
    <div className="mt-6 space-y-6">
      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {categories.map((cat) => {
          const catItems = items.filter((i) => i.categoryId === cat.id);

          return (
            <div
              key={cat.id}
              className="flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xs transition-all hover:border-zinc-300"
            >
              <div>
                {/* Header Category */}
                <div className="flex items-start justify-between gap-2 border-b border-zinc-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-[10px] font-bold text-zinc-600 uppercase">
                        {cat.key}
                      </span>
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                        {catItems.length} Alat
                      </span>
                    </div>
                    <h3 className="mt-2 text-sm font-bold text-zinc-900">
                      {cat.labelId}
                    </h3>
                    <p className="text-xs italic text-zinc-600">{cat.labelEn}</p>
                  </div>

                  <button
                    onClick={() => setCatToDelete(cat)}
                    title="Hapus kategori ini"
                    className="rounded-lg border border-zinc-200 p-1.5 text-zinc-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Items Badges */}
                <div className="mt-4 min-h-[60px]">
                  {catItems.length === 0 ? (
                    <div className="py-4 text-center text-xs text-zinc-600">
                      Belum ada teknologi di kategori ini.
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {catItems.map((i) => (
                        <span
                          key={i.id}
                          className="group inline-flex items-center gap-1.5 rounded-xl border border-zinc-200/80 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-800 transition-colors hover:border-zinc-300 hover:bg-zinc-100"
                        >
                          <span>{i.name}</span>
                          <button
                            type="button"
                            onClick={() => deleteTechStackItem(i.id)}
                            title={`Hapus ${i.name}`}
                            className="text-zinc-600 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Add Item Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const name = newItemName[cat.id];
                  if (name?.trim()) {
                    addTechStackItem(cat.id, name.trim());
                    setNewItemName({ ...newItemName, [cat.id]: "" });
                  }
                }}
                className="mt-4 flex gap-2 border-t border-zinc-100 pt-3.5"
              >
                <input
                  value={newItemName[cat.id] ?? ""}
                  onChange={(e) =>
                    setNewItemName({
                      ...newItemName,
                      [cat.id]: e.target.value,
                    })
                  }
                  placeholder="e.g. Next.js, PostgreSQL, Figma"
                  required
                  className="w-full rounded-xl border border-zinc-200 px-3 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 active:scale-[0.98]"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Tambah</span>
                </button>
              </form>
            </div>
          );
        })}
      </div>

      {/* Add New Category Card */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newCategory.key && newCategory.labelId && newCategory.labelEn) {
            createTechStackCategory(newCategory);
            setNewCategory({ key: "", labelId: "", labelEn: "" });
          }
        }}
        className="rounded-3xl border border-dashed border-zinc-300 bg-white p-6 shadow-xs"
      >
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-900">
          <Layers className="h-4 w-4 text-emerald-600" />
          <span>Tambah Kategori Teknologi Baru</span>
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          Buat grup baru untuk mengelompokkan bahasa pemrograman, framework, atau perkakas kerja.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-700">
              Kunci Kategori (Slug Unik)
            </label>
            <input
              placeholder="e.g. frontend, database, devops"
              value={newCategory.key}
              onChange={(e) =>
                setNewCategory({ ...newCategory, key: e.target.value })
              }
              required
              className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-700">
              Label Kategori (Indonesia)
            </label>
            <input
              placeholder="e.g. Basis Data & Penyimpanan"
              value={newCategory.labelId}
              onChange={(e) =>
                setNewCategory({ ...newCategory, labelId: e.target.value })
              }
              required
              className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-700">
              Label Kategori (English)
            </label>
            <input
              placeholder="e.g. Database & Storage"
              value={newCategory.labelEn}
              onChange={(e) =>
                setNewCategory({ ...newCategory, labelEn: e.target.value })
              }
              required
              className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>Simpan Kategori Baru</span>
          </button>
        </div>
      </form>

      {/* Delete Category Confirmation Modal */}
      {catToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => !isDeletingCat && setCatToDelete(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3 text-red-600">
              <div className="rounded-full bg-red-50 p-2">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900">
                Hapus Kategori Teknologi
              </h3>
            </div>
            <p className="mt-3 text-xs text-zinc-600">
              Anda yakin ingin menghapus kategori{" "}
              <strong className="text-zinc-900">{catToDelete.labelId}</strong>?
              Semua item teknologi di dalamnya juga akan terhapus.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCatToDelete(null)}
                disabled={isDeletingCat}
                className="rounded-xl border border-zinc-200 px-3.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteCat}
                disabled={isDeletingCat}
                className="rounded-xl bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-red-700 disabled:opacity-50"
              >
                {isDeletingCat ? "Menghapus..." : "Hapus Kategori"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
