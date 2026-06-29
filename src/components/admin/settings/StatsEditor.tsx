"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { type AdminStat } from "@/lib/admin-data";
import { createClient } from "@/utils/supabase/client";

interface StatsEditorProps {
  initialStats: AdminStat[];
}

export default function StatsEditor({ initialStats }: StatsEditorProps) {
  const [stats, setStats] = useState(initialStats);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  function update(id: string, key: "value" | "label", val: string) {
    setStats((prev) => prev.map((s) => (s.id === id ? { ...s, [key]: val } : s)));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    await Promise.all(
      stats.map((s) =>
        supabase.from("stats").update({ value: s.value, label: s.label }).eq("id", s.id)
      )
    );
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
          Stats & Numbers
        </h3>
        <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
          Update the key metrics shown across the site.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-[#F8F9FB] rounded-2xl border border-border p-4 space-y-3">
            <p
              className="text-2xl font-bold gradient-text"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              {stat.value || "—"}
            </p>
            <div className="space-y-2">
              <Input
                value={stat.value}
                onChange={(e) => update(stat.id, "value", e.target.value)}
                placeholder="e.g. 20+"
                className="text-sm h-8"
                style={{ fontFamily: "var(--font-opensans)" }}
              />
              <Input
                value={stat.label}
                onChange={(e) => update(stat.id, "label", e.target.value)}
                placeholder="Label"
                className="text-xs h-8 text-muted-foreground"
                style={{ fontFamily: "var(--font-opensans)" }}
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={handleSave}
        disabled={saving}
        className={saved ? "bg-green-500 hover:bg-green-600 text-white gap-2" : "btn-primary gap-2"}
        style={{ fontFamily: "var(--font-opensans)" }}
      >
        {saved ? <><Check size={14} /> Saved!</> : saving ? "Saving…" : "Save Changes"}
      </Button>
    </div>
  );
}
