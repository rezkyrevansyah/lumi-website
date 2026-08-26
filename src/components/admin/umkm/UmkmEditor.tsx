"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/shared/PageHeader";
import UseCaseList from "./UseCaseList";
import { type UmkmUseCase } from "./UseCaseFormDialog";
import ProcessStepList from "./ProcessStepList";
import { type UmkmProcessStep } from "./ProcessStepFormDialog";
import MarketStatList from "./MarketStatList";
import { type UmkmMarketStat } from "./MarketStatFormDialog";
import WhyUsEditor, { type UmkmWhyUsItem } from "./WhyUsEditor";
import { cn } from "@/lib/utils";
import { LayoutGrid, GitCommit, TrendingUp, Sparkles } from "lucide-react";

type UmkmTab = "use_cases" | "process_steps" | "market_stats" | "why_us";

interface UmkmEditorProps {
  initialUseCases: UmkmUseCase[];
  initialProcessSteps: UmkmProcessStep[];
  initialMarketStats: UmkmMarketStat[];
  initialWhyUs: UmkmWhyUsItem[] | null;
}

const TABS: Array<{ key: UmkmTab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = [
  { key: "use_cases", label: "Use Cases & Solusi", icon: LayoutGrid },
  { key: "process_steps", label: "Alur Pengerjaan", icon: GitCommit },
  { key: "market_stats", label: "Statistik Pasar", icon: TrendingUp },
  { key: "why_us", label: "Kenapa Memilih Kami", icon: Sparkles },
];

export default function UmkmEditor({
  initialUseCases,
  initialProcessSteps,
  initialMarketStats,
  initialWhyUs,
}: UmkmEditorProps) {
  const [activeTab, setActiveTab] = useState<UmkmTab>("use_cases");

  const labelStyle = { fontFamily: "var(--font-opensans)" };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="UMKM Page"
        description="Kelola seluruh modul halaman Layanan UMKM (daftar solusi praktis, alur proses, statistik pasar, dan keunggulan)."
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
        {activeTab === "use_cases" && <UseCaseList initialItems={initialUseCases} />}
        {activeTab === "process_steps" && (
          <ProcessStepList initialItems={initialProcessSteps} />
        )}
        {activeTab === "market_stats" && (
          <MarketStatList initialItems={initialMarketStats} />
        )}
        {activeTab === "why_us" && <WhyUsEditor initialItems={initialWhyUs} />}
      </div>
    </div>
  );
}
