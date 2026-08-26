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

export interface UmkmProcessStep {
  id: number;
  stepNumber: number;
  title: string;
  description: string;
  sortOrder: number | null;
}

interface ProcessStepFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: UmkmProcessStep | null;
  defaultStepNumber: number;
  onSave: (data: {
    id?: number;
    stepNumber: number;
    title: string;
    description: string;
    sortOrder: number;
  }) => void;
  saving?: boolean;
}

export default function ProcessStepFormDialog({
  open,
  onOpenChange,
  item,
  defaultStepNumber,
  onSave,
  saving,
}: ProcessStepFormDialogProps) {
  const [stepNumber, setStepNumber] = useState(defaultStepNumber);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => {
    if (item) {
      setStepNumber(item.stepNumber || defaultStepNumber);
      setTitle(item.title || "");
      setDescription(item.description || "");
      setSortOrder(item.sortOrder ?? 0);
    } else {
      setStepNumber(defaultStepNumber);
      setTitle("");
      setDescription("");
      setSortOrder(defaultStepNumber - 1);
    }
  }, [item, open, defaultStepNumber]);

  function handleSubmit() {
    if (!title.trim() || !description.trim()) return;

    onSave({
      id: item?.id,
      stepNumber: Number(stepNumber) || 1,
      title: title.trim(),
      description: description.trim(),
      sortOrder: Number(sortOrder) || 0,
    });
  }

  const labelStyle = { fontFamily: "var(--font-opensans)" };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-rubik)" }}>
            {item ? "Edit Tahapan Alur Kerja" : "Tambah Tahapan Alur Kerja"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1 space-y-1.5">
              <Label style={labelStyle}>Nomor Step *</Label>
              <Input
                type="number"
                min={1}
                value={stepNumber}
                onChange={(e) => setStepNumber(Number(e.target.value))}
                className="text-center font-bold"
                style={labelStyle}
              />
            </div>
            <div className="col-span-3 space-y-1.5">
              <Label style={labelStyle}>Judul Tahapan *</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Konsultasi Gratis"
                style={labelStyle}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Deskripsi Tahapan *</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ceritakan kendala operasional bisnis Anda, kami bantu petakan solusi…"
              rows={4}
              style={labelStyle}
            />
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Urutan Sortir</Label>
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
            disabled={saving || !title.trim() || !description.trim()}
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
              "Tambah Tahapan"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
