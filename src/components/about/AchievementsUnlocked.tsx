"use client";

import { motion } from "framer-motion";

const ACHIEVEMENTS = [
  {
    value: "20+",
    label: "Projects Finished",
    desc: "Continuously making impacts with sustainability and inclusivity.",
    color: "#6C63FF",
    bg: "linear-gradient(135deg, #F0EFFF 0%, #E8E6FF 100%)",
    textColor: "#6C63FF",
  },
  {
    value: "15+",
    label: "Happy Clients",
    desc: "From local businesses to government institutions. They trust us.",
    color: "#2DD9A4",
    bg: "linear-gradient(135deg, #E8FBF4 0%, #D4F7EC 100%)",
    textColor: "#1aad84",
  },
  {
    value: "100%",
    label: "On-Time Delivery",
    desc: "We commit to deadlines and deliver what we promise, every time.",
    color: "#3BB5C5",
    bg: "linear-gradient(135deg, #E8F7FA 0%, #D4EFF4 100%)",
    textColor: "#2a8fa0",
  },
];

export default function AchievementsUnlocked() {
  return (
    <section className="py-24 bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-tag mb-3">By The Numbers</p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3D3E4A] mb-4"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Achievements{" "}
            <span className="gradient-text">Unlocked</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-opensans)" }}>
            Every business deserves the opportunity to leverage cutting-edge technologies
            and modern approaches to deliver its values while maintaining high standards
            of product sustainability and quality.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{ background: a.bg }}
            >
              {/* Decorative circle */}
              <div
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20"
                style={{ background: a.color }}
              />
              <div
                className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-10"
                style={{ background: a.color }}
              />

              <p
                className="text-5xl md:text-6xl font-bold mb-2 relative z-10"
                style={{ color: a.textColor, fontFamily: "var(--font-rubik)" }}
              >
                {a.value}
              </p>
              <p
                className="font-bold text-[#3D3E4A] text-lg mb-3 relative z-10"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {a.label}
              </p>
              <p
                className="text-gray-500 text-sm leading-relaxed relative z-10"
                style={{ fontFamily: "var(--font-opensans)" }}
              >
                {a.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
