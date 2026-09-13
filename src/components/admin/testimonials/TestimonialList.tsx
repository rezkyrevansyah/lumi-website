"use client";

import { deleteTestimonial, moveTestimonial } from "@/actions/admin/testimonials";
import { TestimonialFormDialog } from "./TestimonialFormDialog";

interface Row {
  id: number;
  name: string;
  roleId: string;
  roleEn: string;
  quote: string;
  rating: number;
  featured: boolean;
}

export function TestimonialList({ items }: { items: Row[] }) {
  return (
    <div className="mt-6 space-y-3">
      <TestimonialFormDialog
        trigger={
          <button className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white">
            + Tambah Testimoni
          </button>
        }
      />
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4">
            <div>
              <div className="font-semibold text-zinc-900">{item.name}</div>
              <div className="text-xs text-zinc-500">{item.roleId}</div>
              <div className="mt-1 max-w-md truncate text-sm text-zinc-600">{item.quote}</div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => moveTestimonial(item.id, "up")} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">↑</button>
              <button onClick={() => moveTestimonial(item.id, "down")} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">↓</button>
              <TestimonialFormDialog
                initial={item}
                trigger={<button className="rounded-lg border border-zinc-200 px-2 py-1 text-xs">Edit</button>}
              />
              <button
                onClick={() => {
                  if (confirm(`Hapus testimoni dari ${item.name}?`)) deleteTestimonial(item.id);
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
