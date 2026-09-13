"use client";

import { deleteClientLogo, moveClientLogo } from "@/actions/admin/client-logos";
import { ClientLogoFormDialog } from "./ClientLogoFormDialog";

interface Row {
  id: number;
  imagePath: string;
  altText: string;
}

export function ClientLogoList({ items }: { items: Row[] }) {
  return (
    <div className="mt-6 space-y-3">
      <ClientLogoFormDialog
        trigger={
          <button className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white">
            + Tambah Logo Klien
          </button>
        }
      />
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4">
            <div>
              <div className="font-semibold text-zinc-900">{item.altText}</div>
              <div className="text-xs text-zinc-500">{item.imagePath}</div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => moveClientLogo(item.id, "up")} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">↑</button>
              <button onClick={() => moveClientLogo(item.id, "down")} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">↓</button>
              <ClientLogoFormDialog
                initial={item}
                trigger={<button className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">Edit</button>}
              />
              <button
                onClick={() => {
                  if (confirm(`Hapus logo ${item.altText}?`)) deleteClientLogo(item.id);
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
