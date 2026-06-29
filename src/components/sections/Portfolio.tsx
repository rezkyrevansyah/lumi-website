"use client";

import { motion } from "framer-motion";
import { PORTFOLIO, type PortfolioItem } from "@/lib/data";

function WebIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.523 15.341c-.414 0-.75-.336-.75-.75V9.5c0-.414.336-.75.75-.75s.75.336.75.75v5.091c0 .414-.336.75-.75.75zm-11.046 0c-.414 0-.75-.336-.75-.75V9.5c0-.414.336-.75.75-.75s.75.336.75.75v5.091c0 .414-.336.75-.75.75zM8.5 20.5c0 .828.672 1.5 1.5 1.5h4c.828 0 1.5-.672 1.5-1.5v-1H8.5v1zm7-13.5H8.5v9.5h7V7zM15.5 6h-.191l1.048-1.816c.207-.359.083-.818-.276-1.025-.36-.207-.818-.083-1.025.276L13.74 5.275C13.177 5.099 12.578 5 12 5s-1.177.099-1.74.275L8.944 3.435c-.207-.359-.665-.483-1.025-.276-.359.207-.483.665-.276 1.025L8.691 6H8.5C7.395 6 6.5 6.895 6.5 8v.5h11V8c0-1.105-.895-2-2-2z" />
    </svg>
  );
}

function IOSIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlatformBadge({ platform }: { platform: "web" | "android" | "ios" }) {
  return (
    <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
      {platform === "web" && <WebIcon />}
      {platform === "android" && <AndroidIcon />}
      {platform === "ios" && <IOSIcon />}
    </span>
  );
}

function PortfolioCard({ proj, index }: { proj: PortfolioItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      className="portfolio-card rounded-3xl overflow-hidden cursor-pointer"
      style={{ background: proj.bg }}
    >
      {/* Visual area */}
      <div
        className="h-48 flex items-center justify-center relative overflow-hidden"
        style={{ background: proj.bg }}
      >
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Accent circle */}
        <div
          className="w-24 h-24 rounded-full opacity-20"
          style={{ background: proj.color, filter: "blur(20px)" }}
        />
        {/* Category tag */}
        <div className="absolute top-4 left-4">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              background: `${proj.color}22`,
              color: proj.color,
              fontFamily: "var(--font-rubik)",
            }}
          >
            {proj.category}
          </span>
        </div>
        {/* Platform icons */}
        <div className="absolute top-4 right-4 flex gap-1.5">
          {proj.platforms.map((p) => (
            <PlatformBadge key={p} platform={p} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p
          className="text-white/50 text-xs mb-1.5"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          {proj.client}
        </p>
        <h3
          className="text-white font-bold text-lg leading-snug"
          style={{ fontFamily: "var(--font-rubik)" }}
        >
          {proj.title}
        </h3>
        <div className="mt-4 flex items-center gap-1.5">
          <div
            className="w-6 h-0.5 rounded-full"
            style={{ background: proj.color }}
          />
          <div
            className="w-2 h-0.5 rounded-full opacity-40"
            style={{ background: proj.color }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-tag mb-3">Our Work</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#3D3E4A] mb-5"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            <span className="gradient-text">Projects</span> We&apos;re Proud Of
          </h2>
          <p
            className="text-gray-500 text-lg max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            A snapshot of what we&apos;ve built — across industries, platforms, and
            problem spaces.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO.map((proj, i) => (
            <PortfolioCard key={proj.title} proj={proj} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
