"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/data";

function ServiceIcon({ iconType, iconPath }: { iconType: string; iconPath: string }) {
  if (iconType === "polylines") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }
  if (iconType === "circle-clock") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    );
  }
  if (iconType === "home") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d={iconPath} />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d={iconPath} />
    </svg>
  );
}

export default function Services() {
  return (
    <section id="service" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-tag mb-3">What We Do</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#3D3E4A] mb-5"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Services Built for
            <span className="gradient-text"> Your Needs</span>
          </h2>
          <p
            className="text-gray-500 text-lg max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            Whether you&apos;re a UMKM, a startup, or an enterprise — we&apos;ve got a
            service that fits your scale and budget.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`service-card bg-[#F8F9FB] rounded-2xl p-7 ${
                i === 3 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-[#2DD9A4]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(45,217,164,0.15) 0%, rgba(108,99,255,0.1) 100%)",
                }}
              >
                <ServiceIcon iconType={service.iconType} iconPath={service.iconPath} />
              </div>

              <h3
                className="text-xl font-bold text-[#3D3E4A] mb-3"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {service.title}
              </h3>

              <p
                className="text-gray-500 text-sm leading-relaxed mb-5"
                style={{ fontFamily: "var(--font-opensans)" }}
              >
                {service.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(45,217,164,0.1)",
                      color: "#25a880",
                      fontFamily: "var(--font-opensans)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
