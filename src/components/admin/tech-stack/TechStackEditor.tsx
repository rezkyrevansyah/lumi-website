"use client";

import { useState } from "react";
import {
  createTechStackCategory,
  deleteTechStackCategory,
  addTechStackItem,
  deleteTechStackItem,
} from "@/actions/admin/tech-stack";

interface Category {
  id: number;
  key: string;
  labelId: string;
  labelEn: string;
}
interface Item {
  id: number;
  categoryId: number;
  name: string;
}

export function TechStackEditor({ categories, items }: { categories: Category[]; items: Item[] }) {
  const [newItemName, setNewItemName] = useState<Record<number, string>>({});
  const [newCategory, setNewCategory] = useState({ key: "", labelId: "", labelEn: "" });

  return (
    <div className="mt-6 space-y-6">
      {categories.map((cat) => (
        <div key={cat.id} className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-zinc-900">{cat.labelId} / {cat.labelEn}</div>
              <div className="text-xs text-zinc-400">{cat.key}</div>
            </div>
            <button
              onClick={() => confirm(`Hapus kategori ${cat.labelId}?`) && deleteTechStackCategory(cat.id)}
              className="rounded-lg border border-red-200 px-2 py-1 text-xs text-red-600"
            >
              Hapus Kategori
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {items
              .filter((i) => i.categoryId === cat.id)
              .map((i) => (
                <span key={i.id} className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs">
                  {i.name}
                  <button onClick={() => deleteTechStackItem(i.id)} className="text-zinc-400 hover:text-red-600">
                    ×
                  </button>
                </span>
              ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = newItemName[cat.id];
              if (name?.trim()) {
                addTechStackItem(cat.id, name.trim());
                setNewItemName({ ...newItemName, [cat.id]: "" });
              }
            }}
            className="mt-2 flex gap-2"
          >
            <input
              value={newItemName[cat.id] ?? ""}
              onChange={(e) => setNewItemName({ ...newItemName, [cat.id]: e.target.value })}
              placeholder="Nama teknologi baru"
              className="rounded-lg border border-zinc-300 px-2 py-1 text-xs"
            />
            <button type="submit" className="rounded-lg bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
              Tambah
            </button>
          </form>
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newCategory.key && newCategory.labelId && newCategory.labelEn) {
            createTechStackCategory(newCategory);
            setNewCategory({ key: "", labelId: "", labelEn: "" });
          }
        }}
        className="rounded-xl border border-dashed border-zinc-300 p-4"
      >
        <div className="mb-2 text-sm font-semibold text-zinc-700">+ Kategori Baru</div>
        <div className="grid grid-cols-3 gap-2">
          <input
            placeholder="key (mis. mobile)"
            value={newCategory.key}
            onChange={(e) => setNewCategory({ ...newCategory, key: e.target.value })}
            className="rounded-lg border border-zinc-300 px-2 py-1 text-xs"
          />
          <input
            placeholder="Label (ID)"
            value={newCategory.labelId}
            onChange={(e) => setNewCategory({ ...newCategory, labelId: e.target.value })}
            className="rounded-lg border border-zinc-300 px-2 py-1 text-xs"
          />
          <input
            placeholder="Label (EN)"
            value={newCategory.labelEn}
            onChange={(e) => setNewCategory({ ...newCategory, labelEn: e.target.value })}
            className="rounded-lg border border-zinc-300 px-2 py-1 text-xs"
          />
        </div>
        <button type="submit" className="mt-2 rounded-lg bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
          Tambah Kategori
        </button>
      </form>
    </div>
  );
}
