"use client";

import { useState } from "react";
import { Dialog } from "radix-ui";
import { X, Check, Star, MessageSquareQuote } from "lucide-react";
import {
  createTestimonial,
  updateTestimonial,
  type TestimonialInput,
} from "@/actions/admin/testimonials";

interface Props {
  trigger: React.ReactNode;
  initial?: TestimonialInput & { id: number };
}

export function TestimonialFormDialog({ trigger, initial }: Props) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<TestimonialInput>(
    initial ?? {
      name: "",
      roleId: "",
      roleEn: "",
      quote: "",
      rating: 5,
      featured: false,
    }
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (initial) {
        await updateTestimonial(initial.id, form);
      } else {
        await createTestimonial(form);
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
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl sm:p-7">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div>
              <Dialog.Title className="text-base font-bold text-zinc-900">
                {initial ? "Edit Testimoni" : "Tambah Testimoni Baru"}
              </Dialog.Title>
              <p className="text-xs text-zinc-500">
                Ulasan kepuasan dan apresiasi hasil kerja sama klien.
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
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-700">
                Nama Klien
              </label>
              <input
                placeholder="e.g. Budi Santoso"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-700">
                  Peran / Jabatan (Indonesia)
                </label>
                <input
                  placeholder="e.g. Pemilik Bisnis Kopi Lokal"
                  value={form.roleId}
                  onChange={(e) => setForm({ ...form, roleId: e.target.value })}
                  required
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-700">
                  Peran / Jabatan (English)
                </label>
                <input
                  placeholder="e.g. Local Coffee Business Owner"
                  value={form.roleEn}
                  onChange={(e) => setForm({ ...form, roleEn: e.target.value })}
                  required
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-700">
                Kutipan Ulasan (Asli dari Klien)
              </label>
              <textarea
                placeholder="Tulis kutipan testimoni klien persis seperti yang diberikan..."
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                required
                rows={3}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Interactive Rating & Featured */}
            <div className="grid grid-cols-1 gap-3 rounded-xl border border-zinc-100 bg-zinc-50/70 p-3.5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-zinc-700">
                  Rating Kepuasan (1-5)
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className="p-1 transition-transform hover:scale-110 active:scale-95"
                      aria-label={`Pilih rating ${star}`}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          star <= form.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-zinc-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-bold text-xs text-zinc-700">
                    {form.rating}.0
                  </span>
                </div>
              </div>

              <div className="flex items-center">
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
                    <span className="block text-[11px] text-zinc-500">
                      Tampil di kartu sorotan besar
                    </span>
                  </div>
                </label>
              </div>
            </div>

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
                    <span>Simpan Testimoni</span>
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
