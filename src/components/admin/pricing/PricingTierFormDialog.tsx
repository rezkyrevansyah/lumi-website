"use client";

import { useState } from "react";
import { Dialog } from "radix-ui";
import { X, Check, CreditCard } from "lucide-react";
import {
  updatePricingTier,
  type PricingTierInput,
} from "@/actions/admin/pricing";

interface Props {
  trigger: React.ReactNode;
  tierId: number;
  initial: PricingTierInput;
}

export function PricingTierFormDialog({ trigger, tierId, initial }: Props) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<PricingTierInput>(initial);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updatePricingTier(tierId, form);
      setOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  function field(
    labelText: string,
    idKey: keyof PricingTierInput,
    enKey: keyof PricingTierInput,
    placeholderId = "",
    placeholderEn = ""
  ) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-zinc-700">
            {labelText} (ID)
          </label>
          <input
            value={(form[idKey] as string) ?? ""}
            onChange={(e) => setForm({ ...form, [idKey]: e.target.value })}
            placeholder={placeholderId}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-zinc-700">
            {labelText} (EN)
          </label>
          <input
            value={(form[enKey] as string) ?? ""}
            onChange={(e) => setForm({ ...form, [enKey]: e.target.value })}
            placeholder={placeholderEn}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>
    );
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
                Edit Rincian Paket Harga
              </Dialog.Title>
              <p className="text-xs text-zinc-500">
                Atur identitas tier, harga, tombol tindakan, dan opsi tampilan.
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
            <div className="space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Identitas Tier
              </div>
              {field("Nama Tier", "nameId", "nameEn", "e.g. Landing Page", "e.g. Landing Page")}
              {field("Label Badge", "labelId", "labelEn", "e.g. Mulai Bisnis", "e.g. Startup Ready")}
              {field("Tagline Singkat", "taglineId", "taglineEn", "e.g. Solusi cepat untuk UMKM", "e.g. Quick turnaround for SMBs")}
            </div>

            <div className="space-y-3 border-t border-zinc-100 pt-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Harga & Penawaran
              </div>
              {field("Prefix Harga", "pricePrefixId", "pricePrefixEn", "e.g. Mulai dari", "e.g. Starting from")}
              {field("Nominal Harga", "priceId", "priceEn", "e.g. Rp 2.500.000", "e.g. $199")}
              {field("Badge Populer", "badgeId", "badgeEn", "e.g. Paling Populer (opsional)", "e.g. Most Popular (optional)")}
            </div>

            <div className="space-y-3 border-t border-zinc-100 pt-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Tombol CTA & Tampilan
              </div>
              {field("Label Tombol CTA", "ctaLabelId", "ctaLabelEn", "e.g. Konsultasi Sekarang", "e.g. Consult Now")}

              <div className="grid grid-cols-1 gap-3 rounded-xl border border-zinc-100 bg-zinc-50/70 p-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={form.highlighted}
                    onChange={(e) =>
                      setForm({ ...form, highlighted: e.target.checked })
                    }
                    className="h-4 w-4 rounded-md border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <span className="block text-xs font-bold text-zinc-900">
                      Tandai sebagai Unggulan
                    </span>
                    <span className="block text-[11px] text-zinc-500">
                      Diberi highlight aksen visual khusus
                    </span>
                  </div>
                </label>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-zinc-700">
                    Varian Tombol CTA
                  </label>
                  <select
                    value={form.ctaVariant}
                    onChange={(e) =>
                      setForm({ ...form, ctaVariant: e.target.value })
                    }
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="primary">Primary (Gelap)</option>
                    <option value="secondary">Secondary (Aksen Emerald)</option>
                    <option value="outline">Outline (Garis Tepi)</option>
                  </select>
                </div>
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
                    <span>Simpan Perubahan</span>
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
