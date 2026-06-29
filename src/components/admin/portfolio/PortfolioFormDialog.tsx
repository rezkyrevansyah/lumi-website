"use client";

import { useEffect, useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import TagInput from "@/components/admin/shared/TagInput";
import { type AdminPortfolioItem } from "@/lib/admin-data";

interface PortfolioFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminPortfolioItem | null;
  onSave: (data: AdminPortfolioItem) => void;
}

const BLANK: Omit<AdminPortfolioItem, "id"> = {
  title: "",
  client: "",
  category: "",
  description: "",
  tags: [],
  platforms: [],
  color: "#2DD9A4",
  bg: "#0F1923",
};

export default function PortfolioFormDialog({ open, onOpenChange, item, onSave }: PortfolioFormDialogProps) {
  const [form, setForm] = useState({ ...BLANK });

  useEffect(() => {
    setForm(item ? { ...item } : { ...BLANK });
  }, [item, open]);

  function set(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function togglePlatform(p: "web" | "android" | "ios") {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(p)
        ? prev.platforms.filter((x) => x !== p)
        : [...prev.platforms, p],
    }));
  }

  function handleSave() {
    if (!form.title.trim()) return;
    onSave({ ...form, id: item?.id ?? String(Date.now()) });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-rubik)" }}>
            {item ? "Edit Portfolio Item" : "Add Portfolio Item"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label style={{ fontFamily: "var(--font-opensans)" }}>Project Title *</Label>
              <Input value={form.title} onChange={(e) => set("title", e.target.value)}
                placeholder="Sistem Kepegawaian Online" style={{ fontFamily: "var(--font-opensans)" }} />
            </div>
            <div className="space-y-1.5">
              <Label style={{ fontFamily: "var(--font-opensans)" }}>Client</Label>
              <Input value={form.client} onChange={(e) => set("client", e.target.value)}
                placeholder="BKD Pemprov" style={{ fontFamily: "var(--font-opensans)" }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Category</Label>
            <Input value={form.category} onChange={(e) => set("category", e.target.value)}
              placeholder="Government • HR" style={{ fontFamily: "var(--font-opensans)" }} />
          </div>

          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Description</Label>
            <Textarea value={form.description} onChange={(e) => set("description", e.target.value)}
              placeholder="Brief description of the project…" rows={3}
              style={{ fontFamily: "var(--font-opensans)" }} />
          </div>

          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Tags</Label>
            <TagInput tags={form.tags} onChange={(tags) => set("tags", tags)} />
          </div>

          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Platforms</Label>
            <div className="flex gap-3">
              {(["web", "android", "ios"] as const).map((p) => (
                <label key={p} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.platforms.includes(p)}
                    onChange={() => togglePlatform(p)}
                    className="rounded border-border w-4 h-4 accent-[#2DD9A4]"
                  />
                  <span className="text-sm capitalize" style={{ fontFamily: "var(--font-opensans)" }}>{p}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label style={{ fontFamily: "var(--font-opensans)" }}>Accent Color</Label>
              <div className="flex items-center gap-2">
                <input type="color" value={form.color} onChange={(e) => set("color", e.target.value)}
                  className="w-10 h-8 rounded border border-border cursor-pointer" />
                <Input value={form.color} onChange={(e) => set("color", e.target.value)}
                  className="font-mono text-xs" style={{ fontFamily: "var(--font-opensans)" }} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label style={{ fontFamily: "var(--font-opensans)" }}>Background Color</Label>
              <div className="flex items-center gap-2">
                <input type="color" value={form.bg} onChange={(e) => set("bg", e.target.value)}
                  className="w-10 h-8 rounded border border-border cursor-pointer" />
                <Input value={form.bg} onChange={(e) => set("bg", e.target.value)}
                  className="font-mono text-xs" style={{ fontFamily: "var(--font-opensans)" }} />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} style={{ fontFamily: "var(--font-opensans)" }}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="btn-primary" style={{ fontFamily: "var(--font-opensans)" }}>
            {item ? "Save Changes" : "Add Item"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
