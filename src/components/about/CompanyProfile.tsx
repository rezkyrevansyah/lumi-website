"use client";

import { motion } from "framer-motion";

export default function CompanyProfile() {
  return (
    <section className="py-16 bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-0 items-center">
            {/* Left — text */}
            <div className="p-8 md:p-12">
              <p className="section-tag mb-4">Company Profile</p>
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#3D3E4A] mb-4 leading-tight"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Learn more{" "}
                <span className="gradient-text">about us</span>
              </h2>
              <p
                className="text-gray-500 text-base leading-relaxed mb-8 max-w-sm"
                style={{ fontFamily: "var(--font-opensans)" }}
              >
                Download our company profile to get a full picture of what Lumi
                Beta Works offers — our services, approach, past projects, and
                how we can take your business to the next level.
              </p>

              <a
                href="/company-profile-lumi-beta-works.pdf"
                download
                className="btn-primary inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold group"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2"
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </a>
            </div>

            {/* Right — decorative illustration area */}
            <div
              className="relative h-64 lg:h-full min-h-[260px] flex items-center justify-center overflow-hidden"
              style={{ background: "linear-gradient(135deg, #F0EFFF 0%, #E8FBF4 100%)" }}
            >
              {/* Grid overlay */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(108,99,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.05) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              {/* Ambient glows */}
              <div className="absolute top-4 right-4 w-32 h-32 rounded-full opacity-30"
                style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)", filter: "blur(24px)" }} />
              <div className="absolute bottom-4 left-8 w-24 h-24 rounded-full opacity-25"
                style={{ background: "radial-gradient(circle, #2DD9A4 0%, transparent 70%)", filter: "blur(20px)" }} />

              {/* Floating tech icon cards */}
              <div className="relative z-10 grid grid-cols-3 gap-3 p-8">
                {[
                  { icon: "⚛️", label: "React" },
                  { icon: "▲", label: "Next.js" },
                  { icon: "🐦", label: "Flutter" },
                  { icon: "🟢", label: "Node.js" },
                  { icon: "🐘", label: "PostgreSQL" },
                  { icon: "🔥", label: "Firebase" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                    className="bg-white rounded-xl shadow-sm px-3 py-2.5 flex flex-col items-center gap-1 border border-white/80"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span
                      className="text-xs font-semibold text-gray-500"
                      style={{ fontFamily: "var(--font-opensans)" }}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
