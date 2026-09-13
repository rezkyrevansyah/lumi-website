"use client";

import { useState } from "react";
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

export function PricingTierList({ tiers, features }: { tiers: Tier[]; features: Feature[] }) {
  const [newFeature, setNewFeature] = useState<Record<number, { id: string; en: string }>>({});

  return (
    <div className="mt-6 space-y-6">
      {tiers.map((tier) => (
        <div key={tier.id} className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-zinc-900">
                {tier.nameId} <span className="text-xs text-zinc-400">({tier.key})</span>
              </div>
              <div className="text-xs text-zinc-500">{tier.priceId}</div>
            </div>
            <PricingTierFormDialog
              tierId={tier.id}
              initial={tier}
              trigger={<button className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">Edit Tier</button>}
            />
          </div>
          <div className="mt-3 space-y-1">
            {features
              .filter((f) => f.tierId === tier.id)
              .map((f) => (
                <div key={f.id} className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-1.5 text-xs">
                  <span>{f.textId}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => movePricingFeature(f.id, "up")} className="rounded border border-zinc-200 px-1.5">↑</button>
                    <button onClick={() => movePricingFeature(f.id, "down")} className="rounded border border-zinc-200 px-1.5">↓</button>
                    <button
                      onClick={() => confirm("Hapus fitur ini?") && deletePricingFeature(f.id)}
                      className="rounded border border-red-200 px-1.5 text-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const value = newFeature[tier.id];
              if (value?.id && value?.en) {
                addPricingFeature(tier.id, value.id, value.en);
                setNewFeature({ ...newFeature, [tier.id]: { id: "", en: "" } });
              }
            }}
            className="mt-2 grid grid-cols-[1fr_1fr_auto] gap-2"
          >
            <input
              placeholder="Fitur baru (ID)"
              value={newFeature[tier.id]?.id ?? ""}
              onChange={(e) => setNewFeature({ ...newFeature, [tier.id]: { ...newFeature[tier.id], id: e.target.value, en: newFeature[tier.id]?.en ?? "" } })}
              className="rounded-lg border border-zinc-300 px-2 py-1 text-xs"
            />
            <input
              placeholder="Fitur baru (EN)"
              value={newFeature[tier.id]?.en ?? ""}
              onChange={(e) => setNewFeature({ ...newFeature, [tier.id]: { id: newFeature[tier.id]?.id ?? "", en: e.target.value } })}
              className="rounded-lg border border-zinc-300 px-2 py-1 text-xs"
            />
            <button type="submit" className="rounded-lg bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
              + Tambah
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
