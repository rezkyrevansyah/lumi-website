"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import "./TrueFocus.css";

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useVisibilityPause(ref: React.RefObject<HTMLElement | null>): boolean {
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => setOnScreen(entries.some((e) => e.isIntersecting)), {
      threshold: 0.1,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState !== "hidden");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return onScreen && tabVisible;
}

export default function TrueFocus({
  sentence = "Hello, Selamat Datang",
  separator = " ",
  manualMode = false,
  borderColor = "#2DD9A4",
  glowColor = "rgba(45, 217, 164, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = "",
}: TrueFocusProps) {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const rectsRef = useRef<Rect[]>([]);
  const [focusRect, setFocusRect] = useState<Rect>({ x: 0, y: 0, width: 0, height: 0 });

  const reducedMotion = useReducedMotion();
  const visible = useVisibilityPause(containerRef);
  const active = visible && !reducedMotion;

  // Measure every word's rect once (on mount + container resize), instead of
  // reading layout on every word change — avoids forced synchronous layout
  // (layout thrashing) right next to the frame's animate() call below.
  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const parentRect = container.getBoundingClientRect();
    rectsRef.current = wordRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0, width: 0, height: 0 };
      const r = el.getBoundingClientRect();
      return { x: r.left - parentRect.left, y: r.top - parentRect.top, width: r.width, height: r.height };
    });
    const rect = rectsRef.current[currentIndex];
    if (rect) setFocusRect(rect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words.length]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(container);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    if (manualMode || !active) return;
    const interval = setInterval(
      () => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      },
      (animationDuration + pauseBetweenAnimations) * 1000
    );

    return () => clearInterval(interval);
  }, [manualMode, active, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    const rect = rectsRef.current[currentIndex];
    if (rect) setFocusRect(rect);
  }, [currentIndex]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex ?? 0);
    }
  };

  return (
    <div className={`focus-container ${className}`} ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className={`focus-word ${manualMode ? "manual" : ""} ${isActive && !manualMode ? "active" : ""}`}
            style={{
              opacity: isActive ? 1 : 0.45,
              // @ts-ignore
              "--border-color": borderColor,
              "--glow-color": glowColor,
              transition: `opacity ${animationDuration}s ease`,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{
          duration: reducedMotion ? 0 : animationDuration,
        }}
        style={{
          // @ts-ignore
          "--border-color": borderColor,
          "--glow-color": glowColor,
        }}
      >
        <span className="corner top-left"></span>
        <span className="corner top-right"></span>
        <span className="corner bottom-left"></span>
        <span className="corner bottom-right"></span>
      </motion.div>
    </div>
  );
}
