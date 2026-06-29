"use client";

import { motion } from "framer-motion";

const TILES = [
  { color: "#1a1040", label: "Team Meeting" },
  { color: "#0F1923", label: "Workshop" },
  { color: "#200D18", label: "Team Offsite" },
  { color: "#051F14", label: "Sprint Review" },
];

function GalleryTile({ tile }: { tile: typeof TILES[0] }) {
  return (
    <div
      className="flex-shrink-0 w-[480px] h-72 rounded-3xl overflow-hidden relative group mx-3"
      style={{ background: `linear-gradient(135deg, ${tile.color} 0%, ${tile.color}cc 100%)` }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(45,217,164,0.12)" }} />
      <div className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
            style={{ background: "rgba(45,217,164,0.15)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2DD9A4" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <p className="text-white/50 text-xs" style={{ fontFamily: "var(--font-opensans)" }}>
            {tile.label}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PositiveVibes() {
  const doubled = [...TILES, ...TILES];

  return (
    <section className="py-24 bg-[#F8F9FB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="section-tag mb-3">Our Culture</p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3D3E4A] mb-4"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Positive Vibes{" "}
            <span className="gradient-text">Everywhere!</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-opensans)" }}>
            At our studio, we believe in creating an environment that fosters creativity,
            collaboration, and innovation. We&apos;re passionate about helping our clients
            succeed and are committed to providing the tools and resources they need to achieve their goals.
          </p>
        </motion.div>
      </div>

      {/* Marquee row */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee">
          {doubled.map((tile, i) => (
            <GalleryTile key={i} tile={tile} />
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-5 px-6" style={{ fontFamily: "var(--font-opensans)" }}>
        * Photo gallery will be updated with real team photos
      </p>
    </section>
  );
}
