"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion, animate } from "motion/react";

interface RollingNumberProps {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function RollingNumber({
  value,
  decimals = 0,
  duration = 1.6,
  className = "",
}: RollingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (shouldReduceMotion) {
      node.textContent = value.toFixed(decimals);
      return;
    }

    if (!isInView) {
      node.textContent = (0).toFixed(decimals);
      return;
    }

    // Direct DOM text update: zero React re-render overhead, 120fps buttery smooth
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo curve for snappy launch and organic deceleration
      onUpdate: (latest) => {
        node.textContent = latest.toFixed(decimals);
      },
    });

    return () => controls.stop();
  }, [isInView, value, decimals, duration, shouldReduceMotion]);

  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums tracking-tight ${className}`}
      aria-label={value.toString()}
    >
      {(0).toFixed(decimals)}
    </span>
  );
}
