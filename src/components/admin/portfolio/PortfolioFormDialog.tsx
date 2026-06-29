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
  imageUrl: undefined,
};

// Image upload constraints: exactly 1080×1080, max 2MB
const IMG_SIZE = 1080;
const MAX_BYTES = 2 * 1024 * 1024; // 2 MB

function validatePortfolioImage(file: File): Promise<{ ok: boolean; error?: string; dataUrl?: string }> {
  return new Promise((resolve) => {
    if (file.size > MAX_BYTES) {
      return resolve({
        ok: false,
        error: `File terlalu besar. Maks 2 MB (file kamu: ${(file.size / 1024 / 1024).toFixed(1)} MB).`,
      });
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new window.Image();
      img.onload = () => {
        if (img.width !== IMG_SIZE || img.height !== IMG_SIZE) {
          resolve({
            ok: false,
            error: `Ukuran harus tepat ${IMG_SIZE}×${IMG_SIZE}px (file kamu: ${img.width}×${img.height}px).`,
          });
        } else {
          resolve({ ok: true, dataUrl });
        }
      };
      img.onerror = () => resolve({ ok: false, error: "File gambar tidak valid." });
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

export default function PortfolioFormDialog({ open, onOpenChange, item, onSave }: PortfolioFormDialogProps) {
  const [form, setForm] = useState({ ...BLANK });
  const [imgError, setImgError] = useState("");
  const [imgLoading, setImgLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(item ? { ...item } : { ...BLANK });
    setImgError("");
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

  async function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgError("");
    setImgLoading(true);
    const result = await validatePortfolioImage(file);
    setImgLoading(false);
    if (!result.ok) {
      setImgError(result.error ?? "File tidak valid.");
    } else {
      set("imageUrl", result.dataUrl);
    }
    e.target.value = "";
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
          {/* ── Project Image ───────────────────────────────────── */}
          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Project Image</Label>

            {form.imageUrl ? (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-border bg-muted">
                <Image
                  src={form.imageUrl}
                  alt="Project preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={() => { set("imageUrl", undefined); setImgError(""); }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
                >
                  <X size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white text-xs font-medium transition-colors"
                  style={{ fontFamily: "var(--font-opensans)" }}
                >
                  <Upload size={12} /> Replace
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full aspect-square rounded-2xl border-2 border-dashed border-border hover:border-[#2DD9A4] bg-[#F8F9FB] hover:bg-[#2DD9A4]/5 flex flex-col items-center justify-center gap-3 transition-all group"
              >
                {imgLoading ? (
                  <span className="w-8 h-8 rounded-full border-2 border-[#2DD9A4]/30 border-t-[#2DD9A4] animate-spin" />
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-border flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <ImageIcon size={22} className="text-muted-foreground group-hover:text-[#2DD9A4] transition-colors" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
                        Upload Project Image
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "var(--font-opensans)" }}>
                        Klik untuk pilih file
                      </p>
                    </div>
                  </>
                )}
              </button>
            )}

            {/* Upload rules */}
            <div className="flex items-start gap-1.5 px-3 py-2 rounded-xl bg-[#2DD9A4]/8 border border-[#2DD9A4]/20">
              <ImageIcon size={12} className="text-[#2DD9A4] shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#3D3E4A]/70" style={{ fontFamily: "var(--font-opensans)" }}>
                Ukuran tepat <strong>{IMG_SIZE}×{IMG_SIZE}px</strong> · Maks <strong>2 MB</strong> · PNG, JPG, WebP
              </p>
            </div>

            {imgError && (
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs"
                style={{ fontFamily: "var(--font-opensans)" }}>
                <AlertCircle size={12} className="shrink-0" />
                {imgError}
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleImageFile}
            />
          </div>

          {/* ── Text fields ─────────────────────────────────────── */}
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
