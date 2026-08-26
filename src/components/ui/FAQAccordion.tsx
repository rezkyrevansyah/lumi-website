"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FAQItem {
  q: string;
  a: string;
}

export function FAQAccordion({
  items,
  defaultOpenIndex = 0,
}: {
  items: FAQItem[];
  defaultOpenIndex?: number | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-3.5">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <motion.div
            key={idx}
            initial={false}
            animate={{
              backgroundColor: isOpen ? "#ffffff" : "#F8F9FB",
              borderColor: isOpen ? "#2DD9A4" : "rgba(243, 244, 246, 1)",
            }}
            transition={{ duration: 0.2 }}
            className={`rounded-2xl border transition-shadow duration-200 overflow-hidden ${
              isOpen
                ? "shadow-sm border-emerald-300/80"
                : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/80"
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer"
            >
              <span
                className={`font-bold text-sm sm:text-base leading-snug transition-colors ${
                  isOpen ? "text-[#0E8B62]" : "text-[#101828]"
                }`}
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {item.q}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  isOpen
                    ? "bg-emerald-50 text-[#0E8B62]"
                    : "bg-white border border-gray-200/80 text-gray-400"
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.25, delay: 0.05 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.15 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div
                    className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-50"
                    style={{ fontFamily: "var(--font-opensans)" }}
                  >
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
