"use client";

import { deletePortfolioItem, movePortfolioItem } from "@/actions/admin/portfolio";
import { PortfolioFormDialog } from "./PortfolioFormDialog";

interface Row {
  id: number;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  category: "web-app" | "uiux" | "qa";
  imagePath: string;
  featured: boolean;
  isPublished: boolean;
}

export function PortfolioList({ items }: { items: Row[] }) {
  return (
    <div className="mt-6 space-y-3">
      <PortfolioFormDialog
        trigger={
          <button className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white">
            + Tambah Portfolio
          </button>
        }
      />
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4">
            <div>
              <div className="font-semibold text-zinc-900">
                {item.titleId}
                {item.featured && <span className="ml-2 text-xs text-accent-700">★ unggulan</span>}
                {!item.isPublished && <span className="ml-2 text-xs text-red-500">(disembunyikan)</span>}
              </div>
              <div className="text-xs text-zinc-500">{item.category} — {item.imagePath}</div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => movePortfolioItem(item.id, "up")} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">↑</button>
              <button onClick={() => movePortfolioItem(item.id, "down")} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">↓</button>
              <PortfolioFormDialog
                initial={item}
                trigger={<button className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">Edit</button>}
              />
              <button
                onClick={() => {
                  if (confirm(`Hapus portfolio ${item.titleId}?`)) deletePortfolioItem(item.id);
                }}
                className="rounded-lg border border-red-200 px-2 py-1 text-xs text-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
