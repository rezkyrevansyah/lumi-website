"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import PageHeader from "@/components/admin/shared/PageHeader";
import FAQFormDialog from "./FAQFormDialog";
import { createFaq, updateFaq, deleteFaq } from "@/actions/faqs";
import { cn } from "@/lib/utils";

type FaqPage = "layanan" | "umkm" | "global";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  page: string;
  sortOrder: number | null;
}

interface FAQListProps {
  initialItems: FAQ[];
}

const TABS: { key: FaqPage; label: string }[] = [
  { key: "layanan", label: "Layanan" },
  { key: "umkm", label: "UMKM" },
  { key: "global", label: "Global" },
];

export default function FAQList({ initialItems }: FAQListProps) {
  const [items, setItems] = useState<FAQ[]>(initialItems);
  const [activeTab, setActiveTab] = useState<FaqPage>("layanan");
  const [editItem, setEditItem] = useState<FAQ | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = items.filter((f) => f.page === activeTab);

  function handleAdd() {
    setEditItem(null);
    setDialogOpen(true);
  }

  function handleEdit(item: FAQ) {
    setEditItem(item);
    setDialogOpen(true);
  }

  function handleSave(data: { id?: number; question: string; answer: string; page: FaqPage }) {
    startTransition(async () => {
      if (!data.id) {
        const created = await createFaq({
          question: data.question,
          answer: data.answer,
          page: data.page,
          sortOrder: items.filter((f) => f.page === data.page).length,
        });
        if (created) setItems((prev) => [...prev, created as FAQ]);
      } else {
        const updated = await updateFaq(data.id, {
          question: data.question,
          answer: data.answer,
          page: data.page,
        });
        if (updated) setItems((prev) => prev.map((i) => (i.id === data.id ? (updated as FAQ) : i)));
      }
      setDialogOpen(false);
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      await deleteFaq(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setDeleteId(null);
    });
  }

  return (
    <>
      <PageHeader
        title="FAQs"
        description={`${filtered.length} pertanyaan · tab "${activeTab}"`}
        action={
          <Button onClick={handleAdd} className="btn-primary gap-2" style={{ fontFamily: "var(--font-opensans)" }}>
            <Plus size={15} />
            Add FAQ
          </Button>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 bg-[#F8F9FB] rounded-xl p-1 w-fit border border-border mb-4">
        {TABS.map((tab) => {
          const count = items.filter((f) => f.page === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                activeTab === tab.key
                  ? "bg-white shadow-sm text-[#3D3E4A] border border-border"
                  : "text-muted-foreground hover:text-[#3D3E4A]"
              )}
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              {tab.label}
              <span className="ml-1.5 text-xs text-muted-foreground">({count})</span>
            </button>
          );
        })}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="py-12 text-center rounded-2xl border border-dashed border-border bg-white">
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
              Belum ada FAQ untuk halaman ini.
            </p>
            <Button onClick={handleAdd} variant="outline" size="sm" className="mt-3 gap-1.5"
              style={{ fontFamily: "var(--font-opensans)" }}>
              <Plus size={13} /> Add FAQ
            </Button>
          </div>
        ) : (
          filtered.map((faq) => (
            <div key={faq.id}
              className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3.5">
                <button
                  className="flex-1 flex items-center justify-between gap-3 text-left group"
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                >
                  <p className="text-sm font-semibold text-[#3D3E4A] leading-snug"
                    style={{ fontFamily: "var(--font-rubik)" }}>
                    {faq.question}
                  </p>
                  <ChevronDown size={15}
                    className={cn("text-muted-foreground shrink-0 transition-transform",
                      expandedId === faq.id && "rotate-180")} />
                </button>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(faq)}
                    className="h-7 w-7 text-muted-foreground hover:text-[#6C63FF]">
                    <Pencil size={13} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteId(faq.id)}
                    className="h-7 w-7 text-muted-foreground hover:text-destructive">
                    <Trash2 size={13} />
                  </Button>
                </div>
              </div>
              {expandedId === faq.id && (
                <div className="px-4 pb-4 border-t border-border/50 pt-3">
                  <p className="text-sm text-muted-foreground leading-relaxed"
                    style={{ fontFamily: "var(--font-opensans)" }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <FAQFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={editItem}
        defaultPage={activeTab}
        onSave={handleSave}
        saving={isPending}
      />

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete FAQ?"
        description="FAQ ini akan dihapus permanen dari database."
        onConfirm={() => deleteId !== null && handleDelete(deleteId)}
      />
    </>
  );
}
