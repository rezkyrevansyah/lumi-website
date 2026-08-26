"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2, LayoutGrid, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import EmptyState from "@/components/admin/shared/EmptyState";
import TagBadge from "@/components/admin/shared/TagBadge";
import UseCaseFormDialog, { type UmkmUseCase } from "./UseCaseFormDialog";
import {
  createUmkmUseCase,
  updateUmkmUseCase,
  deleteUmkmUseCase,
} from "@/actions/umkm";

interface UseCaseListProps {
  initialItems: UmkmUseCase[];
}

export default function UseCaseList({ initialItems }: UseCaseListProps) {
  const [items, setItems] = useState<UmkmUseCase[]>(initialItems);
  const [editItem, setEditItem] = useState<UmkmUseCase | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const labelStyle = { fontFamily: "var(--font-opensans)" };

  function handleAdd() {
    setEditItem(null);
    setDialogOpen(true);
  }

  function handleEdit(item: UmkmUseCase) {
    setEditItem(item);
    setDialogOpen(true);
  }

  function handleSave(data: {
    id?: number;
    iconName: string;
    title: string;
    description: string;
    tags: string[];
    isHighlighted: boolean;
    sortOrder: number;
  }) {
    startTransition(async () => {
      if (!data.id) {
        const created = await createUmkmUseCase({
          iconName: data.iconName,
          title: data.title,
          description: data.description,
          tags: data.tags,
          isHighlighted: data.isHighlighted,
          sortOrder: data.sortOrder ?? items.length,
        });
        if (created) {
          setItems((prev) => [...prev, created as UmkmUseCase]);
        }
      } else {
        const updated = await updateUmkmUseCase(data.id, {
          iconName: data.iconName,
          title: data.title,
          description: data.description,
          tags: data.tags,
          isHighlighted: data.isHighlighted,
          sortOrder: data.sortOrder,
        });
        if (updated) {
          setItems((prev) =>
            prev.map((i) => (i.id === data.id ? (updated as UmkmUseCase) : i))
          );
        }
      }
      setDialogOpen(false);
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      await deleteUmkmUseCase(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setDeleteId(null);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h3 className="text-base font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
            Daftar Solusi &amp; Use Cases UMKM
          </h3>
          <p className="text-sm text-muted-foreground" style={labelStyle}>
            Solusi digital praktis untuk berbagai sektor bisnis UMKM.
          </p>
        </div>
        <Button onClick={handleAdd} className="btn-primary gap-2" style={labelStyle}>
          <Plus size={15} />
          Tambah Solusi
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={LayoutGrid}
          title="Belum ada use case UMKM"
          description="Tambahkan use case dan solusi aplikasi UMKM seperti POS, Kasir, Inventaris, atau Reservasi."
          action={
            <Button onClick={handleAdd} className="btn-primary gap-2" style={labelStyle}>
              <Plus size={14} /> Tambah Solusi Baru
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#F8F9FB] border border-border text-xs font-mono text-[#3D3E4A]">
                      {item.iconName}
                    </span>
                    {item.isHighlighted && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold">
                        <Star size={11} className="fill-amber-500 text-amber-500" />
                        Highlight
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item)}
                      className="h-8 w-8 text-muted-foreground hover:text-[#6C63FF]"
                    >
                      <Pencil size={13} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(item.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </div>

                <h4
                  className="font-bold text-[#3D3E4A] text-base mb-1.5 leading-snug"
                  style={{ fontFamily: "var(--font-rubik)" }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-muted-foreground text-sm leading-relaxed mb-4"
                  style={labelStyle}
                >
                  {item.description}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.tags.map((tag) => (
                      <TagBadge key={tag} label={tag} className="bg-[#F8F9FB] text-muted-foreground border-border" />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs text-muted-foreground">
                <span>Urutan: {item.sortOrder ?? 0}</span>
                <span>ID: {item.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <UseCaseFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={editItem}
        onSave={handleSave}
        saving={isPending}
      />

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus solusi ini?"
        description="Solusi use case ini akan dihapus permanen dari database."
        confirmLabel="Hapus"
        onConfirm={() => deleteId !== null && handleDelete(deleteId)}
      />
    </div>
  );
}
