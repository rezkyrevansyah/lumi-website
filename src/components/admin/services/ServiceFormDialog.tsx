"use client";

import { useEffect, useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import TagInput from "@/components/admin/shared/TagInput";
import { type AdminService } from "@/lib/admin-data";
import { type Service } from "@/lib/data";

interface ServiceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminService;
  onSave: (data: AdminService) => void;
}

const ICON_TYPES: Service["iconType"][] = ["path", "polylines", "circle-clock", "home"];
const ICON_LABELS: Record<Service["iconType"], string> = {
  path: "Pencil (Design)",
  polylines: "Code (Development)",
  "circle-clock": "Clock (Consulting)",
  home: "Home (Rebuild)",
};

export default function ServiceFormDialog({ open, onOpenChange, item, onSave }: ServiceFormDialogProps) {
  const [form, setForm] = useState({ ...item });

  useEffect(() => {
    setForm({ ...item });
  }, [item, open]);

  function set(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.title.trim()) return;
    onSave(form);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-rubik)" }}>Edit Service</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Title *</Label>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)}
              style={{ fontFamily: "var(--font-opensans)" }} />
          </div>

          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Description</Label>
            <Textarea value={form.desc} onChange={(e) => set("desc", e.target.value)}
              rows={4} style={{ fontFamily: "var(--font-opensans)" }} />
          </div>

          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Tags</Label>
            <TagInput tags={form.tags} onChange={(tags) => set("tags", tags)} />
          </div>

          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Icon Type</Label>
            <Select value={form.iconType} onValueChange={(v) => set("iconType", v)}>
              <SelectTrigger style={{ fontFamily: "var(--font-opensans)" }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ICON_TYPES.map((t) => (
                  <SelectItem key={t} value={t} style={{ fontFamily: "var(--font-opensans)" }}>
                    {ICON_LABELS[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} style={{ fontFamily: "var(--font-opensans)" }}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="btn-primary" style={{ fontFamily: "var(--font-opensans)" }}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
