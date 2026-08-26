"use client";

import { useState, useTransition, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import TagInput from "@/components/admin/shared/TagInput";
import { updateFounder } from "@/actions/about";
import { Upload, Check, AlertCircle, ImageIcon } from "lucide-react";

export interface FounderData {
  name?: string;
  title?: string;
  bio?: string;
  photoUrl?: string;
  photo_url?: string;
  credentials?: string[];
  quote?: string;
  fastworkUrl?: string;
  fastwork_url?: string;
}

interface FounderFormProps {
  initialData: FounderData | null;
}

const MAX_BYTES = 2 * 1024 * 1024; // 2MB

export default function FounderForm({ initialData }: FounderFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [bio, setBio] = useState(initialData?.bio || "");
  const [photoUrl, setPhotoUrl] = useState(initialData?.photoUrl || initialData?.photo_url || "");
  const [credentials, setCredentials] = useState<string[]>(initialData?.credentials || []);
  const [quote, setQuote] = useState(initialData?.quote || "");
  const [fastworkUrl, setFastworkUrl] = useState(initialData?.fastworkUrl || initialData?.fastwork_url || "");

  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isPending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  const labelStyle = { fontFamily: "var(--font-opensans)" };

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");

    if (file.size > MAX_BYTES) {
      setUploadError(`Ukuran file maksimal 2 MB (${(file.size / 1024 / 1024).toFixed(1)} MB).`);
      e.target.value = "";
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "about");

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal mengunggah gambar.");
      }
      const data = await res.json();
      setPhotoUrl(data.url);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal mengunggah gambar.";
      setUploadError(message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function handleSave() {
    startTransition(async () => {
      await updateFounder({
        name: name.trim(),
        title: title.trim(),
        bio: bio.trim(),
        photoUrl: photoUrl.trim(),
        credentials,
        quote: quote.trim(),
        fastworkUrl: fastworkUrl.trim() || undefined,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h3 className="text-base font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
            Profil Founder
          </h3>
          <p className="text-sm text-muted-foreground" style={labelStyle}>
            Informasi profil founder yang tampil pada halaman About.
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isPending || uploading || !name.trim()}
          className={saved ? "bg-green-500 hover:bg-green-600 text-white gap-2" : "btn-primary gap-2"}
          style={labelStyle}
        >
          {saved ? (
            <>
              <Check size={14} /> Tersimpan
            </>
          ) : isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Menyimpan…
            </span>
          ) : (
            "Simpan Perubahan"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Photo Upload */}
        <div className="md:col-span-4 space-y-4">
          <Label style={labelStyle}>Foto Founder</Label>
          <div className="border border-border rounded-2xl p-4 bg-[#F8F9FB] flex flex-col items-center gap-3">
            {photoUrl ? (
              <div className="relative w-40 h-48 rounded-xl overflow-hidden border border-border bg-white shadow-sm">
                <Image
                  src={photoUrl}
                  alt={name || "Founder"}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-40 h-48 rounded-xl border-2 border-dashed border-border bg-white flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon size={32} className="mb-2 opacity-50" />
                <span className="text-xs" style={labelStyle}>Belum ada foto</span>
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleFileUpload}
            />

            <div className="flex flex-col w-full gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="w-full gap-2"
                style={labelStyle}
              >
                {uploading ? (
                  <>
                    <span className="w-3 h-3 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                    Mengunggah…
                  </>
                ) : (
                  <>
                    <Upload size={13} />
                    Unggah Foto
                  </>
                )}
              </Button>
              {photoUrl && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setPhotoUrl("")}
                  className="text-xs text-muted-foreground hover:text-destructive"
                  style={labelStyle}
                >
                  Hapus Foto
                </Button>
              )}
            </div>

            {uploadError && (
              <p className="flex items-center gap-1 text-xs text-destructive mt-1" style={labelStyle}>
                <AlertCircle size={12} className="shrink-0" />
                {uploadError}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>URL Foto (Manual)</Label>
            <Input
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://... atau /profile_founder/revan_photo1.png"
              style={labelStyle}
            />
          </div>
        </div>

        {/* Right Column: Fields */}
        <div className="md:col-span-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label style={labelStyle}>Nama Lengkap *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="M. Rezky Revansyah Suprihono"
                style={labelStyle}
              />
            </div>
            <div className="space-y-1.5">
              <Label style={labelStyle}>Jabatan / Role *</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Founder & Lead Developer"
                style={labelStyle}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Biografi *</Label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Ceritakan latar belakang profesional dan keahlian founder…"
              rows={4}
              style={labelStyle}
            />
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Kredensial & Penghargaan</Label>
            <TagInput
              tags={credentials}
              onChange={setCredentials}
              placeholder="Ketik kredensial lalu tekan Enter…"
            />
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Founder Quote *</Label>
            <Textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Kutipan atau filosofi founder dalam bekerja…"
              rows={3}
              style={labelStyle}
            />
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Link Profil Fastwork (Opsional)</Label>
            <Input
              value={fastworkUrl}
              onChange={(e) => setFastworkUrl(e.target.value)}
              placeholder="https://fastwork.id/user/revansyah..."
              style={labelStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
