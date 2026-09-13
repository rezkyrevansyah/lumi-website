"use client";

import { useState, useMemo } from "react";
import type { ServiceCategory } from "@/data/portfolio";
import { PortfolioCard } from "@/components/PortfolioCard";

type FilterTab = "all" | ServiceCategory;

export interface GalleryItem {
  slug: string;
  title: string;
  category: ServiceCategory;
  image: string;
  description: string;
}

interface PortfolioGalleryProps {
  items: GalleryItem[];
  labels: {
    all: string;
    "web-app": string;
    uiux: string;
    qa: string;
    emptyState: string;
  };
}

export function PortfolioGallery({ items, labels }: PortfolioGalleryProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const counts = useMemo(() => {
    return {
      all: items.length,
      "web-app": items.filter((it) => it.category === "web-app").length,
      uiux: items.filter((it) => it.category === "uiux").length,
      qa: items.filter((it) => it.category === "qa").length,
    };
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeTab === "all") return items;
    return items.filter((it) => it.category === activeTab);
  }, [items, activeTab]);

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: labels.all, count: counts.all },
    { key: "web-app", label: labels["web-app"], count: counts["web-app"] },
    { key: "uiux", label: labels.uiux, count: counts.uiux },
    { key: "qa", label: labels.qa, count: counts.qa },
  ];

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] ${
                isActive
                  ? "bg-cta-solid text-white shadow-sm"
                  : "border border-border/80 bg-white text-text-secondary hover:border-zinc-300 hover:bg-background-subtle hover:text-text-primary"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold leading-none ${
                  isActive ? "bg-white/20 text-white" : "bg-zinc-100 text-text-muted"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-20 text-center text-text-muted">
          <p className="text-base">{labels.emptyState}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <PortfolioCard
              key={item.slug}
              title={item.title}
              category={labels[item.category]}
              description={item.description}
              image={item.image}
              priority={index < 3}
            />
          ))}
        </div>
      )}
    </div>
  );
}
