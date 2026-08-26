"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, X, AlertCircle, ImageIcon } from "lucide-react";
import TagInput from "@/components/admin/shared/TagInput";
import { type AdminPortfolioItem } from "@/lib/admin-data";

type FormData = Omit<AdminPortfolioItem, "id"> & { id?: number };

interface PortfolioFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminPortfolioItem | null;
  onSave: (data: FormData) => void;
  saving?: boolean;
}

const BLANK: FormData = {
  title: "",
  client: "",
  category: "",
  description: "",
  tags: [],
  platforms: [],
  accentColor: "#2DD9A4",
  bgColor: "#0F1923",
  imageUrl: null,
  demoUrl: null,
  isUmkmCaseStudy: false,
  isPublished: true,
  sortOrder: 0,
};

const MAX_BYTES = 5 * 1024 * 1024;

export default function PortfolioFormDialog({ open, onOpenChange, item, onSave, saving }: PortfolioFormDialogProps) {
  const [form, setForm] = useState<FormData>({ ...BLANK });
  const [imgError, setImgError] = useState("");
  const [imgLoading, setImgLoading] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(item ? {
      id: item.id,
      title: item.title,
      client: item.client,
      category: item.category,
      description: item.description,
      tags: item.tags ?? [],
      platforms: item.platforms ?? [],
      accentColor: item.accentColor ?? "#2DD9A4",
      bgColor: item.bgColor ?? "#0F1923",
      imageUrl: item.imageUrl ?? null,
      demoUrl: item.demoUrl ?? null,
      isUmkmCaseStudy: item.isUmkmCaseStudy ?? false,
      isPublished: item.isPublished ?? true,
      sortOrder: item.sortOrder ?? 0,
    } : { ...BLANK });
    setImgError("");
    setPendingFile(null);
  }, [item, open]);

  function set(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function togglePlatform(p: string) {
    setForm((prev) => {
      const current = prev.platforms ?? [];
      return {
        ...prev,
        platforms: current.includes(p) ? current.filter((x) => x !== p) : [...current, p],
      };
    });
  }

  async function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgError("");
    if (file.size > MAX_BYTES) {
      setImgError(`File terlalu besar. Maks 5 MB (file kamu: ${(file.size / 1024 / 1024).toFixed(1)} MB).`);
      e.target.value = "";
      return;
    }
    setImgLoading(true);
    const previewUrl = URL.createObjectURL(file);
    set("imageUrl", previewUrl);
    setPendingFile(file);
    setImgLoading(false);
    e.target.value = "";
  }

  async function handleSave() {
    if (!form.title.trim()) return;

    let finalImageUrl = typeof form.imageUrl === "string" && form.imageUrl.startsWith("blob:")
      ? null
      : form.imageUrl;

    if (pendingFile) {
      const fd = new FormData();
      fd.append("file", pendingFile);
      fd.append("folder", "projects");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        setImgError("Upload gagal. Coba lagi.");
        return;
      }
      const { url } = await res.json();
      finalImageUrl = url;
    }

    onSave({ ...form, imageUrl: finalImageUrl });
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
          {/* Image */}
          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Project Image</Label>
            {form.imageUrl ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-muted">
                <Image src={form.imageUrl} alt="Preview" fill className="object-cover" unoptimized />
                <button
                  type="button"
                  onClick={() => { set("imageUrl", null); setPendingFile(null); setImgError(""); }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white"
                >
                  <X size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white text-xs font-medium"
                  style={{ fontFamily: "var(--font-opensans)" }}
                >
                  <Upload size={12} /> Replace
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full aspect-video rounded-2xl border-2 border-dashed border-border hover:border-[#2DD9A4] bg-[#F8F9FB] hover:bg-[#2DD9A4]/5 flex flex-col items-center justify-center gap-3 transition-all group"
              >
                {imgLoading ? (
                  <span className="w-8 h-8 rounded-full border-2 border-[#2DD9A4]/30 border-t-[#2DD9A4] animate-spin" />
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-border flex items-center justify-center shadow-sm">
                      <ImageIcon size={22} className="text-muted-foreground group-hover:text-[#2DD9A4]" />
                    </div>
                    <p className="text-sm font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
                      Upload Project Image
                    </p>
                  </>
                )}
              </button>
            )}
            <p className="text-[11px] text-muted-foreground px-1" style={{ fontFamily: "var(--font-opensans)" }}>
              PNG, JPG, WebP · Maks 5 MB
            </p>
            {imgError && (
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs">
                <AlertCircle size={12} className="shrink-0" />
                {imgError}
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleImageFile} />
          </div>

          {/* Fields */}
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
              placeholder="Government • HR System" style={{ fontFamily: "var(--font-opensans)" }} />
          </div>

          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Description</Label>
            <Textarea value={form.description} onChange={(e) => set("description", e.target.value)}
              placeholder="Brief project description…" rows={3} style={{ fontFamily: "var(--font-opensans)" }} />
          </div>

          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Demo URL</Label>
            <Input value={form.demoUrl ?? ""} onChange={(e) => set("demoUrl", e.target.value || null)}
              placeholder="https://example.com" style={{ fontFamily: "var(--font-opensans)" }} />
          </div>

          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Tags</Label>
            <TagInput tags={form.tags ?? []} onChange={(tags) => set("tags", tags)} />
          </div>

          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Platforms</Label>
            <div className="flex gap-4">
              {(["web", "android", "ios"] as const).map((p) => (
                <label key={p} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(form.platforms ?? []).includes(p)}
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
                <input type="color" value={form.accentColor ?? "#2DD9A4"} onChange={(e) => set("accentColor", e.target.value)}
                  className="w-10 h-8 rounded border border-border cursor-pointer" />
                <Input value={form.accentColor ?? ""} onChange={(e) => set("accentColor", e.target.value)}
                  className="font-mono text-xs" style={{ fontFamily: "var(--font-opensans)" }} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label style={{ fontFamily: "var(--font-opensans)" }}>Background Color</Label>
              <div className="flex items-center gap-2">
                <input type="color" value={form.bgColor ?? "#0F1923"} onChange={(e) => set("bgColor", e.target.value)}
                  className="w-10 h-8 rounded border border-border cursor-pointer" />
                <Input value={form.bgColor ?? ""} onChange={(e) => set("bgColor", e.target.value)}
                  className="font-mono text-xs" style={{ fontFamily: "var(--font-opensans)" }} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="umkm-flag"
              checked={form.isUmkmCaseStudy ?? false}
              onChange={(e) => set("isUmkmCaseStudy", e.target.checked)}
              className="rounded border-border w-4 h-4 accent-[#2DD9A4]"
            />
            <label htmlFor="umkm-flag" className="text-sm text-muted-foreground cursor-pointer"
              style={{ fontFamily: "var(--font-opensans)" }}>
              Tandai sebagai UMKM case study
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} style={{ fontFamily: "var(--font-opensans)" }}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || imgLoading} className="btn-primary"
            style={{ fontFamily: "var(--font-opensans)" }}>
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Saving…
              </span>
            ) : item ? "Save Changes" : "Add Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
