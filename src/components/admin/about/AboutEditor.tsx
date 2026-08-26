"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/shared/PageHeader";
import FounderForm, { type FounderData } from "./FounderForm";
import StoryForm, { type StoryData } from "./StoryForm";
import PrincipleList from "./PrincipleList";
import { type AboutPrinciple } from "./PrincipleFormDialog";
import AchievementList from "./AchievementList";
import { type Achievement } from "./AchievementFormDialog";
import { cn } from "@/lib/utils";
import { User, BookOpen, Sparkles, ShieldCheck, Trophy } from "lucide-react";

type AboutTab = "founder" | "story" | "why_choose_us" | "work_principles" | "achievements";

interface AboutEditorProps {
  initialWhyChooseUs: AboutPrinciple[];
  initialWorkPrinciples: AboutPrinciple[];
  initialAchievements: Achievement[];
  initialFounder: FounderData | null;
  initialStory: StoryData | null;
}

const TABS: Array<{ key: AboutTab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = [
  { key: "founder", label: "Founder", icon: User },
  { key: "story", label: "Our Story", icon: BookOpen },
  { key: "why_choose_us", label: "Why Choose Us", icon: Sparkles },
  { key: "work_principles", label: "Work Principles", icon: ShieldCheck },
  { key: "achievements", label: "Achievements", icon: Trophy },
];

export default function AboutEditor({
  initialWhyChooseUs,
  initialWorkPrinciples,
  initialAchievements,
  initialFounder,
  initialStory,
}: AboutEditorProps) {
  const [activeTab, setActiveTab] = useState<AboutTab>("founder");

  const labelStyle = { fontFamily: "var(--font-opensans)" };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="About Page"
        description="Kelola seluruh konten halaman Tentang Kami (profil founder, narasi kisah, prinsip kerja, dan metrik pencapaian)."
      />

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-1.5 bg-[#F8F9FB] rounded-2xl p-1.5 border border-border mb-6">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-white shadow-sm text-[#3D3E4A] border border-border"
                  : "text-muted-foreground hover:text-[#3D3E4A]"
              )}
              style={labelStyle}
            >
              <Icon size={15} className={isActive ? "text-[#2DD9A4]" : "text-muted-foreground"} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Box */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 sm:p-8">
        {activeTab === "founder" && <FounderForm initialData={initialFounder} />}
        {activeTab === "story" && <StoryForm initialData={initialStory} />}
        {activeTab === "why_choose_us" && (
          <PrincipleList
            section="why_choose_us"
            initialItems={initialWhyChooseUs}
            title="Why Choose Us"
            description="Daftar keunggulan dan alasan klien memilih bekerja sama dengan Lumi Beta Works."
          />
        )}
        {activeTab === "work_principles" && (
          <PrincipleList
            section="work_principles"
            initialItems={initialWorkPrinciples}
            title="Work Principles"
            description="Standar dan komitmen kerja yang dipegang teguh pada setiap proyek."
          />
        )}
        {activeTab === "achievements" && (
          <AchievementList initialItems={initialAchievements} />
        )}
      </div>
    </div>
  );
}
