"use client";

import { useState } from "react";
import { Dialog } from "radix-ui";
import { createCertification, updateCertification, type CertificationInput } from "@/actions/admin/certifications";

interface Props {
  trigger: React.ReactNode;
  initial?: CertificationInput & { id: number };
}

export function CertificationFormDialog({ trigger, initial }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CertificationInput>(
    initial ?? { key: "", name: "", imagePath: "", altText: "" }
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (initial) {
      await updateCertification(initial.id, form);
    } else {
      await createCertification(form);
    }
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-bold text-zinc-900">
            {initial ? "Edit Sertifikasi" : "Sertifikasi Baru"}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-500">Key (unik, mis. &quot;google&quot;)</label>
              <input
                value={form.key}
                onChange={(e) => setForm({ ...form, key: e.target.value })}
                required
                disabled={!!initial}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm disabled:bg-zinc-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-500">Nama Penyedia</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-500">Path Gambar</label>
              <input
                placeholder="/certificate/nama-file.png"
                value={form.imagePath}
                onChange={(e) => setForm({ ...form, imagePath: e.target.value })}
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-500">Teks Alternatif</label>
              <input
                value={form.altText}
                onChange={(e) => setForm({ ...form, altText: e.target.value })}
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
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
