"use client";

import { useEffect, useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import TagInput from "@/components/admin/shared/TagInput";
import { type AdminService } from "@/lib/admin-data";

type FormData = Omit<AdminService, "id"> & { id?: number };

interface ServiceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminService | null;
  onSave: (data: FormData) => void;
  saving?: boolean;
}

const BLANK: FormData = {
  title: "",
  shortDesc: "",
  summary: null,
  badgeLabel: null,
  badgeColor: null,
  deliverables: [],
  techStack: [],
  slaLabel: null,
  iconPath: null,
  iconType: "path",
  slug: "",
  waMessage: null,
  tags: [],
  sortOrder: 0,
};

export default function ServiceFormDialog({ open, onOpenChange, item, onSave, saving }: ServiceFormDialogProps) {
  const [form, setForm] = useState<FormData>({ ...BLANK });

  useEffect(() => {
    setForm(item ? {
      id: item.id,
      title: item.title,
      shortDesc: item.shortDesc,
      summary: item.summary ?? null,
      badgeLabel: item.badgeLabel ?? null,
      badgeColor: item.badgeColor ?? null,
      deliverables: item.deliverables ?? [],
      techStack: item.techStack ?? [],
      slaLabel: item.slaLabel ?? null,
      iconPath: item.iconPath ?? null,
      iconType: item.iconType ?? "path",
      slug: item.slug,
      waMessage: item.waMessage ?? null,
      tags: item.tags ?? [],
      sortOrder: item.sortOrder ?? 0,
    } : { ...BLANK });
  }, [item, open]);

  function set(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.title.trim() || !form.slug.trim()) return;
    onSave(form);
  }

  const labelStyle = { fontFamily: "var(--font-opensans)" };
  const inputStyle = { fontFamily: "var(--font-opensans)" };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-rubik)" }}>
            {item ? "Edit Service" : "Add Service"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label style={labelStyle}>Nama Layanan *</Label>
              <Input value={form.title} onChange={(e) => set("title", e.target.value)}
                placeholder="Website Profesional" style={inputStyle} />
            </div>
            <div className="space-y-1.5">
              <Label style={labelStyle}>Slug *</Label>
              <Input value={form.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                placeholder="website-profesional" className="font-mono text-sm" style={inputStyle} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Short Description *</Label>
            <Input value={form.shortDesc} onChange={(e) => set("shortDesc", e.target.value)}
              placeholder="Deskripsi singkat untuk kartu layanan" style={inputStyle} />
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Summary (opsional)</Label>
            <Textarea value={form.summary ?? ""} onChange={(e) => set("summary", e.target.value || null)}
              placeholder="Paragraf penjelasan panjang tentang layanan ini…" rows={3} style={inputStyle} />
          </div>

          <Separator />

          {/* Badge */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3"
              style={{ fontFamily: "var(--font-rubik)" }}>
              Badge / Label
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label style={labelStyle}>Badge Label</Label>
                <Input value={form.badgeLabel ?? ""} onChange={(e) => set("badgeLabel", e.target.value || null)}
                  placeholder="Paling Populer" style={inputStyle} />
              </div>
              <div className="space-y-1.5">
                <Label style={labelStyle}>Badge Color</Label>
                <div className="flex items-center gap-2">
                  <input type="color" value={form.badgeColor ?? "#6C63FF"}
                    onChange={(e) => set("badgeColor", e.target.value)}
                    className="w-10 h-8 rounded border border-border cursor-pointer" />
                  <Input value={form.badgeColor ?? ""}
                    onChange={(e) => set("badgeColor", e.target.value || null)}
                    className="font-mono text-xs" placeholder="#6C63FF" style={inputStyle} />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Deliverables & Tech Stack */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3"
              style={{ fontFamily: "var(--font-rubik)" }}>
              Deliverables & Tech Stack
            </p>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label style={labelStyle}>Deliverables (apa yang didapat klien)</Label>
                <TagInput tags={form.deliverables ?? []} onChange={(t) => set("deliverables", t)}
                  placeholder="Tambah deliverable, enter untuk konfirmasi" />
              </div>
              <div className="space-y-1.5">
                <Label style={labelStyle}>Tech Stack</Label>
                <TagInput tags={form.techStack ?? []} onChange={(t) => set("techStack", t)}
                  placeholder="React, Next.js, Laravel, dll…" />
              </div>
              <div className="space-y-1.5">
                <Label style={labelStyle}>Tags</Label>
                <TagInput tags={form.tags ?? []} onChange={(t) => set("tags", t)}
                  placeholder="Web, Mobile, Backend…" />
              </div>
            </div>
          </div>

          <Separator />

          {/* SLA & CTA */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3"
              style={{ fontFamily: "var(--font-rubik)" }}>
              SLA & Call to Action
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label style={labelStyle}>SLA Label</Label>
                <Input value={form.slaLabel ?? ""} onChange={(e) => set("slaLabel", e.target.value || null)}
                  placeholder="Selesai dalam 2-4 Minggu" style={inputStyle} />
              </div>
              <div className="space-y-1.5">
                <Label style={labelStyle}>WA Message (untuk tombol CTA)</Label>
                <Input value={form.waMessage ?? ""} onChange={(e) => set("waMessage", e.target.value || null)}
                  placeholder="Halo, saya tertarik dengan layanan Website…" style={inputStyle} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Icon */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3"
              style={{ fontFamily: "var(--font-rubik)" }}>
              Icon
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label style={labelStyle}>Icon Type</Label>
                <select
                  value={form.iconType ?? "path"}
                  onChange={(e) => set("iconType", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={inputStyle}
                >
                  <option value="path">SVG Path</option>
                  <option value="emoji">Emoji</option>
                  <option value="component">Component Name</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label style={labelStyle}>Icon Path / Value</Label>
                <Input value={form.iconPath ?? ""} onChange={(e) => set("iconPath", e.target.value || null)}
                  placeholder="M3 12L5 10M21 12… atau 🌐" style={inputStyle} />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} style={labelStyle}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || !form.title.trim() || !form.slug.trim()}
            className="btn-primary" style={labelStyle}>
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Saving…
              </span>
            ) : item ? "Save Changes" : "Add Service"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
