"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Trash2, Upload, AlertCircle, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import PageHeader from "@/components/admin/shared/PageHeader";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  createCertification,
  updateCertification,
  deleteCertification,
} from "@/actions/settings";

interface Certification {
  id: number;
  imageUrl: string;
  altText: string;
  isDark: boolean | null;
  sortOrder: number | null;
}

interface CertificationListProps {
  initialItems: Certification[];
}

const MAX_BYTES = 2 * 1024 * 1024;

function AddCertDialog({
  open,
  onOpenChange,
  onAdd,
  saving,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (data: { imageUrl: string; altText: string; isDark: boolean }) => void;
  saving?: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [altText, setAltText] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  function reset() {
    setAltText("");
    setIsDark(false);
    setPreviewUrl(null);
    setPendingFile(null);
    setUploadError("");
  }

  function handleOpen(v: boolean) {
    if (!v) reset();
    onOpenChange(v);
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    if (file.size > MAX_BYTES) {
      setUploadError(`File terlalu besar. Maks 2 MB (${(file.size / 1024 / 1024).toFixed(1)} MB).`);
      e.target.value = "";
      return;
    }
    setPreviewUrl(URL.createObjectURL(file));
    setPendingFile(file);
    e.target.value = "";
  }

  async function handleSave() {
    if (!pendingFile || !altText.trim()) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", pendingFile);
    fd.append("folder", "certifications");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) {
      setUploadError("Upload gagal. Coba lagi.");
      setUploading(false);
      return;
    }
    const { url } = await res.json();
    setUploading(false);
    onAdd({ imageUrl: url, altText: altText.trim(), isDark });
  }

  const labelStyle = { fontFamily: "var(--font-opensans)" };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-rubik)" }}>Add Certification</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label style={labelStyle}>Gambar Sertifikat *</Label>
            {previewUrl ? (
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-muted">
                <Image src={previewUrl} alt="Preview" fill className="object-contain" unoptimized />
                <button type="button"
                  onClick={() => { setPreviewUrl(null); setPendingFile(null); }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center text-xs hover:bg-black/80">
                  ×
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => fileRef.current?.click()}
                className="w-full aspect-video rounded-xl border-2 border-dashed border-border hover:border-[#2DD9A4] bg-[#F8F9FB] flex flex-col items-center justify-center gap-2 transition-all group">
                <ImageIcon size={22} className="text-muted-foreground group-hover:text-[#2DD9A4]" />
                <p className="text-xs text-muted-foreground" style={labelStyle}>
                  PNG, JPG, WebP · Maks 2 MB
                </p>
              </button>
            )}
            {uploadError && (
              <p className="flex items-center gap-1 text-xs text-red-500" style={labelStyle}>
                <AlertCircle size={12} className="shrink-0" />{uploadError}
              </p>
            )}
            <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleFile} />
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Alt Text *</Label>
            <Input value={altText} onChange={(e) => setAltText(e.target.value)}
              placeholder="Sertifikat ISO 9001" style={labelStyle} />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isDark} onChange={(e) => setIsDark(e.target.checked)}
              className="w-4 h-4 rounded accent-[#2DD9A4]" />
            <span className="text-sm text-muted-foreground" style={labelStyle}>
              Gunakan background gelap (untuk logo putih)
            </span>
          </label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpen(false)} style={labelStyle}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving || uploading || !pendingFile || !altText.trim()}
            className="btn-primary" style={labelStyle}>
            {(saving || uploading) ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Uploading…
              </span>
            ) : "Add Certification"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function CertificationList({ initialItems }: CertificationListProps) {
  const [items, setItems] = useState<Certification[]>(initialItems);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleAdd(data: { imageUrl: string; altText: string; isDark: boolean }) {
    startTransition(async () => {
      const created = await createCertification({
        imageUrl: data.imageUrl,
        altText: data.altText,
        isDark: data.isDark,
        sortOrder: items.length + 1,
      });
      if (created) setItems((prev) => [...prev, created as Certification]);
      setDialogOpen(false);
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      await deleteCertification(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setDeleteId(null);
    });
  }

  async function toggleDark(id: number, isDark: boolean) {
    startTransition(async () => {
      await updateCertification(id, { isDark: !isDark });
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, isDark: !isDark } : i)));
    });
  }

  return (
    <>
      <PageHeader
        title="Certifications"
        description={`${items.length} sertifikat`}
        action={
          <Button onClick={() => setDialogOpen(true)} className="btn-primary gap-2"
            style={{ fontFamily: "var(--font-opensans)" }}>
            <Plus size={15} />
            Add Certification
          </Button>
        }
      />

      {items.length === 0 ? (
        <div className="py-12 text-center rounded-2xl border border-dashed border-border bg-white">
          <Upload size={28} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#3D3E4A] mb-1" style={{ fontFamily: "var(--font-rubik)" }}>
            Belum ada sertifikat
          </p>
          <p className="text-sm text-muted-foreground mb-4" style={{ fontFamily: "var(--font-opensans)" }}>
            Upload gambar sertifikat atau penghargaan.
          </p>
          <Button onClick={() => setDialogOpen(true)} className="btn-primary gap-2"
            style={{ fontFamily: "var(--font-opensans)" }}>
            <Plus size={14} /> Add Certification
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((cert) => (
            <div key={cert.id}
              className="rounded-2xl border border-border shadow-sm overflow-hidden group relative">
              <div className={`relative aspect-video w-full ${cert.isDark ? "bg-gray-900" : "bg-white"}`}>
                <Image src={cert.imageUrl} alt={cert.altText} fill className="object-contain p-2" unoptimized />
              </div>
              <div className="p-3 bg-white border-t border-border">
                <p className="text-xs text-[#3D3E4A] font-medium line-clamp-1 mb-2"
                  style={{ fontFamily: "var(--font-opensans)" }}>
                  {cert.altText}
                </p>
                <div className="flex items-center justify-between">
                  <button onClick={() => toggleDark(cert.id, cert.isDark ?? false)}
                    className="text-[11px] text-muted-foreground hover:text-[#3D3E4A] transition-colors"
                    style={{ fontFamily: "var(--font-opensans)" }}>
                    {cert.isDark ? "Dark bg" : "Light bg"}
                  </button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteId(cert.id)}
                    className="h-6 w-6 text-muted-foreground hover:text-destructive">
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddCertDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={handleAdd}
        saving={isPending}
      />

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus sertifikat?"
        description="Gambar akan dihapus permanen dari database."
        onConfirm={() => deleteId !== null && handleDelete(deleteId)}
      />
    </>
  );
}
