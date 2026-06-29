"use client";

import { useState } from "react";
import { Star, Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/admin/shared/PageHeader";
import EmptyState from "@/components/admin/shared/EmptyState";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import TestimonialFormDialog from "./TestimonialFormDialog";
import { MessageSquareQuote } from "lucide-react";
import { type AdminTestimonial } from "@/lib/admin-data";
import { createClient } from "@/utils/supabase/client";

interface TestimonialListProps {
  initialItems: AdminTestimonial[];
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          className={s <= rating ? "fill-[#2DD9A4] text-[#2DD9A4]" : "text-muted-foreground/20"}
        />
      ))}
    </div>
  );
}

export default function TestimonialList({ initialItems }: TestimonialListProps) {
  const [items, setItems] = useState(initialItems);
  const [editItem, setEditItem] = useState<AdminTestimonial | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function handleEdit(item: AdminTestimonial) {
    setEditItem(item);
    setDialogOpen(true);
  }

  function handleAdd() {
    setEditItem(null);
    setDialogOpen(true);
  }

  async function handleSave(data: AdminTestimonial) {
    const supabase = createClient();
    const isNew = !items.find((i) => i.id === data.id);
    const payload = {
      quote: data.quote,
      name: data.name,
      role: data.role,
      rating: data.rating,
      ...(isNew ? { sort_order: items.length + 1 } : {}),
    };

    if (isNew) {
      const { data: inserted, error } = await supabase
        .from("testimonials")
        .insert(payload)
        .select()
        .single();
      if (!error && inserted) {
        setItems((prev) => [...prev, { ...data, id: inserted.id }]);
      }
    } else {
      const { error } = await supabase
        .from("testimonials")
        .update(payload)
        .eq("id", data.id);
      if (!error) {
        setItems((prev) => prev.map((i) => (i.id === data.id ? data : i)));
      }
    }
  }

  async function handleDelete(id: string) {
    const supabase = createClient();
    await supabase.from("testimonials").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <>
      <PageHeader
        title="Testimonials"
        description={`${items.length} testimonial${items.length !== 1 ? "s" : ""}`}
        action={
          <Button onClick={handleAdd} className="btn-primary gap-2"
            style={{ fontFamily: "var(--font-opensans)" }}>
            <Plus size={15} />
            Add Testimonial
          </Button>
        }
      />

      {items.length === 0 ? (
        <EmptyState
          icon={MessageSquareQuote}
          title="No testimonials yet"
          description="Add your first client testimonial."
          action={
            <Button onClick={handleAdd} className="btn-primary gap-2"
              style={{ fontFamily: "var(--font-opensans)" }}>
              <Plus size={15} /> Add Testimonial
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-border shadow-sm p-5 flex flex-col gap-3 relative group"
            >
              {/* Actions */}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}
                  className="h-7 w-7 text-muted-foreground hover:text-[#6C63FF]">
                  <Pencil size={13} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setDeleteId(item.id)}
                  className="h-7 w-7 text-muted-foreground hover:text-destructive">
                  <Trash2 size={13} />
                </Button>
              </div>

              <StarRow rating={item.rating} />

              <p
                className="text-sm text-[#3D3E4A] leading-relaxed line-clamp-4 flex-1 italic"
                style={{ fontFamily: "var(--font-opensans)" }}
              >
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="pt-2 border-t border-border">
                <p className="text-sm font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <TestimonialFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={editItem}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete testimonial?"
        description="This will remove the testimonial from your site."
        onConfirm={() => deleteId && handleDelete(deleteId)}
      />
    </>
  );
}
