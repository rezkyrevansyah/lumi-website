"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const FASTWORK_URL = "https://fastwork.id/user/revansyah?source=web_chat_user-profile-modal";

const CREDENTIALS = [
  "Bachelor of Information Technology, Universitas Brawijaya",
  "Google Bangkit Academy, Top 50 Capstone Winner",
  "AI Engineer Cohort, LASKAR AI 2025",
  "Enterprise QA & Full-Stack for National Scale Systems",
];

interface FounderData {
  name?: string;
  title?: string;
  bio?: string;
  photoUrl?: string;
  photo_url?: string;
  credentials?: string[];
  quote?: string;
  fastworkUrl?: string;
  fastwork_url?: string;
}

interface MeetFounderProps {
  founder?: FounderData | null;
}

export default function MeetFounder({ founder }: MeetFounderProps) {
  const name = founder?.name || "Rezky Revansyah";
  const title = founder?.title || "Founder & Tech Lead";
  const bio =
    founder?.bio ||
    "Berpengalaman menangani berbagai proyek berskala nasional dan internasional seperti portal zakat nasional BAZNAS RI, ekosistem Kemenparekraf, platform e-commerce Erafone, hingga sistem operasional telekomunikasi Tower Bersama Group.";
  const photoUrl = founder?.photoUrl || founder?.photo_url || "/profile_founder/revan_photo1.png";
  const credentials =
    founder?.credentials && founder.credentials.length > 0
      ? founder.credentials
      : CREDENTIALS;
  const quote =
    founder?.quote ||
    "Di Lumi Beta Works, kami tidak hanya menulis baris kode. Kami ingin setiap klien merasa tenang, dipahami, dan puas dengan hasil akhir yang benar-benar membawa dampak nyata bagi bisnis mereka.";
  const fastworkUrl = founder?.fastworkUrl || founder?.fastwork_url || FASTWORK_URL;

  return (
    <section className="py-20 md:py-28 bg-[#F8F9FB] border-b border-gray-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-tag mb-3 inline-block">Dedikasi &amp; Kepemimpinan</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#101828] mb-4"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Meet Our <span className="gradient-text">Founder</span>
          </h2>
          <p
            className="text-gray-600 text-base md:text-lg"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            Sosok di balik visi, arsitektur teknikal, dan standar kualitas pengerjaan di Lumi Beta Works.
          </p>
        </motion.div>

        {/* Founder Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xl grid md:grid-cols-12 gap-8 md:gap-12 items-center"
        >
          {/* Photo Area */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-60 h-72 sm:w-64 sm:h-80 rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-50 border-2 border-emerald-300/60 shadow-xl overflow-hidden group">
              <Image
                src={photoUrl}
                alt={name}
                fill
                sizes="(min-width: 640px) 256px, 240px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/60 via-transparent to-transparent opacity-60 pointer-events-none" />

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-[#0E8B62] shadow-md flex items-center gap-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-[#2DD9A4] animate-pulse" />
                Founder &amp; Lead Engineer
              </div>
            </div>
          </div>

          {/* Bio & Details */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-bold text-[#2DD9A4] uppercase tracking-wider">
                Founder &amp; Tech Lead
              </span>
              <h3
                className="text-2xl sm:text-3xl font-extrabold text-[#101828] mt-1"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {name}
              </h3>
              <p className="text-sm text-gray-500 font-medium">
                {title}
              </p>
            </div>

            <p
              className="text-gray-600 text-sm sm:text-base leading-relaxed"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              {bio}
            </p>

            {/* Credentials Pills */}
            <div className="space-y-2 pt-1">
              {credentials.map((cred) => (
                <div key={cred} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-medium">
                  <span className="text-[#2DD9A4] font-bold">✓</span>
                  <span>{cred}</span>
                </div>
              ))}
            </div>

            {/* Founder Quote */}
            <div className="p-4 rounded-xl bg-[#F8F9FB] border-l-4 border-[#2DD9A4] text-xs sm:text-sm text-gray-600 italic">
              &ldquo;{quote}&rdquo;
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://wa.me/62882015884006?text=Halo+Mas+Revan,+saya+ingin+konsultasi+langsung+tentang+proyek+saya."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md"
              >
                Ngobrol Langsung via WA
              </a>
              {fastworkUrl && (
                <a
                  href={fastworkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white"
                >
                  Profil Fastwork
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
