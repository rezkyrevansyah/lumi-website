"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { X, ImageIcon, Check } from "lucide-react";
import {
  createPortfolioItem,
  updatePortfolioItem,
  type PortfolioInput,
} from "@/actions/admin/portfolio";

const CATEGORIES = [
  { value: "web-app", label: "Pengembangan Web & Aplikasi" },
  { value: "uiux", label: "Desain UI/UX" },
  { value: "qa", label: "Rekayasa QA" },
] as const;

interface Props {
  trigger: React.ReactNode;
  initial?: PortfolioInput & { id: number };
}

export function PortfolioFormDialog({ trigger, initial }: Props) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<PortfolioInput>(
    initial ?? {
      titleId: "",
      titleEn: "",
      descriptionId: "",
      descriptionEn: "",
      category: "web-app",
      imagePath: "",
      featured: false,
      isPublished: true,
    }
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (initial) {
        await updatePortfolioItem(initial.id, form);
      } else {
        await createPortfolioItem(form);
      }
      setOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl sm:p-7">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div>
              <Dialog.Title className="text-base font-bold text-zinc-900">
                {initial ? "Edit Proyek Portofolio" : "Tambah Proyek Baru"}
              </Dialog.Title>
              <p className="text-xs text-zinc-500">
                Isi rincian informasi proyek dalam bahasa Indonesia dan Inggris.
              </p>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Judul Dwibahasa */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-700">
                  Judul Proyek (Indonesia)
                </label>
                <input
                  value={form.titleId}
                  onChange={(e) => setForm({ ...form, titleId: e.target.value })}
                  placeholder="e.g. Website UMKM Ekraf"
                  required
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-700">
                  Judul Proyek (English)
                </label>
                <input
                  value={form.titleEn}
                  onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                  placeholder="e.g. MSME Creative Economy Website"
                  required
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* Deskripsi Dwibahasa */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-700">
                  Deskripsi (Indonesia)
                </label>
                <textarea
                  value={form.descriptionId}
                  onChange={(e) =>
                    setForm({ ...form, descriptionId: e.target.value })
                  }
                  rows={3}
                  placeholder="Jelaskan cakupan solusi rekayasa yang dikerjakan..."
                  required
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-700">
                  Deskripsi (English)
                </label>
                <textarea
                  value={form.descriptionEn}
                  onChange={(e) =>
                    setForm({ ...form, descriptionEn: e.target.value })
                  }
                  rows={3}
                  placeholder="Describe the scope of engineering solution delivered..."
                  required
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* Kategori */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-700">
                Kategori Layanan
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as PortfolioInput["category"],
                  })
                }
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Path Gambar & Live Preview */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-700">
                Path File Gambar
              </label>
              <div className="flex gap-2">
                <input
                  placeholder="/portfolio/nama-file.png"
                  value={form.imagePath}
                  onChange={(e) =>
                    setForm({ ...form, imagePath: e.target.value })
                  }
                  required
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 font-mono text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {/* Preview Box */}
              {form.imagePath ? (
                <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-2.5">
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-white">
                    <Image
                      src={form.imagePath}
                      alt="Pratinjau gambar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-[11px] text-zinc-600">
                    <span className="font-semibold text-zinc-900">
                      Pratinjau Gambar Aktif
                    </span>
                    <p className="line-clamp-1 text-zinc-600">
                      {form.imagePath}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 p-3 text-xs text-zinc-600">
                  <ImageIcon className="h-4 w-4 text-zinc-600" />
                  <span>Masukkan path gambar untuk melihat pratinjau</span>
                </div>
              )}
            </div>

            {/* Status Toggles */}
            <div className="grid grid-cols-1 gap-3 rounded-xl border border-zinc-100 bg-zinc-50/70 p-3 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) =>
                    setForm({ ...form, isPublished: e.target.checked })
                  }
                  className="h-4 w-4 rounded-md border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <span className="block text-xs font-bold text-zinc-900">
                    Tampilkan di Situs Publik
                  </span>
                  <span className="block text-[11px] text-zinc-600">
                    Bisa diakses pengunjung
                  </span>
                </div>
              </label>

              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked })
                  }
                  className="h-4 w-4 rounded-md border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <span className="block text-xs font-bold text-zinc-900">
                    Tandai sebagai Unggulan
                  </span>
                  <span className="block text-[11px] text-zinc-600">
                    Tampil pada preview beranda
                  </span>
                </div>
              </label>
            </div>

            {/* Form Footer Actions */}
            <div className="flex items-center justify-end gap-2 border-t border-zinc-100 pt-4">
              <Dialog.Close asChild>
                <button
                  type="button"
                  disabled={isSubmitting}
                  className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 disabled:opacity-50"
                >
                  Batal
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Menyimpan..."
                ) : (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Simpan Portofolio</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
