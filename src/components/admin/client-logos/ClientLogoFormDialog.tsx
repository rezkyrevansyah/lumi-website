"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { X, Check, Building2, ImageIcon } from "lucide-react";
import {
  createClientLogo,
  updateClientLogo,
  type ClientLogoInput,
} from "@/actions/admin/client-logos";

interface Props {
  trigger: React.ReactNode;
  initial?: ClientLogoInput & { id: number };
}

export function ClientLogoFormDialog({ trigger, initial }: Props) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<ClientLogoInput>(
    initial ?? { imagePath: "", altText: "" }
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (initial) {
        await updateClientLogo(initial.id, form);
      } else {
        await createClientLogo(form);
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
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl sm:p-7">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div>
              <Dialog.Title className="text-base font-bold text-zinc-900">
                {initial ? "Edit Logo Klien" : "Tambah Logo Klien Baru"}
              </Dialog.Title>
              <p className="text-xs text-zinc-500">
                Aset logo mitra dan klien untuk carousel halaman utama.
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
                Nama Klien / Perusahaan
              </label>
              <input
                value={form.altText}
                onChange={(e) => setForm({ ...form, altText: e.target.value })}
                required
                placeholder="e.g. PT Dahana, Erafone, Monis"
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-700">
                Path File Logo
              </label>
              <input
                placeholder="/client-logos/nama-file.svg"
                value={form.imagePath}
                onChange={(e) =>
                  setForm({ ...form, imagePath: e.target.value })
                }
                required
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 font-mono text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />

              {form.imagePath ? (
                <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-2.5">
                  <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-white p-1">
                    <Image
                      src={form.imagePath}
                      alt="Pratinjau logo"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    <span className="font-semibold text-zinc-900">
                      Pratinjau Logo
                    </span>
                    <p className="line-clamp-1 font-mono text-[10px]">
                      {form.imagePath}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 p-3 text-xs text-zinc-400">
                  <ImageIcon className="h-4 w-4" />
                  <span>Masukkan path logo untuk pratinjau</span>
                </div>
              )}
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
                    <span>Simpan Logo</span>
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
