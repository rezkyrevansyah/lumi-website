"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  Award,
  AlertTriangle,
} from "lucide-react";
import {
  deleteCertification,
  moveCertification,
} from "@/actions/admin/certifications";
import { CertificationFormDialog } from "./CertificationFormDialog";

interface Row {
  id: number;
  key: string;
  name: string;
  imagePath: string;
  altText: string;
}

export function CertificationList({ items }: { items: Row[] }) {
  const [certToDelete, setCertToDelete] = useState<Row | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteConfirm() {
    if (!certToDelete) return;
    setIsDeleting(true);
    try {
      await deleteCertification(certToDelete.id);
      setCertToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-500">
          Total {items.length} sertifikasi keahlian terdaftar untuk memperkuat kredibilitas.
        </p>
        <CertificationFormDialog
          trigger={
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 active:scale-[0.98]">
              <Plus className="h-4 w-4" />
              <span>Tambah Sertifikasi</span>
            </button>
          }
        />
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white py-12 text-center">
          <div className="rounded-full bg-zinc-100 p-3 text-zinc-400">
            <Award className="h-6 w-6" />
          </div>
          <div className="mt-3 text-sm font-bold text-zinc-900">
            Belum ada sertifikasi
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            Tambahkan sertifikasi keahlian developer atau kredensial tim.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-3 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xs transition-all hover:border-zinc-300 sm:flex-row sm:items-center"
            >
              {/* Thumbnail & Info */}
              <div className="flex items-center gap-3.5">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-1 shadow-2xs">
                  <Image
                    src={item.imagePath}
                    alt={item.altText}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-zinc-900">
                      {item.name}
                    </span>
                    <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-[10px] font-bold text-zinc-600">
                      {item.key}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                    <span className="font-mono text-[11px]">{item.imagePath}</span>
                    <span className="text-zinc-300">•</span>
                    <span>{item.altText}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 self-end sm:self-center">
                <button
                  onClick={() => moveCertification(item.id, "up")}
                  disabled={index === 0}
                  title="Pindah ke atas"
                  className="rounded-lg border border-zinc-200 p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-30"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => moveCertification(item.id, "down")}
                  disabled={index === items.length - 1}
                  title="Pindah ke bawah"
                  className="rounded-lg border border-zinc-200 p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-30"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <CertificationFormDialog
                  initial={item}
                  trigger={
                    <button
                      title="Edit sertifikasi"
                      className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
                    >
                      <Pencil className="h-3.5 w-3.5 text-zinc-500" />
                      <span>Edit</span>
                    </button>
                  }
                />
                <button
                  onClick={() => setCertToDelete(item)}
                  title="Hapus sertifikasi"
                  className="rounded-lg border border-zinc-200 p-1.5 text-zinc-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {certToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => !isDeleting && setCertToDelete(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3 text-red-600">
              <div className="rounded-full bg-red-50 p-2">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900">
                Hapus Sertifikasi
              </h3>
            </div>
            <p className="mt-3 text-xs text-zinc-600">
              Hapus sertifikasi{" "}
              <strong className="text-zinc-900">{certToDelete.name}</strong>?
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCertToDelete(null)}
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
                {isDeleting ? "Menghapus..." : "Hapus Sertifikasi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
