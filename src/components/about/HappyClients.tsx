"use client";

import { motion } from "framer-motion";

const CLIENTS = [
  "BKD Pemprov", "TechMart Indonesia", "FinFlow", "EduBright", "RetailX",
  "HealthCo", "BuildPro Indonesia", "AgroBase", "CloudSync", "MediaOne",
  "GovDKI", "StartupHub", "DataCorp", "LogiTech ID", "UrbanSpace",
];

export default function HappyClients() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-tag mb-3">Our Clients</p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3D3E4A] mb-4"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Happy{" "}
            <span className="gradient-text">Clients</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-opensans)" }}>
            We pride ourselves on our commitment to quality and customer satisfaction.
            We strive to exceed our clients&apos; expectations at every step of the way,
            delivering reliable, sustainable, and loveable software solutions.
          </p>
        </motion.div>

        {/* Logo grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="bg-[#F8F9FB] rounded-2xl flex items-center justify-center px-4 py-5 hover:shadow-md hover:bg-[#F0EFFF] transition-all duration-200 group"
            >
              <span
                className="text-xs sm:text-sm font-semibold text-gray-400 group-hover:text-[#6C63FF] transition-colors text-center leading-tight"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {client}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-400 font-semibold text-sm"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          and many more...
        </motion.p>
      </div>
    </section>
  );
}
