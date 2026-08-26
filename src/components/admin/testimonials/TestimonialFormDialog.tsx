"use client";

import { useEffect, useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { type AdminTestimonial } from "@/lib/admin-data";

type FormData = Omit<AdminTestimonial, "id"> & { id?: number };

interface TestimonialFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminTestimonial | null;
  onSave: (data: FormData) => void;
  saving?: boolean;
}

const BLANK: FormData = {
  quote: "",
  authorName: "",
  authorRole: "",
  rating: 5,
  isFeatured: false,
  sortOrder: 0,
};

export default function TestimonialFormDialog({ open, onOpenChange, item, onSave, saving }: TestimonialFormDialogProps) {
  const [form, setForm] = useState<FormData>({ ...BLANK });

  useEffect(() => {
    setForm(item ? {
      id: item.id,
      quote: item.quote,
      authorName: item.authorName,
      authorRole: item.authorRole,
      rating: item.rating ?? 5,
      isFeatured: item.isFeatured ?? false,
      sortOrder: item.sortOrder ?? 0,
    } : { ...BLANK });
  }, [item, open]);

  function set(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.authorName.trim() || !form.quote.trim()) return;
    onSave(form);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-rubik)" }}>
            {item ? "Edit Testimonial" : "Add Testimonial"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label style={{ fontFamily: "var(--font-opensans)" }}>Nama *</Label>
              <Input value={form.authorName} onChange={(e) => set("authorName", e.target.value)}
                placeholder="Winnie / Verified Client" style={{ fontFamily: "var(--font-opensans)" }} />
            </div>
            <div className="space-y-1.5">
              <Label style={{ fontFamily: "var(--font-opensans)" }}>Role / Keterangan</Label>
              <Input value={form.authorRole} onChange={(e) => set("authorRole", e.target.value)}
                placeholder="Business Owner (London, UK)" style={{ fontFamily: "var(--font-opensans)" }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Testimoni *</Label>
            <Textarea value={form.quote} onChange={(e) => set("quote", e.target.value)}
              placeholder="Tulis ulasan klien di sini…" rows={4}
              style={{ fontFamily: "var(--font-opensans)" }} />
          </div>

          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Rating</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => set("rating", star)}
                  className="transition-transform hover:scale-110">
                  <Star size={22} className={cn(
                    "transition-colors",
                    star <= (form.rating ?? 5) ? "fill-[#2DD9A4] text-[#2DD9A4]" : "text-muted-foreground/30"
                  )} />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
                {form.rating}/5
              </span>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isFeatured ?? false}
              onChange={(e) => set("isFeatured", e.target.checked)}
              className="rounded border-border w-4 h-4 accent-[#2DD9A4]"
            />
            <span className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
              Tampilkan sebagai featured testimonial
            </span>
          </label>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} style={{ fontFamily: "var(--font-opensans)" }}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving} className="btn-primary" style={{ fontFamily: "var(--font-opensans)" }}>
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Saving…
              </span>
            ) : item ? "Save Changes" : "Add Testimonial"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
