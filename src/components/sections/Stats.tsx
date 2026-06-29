"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/data";

export default function Stats() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <p
                className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {stat.value}
              </p>
              <p
                className="text-gray-500 text-xs md:text-sm"
                style={{ fontFamily: "var(--font-opensans)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
