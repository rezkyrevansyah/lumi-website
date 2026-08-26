"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus, Check, Upload, ImageIcon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { type AdminBrand } from "@/lib/admin-data";
import {
  createTrustedBrand,
  updateTrustedBrand,
  deleteTrustedBrand,
} from "@/actions/settings";

interface TrustedBrandsEditorProps {
  initialBrands: AdminBrand[];
}

const MAX_BYTES = 500 * 1024;

function BrandChip({
  brand,
  onRemove,
  onLogoUpload,
  onRemoveLogo,
}: {
  brand: AdminBrand;
  onRemove: () => void;
  onLogoUpload: (url: string) => void;
  onRemoveLogo: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");

    if (file.size > MAX_BYTES) {
      setUploadError(`File terlalu besar. Maks 500 KB (${(file.size / 1024).toFixed(0)} KB).`);
      e.target.value = "";
      return;
    }

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "partners");
    const res = await fetch("/api/upload", { method: "POST", body: fd });

    if (!res.ok) {
      setUploadError("Upload gagal. Coba lagi.");
    } else {
      const { url } = await res.json();
      onLogoUpload(url);
    }

    setUploading(false);
    e.target.value = "";
  }

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {brand.logoUrl ? (
            <div className="relative w-20 h-8 shrink-0">
              <Image src={brand.logoUrl} alt={brand.name} fill className="object-contain" unoptimized />
            </div>
          ) : (
            <span className="text-sm font-semibold text-[#3D3E4A] truncate"
              style={{ fontFamily: "var(--font-rubik)" }}>
              {brand.name}
            </span>
          )}
        </div>
        <button onClick={onRemove}
          className="text-muted-foreground hover:text-destructive transition-colors shrink-0">
          <X size={14} />
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors border border-border disabled:opacity-50"
          style={{ fontFamily: "var(--font-opensans)" }}>
          {uploading ? (
            <span className="w-3 h-3 rounded-full border border-muted-foreground/40 border-t-muted-foreground animate-spin" />
          ) : (
            <Upload size={11} />
          )}
          {brand.logoUrl ? "Replace logo" : "Upload logo"}
        </button>
        {brand.logoUrl && (
          <button type="button" onClick={onRemoveLogo}
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors border border-border"
            style={{ fontFamily: "var(--font-opensans)" }}>
            <X size={11} />
            Remove logo
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/png,image/svg+xml,image/jpeg,image/webp"
          className="hidden" onChange={handleFile} />
      </div>

      {uploadError && (
        <p className="flex items-center gap-1 text-[11px] text-red-500" style={{ fontFamily: "var(--font-opensans)" }}>
          <AlertCircle size={11} className="shrink-0" />
          {uploadError}
        </p>
      )}
    </div>
  );
}

export default function TrustedBrandsEditor({ initialBrands }: TrustedBrandsEditorProps) {
  const [brands, setBrands] = useState(initialBrands);
  const [input, setInput] = useState("");
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  function addBrand() {
    const val = input.trim();
    if (!val || brands.find((b) => b.name.toLowerCase() === val.toLowerCase())) {
      setInput("");
      return;
    }
    startTransition(async () => {
      const created = await createTrustedBrand({ name: val, sortOrder: brands.length + 1 });
      if (created) {
        const c = created as { id: number; name: string };
        setBrands((prev) => [...prev, { id: c.id, name: c.name, logoUrl: null, sortOrder: prev.length + 1 }]);
      }
    });
    setInput("");
  }

  function removeBrand(id: number) {
    startTransition(async () => {
      await deleteTrustedBrand(id);
      setBrands((prev) => prev.filter((b) => b.id !== id));
      setSaved(false);
    });
  }

  function setLogo(id: number, logoUrl: string) {
    startTransition(async () => {
      await updateTrustedBrand(id, { logoUrl });
      setBrands((prev) => prev.map((b) => (b.id === id ? { ...b, logoUrl } : b)));
      setSaved(false);
    });
  }

  function removeLogo(id: number) {
    startTransition(async () => {
      await updateTrustedBrand(id, { logoUrl: undefined });
      setBrands((prev) => prev.map((b) => (b.id === id ? { ...b, logoUrl: null } : b)));
      setSaved(false);
    });
  }

  function handleSave() {
    startTransition(async () => {
      await Promise.all(brands.map((b, i) => updateTrustedBrand(b.id, { sortOrder: i + 1 })));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
          Trusted Brands
        </h3>
        <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
          Client names or logos shown in the scrolling marquee on the homepage.
        </p>
      </div>

      <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-[#2DD9A4]/8 border border-[#2DD9A4]/20 mb-5">
        <ImageIcon size={14} className="text-[#2DD9A4] shrink-0 mt-0.5" />
        <p className="text-xs text-[#3D3E4A]/70" style={{ fontFamily: "var(--font-opensans)" }}>
          <span className="font-semibold text-[#3D3E4A]">Logo upload rules:</span>{" "}
          Max <strong>500 KB</strong> · Formats: PNG, SVG, JPG, WebP.
          SVG atau PNG transparan sangat disarankan agar cocok di background putih.
        </p>
      </div>

      {brands.length === 0 ? (
        <div className="p-6 rounded-2xl border border-dashed border-border text-center mb-4">
          <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
            No brands added yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-5">
          {brands.map((brand) => (
            <BrandChip
              key={brand.id}
              brand={brand}
              onRemove={() => removeBrand(brand.id)}
              onLogoUpload={(url) => setLogo(brand.id, url)}
              onRemoveLogo={() => removeLogo(brand.id)}
            />
          ))}
        </div>
      )}

      <div className="flex gap-2 max-w-sm mb-5">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addBrand()}
          placeholder="Brand name (e.g. TechMart)"
          style={{ fontFamily: "var(--font-opensans)" }}
        />
        <Button variant="outline" onClick={addBrand} className="gap-1.5 shrink-0"
          style={{ fontFamily: "var(--font-opensans)" }}>
          <Plus size={14} /> Add
        </Button>
      </div>

      <Button
        onClick={handleSave}
        disabled={isPending}
        className={cn("gap-2", saved ? "bg-green-500 hover:bg-green-600 text-white" : "btn-primary")}
        style={{ fontFamily: "var(--font-opensans)" }}
      >
        {saved ? <><Check size={14} /> Saved!</> : isPending ? "Saving…" : "Save Changes"}
      </Button>
    </div>
  );
}
