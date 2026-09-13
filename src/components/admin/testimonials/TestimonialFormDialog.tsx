"use client";

import { useState } from "react";
import { Dialog } from "radix-ui";
import { createTestimonial, updateTestimonial, type TestimonialInput } from "@/actions/admin/testimonials";

interface Props {
  trigger: React.ReactNode;
  initial?: TestimonialInput & { id: number };
}

export function TestimonialFormDialog({ trigger, initial }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<TestimonialInput>(
    initial ?? { name: "", roleId: "", roleEn: "", quote: "", rating: 5, featured: false }
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (initial) {
      await updateTestimonial(initial.id, form);
    } else {
      await createTestimonial(form);
    }
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-bold text-zinc-900">
            {initial ? "Edit Testimoni" : "Testimoni Baru"}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              placeholder="Nama"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="Role (ID)"
                value={form.roleId}
                onChange={(e) => setForm({ ...form, roleId: e.target.value })}
                required
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
              <input
                placeholder="Role (EN)"
                value={form.roleEn}
                onChange={(e) => setForm({ ...form, roleEn: e.target.value })}
                required
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <textarea
              placeholder="Quote (bahasa asli klien, tidak diterjemahkan)"
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              required
              rows={3}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                Rating
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                  className="w-16 rounded-lg border border-zinc-300 px-2 py-1"
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                Featured (kartu besar)
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
