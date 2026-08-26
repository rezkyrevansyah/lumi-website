"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateAboutStory } from "@/actions/about";
import { Check } from "lucide-react";

export interface StoryData {
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
}

interface StoryFormProps {
  initialData: StoryData | null;
}

export default function StoryForm({ initialData }: StoryFormProps) {
  const [paragraph1, setParagraph1] = useState(initialData?.paragraph1 || "");
  const [paragraph2, setParagraph2] = useState(initialData?.paragraph2 || "");
  const [paragraph3, setParagraph3] = useState(initialData?.paragraph3 || "");

  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const labelStyle = { fontFamily: "var(--font-opensans)" };

  function handleSave() {
    if (!paragraph1.trim() || !paragraph2.trim()) return;

    startTransition(async () => {
      await updateAboutStory({
        paragraph1: paragraph1.trim(),
        paragraph2: paragraph2.trim(),
        paragraph3: paragraph3.trim() || undefined,
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
            Cerita &amp; Visi Lumi
          </h3>
          <p className="text-sm text-muted-foreground" style={labelStyle}>
            Narasi perjalanan dan visi Lumi Beta Works pada bagian Our Story.
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isPending || !paragraph1.trim() || !paragraph2.trim()}
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

      <div className="space-y-4 max-w-3xl">
        <div className="space-y-1.5">
          <Label style={labelStyle}>Paragraf 1 (Awal Mula / Fondasi) *</Label>
          <Textarea
            value={paragraph1}
            onChange={(e) => setParagraph1(e.target.value)}
            placeholder="Lumi Beta Works lahir dari perjalanan seorang freelancer yang percaya bahwa teknologi yang baik tidak harus mahal atau rumit…"
            rows={4}
            style={labelStyle}
          />
        </div>

        <div className="space-y-1.5">
          <Label style={labelStyle}>Paragraf 2 (Pertumbuhan &amp; Realisasi) *</Label>
          <Textarea
            value={paragraph2}
            onChange={(e) => setParagraph2(e.target.value)}
            placeholder="Dimulai dari melayani UMKM dan bisnis lokal, kami tumbuh menjadi vendor IT yang dipercaya perusahaan dan instansi pemerintah…"
            rows={4}
            style={labelStyle}
          />
        </div>

        <div className="space-y-1.5">
          <Label style={labelStyle}>Paragraf 3 (Komitmen &amp; Masa Depan - Opsional)</Label>
          <Textarea
            value={paragraph3}
            onChange={(e) => setParagraph3(e.target.value)}
            placeholder="Hari ini, kami terus berkomitmen menghadirkan solusi digital yang tepat sasaran, mulai dari startup kecil hingga korporat besar…"
            rows={4}
            style={labelStyle}
          />
        </div>
      </div>
    </div>
  );
}
