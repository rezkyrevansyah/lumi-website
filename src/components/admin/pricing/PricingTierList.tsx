"use client";

import { useState } from "react";
import {
  Pencil,
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
  CheckCircle2,
  Sparkles,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import {
  addPricingFeature,
  deletePricingFeature,
  movePricingFeature,
  type PricingTierInput,
} from "@/actions/admin/pricing";
import { PricingTierFormDialog } from "./PricingTierFormDialog";

interface Tier extends PricingTierInput {
  id: number;
  key: string;
}
interface Feature {
  id: number;
  tierId: number;
  textId: string;
  textEn: string;
}

export function PricingTierList({
  tiers,
  features,
}: {
  tiers: Tier[];
  features: Feature[];
}) {
  const [newFeature, setNewFeature] = useState<
    Record<number, { id: string; en: string }>
  >({});
  const [featureToDelete, setFeatureToDelete] = useState<Feature | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteFeature() {
    if (!featureToDelete) return;
    setIsDeleting(true);
    try {
      await deletePricingFeature(featureToDelete.id);
      setFeatureToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {tiers.map((tier) => {
          const tierFeatures = features.filter((f) => f.tierId === tier.id);
          const isHighlighted = tier.highlighted;

          return (
            <div
              key={tier.id}
              className={`flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-xs transition-all ${
                isHighlighted
                  ? "border-emerald-300 ring-2 ring-emerald-500/10 shadow-sm"
                  : "border-zinc-200/80 hover:border-zinc-300"
              }`}
            >
              {/* Header Tier */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-[10px] font-bold text-zinc-600 uppercase">
                        {tier.key}
                      </span>
                      {isHighlighted && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                          <Sparkles className="h-3 w-3 text-emerald-600" />
                          Unggulan
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-base font-bold text-zinc-900">
                      {tier.nameId}
                    </h3>
                    <p className="text-xs italic text-zinc-500">{tier.nameEn}</p>
                    {tier.taglineId && (
                      <p className="mt-1 text-xs text-zinc-600">
                        {tier.taglineId}
                      </p>
                    )}
                  </div>

                  <PricingTierFormDialog
                    tierId={tier.id}
                    initial={tier}
                    trigger={
                      <button
                        title="Edit tier paket"
                        className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
                      >
                        <Pencil className="h-3 w-3 text-zinc-500" />
                        <span>Edit</span>
                      </button>
                    }
                  />
                </div>

                {/* Price Display */}
                <div className="mt-4 rounded-2xl bg-zinc-50 p-3.5 border border-zinc-100">
                  <div className="text-[11px] font-medium text-zinc-500">
                    {tier.pricePrefixId || "Mulai dari"}
                  </div>
                  <div className="text-xl font-bold tracking-tight text-zinc-900">
                    {tier.priceId}
                  </div>
                  <div className="text-[11px] text-zinc-600">
                    EN: {tier.pricePrefixEn} {tier.priceEn}
                  </div>
                </div>

                {/* Feature List Header */}
                <div className="mt-5 border-t border-zinc-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Fitur Termasuk ({tierFeatures.length})
                    </span>
                  </div>

                  {/* Feature items */}
                  <div className="mt-3 space-y-1.5">
                    {tierFeatures.length === 0 ? (
                      <div className="py-4 text-center text-xs text-zinc-600">
                        Belum ada fitur ditambahkan.
                      </div>
                    ) : (
                      tierFeatures.map((f, fIdx) => (
                        <div
                          key={f.id}
                          className="group flex items-start justify-between gap-2 rounded-xl border border-zinc-100 bg-zinc-50/70 p-2.5 transition-colors hover:bg-zinc-50"
                        >
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                            <div>
                              <div className="text-xs font-medium text-zinc-900 leading-snug">
                                {f.textId}
                              </div>
                              <div className="text-[11px] text-zinc-600 leading-snug">
                                {f.textEn}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-0.5 shrink-0 opacity-80 group-hover:opacity-100">
                            <button
                              onClick={() => movePricingFeature(f.id, "up")}
                              disabled={fIdx === 0}
                              title="Pindah ke atas"
                              className="rounded-md border border-zinc-200 p-1 text-zinc-400 hover:text-zinc-700 disabled:opacity-25"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => movePricingFeature(f.id, "down")}
                              disabled={fIdx === tierFeatures.length - 1}
                              title="Pindah ke bawah"
                              className="rounded-md border border-zinc-200 p-1 text-zinc-400 hover:text-zinc-700 disabled:opacity-25"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => setFeatureToDelete(f)}
                              title="Hapus fitur"
                              className="rounded-md border border-zinc-200 p-1 text-zinc-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Add Feature Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const value = newFeature[tier.id];
                  if (value?.id && value?.en) {
                    addPricingFeature(tier.id, value.id, value.en);
                    setNewFeature({
                      ...newFeature,
                      [tier.id]: { id: "", en: "" },
                    });
                  }
                }}
                className="mt-5 border-t border-zinc-100 pt-4 space-y-2"
              >
                <div className="text-[11px] font-bold text-zinc-700">
                  Tambah Fitur Baru
                </div>
                <input
                  placeholder="Deskripsi fitur (ID)"
                  value={newFeature[tier.id]?.id ?? ""}
                  onChange={(e) =>
                    setNewFeature({
                      ...newFeature,
                      [tier.id]: {
                        id: e.target.value,
                        en: newFeature[tier.id]?.en ?? "",
                      },
                    })
                  }
                  required
                  className="w-full rounded-xl border border-zinc-200 px-3 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <input
                  placeholder="Deskripsi fitur (EN)"
                  value={newFeature[tier.id]?.en ?? ""}
                  onChange={(e) =>
                    setNewFeature({
                      ...newFeature,
                      [tier.id]: {
                        id: newFeature[tier.id]?.id ?? "",
                        en: e.target.value,
                      },
                    })
                  }
                  required
                  className="w-full rounded-xl border border-zinc-200 px-3 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-zinc-900 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 active:scale-[0.98]"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Tambah ke Tier</span>
                </button>
              </form>
            </div>
          );
        })}
      </div>

      {/* Delete Feature Confirmation Modal */}
      {featureToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => !isDeleting && setFeatureToDelete(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3 text-red-600">
              <div className="rounded-full bg-red-50 p-2">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900">
                Hapus Fitur Paket
              </h3>
            </div>
            <p className="mt-3 text-xs text-zinc-600">
              Hapus fitur &ldquo;{featureToDelete.textId}&rdquo; dari paket ini?
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setFeatureToDelete(null)}
                disabled={isDeleting}
                className="rounded-xl border border-zinc-200 px-3.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteFeature}
                disabled={isDeleting}
                className="rounded-xl bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Menghapus..." : "Hapus Fitur"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
