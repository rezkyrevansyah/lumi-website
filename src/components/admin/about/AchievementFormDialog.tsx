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

export interface Achievement {
  id: number;
  value: string;
  label: string;
  description: string | null;
  accentColor: string | null;
  bgColor: string | null;
  sortOrder: number | null;
}

interface AchievementFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Achievement | null;
  onSave: (data: {
    id?: number;
    value: string;
    label: string;
    description?: string;
    accentColor?: string;
    bgColor?: string;
    sortOrder?: number;
  }) => void;
  saving?: boolean;
}

export default function AchievementFormDialog({
  open,
  onOpenChange,
  item,
  onSave,
  saving,
}: AchievementFormDialogProps) {
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [accentColor, setAccentColor] = useState("#2DD9A4");
  const [bgColor, setBgColor] = useState("#F0FDF9");
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => {
    if (item) {
      setValue(item.value || "");
      setLabel(item.label || "");
      setDescription(item.description || "");
      setAccentColor(item.accentColor || "#2DD9A4");
      setBgColor(item.bgColor || "#F0FDF9");
      setSortOrder(item.sortOrder ?? 0);
    } else {
      setValue("");
      setLabel("");
      setDescription("");
      setAccentColor("#2DD9A4");
      setBgColor("#F0FDF9");
      setSortOrder(0);
    }
  }, [item, open]);

  function handleSubmit() {
    if (!value.trim() || !label.trim()) return;

    onSave({
      id: item?.id,
      value: value.trim(),
      label: label.trim(),
      description: description.trim() || undefined,
      accentColor: accentColor || undefined,
      bgColor: bgColor || undefined,
      sortOrder: Number(sortOrder) || 0,
    });
  }

  const labelStyle = { fontFamily: "var(--font-opensans)" };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-rubik)" }}>
            {item ? "Edit Pencapaian" : "Tambah Pencapaian"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label style={labelStyle}>Angka / Nilai *</Label>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Contoh: 36+, 5.0, 100%"
              style={labelStyle}
            />
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Label / Judul *</Label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Contoh: Pesanan Selesai"
              style={labelStyle}
            />
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Keterangan Tambahan (Opsional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: 100% tepat waktu"
              rows={2}
              style={labelStyle}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label style={labelStyle}>Accent Color</Label>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={accentColor.startsWith("#") ? accentColor : "#2DD9A4"}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-8 h-8 rounded border border-border cursor-pointer shrink-0"
                />
                <Input
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="h-8 text-xs font-mono"
                  placeholder="#2DD9A4"
                  style={labelStyle}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label style={labelStyle}>Background</Label>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={bgColor.startsWith("#") ? bgColor : "#F0FDF9"}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded border border-border cursor-pointer shrink-0"
                />
                <Input
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-8 text-xs font-mono"
                  placeholder="#F0FDF9"
                  style={labelStyle}
                />
              </div>
            </div>

            <div className="space-y-1.5">
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
            disabled={saving || !value.trim() || !label.trim()}
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
              "Tambah Pencapaian"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
