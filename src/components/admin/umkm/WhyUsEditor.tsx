"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, Check, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateUmkmWhyUs } from "@/actions/umkm";

export interface UmkmWhyUsItem {
  id?: string;
  icon: string;
  title: string;
  description: string;
  accentColor?: string;
  color?: string;
  bgColor?: string;
  bg?: string;
}

interface WhyUsEditorProps {
  initialItems: UmkmWhyUsItem[] | null;
}

export default function WhyUsEditor({ initialItems }: WhyUsEditorProps) {
  const [items, setItems] = useState<UmkmWhyUsItem[]>(() => {
    if (!initialItems || initialItems.length === 0) return [];
    return initialItems.map((item, index) => ({
      id: item.id || `why-us-${index + 1}`,
      icon: item.icon || "Sparkles",
      title: item.title || "",
      description: item.description || "",
      accentColor: item.accentColor || item.color || "#2DD9A4",
      bgColor: item.bgColor || item.bg || "rgba(45,217,164,0.1)",
    }));
  });

  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const labelStyle = { fontFamily: "var(--font-opensans)" };

  function updateItem(id: string, field: keyof UmkmWhyUsItem, value: string) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
    setSaved(false);
  }

  function addItem() {
    const newItem: UmkmWhyUsItem = {
      id: `why-us-${Date.now()}`,
      icon: "Sparkles",
      title: "",
      description: "",
      accentColor: "#2DD9A4",
      bgColor: "rgba(45,217,164,0.1)",
    };
    setItems((prev) => [...prev, newItem]);
    setSaved(false);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setSaved(false);
  }

  function moveItem(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setItems(newItems);
    setSaved(false);
  }

  function handleSave() {
    startTransition(async () => {
      const payload = items.map((item) => ({
        icon: item.icon.trim(),
        title: item.title.trim(),
        description: item.description.trim(),
        accentColor: item.accentColor,
        bgColor: item.bgColor,
      }));

      await updateUmkmWhyUs(payload);

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h3 className="text-base font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
            Kenapa Memilih Kami (UMKM)
          </h3>
          <p className="text-sm text-muted-foreground" style={labelStyle}>
            Pilar alasan mengapa pelaku UMKM memilih bekerja sama dengan Lumi Beta Works.
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isPending || items.length === 0}
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

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="bg-[#F8F9FB] rounded-2xl border border-border p-5 space-y-4 relative"
          >
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-bold text-muted-foreground uppercase tracking-wider"
                style={labelStyle}
              >
                Pilar #{index + 1}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={index === 0}
                  onClick={() => moveItem(index, "up")}
                  className="h-7 w-7 text-muted-foreground hover:text-[#3D3E4A]"
                >
                  <ArrowUp size={13} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={index === items.length - 1}
                  onClick={() => moveItem(index, "down")}
                  className="h-7 w-7 text-muted-foreground hover:text-[#3D3E4A]"
                >
                  <ArrowDown size={13} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id!)}
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-3 space-y-1.5">
                <Label style={labelStyle}>Nama Icon</Label>
                <Input
                  value={item.icon}
                  onChange={(e) => updateItem(item.id!, "icon", e.target.value)}
                  placeholder="Wallet / Sparkles"
                  style={labelStyle}
                />
              </div>

              <div className="md:col-span-9 space-y-1.5">
                <Label style={labelStyle}>Judul Keunggulan *</Label>
                <Input
                  value={item.title}
                  onChange={(e) => updateItem(item.id!, "title", e.target.value)}
                  placeholder="Harga Menyesuaikan Skala Bisnis"
                  style={labelStyle}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label style={labelStyle}>Deskripsi *</Label>
              <Textarea
                value={item.description}
                onChange={(e) => updateItem(item.id!, "description", e.target.value)}
                placeholder="Paket dan skema kerja kami dirancang untuk kemampuan UMKM…"
                rows={2}
                style={labelStyle}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <Label style={labelStyle}>Accent Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={item.accentColor?.startsWith("#") ? item.accentColor : "#2DD9A4"}
                    onChange={(e) => updateItem(item.id!, "accentColor", e.target.value)}
                    className="w-8 h-8 rounded border border-border cursor-pointer shrink-0"
                  />
                  <Input
                    value={item.accentColor || ""}
                    onChange={(e) => updateItem(item.id!, "accentColor", e.target.value)}
                    className="h-8 text-xs font-mono"
                    placeholder="#2DD9A4"
                    style={labelStyle}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label style={labelStyle}>Background (Hex / RGBA)</Label>
                <Input
                  value={item.bgColor || ""}
                  onChange={(e) => updateItem(item.id!, "bgColor", e.target.value)}
                  className="h-8 text-xs font-mono"
                  placeholder="rgba(45,217,164,0.1) atau #F0FDF9"
                  style={labelStyle}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="pt-2 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={addItem}
            className="gap-2"
            style={labelStyle}
          >
            <Plus size={14} /> Tambah Pilar
          </Button>

          <Button
            type="button"
            onClick={handleSave}
            disabled={isPending || items.length === 0}
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
              "Simpan Semua Perubahan"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
