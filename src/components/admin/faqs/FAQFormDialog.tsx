"use client";

import { useEffect, useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type FaqPage = "layanan" | "umkm" | "global";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  page: string;
}

interface FAQFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: FAQ | null;
  defaultPage: FaqPage;
  onSave: (data: { id?: number; question: string; answer: string; page: FaqPage }) => void;
  saving?: boolean;
}

export default function FAQFormDialog({ open, onOpenChange, item, defaultPage, onSave, saving }: FAQFormDialogProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [page, setPage] = useState<FaqPage>(defaultPage);

  useEffect(() => {
    if (item) {
      setQuestion(item.question);
      setAnswer(item.answer);
      setPage((item.page as FaqPage) ?? defaultPage);
    } else {
      setQuestion("");
      setAnswer("");
      setPage(defaultPage);
    }
  }, [item, open, defaultPage]);

  function handleSave() {
    if (!question.trim() || !answer.trim()) return;
    onSave({ id: item?.id, question: question.trim(), answer: answer.trim(), page });
  }

  const labelStyle = { fontFamily: "var(--font-opensans)" };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-rubik)" }}>
            {item ? "Edit FAQ" : "Add FAQ"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label style={labelStyle}>Halaman</Label>
            <select
              value={page}
              onChange={(e) => setPage(e.target.value as FaqPage)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={labelStyle}
            >
              <option value="layanan">Layanan</option>
              <option value="umkm">UMKM</option>
              <option value="global">Global</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Pertanyaan *</Label>
            <Input value={question} onChange={(e) => setQuestion(e.target.value)}
              placeholder="Berapa lama pengerjaan website?" style={labelStyle} />
          </div>

          <div className="space-y-1.5">
            <Label style={labelStyle}>Jawaban *</Label>
            <Textarea value={answer} onChange={(e) => setAnswer(e.target.value)}
              placeholder="Tulis jawaban lengkap di sini…" rows={5} style={labelStyle} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} style={labelStyle}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || !question.trim() || !answer.trim()}
            className="btn-primary" style={labelStyle}>
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Saving…
              </span>
            ) : item ? "Save Changes" : "Add FAQ"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
