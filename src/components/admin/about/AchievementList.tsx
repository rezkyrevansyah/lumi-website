"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import EmptyState from "@/components/admin/shared/EmptyState";
import AchievementFormDialog, { type Achievement } from "./AchievementFormDialog";
import {
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "@/actions/about";

interface AchievementListProps {
  initialItems: Achievement[];
}

export default function AchievementList({ initialItems }: AchievementListProps) {
  const [items, setItems] = useState<Achievement[]>(initialItems);
  const [editItem, setEditItem] = useState<Achievement | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const labelStyle = { fontFamily: "var(--font-opensans)" };

  function handleAdd() {
    setEditItem(null);
    setDialogOpen(true);
  }

  function handleEdit(item: Achievement) {
    setEditItem(item);
    setDialogOpen(true);
  }

  function handleSave(data: {
    id?: number;
    value: string;
    label: string;
    description?: string;
    accentColor?: string;
    bgColor?: string;
    sortOrder?: number;
  }) {
    startTransition(async () => {
      if (!data.id) {
        const created = await createAchievement({
          value: data.value,
          label: data.label,
          description: data.description,
          accentColor: data.accentColor,
          bgColor: data.bgColor,
          sortOrder: data.sortOrder ?? items.length,
        });
        if (created) {
          setItems((prev) => [...prev, created as Achievement]);
        }
      } else {
        const updated = await updateAchievement(data.id, {
          value: data.value,
          label: data.label,
          description: data.description,
          accentColor: data.accentColor,
          bgColor: data.bgColor,
          sortOrder: data.sortOrder,
        });
        if (updated) {
          setItems((prev) =>
            prev.map((i) => (i.id === data.id ? (updated as Achievement) : i))
          );
        }
      }
      setDialogOpen(false);
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      await deleteAchievement(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setDeleteId(null);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h3 className="text-base font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
            Pencapaian &amp; Metrik
          </h3>
          <p className="text-sm text-muted-foreground" style={labelStyle}>
            Angka statistik metrik pencapaian yang tampil pada halaman About.
          </p>
        </div>
        <Button onClick={handleAdd} className="btn-primary gap-2" style={labelStyle}>
          <Plus size={15} />
          Tambah Pencapaian
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title="Belum ada data pencapaian"
          description="Tambahkan metrik statistik seperti jumlah pesanan, rating, atau kepuasan klien."
          action={
            <Button onClick={handleAdd} className="btn-primary gap-2" style={labelStyle}>
              <Plus size={14} /> Tambah Pencapaian
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
              style={{
                backgroundColor: item.bgColor || "#FFFFFF",
              }}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className="text-2xl sm:text-3xl font-extrabold"
                    style={{
                      fontFamily: "var(--font-rubik)",
                      color: item.accentColor || "#2DD9A4",
                    }}
                  >
                    {item.value}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item)}
                      className="h-7 w-7 text-muted-foreground hover:text-[#6C63FF]"
                    >
                      <Pencil size={13} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(item.id)}
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </div>

                <h4
                  className="font-bold text-[#3D3E4A] text-sm mb-1 leading-snug"
                  style={{ fontFamily: "var(--font-rubik)" }}
                >
                  {item.label}
                </h4>
                {item.description && (
                  <p
                    className="text-xs text-muted-foreground leading-relaxed"
                    style={labelStyle}
                  >
                    {item.description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-border/50 text-[11px] text-muted-foreground">
                <span className="font-mono">{item.accentColor || "#2DD9A4"}</span>
                <span>Urutan: {item.sortOrder ?? 0}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <AchievementFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={editItem}
        onSave={handleSave}
        saving={isPending}
      />

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus pencapaian ini?"
        description="Pencapaian ini akan dihapus permanen dari database."
        confirmLabel="Hapus"
        onConfirm={() => deleteId !== null && handleDelete(deleteId)}
      />
    </div>
  );
}
