"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2, GitCommit } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import EmptyState from "@/components/admin/shared/EmptyState";
import ProcessStepFormDialog, { type UmkmProcessStep } from "./ProcessStepFormDialog";
import {
  createUmkmProcessStep,
  updateUmkmProcessStep,
  deleteUmkmProcessStep,
} from "@/actions/umkm";

interface ProcessStepListProps {
  initialItems: UmkmProcessStep[];
}

export default function ProcessStepList({ initialItems }: ProcessStepListProps) {
  const [items, setItems] = useState<UmkmProcessStep[]>(initialItems);
  const [editItem, setEditItem] = useState<UmkmProcessStep | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const labelStyle = { fontFamily: "var(--font-opensans)" };

  function handleAdd() {
    setEditItem(null);
    setDialogOpen(true);
  }

  function handleEdit(item: UmkmProcessStep) {
    setEditItem(item);
    setDialogOpen(true);
  }

  function handleSave(data: {
    id?: number;
    stepNumber: number;
    title: string;
    description: string;
    sortOrder: number;
  }) {
    startTransition(async () => {
      if (!data.id) {
        const created = await createUmkmProcessStep({
          stepNumber: data.stepNumber,
          title: data.title,
          description: data.description,
          sortOrder: data.sortOrder ?? items.length,
        });
        if (created) {
          setItems((prev) => [...prev, created as UmkmProcessStep]);
        }
      } else {
        const updated = await updateUmkmProcessStep(data.id, {
          stepNumber: data.stepNumber,
          title: data.title,
          description: data.description,
          sortOrder: data.sortOrder,
        });
        if (updated) {
          setItems((prev) =>
            prev.map((i) => (i.id === data.id ? (updated as UmkmProcessStep) : i))
          );
        }
      }
      setDialogOpen(false);
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      await deleteUmkmProcessStep(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setDeleteId(null);
    });
  }

  const sortedItems = [...items].sort((a, b) => (a.stepNumber ?? 0) - (b.stepNumber ?? 0));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h3 className="text-base font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
            Alur Pengerjaan Sistem UMKM
          </h3>
          <p className="text-sm text-muted-foreground" style={labelStyle}>
            Tahapan proses kerja dari konsultasi hingga serah terima dan pendampingan.
          </p>
        </div>
        <Button onClick={handleAdd} className="btn-primary gap-2" style={labelStyle}>
          <Plus size={15} />
          Tambah Tahapan
        </Button>
      </div>

      {sortedItems.length === 0 ? (
        <EmptyState
          icon={GitCommit}
          title="Belum ada tahapan alur kerja"
          description="Tambahkan tahapan alur pengerjaan untuk memberikan gambaran proses yang jelas kepada calon klien UMKM."
          action={
            <Button onClick={handleAdd} className="btn-primary gap-2" style={labelStyle}>
              <Plus size={14} /> Tambah Tahapan Pertama
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-border p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-[#F0FDF9] text-[#0E8B62] border border-[#2DD9A4]/30 flex items-center justify-center font-extrabold text-base shrink-0">
                  {String(item.stepNumber).padStart(2, "0")}
                </div>

                <div className="space-y-1 flex-1">
                  <h4
                    className="font-bold text-[#3D3E4A] text-base leading-snug"
                    style={{ fontFamily: "var(--font-rubik)" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-muted-foreground text-sm leading-relaxed"
                    style={labelStyle}
                  >
                    {item.description}
                  </p>
                  <div className="pt-2 text-xs text-muted-foreground">
                    <span>Urutan: {item.sortOrder ?? 0}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
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
          ))}
        </div>
      )}

      <ProcessStepFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={editItem}
        defaultStepNumber={sortedItems.length + 1}
        onSave={handleSave}
        saving={isPending}
      />

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus tahapan ini?"
        description="Tahapan alur kerja ini akan dihapus permanen dari database."
        confirmLabel="Hapus"
        onConfirm={() => deleteId !== null && handleDelete(deleteId)}
      />
    </div>
  );
}
