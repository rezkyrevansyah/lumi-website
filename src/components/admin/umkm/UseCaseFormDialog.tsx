"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import TagInput from "@/components/admin/shared/TagInput";

export interface UmkmUseCase {
  id: number;
  iconName: string;
  title: string;
  description: string;
  tags: string[] | null;
  isHighlighted: boolean | null;
  sortOrder: number | null;
}

interface UseCaseFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: UmkmUseCase | null;
  onSave: (data: {
    id?: number;
    iconName: string;
    title: string;
    description: string;
    tags: string[];
    isHighlighted: boolean;
    sortOrder: number;
  }) => void;
  saving?: boolean;
}

export default function UseCaseFormDialog({
  open,
  onOpenChange,
  item,
  onSave,
  saving,
}: UseCaseFormDialogProps) {
  const [iconName, setIconName] = useState("CreditCard");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => {
    if (item) {
      setIconName(item.iconName || "CreditCard");
      setTitle(item.title || "");
      setDescription(item.description || "");
      setTags(item.tags || []);
      setIsHighlighted(Boolean(item.isHighlighted));
      setSortOrder(item.sortOrder ?? 0);
    } else {
      setIconName("CreditCard");
      setTitle("");
      setDescription("");
      setTags([]);
      setIsHighlighted(false);
      setSortOrder(0);
    }
  }, [item, open]);

  function handleSubmit() {
    if (!title.trim() || !description.trim() || !iconName.trim()) return;

    onSave({
      id: item?.id,
      iconName: iconName.trim(),
      title: title.trim(),
      description: description.trim(),
      tags,
      isHighlighted,
      sortOrder: Number(sortOrder) || 0,
    });
  }

  const labelStyle = { fontFamily: "var(--font-opensans)" };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-rubik)" }}>
            {item ? "Edit Solusi UMKM" : "Tambah Solusi UMKM"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1 space-y-1.5">
              <Label style={labelStyle}>Nama Icon *</Label>
              <Input
                value={iconName}
                onChange={(e) => setIconName(e.target.value)}
                placeholder="CreditCard"
                style={labelStyle}
              />
              <p className="text-[10px] text-muted-foreground" style={labelStyle}>
                Lucide icon / emoji
              </p>
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label style={labelStyle}>Judul Solusi *</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sistem Kasir (POS) & QRIS"
                style={labelStyle}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Deskripsi Solusi *</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Kasir ringan berbasis web, catat transaksi, cetak struk, dukung QRIS…"
              rows={3}
              style={labelStyle}
            />
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Kategori / Tag Industri</Label>
            <TagInput
              tags={tags}
              onChange={setTags}
              placeholder="Contoh: F&B / Cafe, Retail…"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isHighlighted}
                onChange={(e) => setIsHighlighted(e.target.checked)}
                className="w-4 h-4 rounded border-border text-[#2DD9A4] focus:ring-[#2DD9A4]"
              />
              <span className="text-sm font-medium text-[#3D3E4A]" style={labelStyle}>
                Tampilkan Highlight
              </span>
            </label>

            <div className="space-y-1">
              <Label style={labelStyle}>Urutan</Label>
              <Input
                type="number"
                min={0}
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="h-8 text-sm"
                style={labelStyle}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} style={labelStyle}>
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={saving || !title.trim() || !description.trim() || !iconName.trim()}
            className="btn-primary"
            style={labelStyle}
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Menyimpan…
              </span>
            ) : item ? (
              "Simpan Perubahan"
            ) : (
              "Tambah Solusi"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
