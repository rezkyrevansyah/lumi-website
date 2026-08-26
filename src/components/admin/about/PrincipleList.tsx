"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import EmptyState from "@/components/admin/shared/EmptyState";
import PrincipleFormDialog, { type AboutPrinciple } from "./PrincipleFormDialog";
import {
  createAboutPrinciple,
  updateAboutPrinciple,
  deleteAboutPrinciple,
} from "@/actions/about";

interface PrincipleListProps {
  section: "why_choose_us" | "work_principles";
  initialItems: AboutPrinciple[];
  title: string;
  description: string;
}

export default function PrincipleList({
  section,
  initialItems,
  title,
  description,
}: PrincipleListProps) {
  const [items, setItems] = useState<AboutPrinciple[]>(initialItems);
  const [editItem, setEditItem] = useState<AboutPrinciple | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const labelStyle = { fontFamily: "var(--font-opensans)" };

  function handleAdd() {
    setEditItem(null);
    setDialogOpen(true);
  }

  function handleEdit(item: AboutPrinciple) {
    setEditItem(item);
    setDialogOpen(true);
  }

  function handleSave(data: {
    id?: number;
    section: string;
    icon: string;
    title: string;
    description: string;
    accentColor?: string;
    bgColor?: string;
    sortOrder?: number;
  }) {
    startTransition(async () => {
      if (!data.id) {
        const created = await createAboutPrinciple({
          section: data.section,
          icon: data.icon,
          title: data.title,
          description: data.description,
          accentColor: data.accentColor,
          bgColor: data.bgColor,
          sortOrder: data.sortOrder ?? items.length,
        });
        if (created) {
          setItems((prev) => [...prev, created as AboutPrinciple]);
        }
      } else {
        const updated = await updateAboutPrinciple(data.id, {
          section: data.section,
          icon: data.icon,
          title: data.title,
          description: data.description,
          accentColor: data.accentColor,
          bgColor: data.bgColor,
          sortOrder: data.sortOrder,
        });
        if (updated) {
          setItems((prev) =>
            prev.map((i) => (i.id === data.id ? (updated as AboutPrinciple) : i))
          );
        }
      }
      setDialogOpen(false);
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      await deleteAboutPrinciple(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setDeleteId(null);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h3 className="text-base font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground" style={labelStyle}>
            {description}
          </p>
        </div>
        <Button onClick={handleAdd} className="btn-primary gap-2" style={labelStyle}>
          <Plus size={15} />
          Tambah Item
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="Belum ada item prinsip"
          description="Tambahkan prinsip kerja atau keunggulan untuk ditampilkan di website."
          action={
            <Button onClick={handleAdd} className="btn-primary gap-2" style={labelStyle}>
              <Plus size={14} /> Tambah Item Baru
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
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-border/60"
                    style={{
                      backgroundColor: item.bgColor || "#F0FDF9",
                      borderColor: item.accentColor ? `${item.accentColor}30` : undefined,
                    }}
                  >
                    {item.icon}
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
                  className="text-muted-foreground text-sm leading-relaxed"
                  style={labelStyle}
                >
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  {item.accentColor && (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block border border-border"
                        style={{ backgroundColor: item.accentColor }}
                      />
                      <span className="font-mono text-[11px]">{item.accentColor}</span>
                    </span>
                  )}
                </div>
                <span>Urutan: {item.sortOrder ?? 0}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <PrincipleFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={editItem}
        section={section}
        onSave={handleSave}
        saving={isPending}
      />

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus item ini?"
        description="Item ini akan dihapus permanen dari database."
        confirmLabel="Hapus"
        onConfirm={() => deleteId !== null && handleDelete(deleteId)}
      />
    </div>
  );
}
