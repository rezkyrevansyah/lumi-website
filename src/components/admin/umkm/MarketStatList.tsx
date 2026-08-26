"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import EmptyState from "@/components/admin/shared/EmptyState";
import MarketStatFormDialog, { type UmkmMarketStat } from "./MarketStatFormDialog";
import {
  createUmkmMarketStat,
  updateUmkmMarketStat,
  deleteUmkmMarketStat,
} from "@/actions/umkm";

interface MarketStatListProps {
  initialItems: UmkmMarketStat[];
}

export default function MarketStatList({ initialItems }: MarketStatListProps) {
  const [items, setItems] = useState<UmkmMarketStat[]>(initialItems);
  const [editItem, setEditItem] = useState<UmkmMarketStat | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const labelStyle = { fontFamily: "var(--font-opensans)" };

  function handleAdd() {
    setEditItem(null);
    setDialogOpen(true);
  }

  function handleEdit(item: UmkmMarketStat) {
    setEditItem(item);
    setDialogOpen(true);
  }

  function handleSave(data: {
    id?: number;
    value: string;
    label: string;
    sortOrder: number;
  }) {
    startTransition(async () => {
      if (!data.id) {
        const created = await createUmkmMarketStat({
          value: data.value,
          label: data.label,
          sortOrder: data.sortOrder ?? items.length,
        });
        if (created) {
          setItems((prev) => [...prev, created as UmkmMarketStat]);
        }
      } else {
        const updated = await updateUmkmMarketStat(data.id, {
          value: data.value,
          label: data.label,
          sortOrder: data.sortOrder,
        });
        if (updated) {
          setItems((prev) =>
            prev.map((i) => (i.id === data.id ? (updated as UmkmMarketStat) : i))
          );
        }
      }
      setDialogOpen(false);
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      await deleteUmkmMarketStat(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setDeleteId(null);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h3 className="text-base font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
            Statistik Pasar UMKM
          </h3>
          <p className="text-sm text-muted-foreground" style={labelStyle}>
            Data statistik potensi dan digitalisasi UMKM Indonesia.
          </p>
        </div>
        <Button onClick={handleAdd} className="btn-primary gap-2" style={labelStyle}>
          <Plus size={15} />
          Tambah Data
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={TrendingUp}
          title="Belum ada statistik pasar"
          description="Tambahkan data statistik pasar UMKM (contoh: kontribusi PDB, unit usaha, penetrasi digital)."
          action={
            <Button onClick={handleAdd} className="btn-primary gap-2" style={labelStyle}>
              <Plus size={14} /> Tambah Data
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className="text-2xl sm:text-3xl font-extrabold text-[#2DD9A4]"
                    style={{ fontFamily: "var(--font-rubik)" }}
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

                <p
                  className="text-sm font-semibold text-[#3D3E4A] leading-snug"
                  style={{ fontFamily: "var(--font-opensans)" }}
                >
                  {item.label}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-border/50 text-[11px] text-muted-foreground">
                <span>Urutan: {item.sortOrder ?? 0}</span>
                <span>ID: {item.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <MarketStatFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={editItem}
        onSave={handleSave}
        saving={isPending}
      />

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus data statistik ini?"
        description="Data statistik ini akan dihapus permanen dari database."
        confirmLabel="Hapus"
        onConfirm={() => deleteId !== null && handleDelete(deleteId)}
      />
    </div>
  );
}
