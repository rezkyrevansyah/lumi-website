"use client";

import { useState, useTransition } from "react";
import { updateTranslation } from "@/actions/admin/translations";

interface Row {
  id: number;
  key: string;
  valueId: string;
  valueEn: string;
}

export function TranslationForm({ row }: { row: Row }) {
  const [valueId, setValueId] = useState(row.valueId);
  const [valueEn, setValueEn] = useState(row.valueEn);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await updateTranslation(row.id, valueId, valueEn);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    });
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <div className="mb-2 text-xs font-mono text-zinc-400">{row.key}</div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-zinc-500">Indonesia</label>
          <textarea
            value={valueId}
            onChange={(e) => setValueId(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-zinc-500">English</label>
          <textarea
            value={valueEn}
            onChange={(e) => setValueEn(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        disabled={pending}
        className="mt-3 rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
      >
        {pending ? "Menyimpan..." : saved ? "Tersimpan ✓" : "Simpan"}
      </button>
    </div>
  );
}
