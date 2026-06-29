"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type PortfolioItem } from "@/lib/data";

export function WebIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export function AndroidIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.523 15.341c-.414 0-.75-.336-.75-.75V9.5c0-.414.336-.75.75-.75s.75.336.75.75v5.091c0 .414-.336.75-.75.75zm-11.046 0c-.414 0-.75-.336-.75-.75V9.5c0-.414.336-.75.75-.75s.75.336.75.75v5.091c0 .414-.336.75-.75.75zM8.5 20.5c0 .828.672 1.5 1.5 1.5h4c.828 0 1.5-.672 1.5-1.5v-1H8.5v1zm7-13.5H8.5v9.5h7V7zM15.5 6h-.191l1.048-1.816c.207-.359.083-.818-.276-1.025-.36-.207-.818-.083-1.025.276L13.74 5.275C13.177 5.099 12.578 5 12 5s-1.177.099-1.74.275L8.944 3.435c-.207-.359-.665-.483-1.025-.276-.359.207-.483.665-.276 1.025L8.691 6H8.5C7.395 6 6.5 6.895 6.5 8v.5h11V8c0-1.105-.895-2-2-2z" />
    </svg>
  );
}

export function IOSIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

const PLATFORM_LABELS: Record<string, string> = {
  web: "Web",
  android: "Android",
  ios: "iOS",
};

export function PortfolioCard({ proj, index }: { proj: PortfolioItem & { imageUrl?: string }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Visual area */}
      <div
        className="relative aspect-square overflow-hidden flex items-center justify-center"
        style={proj.imageUrl ? undefined : { background: `linear-gradient(135deg, ${proj.bg} 0%, ${proj.color}33 100%)` }}
      >
        {proj.imageUrl ? (
          /* Uploaded project image */
          <Image
            src={proj.imageUrl}
            alt={proj.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          /* Default gradient placeholder */
          <>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="absolute w-40 h-40 rounded-full opacity-30"
              style={{ background: proj.color, filter: "blur(40px)" }} />
            <div
              className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
              style={{ background: `${proj.color}33`, border: `1.5px solid ${proj.color}55` }}
            >
              {proj.platforms.includes("web") ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={proj.color} strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              ) : proj.platforms.includes("ios") ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill={proj.color}>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill={proj.color}>
                  <path d="M17.523 15.341c-.414 0-.75-.336-.75-.75V9.5c0-.414.336-.75.75-.75s.75.336.75.75v5.091c0 .414-.336.75-.75.75zm-11.046 0c-.414 0-.75-.336-.75-.75V9.5c0-.414.336-.75.75-.75s.75.336.75.75v5.091c0 .414-.336.75-.75.75zM8.5 20.5c0 .828.672 1.5 1.5 1.5h4c.828 0 1.5-.672 1.5-1.5v-1H8.5v1zm7-13.5H8.5v9.5h7V7zM15.5 6h-.191l1.048-1.816c.207-.359.083-.818-.276-1.025-.36-.207-.818-.083-1.025.276L13.74 5.275C13.177 5.099 12.578 5 12 5s-1.177.099-1.74.275L8.944 3.435c-.207-.359-.665-.483-1.025-.276-.359.207-.483.665-.276 1.025L8.691 6H8.5C7.395 6 6.5 6.895 6.5 8v.5h11V8c0-1.105-.895-2-2-2z" />
                </svg>
              )}
            </div>
          </>
        )}

        {/* Category badge top-left */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm"
            style={{
              background: proj.imageUrl ? "rgba(0,0,0,0.45)" : `${proj.color}22`,
              color: proj.imageUrl ? "#fff" : proj.color,
              border: proj.imageUrl ? "1px solid rgba(255,255,255,0.15)" : `1px solid ${proj.color}33`,
              fontFamily: "var(--font-rubik)",
            }}
          >
            {proj.category}
          </span>
        </div>

        {/* Platform pills top-right */}
        <div className="absolute top-3 right-3 flex gap-1 z-10">
          {proj.platforms.map((p) => (
            <span
              key={p}
              className="flex items-center gap-1 text-white/80 text-xs px-2 py-0.5 rounded-full backdrop-blur-sm"
              style={{ background: "rgba(0,0,0,0.25)" }}
            >
              {p === "web" && <WebIcon />}
              {p === "android" && <AndroidIcon />}
              {p === "ios" && <IOSIcon />}
              <span style={{ fontFamily: "var(--font-opensans)" }}>{PLATFORM_LABELS[p]}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Info area */}
      <div className="p-5">
        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide" style={{ fontFamily: "var(--font-opensans)" }}>
          {proj.client}
        </p>
        <h3 className="text-[#3D3E4A] font-bold text-lg leading-snug mb-2" style={{ fontFamily: "var(--font-rubik)" }}>
          {proj.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: "var(--font-opensans)" }}>
          {proj.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {proj.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-0.5 rounded-full"
              style={{ background: "rgba(45,217,164,0.08)", color: "#25a880", fontFamily: "var(--font-opensans)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
