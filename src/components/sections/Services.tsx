"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { type Service } from "@/lib/data";

function getServiceLink(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("website") || (t.includes("web") && !t.includes("rebuild"))) return "/layanan/website";
  if (t.includes("aplikasi") || t.includes("mobile") || (t.includes("app") && !t.includes("rebuild"))) return "/layanan/aplikasi";
  if (t.includes("qa") || t.includes("testing")) return "/layanan/qa-testing";
  if (t.includes("consulting") || t.includes("konsultasi") || t.includes("rebuild")) return "/layanan/konsultasi";
  return "/layanan";
}

function ServiceIcon({ iconType, iconPath, size = 24 }: { iconType: string; iconPath: string; size?: number }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 as number };
  if (iconType === "polylines") {
    return (
      <svg {...props}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }
  if (iconType === "circle-clock") {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d={iconPath} />
    </svg>
  );
}

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="service" className="py-20 md:py-28 bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header - Clean, No Floating Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 sm:mb-16 max-w-3xl mx-auto"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#101828] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Layanan Vendor IT &amp;{" "}
            <span className="gradient-text">Website Perusahaan</span>
          </h2>
          <p
            className="text-gray-600 text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            Pilihan solusi teknologi terpadu untuk Perusahaan, Instansi Pemerintah, dan Bisnis Berkembang dengan garansi kualitas, keamanan, dan ketepatan waktu.
          </p>
        </motion.div>

        {/* Responsive Services Grid (4-columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 hover:border-emerald-300/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon Container with Concentric Radius */}
                <div className="w-13 h-13 rounded-2xl bg-emerald-500/10 text-[#0E8B62] flex items-center justify-center mb-6 group-hover:bg-[#2DD9A4] group-hover:text-white transition-colors duration-300">
                  <ServiceIcon iconType={service.iconType} iconPath={service.iconPath} size={24} />
                </div>

                {/* Title */}
                <h3
                  className="font-bold text-[#101828] text-lg sm:text-xl leading-snug mb-3 group-hover:text-[#0E8B62] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-rubik)" }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="text-gray-600 text-sm leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-opensans)" }}
                >
                  {service.desc}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-gray-100 mt-auto">
                <Link
                  href={getServiceLink(service.title)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E8B62] group-hover:text-[#0a6647] transition-colors active:scale-[0.96]"
                  style={{ fontFamily: "var(--font-opensans)" }}
                >
                  Pelajari Lebih Lanjut
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
