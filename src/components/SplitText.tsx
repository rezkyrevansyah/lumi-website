"use client";

import React, { useRef, useEffect, useState } from "react";

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: React.CSSProperties;
  to?: React.CSSProperties;
  threshold?: number;
  rootMargin?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  splitType = "chars",
  threshold = 0.1,
  rootMargin = "-100px",
  tag = "p",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
          onLetterAnimationComplete && setTimeout(onLetterAnimationComplete, duration * 1000 + text.length * delay);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, threshold, rootMargin, delay, duration, onLetterAnimationComplete]);

  const units = splitType === "words" || splitType === "lines"
    ? text.split(" ")
    : text.split("");

  const Tag = (tag || "p") as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={`split-parent inline-block ${className}`}
      style={{ textAlign, wordWrap: "break-word" }}
    >
      {units.map((unit, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: `opacity ${duration}s ease, transform ${duration}s ease`,
            transitionDelay: visible ? `${i * delay}ms` : "0ms",
          }}
        >
          {unit}{splitType !== "chars" ? " " : ""}
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;
