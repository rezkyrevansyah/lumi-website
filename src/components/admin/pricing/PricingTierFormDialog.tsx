"use client";

import { useState } from "react";
import { Dialog } from "radix-ui";
import { updatePricingTier, type PricingTierInput } from "@/actions/admin/pricing";

interface Props {
  trigger: React.ReactNode;
  tierId: number;
  initial: PricingTierInput;
}

export function PricingTierFormDialog({ trigger, tierId, initial }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<PricingTierInput>(initial);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await updatePricingTier(tierId, form);
    setOpen(false);
  }

  function field(labelText: string, idKey: keyof PricingTierInput, enKey: keyof PricingTierInput) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-zinc-500">{labelText} (ID)</label>
          <input
            value={(form[idKey] as string) ?? ""}
            onChange={(e) => setForm({ ...form, [idKey]: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-zinc-500">{labelText} (EN)</label>
          <input
            value={(form[enKey] as string) ?? ""}
            onChange={(e) => setForm({ ...form, [enKey]: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
      </div>
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-bold text-zinc-900">Edit Tier</Dialog.Title>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            {field("Nama Tier", "nameId", "nameEn")}
            {field("Label Badge Kecil", "labelId", "labelEn")}
            {field("Tagline", "taglineId", "taglineEn")}
            {field("Prefix Harga", "pricePrefixId", "pricePrefixEn")}
            {field("Harga", "priceId", "priceEn")}
            {field("Label Tombol CTA", "ctaLabelId", "ctaLabelEn")}
            {field("Badge Populer (kosongkan jika tidak ada)", "badgeId", "badgeEn")}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.highlighted}
                  onChange={(e) => setForm({ ...form, highlighted: e.target.checked })}
                />
                Ditonjolkan
              </label>
              <label className="flex items-center gap-2 text-sm">
                Varian CTA
                <select
                  value={form.ctaVariant}
                  onChange={(e) => setForm({ ...form, ctaVariant: e.target.value })}
                  className="rounded-lg border border-zinc-300 px-2 py-1 text-sm"
                >
                  <option value="primary">primary</option>
                  <option value="secondary">secondary</option>
                  <option value="outline">outline</option>
                </select>
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
