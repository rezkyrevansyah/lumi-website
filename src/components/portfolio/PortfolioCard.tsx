"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ExternalLink, Globe, Smartphone, Apple } from "lucide-react";
import { type PortfolioItem } from "@/lib/data";

export function WebIcon({ size = 13 }: { size?: number }) {
  return <Globe className="w-3.5 h-3.5" />;
}

export function AndroidIcon({ size = 13 }: { size?: number }) {
  return <Smartphone className="w-3.5 h-3.5" />;
}

export function IOSIcon({ size = 13 }: { size?: number }) {
  return <Apple className="w-3.5 h-3.5" />;
}

const PLATFORM_LABELS: Record<string, string> = {
  web: "Web App",
  android: "Android",
  ios: "iOS",
};

export function PortfolioCard({
  proj,
  index,
}: {
  proj: PortfolioItem & { imageUrl?: string; demoUrl?: string };
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100/90 shadow-sm hover:shadow-xl hover:border-emerald-200/80 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Visual Area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 flex items-center justify-center">
        {proj.imageUrl ? (
          <Image
            src={proj.imageUrl}
            alt={proj.title}
            fill
            sizes="(min-width: 1280px) 380px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${proj.bg} 0%, ${proj.color}33 100%)`,
            }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg relative z-10"
              style={{ background: `${proj.color}33`, border: `1.5px solid ${proj.color}55` }}
            >
              <Globe className="w-6 h-6" style={{ color: proj.color }} />
            </div>
          </div>
        )}

        {/* Gradient overlay on bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Category badge top-left */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/60 text-white/90 backdrop-blur-md border border-white/15">
            {proj.category.split("•")[0]?.trim() || proj.category}
          </span>
        </div>

        {/* Platform badges top-right */}
        <div className="absolute top-3.5 right-3.5 flex gap-1 z-10">
          {proj.platforms.map((p) => (
            <span
              key={p}
              className="flex items-center gap-1 text-white text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15"
            >
              {p === "web" && <WebIcon />}
              {p === "android" && <AndroidIcon />}
              {p === "ios" && <IOSIcon />}
              <span>{PLATFORM_LABELS[p] ?? p}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Client Subtitle */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5 font-medium tracking-wide">
            <span className="truncate">{proj.client}</span>
          </div>

          {/* Title */}
          <h3
            className="text-[#101828] font-bold text-lg leading-snug mb-2 group-hover:text-[#0E8B62] transition-colors"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            {proj.title}
          </h3>

          {/* Description */}
          <p
            className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            {proj.description}
          </p>
        </div>

        <div>
          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {proj.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-gray-50 border border-gray-100 text-gray-600"
                style={{ fontFamily: "var(--font-opensans)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Link Footer */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            {proj.demoUrl ? (
              <a
                href={proj.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E8B62] hover:text-[#2DD9A4] transition-colors group/link"
              >
                <span>Lihat Live Preview</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            ) : (
              <span className="text-xs text-gray-400 font-medium">Enterprise Private System</span>
            )}
            <span className="text-[11px] text-gray-400 font-medium">{proj.platforms.join(" / ").toUpperCase()}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
