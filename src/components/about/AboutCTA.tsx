"use client";

import { motion } from "motion/react";

const FASTWORK_URL = "https://fastwork.id/user/revansyah?source=web_chat_user-profile-modal";

export default function AboutCTA() {
  return (
    <section className="py-20 md:py-28 bg-[#F8F9FB] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 sm:p-14 border border-gray-200/80 shadow-xl"
        >
          <span className="section-tag mb-4 inline-block">Mulai Langkah Pertama</span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#101828] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Punya Ide atau Kebutuhan <span className="gradient-text">Website &amp; Aplikasi?</span>
          </h2>
          <p
            className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            Mari berdiskusi santai. Ceritakan kebutuhan bisnis atau instansi Anda, dan kami akan bantu berikan saran arsitektur, estimasi pengerjaan, dan solusi paling efisien, 100% gratis tanpa komitmen.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/62882015884006?text=Halo+Lumi+Beta+Works,+saya+ingin+konsultasi+proyek+website+/+aplikasi."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-emerald-500/20 w-full sm:w-auto"
            >
              Diskusi via WhatsApp (Gratis)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href={FASTWORK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold bg-white border-gray-200 text-[#3D3E4A] hover:bg-gray-50 w-full sm:w-auto"
            >
              Hire Kami di Fastwork
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
