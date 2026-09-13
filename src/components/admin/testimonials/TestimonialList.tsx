"use client";

import { useState } from "react";
import {
  Plus,
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  Star,
  MessageSquareQuote,
  AlertTriangle,
} from "lucide-react";
import {
  deleteTestimonial,
  moveTestimonial,
} from "@/actions/admin/testimonials";
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
  const [testiToDelete, setTestiToDelete] = useState<Row | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteConfirm() {
    if (!testiToDelete) return;
    setIsDeleting(true);
    try {
      await deleteTestimonial(testiToDelete.id);
      setTestiToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-500">
          Total {items.length} testimoni kepuasan klien dan mitra UMKM terdaftar.
        </p>
        <TestimonialFormDialog
          trigger={
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 active:scale-[0.98]">
              <Plus className="h-4 w-4" />
              <span>Tambah Testimoni</span>
            </button>
          }
        />
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white py-12 text-center">
          <div className="rounded-full bg-zinc-100 p-3 text-zinc-400">
            <MessageSquareQuote className="h-6 w-6" />
          </div>
          <div className="mt-3 text-sm font-bold text-zinc-900">
            Belum ada testimoni
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            Tambahkan ulasan nyata dari klien yang telah bekerja sama dengan Lumi.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => {
            const initialLetter = item.name.charAt(0).toUpperCase();

            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between gap-4 rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-xs transition-all hover:border-zinc-300 sm:flex-row sm:items-center"
              >
                {/* Left: Avatar, Info, Quote */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-sm font-bold text-white shadow-xs">
                    {initialLetter}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-zinc-900">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: item.rating || 5 }).map(
                          (_, rIdx) => (
                            <Star
                              key={rIdx}
                              className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                            />
                          )
                        )}
                      </div>
                      {item.featured && (
                        <span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                          Unggulan (Kartu Besar)
                        </span>
                      )}
                    </div>

                    <div className="mt-0.5 text-xs text-zinc-500">
                      <span>{item.roleId}</span>
                      <span className="mx-1.5 text-zinc-300">•</span>
                      <span className="italic">{item.roleEn}</span>
                    </div>

                    <p className="mt-2 text-xs text-zinc-700 italic max-w-2xl leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  <button
                    onClick={() => moveTestimonial(item.id, "up")}
                    disabled={index === 0}
                    title="Pindah ke atas"
                    className="rounded-lg border border-zinc-200 p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-30"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => moveTestimonial(item.id, "down")}
                    disabled={index === items.length - 1}
                    title="Pindah ke bawah"
                    className="rounded-lg border border-zinc-200 p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-30"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <TestimonialFormDialog
                    initial={item}
                    trigger={
                      <button
                        title="Edit testimoni"
                        className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
                      >
                        <Pencil className="h-3.5 w-3.5 text-zinc-500" />
                        <span>Edit</span>
                      </button>
                    }
                  />
                  <button
                    onClick={() => setTestiToDelete(item)}
                    title="Hapus testimoni"
                    className="rounded-lg border border-zinc-200 p-1.5 text-zinc-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {testiToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => !isDeleting && setTestiToDelete(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3 text-red-600">
              <div className="rounded-full bg-red-50 p-2">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900">
                Hapus Testimoni Klien
              </h3>
            </div>
            <p className="mt-3 text-xs text-zinc-600">
              Hapus testimoni dari{" "}
              <strong className="text-zinc-900">{testiToDelete.name}</strong>?
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setTestiToDelete(null)}
                disabled={isDeleting}
                className="rounded-xl border border-zinc-200 px-3.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="rounded-xl bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Menghapus..." : "Hapus Testimoni"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
