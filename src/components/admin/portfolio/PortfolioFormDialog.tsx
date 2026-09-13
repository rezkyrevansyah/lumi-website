"use client";

import { useState } from "react";
import { Dialog } from "radix-ui";
import { createPortfolioItem, updatePortfolioItem, type PortfolioInput } from "@/actions/admin/portfolio";

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
    if (initial) {
      await updatePortfolioItem(initial.id, form);
    } else {
      await createPortfolioItem(form);
    }
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-bold text-zinc-900">
            {initial ? "Edit Portfolio" : "Portfolio Baru"}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-500">Judul (ID)</label>
                <input
                  value={form.titleId}
                  onChange={(e) => setForm({ ...form, titleId: e.target.value })}
                  required
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-500">Judul (EN)</label>
                <input
                  value={form.titleEn}
                  onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                  required
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-500">Deskripsi (ID)</label>
                <textarea
                  value={form.descriptionId}
                  onChange={(e) => setForm({ ...form, descriptionId: e.target.value })}
                  required
                  rows={3}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-500">Deskripsi (EN)</label>
                <textarea
                  value={form.descriptionEn}
                  onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
                  required
                  rows={3}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-500">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as PortfolioInput["category"] })}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-500">Path Gambar</label>
              <input
                placeholder="/portfolio/nama-file.png"
                value={form.imagePath}
                onChange={(e) => setForm({ ...form, imagePath: e.target.value })}
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                />
                Tampilkan di situs
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                Unggulan (tampil di preview homepage)
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Dialog.Close asChild>
                <button type="button" className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm">
                  Batal
                </button>
              </Dialog.Close>
              <button type="submit" className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white">
                Simpan
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
