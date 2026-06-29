"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PORTFOLIO } from "@/lib/data";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-tag mb-3">Our Work</p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3D3E4A] mb-5"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            <span className="gradient-text">Projects</span>{" "}We&apos;re Proud Of
          </h2>
          <p
            className="text-gray-500 text-base md:text-lg max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            A snapshot of what we&apos;ve built — across industries, platforms, and
            problem spaces.
          </p>
        </motion.div>

        {/* Grid — show first 3 on home */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {PORTFOLIO.slice(0, 3).map((proj, i) => (
            <PortfolioCard key={proj.title} proj={proj} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold border-2 border-[#2DD9A4] text-[#2DD9A4] hover:bg-[#2DD9A4] hover:text-white transition-all duration-200 group"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
              className="transition-transform duration-200 group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
