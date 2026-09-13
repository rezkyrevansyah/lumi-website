"use client";

import { useState } from "react";
import { Dialog } from "radix-ui";
import { createClientLogo, updateClientLogo, type ClientLogoInput } from "@/actions/admin/client-logos";

interface Props {
  trigger: React.ReactNode;
  initial?: ClientLogoInput & { id: number };
}

export function ClientLogoFormDialog({ trigger, initial }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ClientLogoInput>(initial ?? { imagePath: "", altText: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (initial) {
      await updateClientLogo(initial.id, form);
    } else {
      await createClientLogo(form);
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
            {initial ? "Edit Logo Klien" : "Logo Klien Baru"}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-500">Path Gambar</label>
              <input
                placeholder="/client-logos/nama-file.svg"
                value={form.imagePath}
                onChange={(e) => setForm({ ...form, imagePath: e.target.value })}
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-500">Alt Text (nama klien)</label>
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
