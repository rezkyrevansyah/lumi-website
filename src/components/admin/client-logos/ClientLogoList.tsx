"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  Building2,
  AlertTriangle,
} from "lucide-react";
import {
  deleteClientLogo,
  moveClientLogo,
} from "@/actions/admin/client-logos";
import { ClientLogoFormDialog } from "./ClientLogoFormDialog";

interface Row {
  id: number;
  imagePath: string;
  altText: string;
}

export function ClientLogoList({ items }: { items: Row[] }) {
  const [logoToDelete, setLogoToDelete] = useState<Row | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteConfirm() {
    if (!logoToDelete) return;
    setIsDeleting(true);
    try {
      await deleteClientLogo(logoToDelete.id);
      setLogoToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="mt-6 space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-500">
          Total {items.length} logo klien terpasang pada carousel halaman utama.
        </p>
        <ClientLogoFormDialog
          trigger={
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 active:scale-[0.98]">
              <Plus className="h-4 w-4" />
              <span>Tambah Logo Klien</span>
            </button>
          }
        />
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white py-12 text-center">
          <div className="rounded-full bg-zinc-100 p-3 text-zinc-400">
            <Building2 className="h-6 w-6" />
          </div>
          <div className="mt-3 text-sm font-bold text-zinc-900">
            Belum ada logo klien
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            Tambahkan logo klien atau mitra UMKM untuk memperkuat reputasi.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-xs transition-all hover:border-zinc-300 hover:shadow-sm"
            >
              <div>
                {/* Order Index Badge */}
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-[10px] font-bold text-zinc-500">
                    #{index + 1}
                  </span>
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                    <button
                      onClick={() => moveClientLogo(item.id, "up")}
                      disabled={index === 0}
                      title="Geser ke kiri/atas"
                      className="rounded-lg border border-zinc-200 p-1 text-zinc-500 hover:bg-zinc-100 disabled:opacity-25"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => moveClientLogo(item.id, "down")}
                      disabled={index === items.length - 1}
                      title="Geser ke kanan/bawah"
                      className="rounded-lg border border-zinc-200 p-1 text-zinc-500 hover:bg-zinc-100 disabled:opacity-25"
                    >
                      <ArrowDown className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Logo Image Preview */}
                <div className="relative mt-3 flex h-24 w-full items-center justify-center rounded-2xl border border-zinc-100 bg-zinc-50/70 p-4">
                  <div className="relative h-full w-full">
                    <Image
                      src={item.imagePath}
                      alt={item.altText}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Name & Path */}
                <div className="mt-3">
                  <h4 className="text-xs font-bold text-zinc-900 truncate">
                    {item.altText}
                  </h4>
                  <p className="mt-0.5 truncate font-mono text-[10px] text-zinc-500">
                    {item.imagePath}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3">
                <ClientLogoFormDialog
                  initial={item}
                  trigger={
                    <button
                      title="Edit logo"
                      className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-2.5 py-1 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
                    >
                      <Pencil className="h-3 w-3 text-zinc-500" />
                      <span>Edit</span>
                    </button>
                  }
                />

                <button
                  onClick={() => setLogoToDelete(item)}
                  title="Hapus logo"
                  className="rounded-lg border border-zinc-200 p-1 text-zinc-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {logoToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => !isDeleting && setLogoToDelete(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3 text-red-600">
              <div className="rounded-full bg-red-50 p-2">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900">
                Hapus Logo Klien
              </h3>
            </div>
            <p className="mt-3 text-xs text-zinc-600">
              Hapus logo <strong className="text-zinc-900">{logoToDelete.altText}</strong> dari carousel situs?
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setLogoToDelete(null)}
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
                {isDeleting ? "Menghapus..." : "Hapus Logo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
