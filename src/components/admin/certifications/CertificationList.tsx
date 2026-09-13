"use client";

import { deleteCertification, moveCertification } from "@/actions/admin/certifications";
import { CertificationFormDialog } from "./CertificationFormDialog";

interface Row {
  id: number;
  key: string;
  name: string;
  imagePath: string;
  altText: string;
}

export function CertificationList({ items }: { items: Row[] }) {
  return (
    <div className="mt-6 space-y-3">
      <CertificationFormDialog
        trigger={
          <button className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white">
            + Tambah Sertifikasi
          </button>
        }
      />
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4">
            <div>
              <div className="font-semibold text-zinc-900">{item.name}</div>
              <div className="text-xs text-zinc-500">{item.imagePath}</div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => moveCertification(item.id, "up")} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">↑</button>
              <button onClick={() => moveCertification(item.id, "down")} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">↓</button>
              <CertificationFormDialog
                initial={item}
                trigger={<button className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">Edit</button>}
              />
              <button
                onClick={() => {
                  if (confirm(`Hapus sertifikasi ${item.name}?`)) deleteCertification(item.id);
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
