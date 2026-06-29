"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Plus, Check, Upload, ImageIcon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { type AdminBrand } from "@/lib/admin-data";

interface TrustedBrandsEditorProps {
  initialBrands: AdminBrand[];
}

// Logo upload constraints
const MAX_WIDTH = 400;
const MAX_HEIGHT = 200;
const MAX_BYTES = 500 * 1024; // 500 KB

function validateImage(file: File): Promise<{ ok: boolean; error?: string; dataUrl?: string }> {
  return new Promise((resolve) => {
    if (file.size > MAX_BYTES) {
      return resolve({ ok: false, error: `File too large. Max size is 500 KB (current: ${(file.size / 1024).toFixed(0)} KB).` });
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new window.Image();
      img.onload = () => {
        if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
          resolve({
            ok: false,
            error: `Image too large. Max ${MAX_WIDTH}×${MAX_HEIGHT}px (yours: ${img.width}×${img.height}px).`,
          });
        } else {
          resolve({ ok: true, dataUrl });
        }
      };
      img.onerror = () => resolve({ ok: false, error: "Invalid image file." });
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

function BrandChip({
  brand,
  onRemove,
  onLogoUpload,
  onRemoveLogo,
}: {
  brand: AdminBrand;
  onRemove: () => void;
  onLogoUpload: (dataUrl: string) => void;
  onRemoveLogo: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    const result = await validateImage(file);
    if (!result.ok) {
      setUploadError(result.error ?? "Invalid file.");
    } else {
      onLogoUpload(result.dataUrl!);
    }
    // reset input so same file can be re-selected
    e.target.value = "";
  }

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {brand.logoUrl ? (
            <div className="relative w-20 h-8 shrink-0">
              <Image
                src={brand.logoUrl}
                alt={brand.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          ) : (
            <span
              className="text-sm font-semibold text-[#3D3E4A] truncate"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              {brand.name}
            </span>
          )}
        </div>
        <button
          onClick={onRemove}
          className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
          title="Remove brand"
        >
          <X size={14} />
        </button>
      </div>

      {/* Logo actions */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors border border-border"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          <Upload size={11} />
          {brand.logoUrl ? "Replace logo" : "Upload logo"}
        </button>
        {brand.logoUrl && (
          <button
            type="button"
            onClick={onRemoveLogo}
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors border border-border"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            <X size={11} />
            Remove logo
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/svg+xml,image/jpeg,image/webp"
          className="hidden"
          onChange={handleFile}
        />
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

  function addBrand() {
    const val = input.trim();
    if (val && !brands.find((b) => b.name.toLowerCase() === val.toLowerCase())) {
      setBrands((prev) => [...prev, { id: String(Date.now()), name: val }]);
      setSaved(false);
    }
    setInput("");
  }

  function removeBrand(id: string) {
    setBrands((prev) => prev.filter((b) => b.id !== id));
    setSaved(false);
  }

  function setLogo(id: string, logoUrl: string) {
    setBrands((prev) => prev.map((b) => (b.id === id ? { ...b, logoUrl } : b)));
    setSaved(false);
  }

  function removeLogo(id: string) {
    setBrands((prev) => prev.map((b) => (b.id === id ? { ...b, logoUrl: undefined } : b)));
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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

      {/* Upload rules */}
      <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-[#2DD9A4]/8 border border-[#2DD9A4]/20 mb-5">
        <ImageIcon size={14} className="text-[#2DD9A4] shrink-0 mt-0.5" />
        <p className="text-xs text-[#3D3E4A]/70" style={{ fontFamily: "var(--font-opensans)" }}>
          <span className="font-semibold text-[#3D3E4A]">Logo upload rules:</span>{" "}
          Max <strong>400 × 200 px</strong> · Max <strong>500 KB</strong> · Formats: PNG, SVG, JPG, WebP.
          SVG atau PNG transparan sangat disarankan agar cocok di background putih.
        </p>
      </div>

      {/* Brand cards */}
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
              onLogoUpload={(dataUrl) => setLogo(brand.id, dataUrl)}
              onRemoveLogo={() => removeLogo(brand.id)}
            />
          ))}
        </div>
      )}

      {/* Add new brand */}
      <div className="flex gap-2 max-w-sm mb-5">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addBrand()}
          placeholder="Brand name (e.g. TechMart)"
          style={{ fontFamily: "var(--font-opensans)" }}
        />
        <Button
          variant="outline"
          onClick={addBrand}
          className="gap-1.5 shrink-0"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          <Plus size={14} /> Add
        </Button>
      </div>

      <Button
        onClick={handleSave}
        className={cn(
          "gap-2",
          saved ? "bg-green-500 hover:bg-green-600 text-white" : "btn-primary"
        )}
        style={{ fontFamily: "var(--font-opensans)" }}
      >
        {saved ? <><Check size={14} /> Saved!</> : "Save Changes"}
      </Button>
    </div>
  );
}
