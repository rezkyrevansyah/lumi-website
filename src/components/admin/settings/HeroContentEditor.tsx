"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Check } from "lucide-react";
import { type AdminHeroBadge, type AdminActiveProject } from "@/lib/admin-data";

interface HeroContentEditorProps {
  initialBadges: AdminHeroBadge[];
  initialProjects: AdminActiveProject[];
}

export default function HeroContentEditor({ initialBadges, initialProjects }: HeroContentEditorProps) {
  const [badges, setBadges] = useState(initialBadges);
  const [projects, setProjects] = useState(initialProjects);
  const [saved, setSaved] = useState(false);

  function updateBadge(id: string, key: "icon" | "label", val: string) {
    setBadges((prev) => prev.map((b) => (b.id === id ? { ...b, [key]: val } : b)));
    setSaved(false);
  }

  function addBadge() {
    setBadges((prev) => [...prev, { id: String(Date.now()), icon: "✨", label: "New Badge" }]);
    setSaved(false);
  }

  function removeBadge(id: string) {
    setBadges((prev) => prev.filter((b) => b.id !== id));
    setSaved(false);
  }

  function updateProject(id: string, key: keyof AdminActiveProject, val: string | number) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: val } : p)));
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
          Hero Content
        </h3>
        <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
          Edit the hero badges and active project cards shown on the homepage.
        </p>
      </div>

      {/* Badges */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#3D3E4A] mb-3" style={{ fontFamily: "var(--font-rubik)" }}>
          Hero Badges
        </p>
        <div className="space-y-2 max-w-sm">
          {badges.map((badge) => (
            <div key={badge.id} className="flex items-center gap-2">
              <Input value={badge.icon} onChange={(e) => updateBadge(badge.id, "icon", e.target.value)}
                className="w-14 text-center text-base" style={{ fontFamily: "var(--font-opensans)" }} />
              <Input value={badge.label} onChange={(e) => updateBadge(badge.id, "label", e.target.value)}
                className="flex-1" style={{ fontFamily: "var(--font-opensans)" }} />
              <Button variant="ghost" size="icon" onClick={() => removeBadge(badge.id)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0">
                <Trash2 size={13} />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addBadge} className="gap-1.5 mt-1"
            style={{ fontFamily: "var(--font-opensans)" }}>
            <Plus size={13} /> Add Badge
          </Button>
        </div>
      </div>

      {/* Active Projects */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#3D3E4A] mb-3" style={{ fontFamily: "var(--font-rubik)" }}>
          Active Projects Card
        </p>
        <div className="space-y-3">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-[#F8F9FB] rounded-xl border border-border p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 items-end">
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide" style={{ fontFamily: "var(--font-opensans)" }}>Name</p>
                <Input value={proj.name} onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                  className="h-8 text-sm" style={{ fontFamily: "var(--font-opensans)" }} />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide" style={{ fontFamily: "var(--font-opensans)" }}>Type</p>
                <Input value={proj.type} onChange={(e) => updateProject(proj.id, "type", e.target.value)}
                  className="h-8 text-sm" style={{ fontFamily: "var(--font-opensans)" }} />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide" style={{ fontFamily: "var(--font-opensans)" }}>Progress %</p>
                <Input type="number" min={0} max={100}
                  value={proj.progress}
                  onChange={(e) => updateProject(proj.id, "progress", Number(e.target.value))}
                  className="h-8 text-sm" style={{ fontFamily: "var(--font-opensans)" }} />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide" style={{ fontFamily: "var(--font-opensans)" }}>Color</p>
                <div className="flex items-center gap-1">
                  <input type="color" value={proj.color}
                    onChange={(e) => updateProject(proj.id, "color", e.target.value)}
                    className="w-8 h-8 rounded border border-border cursor-pointer" />
                  <Input value={proj.color}
                    onChange={(e) => updateProject(proj.id, "color", e.target.value)}
                    className="h-8 text-xs font-mono" style={{ fontFamily: "var(--font-opensans)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleSave} className={saved ? "bg-green-500 hover:bg-green-600 text-white gap-2" : "btn-primary gap-2"}
        style={{ fontFamily: "var(--font-opensans)" }}>
        {saved ? <><Check size={14} /> Saved!</> : "Save Changes"}
      </Button>
    </div>
  );
}
