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

interface TestimonialFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminTestimonial | null;
  onSave: (data: AdminTestimonial) => void;
}

const BLANK: Omit<AdminTestimonial, "id"> = {
  name: "",
  role: "",
  quote: "",
  rating: 5,
};

export default function TestimonialFormDialog({ open, onOpenChange, item, onSave }: TestimonialFormDialogProps) {
  const [form, setForm] = useState({ ...BLANK });

  useEffect(() => {
    setForm(item ? { ...item } : { ...BLANK });
  }, [item, open]);

  function set(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.name.trim() || !form.quote.trim()) return;
    onSave({ ...form, id: item?.id ?? String(Date.now()) });
    onOpenChange(false);
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
              <Label style={{ fontFamily: "var(--font-opensans)" }}>Name *</Label>
              <Input value={form.name} onChange={(e) => set("name", e.target.value)}
                placeholder="Ahmad Fauzi" style={{ fontFamily: "var(--font-opensans)" }} />
            </div>
            <div className="space-y-1.5">
              <Label style={{ fontFamily: "var(--font-opensans)" }}>Role</Label>
              <Input value={form.role} onChange={(e) => set("role", e.target.value)}
                placeholder="CTO, FinFlow" style={{ fontFamily: "var(--font-opensans)" }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Quote *</Label>
            <Textarea value={form.quote} onChange={(e) => set("quote", e.target.value)}
              placeholder="What did they say about Lumi?" rows={4}
              style={{ fontFamily: "var(--font-opensans)" }} />
          </div>

          <div className="space-y-1.5">
            <Label style={{ fontFamily: "var(--font-opensans)" }}>Rating</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => set("rating", star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={22}
                    className={cn(
                      "transition-colors",
                      star <= form.rating ? "fill-[#2DD9A4] text-[#2DD9A4]" : "text-muted-foreground/30"
                    )}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
                {form.rating}/5
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} style={{ fontFamily: "var(--font-opensans)" }}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="btn-primary" style={{ fontFamily: "var(--font-opensans)" }}>
            {item ? "Save Changes" : "Add Testimonial"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
