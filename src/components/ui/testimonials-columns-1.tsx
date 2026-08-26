"use client";

import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

export interface TestimonialItem {
  text: string;
  name: string;
  role: string;
  rating?: number;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 15,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-5 pb-5 will-change-transform"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role, rating = 5 }, i) => (
                <div
                  className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-gray-100/90 bg-white/95 backdrop-blur-xs shadow-sm hover:shadow-md hover:border-emerald-200/80 transition-all duration-300 max-w-xs w-full flex flex-col justify-between"
                  key={i}
                >
                  <div>
                    {/* Card Header: Star Rating */}
                    <div className="flex items-center gap-1 mb-3.5">
                      {[...Array(rating)].map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="w-3.5 h-3.5 fill-[#2DD9A4] text-[#2DD9A4]"
                        />
                      ))}
                    </div>

                    {/* Quote Text */}
                    <p
                      className="text-gray-600 text-sm leading-relaxed"
                      style={{ fontFamily: "var(--font-opensans)" }}
                    >
                      &ldquo;{text}&rdquo;
                    </p>
                  </div>

                  {/* Card Footer: Client Name & Role */}
                  <div className="mt-5 pt-4 border-t border-gray-50 flex flex-col min-w-0">
                    <div
                      className="font-bold text-[#101828] text-sm tracking-tight leading-5 truncate"
                      style={{ fontFamily: "var(--font-rubik)" }}
                    >
                      {name}
                    </div>
                    <div
                      className="text-xs text-gray-400 font-medium tracking-tight leading-5 truncate mt-0.5"
                      style={{ fontFamily: "var(--font-opensans)" }}
                    >
                      {role}
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
