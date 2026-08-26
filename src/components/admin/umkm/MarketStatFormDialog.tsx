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
import { Label } from "@/components/ui/label";

export interface UmkmMarketStat {
  id: number;
  value: string;
  label: string;
  sortOrder: number | null;
}

interface MarketStatFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: UmkmMarketStat | null;
  onSave: (data: {
    id?: number;
    value: string;
    label: string;
    sortOrder: number;
  }) => void;
  saving?: boolean;
}

export default function MarketStatFormDialog({
  open,
  onOpenChange,
  item,
  onSave,
  saving,
}: MarketStatFormDialogProps) {
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => {
    if (item) {
      setValue(item.value || "");
      setLabel(item.label || "");
      setSortOrder(item.sortOrder ?? 0);
    } else {
      setValue("");
      setLabel("");
      setSortOrder(0);
    }
  }, [item, open]);

  function handleSubmit() {
    if (!value.trim() || !label.trim()) return;

    onSave({
      id: item?.id,
      value: value.trim(),
      label: label.trim(),
      sortOrder: Number(sortOrder) || 0,
    });
  }

  const labelStyle = { fontFamily: "var(--font-opensans)" };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-rubik)" }}>
            {item ? "Edit Statistik Pasar UMKM" : "Tambah Statistik Pasar UMKM"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label style={labelStyle}>Angka / Statistik *</Label>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Contoh: 61%, 65Jt+, 33,6%"
              style={labelStyle}
            />
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Keterangan / Label *</Label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Contoh: Kontribusi UMKM terhadap PDB Nasional"
              style={labelStyle}
            />
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
              "Tambah Statistik"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
