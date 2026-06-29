"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute left-0 bottom-0 w-48 h-48 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute right-0 top-0 w-40 h-40 rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #2DD9A4 0%, transparent 70%)", filter: "blur(30px)" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3D3E4A] mb-4 leading-tight"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Love what{" "}
              <span className="gradient-text">we do?</span>
            </h2>
            <p
              className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-md"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Your ideas matter to us. Share what you have in mind, feel free
              to discuss it (for free!) and see what we can do!
            </p>
            <Link
              href="/#contact"
              className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base"
            >
              Let&apos;s Talk!
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          {/* Right — decorative illustration */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative flex justify-center"
          >
            <div
              className="w-full max-w-sm h-64 rounded-3xl flex items-center justify-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #F0EFFF 0%, #E8FBF4 100%)" }}
            >
              {/* Decorative shapes */}
              <div className="absolute top-6 right-6 w-16 h-16 rounded-full opacity-40"
                style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)" }} />
              <div className="absolute bottom-6 left-6 w-20 h-20 rounded-full opacity-30"
                style={{ background: "radial-gradient(circle, #2DD9A4 0%, transparent 70%)" }} />

              {/* Center content */}
              <div className="relative z-10 text-center px-8">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="1.8">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 font-medium" style={{ fontFamily: "var(--font-opensans)" }}>
                  Free consultation available
                </p>
                <p className="text-xs text-[#6C63FF] font-semibold mt-1" style={{ fontFamily: "var(--font-opensans)" }}>
                  No commitment required
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
