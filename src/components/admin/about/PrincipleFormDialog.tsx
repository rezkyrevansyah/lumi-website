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

export interface AboutPrinciple {
  id: number;
  section: string;
  icon: string;
  title: string;
  description: string;
  accentColor: string | null;
  bgColor: string | null;
  sortOrder: number | null;
}

interface PrincipleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AboutPrinciple | null;
  section: "why_choose_us" | "work_principles";
  onSave: (data: {
    id?: number;
    section: string;
    icon: string;
    title: string;
    description: string;
    accentColor?: string;
    bgColor?: string;
    sortOrder?: number;
  }) => void;
  saving?: boolean;
}

export default function PrincipleFormDialog({
  open,
  onOpenChange,
  item,
  section,
  onSave,
  saving,
}: PrincipleFormDialogProps) {
  const [icon, setIcon] = useState("✨");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [accentColor, setAccentColor] = useState("#2DD9A4");
  const [bgColor, setBgColor] = useState("#F0FDF9");
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => {
    if (item) {
      setIcon(item.icon || "✨");
      setTitle(item.title || "");
      setDescription(item.description || "");
      setAccentColor(item.accentColor || "#2DD9A4");
      setBgColor(item.bgColor || "#F0FDF9");
      setSortOrder(item.sortOrder ?? 0);
    } else {
      setIcon(section === "work_principles" ? "💬" : "💡");
      setTitle("");
      setDescription("");
      setAccentColor("#2DD9A4");
      setBgColor("#F0FDF9");
      setSortOrder(0);
    }
  }, [item, open, section]);

  function handleSubmit() {
    if (!title.trim() || !description.trim() || !icon.trim()) return;

    onSave({
      id: item?.id,
      section,
      icon: icon.trim(),
      title: title.trim(),
      description: description.trim(),
      accentColor: accentColor || undefined,
      bgColor: bgColor || undefined,
      sortOrder: Number(sortOrder) || 0,
    });
  }

  const labelStyle = { fontFamily: "var(--font-opensans)" };
  const sectionLabel = section === "why_choose_us" ? "Why Choose Us" : "Work Principle";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-rubik)" }}>
            {item ? `Edit ${sectionLabel}` : `Tambah ${sectionLabel}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1 space-y-1.5">
              <Label style={labelStyle}>Icon *</Label>
              <Input
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="💬"
                className="text-center text-lg font-emoji"
                style={labelStyle}
              />
            </div>
            <div className="col-span-3 space-y-1.5">
              <Label style={labelStyle}>Judul *</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Komunikasi Manusiawi & Responsif"
                style={labelStyle}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Deskripsi *</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan nilai atau komitmen ini dengan bahasa yang jelas…"
              rows={4}
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
              <Label style={labelStyle}>Background Color</Label>
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
            disabled={saving || !title.trim() || !description.trim() || !icon.trim()}
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
              "Tambah Item"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
