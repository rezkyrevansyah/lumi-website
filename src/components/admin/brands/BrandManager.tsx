"use client";

import { useState, useRef, useTransition, useId } from "react";
import Image from "next/image";
import {
  Upload,
  Sparkles,
  Trash2,
  MoveUp,
  MoveDown,
  Edit2,
  Check,
  X,
  Plus,
  AlertCircle,
  Eye,
  RefreshCw,
  ImageIcon,
  CheckCircle2,
  FileText,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import { cn } from "@/lib/utils";
import {
  compressAndOptimizeImage,
  formatBytes,
  formatBrandNameFromFilename,
  CompressionResult,
} from "@/lib/image-compression";
import {
  createTrustedBrand,
  updateTrustedBrand,
  deleteTrustedBrand,
  bulkCreateTrustedBrands,
  reorderTrustedBrands,
} from "@/actions/settings";
import type { AdminBrand } from "@/lib/admin-data";

interface BrandManagerProps {
  initialBrands: AdminBrand[];
}

interface PendingUploadItem {
  id: string;
  originalFile: File;
  compressedFile?: File;
  originalSize: number;
  compressedSize?: number;
  width?: number;
  height?: number;
  previewUrl: string;
  name: string;
  status: "compressing" | "ready" | "uploading" | "done" | "error";
  errorMessage?: string;
  uploadedUrl?: string;
}

export default function BrandManager({ initialBrands }: BrandManagerProps) {
  const [brands, setBrands] = useState<AdminBrand[]>(initialBrands);
  const [isPending, startTransition] = useTransition();

  // Drag & drop state
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [queue, setQueue] = useState<PendingUploadItem[]>([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);

  // Single brand manual add state
  const [manualName, setManualName] = useState("");
  const [manualLogoUrl, setManualLogoUrl] = useState("");
  const [isAddingManual, setIsAddingManual] = useState(false);

  // Editing state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  // Delete state
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Live preview toggle
  const [showLivePreview, setShowLivePreview] = useState(true);

  // Handle files selected (either from drop or file browser)
  async function handleFilesSelected(files: FileList | File[]) {
    const fileArray = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (fileArray.length === 0) return;

    // Create queue items
    const newItems: PendingUploadItem[] = fileArray.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      originalFile: file,
      originalSize: file.size,
      previewUrl: URL.createObjectURL(file),
      name: formatBrandNameFromFilename(file.name),
      status: "compressing",
    }));

    setQueue((prev) => [...prev, ...newItems]);

    // Compress each file in background
    for (const item of newItems) {
      try {
        const result: CompressionResult = await compressAndOptimizeImage(
          item.originalFile,
          {
            maxWidth: 1920,
            maxHeight: 1080,
            quality: 0.9,
          }
        );

        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? {
                  ...q,
                  compressedFile: result.file,
                  compressedSize: result.compressedSize,
                  width: result.width,
                  height: result.height,
                  previewUrl: result.previewUrl,
                  status: "ready",
                }
              : q
          )
        );
      } catch (err: any) {
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? {
                  ...q,
                  status: "error",
                  errorMessage: err?.message || "Gagal mengompres gambar",
                }
              : q
          )
        );
      }
    }
  }

  // Upload a single queue item to storage & DB
  async function uploadSingleItem(item: PendingUploadItem): Promise<boolean> {
    const fileToUpload = item.compressedFile || item.originalFile;

    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("folder", "partners");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Gagal mengunggah ke Supabase Storage");
      }

      const { url } = await res.json();

      return new Promise((resolve) => {
        startTransition(async () => {
          const nextSortOrder = brands.length + 1;
          const created = await createTrustedBrand({
            name: item.name.trim() || "Brand Partner",
            logoUrl: url,
            sortOrder: nextSortOrder,
          });

          if (created) {
            setBrands((prev) => [
              ...prev,
              {
                id: (created as any).id,
                name: (created as any).name,
                logoUrl: url,
                sortOrder: nextSortOrder,
              },
            ]);
          }
          resolve(true);
        });
      });
    } catch (err: any) {
      throw err;
    }
  }

  // Upload all ready items in queue
  async function handleUploadAllQueue() {
    setIsProcessingQueue(true);

    const itemsToUpload = queue.filter(
      (q) => q.status === "ready" || q.status === "error"
    );

    for (const item of itemsToUpload) {
      setQueue((prev) =>
        prev.map((q) => (q.id === item.id ? { ...q, status: "uploading" } : q))
      );

      try {
        await uploadSingleItem(item);
        setQueue((prev) =>
          prev.map((q) => (q.id === item.id ? { ...q, status: "done" } : q))
        );
      } catch (err: any) {
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? {
                  ...q,
                  status: "error",
                  errorMessage: err?.message || "Upload gagal",
                }
              : q
          )
        );
      }
    }

    setIsProcessingQueue(false);
  }

  // Clear completed items from queue
  function handleClearDone() {
    setQueue((prev) => prev.filter((q) => q.status !== "done"));
  }

  // Remove single item from queue
  function handleRemoveQueueItem(id: string) {
    setQueue((prev) => prev.filter((q) => q.id !== id));
  }

  // Update item name in queue
  function handleUpdateQueueName(id: string, newName: string) {
    setQueue((prev) =>
      prev.map((q) => (q.id === id ? { ...q, name: newName } : q))
    );
  }

  // Reordering brands
  function handleMoveBrand(index: number, direction: "up" | "down") {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === brands.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const reordered = [...brands];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);

    const updatedBrands = reordered.map((b, idx) => ({
      ...b,
      sortOrder: idx + 1,
    }));

    setBrands(updatedBrands);

    startTransition(async () => {
      await reorderTrustedBrands(
        updatedBrands.map((b) => ({ id: b.id, sortOrder: b.sortOrder }))
      );
    });
  }

  // Start editing a brand
  function startEditing(brand: AdminBrand) {
    setEditingId(brand.id);
    setEditingName(brand.name);
  }

  // Save edited name
  function handleSaveEdit(id: number) {
    if (!editingName.trim()) return;

    startTransition(async () => {
      await updateTrustedBrand(id, { name: editingName.trim() });
      setBrands((prev) =>
        prev.map((b) => (b.id === id ? { ...b, name: editingName.trim() } : b))
      );
      setEditingId(null);
    });
  }

  // Delete a brand
  function handleDeleteBrand() {
    if (!deletingId) return;

    startTransition(async () => {
      await deleteTrustedBrand(deletingId);
      setBrands((prev) => prev.filter((b) => b.id !== deletingId));
      setShowDeleteConfirm(false);
      setDeletingId(null);
    });
  }

  // Replace logo for an existing brand
  async function handleReplaceLogo(brandId: number, file: File) {
    try {
      const compressed = await compressAndOptimizeImage(file, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.9,
      });

      const formData = new FormData();
      formData.append("file", compressed.file);
      formData.append("folder", "partners");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal mengunggah logo");
      const { url } = await res.json();

      startTransition(async () => {
        await updateTrustedBrand(brandId, { logoUrl: url });
        setBrands((prev) =>
          prev.map((b) => (b.id === brandId ? { ...b, logoUrl: url } : b))
        );
      });
    } catch (err: any) {
      alert(err.message || "Gagal mengganti logo");
    }
  }

  // Add brand manually (with optional URL or just name)
  function handleAddManual() {
    if (!manualName.trim()) return;

    startTransition(async () => {
      const nextSortOrder = brands.length + 1;
      const created = await createTrustedBrand({
        name: manualName.trim(),
        logoUrl: manualLogoUrl.trim() || undefined,
        sortOrder: nextSortOrder,
      });

      if (created) {
        setBrands((prev) => [
          ...prev,
          {
            id: (created as any).id,
            name: (created as any).name,
            logoUrl: (created as any).logoUrl ?? null,
            sortOrder: nextSortOrder,
          },
        ]);
        setManualName("");
        setManualLogoUrl("");
        setIsAddingManual(false);
      }
    });
  }

  const readyCount = queue.filter((q) => q.status === "ready").length;
  const doneCount = queue.filter((q) => q.status === "done").length;

  return (
    <div className="space-y-8">
      {/* Header Info & Actions */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2
              className="text-xl font-bold text-[#101828]"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Logo Brand &amp; Klien Ternama
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#2DD9A4]/15 text-[#0E8B62]">
              {brands.length} Logo Aktif
            </span>
          </div>
          <p
            className="text-sm text-gray-500 mt-1"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            Kelola logo partner dan instansi yang tampil pada running marquee di halaman utama.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLivePreview(!showLivePreview)}
            className="gap-1.5 text-xs rounded-xl"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            <Eye size={14} />
            {showLivePreview ? "Sembunyikan Preview" : "Tampilkan Preview"}
          </Button>
          <Button
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary gap-1.5 text-xs rounded-xl shadow-sm"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            <Upload size={14} />
            Pilih / Upload Logo
          </Button>
        </div>
      </div>

      {/* Recommended Aspect Ratio Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/40 rounded-2xl p-5 border border-emerald-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#0E8B62] flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles size={20} />
          </div>
          <div>
            <h4
              className="text-sm font-bold text-[#101828] flex items-center gap-2"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Format Rekomendasi: 1920 × 1080 (16:9) &amp; Auto Kompresi
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#2DD9A4] text-white">
                Best Practice
              </span>
            </h4>
            <p
              className="text-xs text-gray-600 mt-1 leading-relaxed"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Upload logo dengan resolusi <strong>1920×1080</strong> (atau PNG transparan). Sistem otomatis mengompresi dan mengonversi ke <strong>WebP tajam</strong> sebelum disimpan ke Supabase Storage, menghemat ukuran hingga 90%+ tanpa menurunkan ketajaman.
            </p>
          </div>
        </div>
      </div>

      {/* Drag & Drop Multi-file Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files) {
            handleFilesSelected(e.dataTransfer.files);
          }
        }}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center",
          isDragging
            ? "border-[#2DD9A4] bg-[#2DD9A4]/10 scale-[1.01]"
            : "border-gray-200 bg-white hover:border-[#2DD9A4]/60 hover:bg-gray-50/60 shadow-sm"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              handleFilesSelected(e.target.files);
              e.target.value = "";
            }
          }}
        />

        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4 text-[#0E8B62] shadow-inner">
          <Upload size={28} className={cn(isDragging && "animate-bounce")} />
        </div>

        <h3
          className="text-base sm:text-lg font-bold text-[#101828] mb-1"
          style={{ fontFamily: "var(--font-rubik)" }}
        >
          Tarik &amp; Lepaskan (Drag &amp; Drop) Belasan Logo Sekaligus
        </h3>
        <p
          className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mb-4"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          Bisa drag 10+ file gambar sekaligus. Ukuran default rekomendasi <strong>1920×1080</strong>. Mendukung PNG, SVG, JPG, WebP.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
            Batch Upload
          </span>
          <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-emerald-100 text-[#0E8B62]">
            Auto Compress to WebP
          </span>
          <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
            1920×1080 Canvas Ready
          </span>
        </div>
      </div>

      {/* Upload Queue Panel (shown when files are dropped) */}
      {queue.length > 0 && (
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3
                className="text-base font-bold text-[#101828]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Antrean Upload Batch ({queue.length} file)
              </h3>
              {readyCount > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-[#0E8B62]">
                  {readyCount} siap di-upload
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {doneCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearDone}
                  className="text-xs text-gray-500 hover:text-gray-900"
                >
                  Hapus yang Selesai ({doneCount})
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleUploadAllQueue}
                disabled={isProcessingQueue || readyCount === 0}
                className="btn-primary gap-1.5 text-xs rounded-xl shadow-sm"
              >
                {isProcessingQueue ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Sedang Mengunggah...
                  </>
                ) : (
                  <>
                    <Upload size={14} />
                    Upload Semua ({readyCount})
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
            {queue.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "p-3 rounded-xl border flex items-center gap-3 transition-all",
                  item.status === "done"
                    ? "bg-emerald-50/50 border-emerald-200"
                    : item.status === "error"
                    ? "bg-red-50/50 border-red-200"
                    : item.status === "uploading"
                    ? "bg-amber-50/50 border-amber-200 animate-pulse"
                    : "bg-gray-50 border-gray-200"
                )}
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-12 rounded-lg bg-white border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
                  <Image
                    src={item.previewUrl}
                    alt={item.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>

                {/* Info & Edit */}
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={item.name}
                    disabled={item.status === "uploading" || item.status === "done"}
                    onChange={(e) =>
                      handleUpdateQueueName(item.id, e.target.value)
                    }
                    placeholder="Nama Brand"
                    className="w-full text-xs font-semibold text-[#101828] bg-transparent border-b border-transparent hover:border-gray-300 focus:border-[#2DD9A4] focus:outline-none truncate"
                  />
                  <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-gray-500">
                    <span>{formatBytes(item.originalSize)}</span>
                    {item.compressedSize && (
                      <>
                        <span>&rarr;</span>
                        <span className="text-[#0E8B62] font-semibold">
                          {formatBytes(item.compressedSize)}
                        </span>
                        <span className="text-gray-400">
                          (
                          {Math.round(
                            (1 - item.compressedSize / item.originalSize) * 100
                          )}
                          % hemat)
                        </span>
                      </>
                    )}
                  </div>

                  {item.status === "error" && (
                    <p className="text-[10px] text-red-500 truncate mt-0.5">
                      {item.errorMessage || "Gagal upload"}
                    </p>
                  )}
                </div>

                {/* Status Indicator / Actions */}
                <div className="shrink-0">
                  {item.status === "compressing" && (
                    <RefreshCw size={14} className="animate-spin text-gray-400" />
                  )}
                  {item.status === "uploading" && (
                    <RefreshCw size={14} className="animate-spin text-amber-500" />
                  )}
                  {item.status === "done" && (
                    <CheckCircle2 size={16} className="text-emerald-600" />
                  )}
                  {item.status === "ready" && (
                    <button
                      onClick={() => handleRemoveQueueItem(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Marquee Preview Banner */}
      {showLivePreview && brands.length > 0 && (
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span
              className="text-xs font-bold text-gray-500 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Live Marquee Preview (Tampilan Berjalan di Homepage)
            </span>
            <span className="text-xs text-[#0E8B62] font-semibold">
              Animasi Aktif
            </span>
          </div>

          <div className="relative overflow-hidden py-6 bg-[#F8F9FB] rounded-2xl border border-gray-100">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...brands, ...brands].map((b, i) => (
                <div
                  key={`${b.id}-${i}`}
                  className="flex items-center mx-8 gap-3 group shrink-0"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2DD9A4] opacity-40 shrink-0" />
                  {b.logoUrl ? (
                    <div className="relative h-12 w-36 opacity-80 group-hover:opacity-100 transition-opacity">
                      <Image
                        src={b.logoUrl}
                        alt={b.name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <span
                      className="text-lg font-bold text-gray-400 group-hover:text-[#2DD9A4] transition-colors"
                      style={{ fontFamily: "var(--font-rubik)" }}
                    >
                      {b.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Existing Brands Grid Management */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3
              className="text-base font-bold text-[#101828]"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Daftar Logo Aktif ({brands.length})
            </h3>
            <p
              className="text-xs text-gray-500 mt-0.5"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Atur urutan tampil dengan tombol panah, ubah nama, atau ganti gambar logo.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddingManual(!isAddingManual)}
            className="gap-1.5 text-xs rounded-xl"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            <Plus size={14} />
            {isAddingManual ? "Batal Tambah Manual" : "Tambah Manual"}
          </Button>
        </div>

        {/* Manual Add Input Row */}
        {isAddingManual && (
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center gap-3">
            <Input
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}
              placeholder="Nama Brand (contoh: Bank Mandiri)"
              className="text-xs bg-white"
            />
            <Input
              value={manualLogoUrl}
              onChange={(e) => setManualLogoUrl(e.target.value)}
              placeholder="URL Logo Opsional (https://...)"
              className="text-xs bg-white"
            />
            <Button
              size="sm"
              onClick={handleAddManual}
              disabled={isPending || !manualName.trim()}
              className="btn-primary text-xs rounded-xl shrink-0"
            >
              Simpan Brand
            </Button>
          </div>
        )}

        {brands.length === 0 ? (
          <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl">
            <ImageIcon size={36} className="mx-auto text-gray-300 mb-2" />
            <p
              className="text-sm font-semibold text-gray-700"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Belum ada logo brand
            </p>
            <p
              className="text-xs text-gray-400 mt-1"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Tarik dan lepaskan gambar logo pada dropzone di atas untuk memulai.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {brands.map((brand, index) => {
              const isEditing = editingId === brand.id;
              const inputUploadId = `replace-logo-${brand.id}`;

              return (
                <div
                  key={brand.id}
                  className="bg-white rounded-2xl border border-gray-200 p-3.5 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between group"
                >
                  {/* Logo Preview (16:9 Aspect container) */}
                  <div className="relative w-full aspect-video rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center p-3 mb-3">
                    {brand.logoUrl ? (
                      <Image
                        src={brand.logoUrl}
                        alt={brand.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    ) : (
                      <span
                        className="text-xs font-bold text-gray-400 text-center"
                        style={{ fontFamily: "var(--font-rubik)" }}
                      >
                        {brand.name}
                      </span>
                    )}

                    {/* Order badge */}
                    <span className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Brand Name */}
                  <div className="mb-3 min-h-[36px]">
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <Input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleSaveEdit(brand.id)
                          }
                          autoFocus
                          className="text-xs h-7 px-2"
                        />
                        <button
                          onClick={() => handleSaveEdit(brand.id)}
                          className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-50"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1 rounded-lg text-gray-400 hover:bg-gray-100"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-1">
                        <p
                          className="text-xs font-bold text-[#101828] truncate"
                          style={{ fontFamily: "var(--font-rubik)" }}
                          title={brand.name}
                        >
                          {brand.name}
                        </p>
                        <button
                          onClick={() => startEditing(brand)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-700 transition-opacity"
                        >
                          <Edit2 size={12} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Controls Toolbar */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                    {/* Reorder Arrows */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveBrand(index, "up")}
                        disabled={index === 0 || isPending}
                        title="Geser ke kiri / urutan sebelumnya"
                        className="p-1 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-30"
                      >
                        <MoveUp size={13} className="-rotate-90" />
                      </button>
                      <button
                        onClick={() => handleMoveBrand(index, "down")}
                        disabled={index === brands.length - 1 || isPending}
                        title="Geser ke kanan / urutan berikutnya"
                        className="p-1 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-30"
                      >
                        <MoveDown size={13} className="-rotate-90" />
                      </button>
                    </div>

                    {/* Replace / Delete */}
                    <div className="flex items-center gap-1">
                      <label
                        htmlFor={inputUploadId}
                        title="Ganti logo"
                        className="p-1 rounded-md text-gray-400 hover:text-[#0E8B62] hover:bg-emerald-50 cursor-pointer"
                      >
                        <Upload size={13} />
                        <input
                          id={inputUploadId}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleReplaceLogo(brand.id, file);
                              e.target.value = "";
                            }
                          }}
                        />
                      </label>

                      <button
                        onClick={() => {
                          setDeletingId(brand.id);
                          setShowDeleteConfirm(true);
                        }}
                        title="Hapus brand"
                        className="p-1 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="Hapus Logo Brand"
        description="Apakah Anda yakin ingin menghapus logo brand ini dari daftar running marquee di website?"
        confirmLabel="Hapus"
        onConfirm={handleDeleteBrand}
      />
    </div>
  );
}
