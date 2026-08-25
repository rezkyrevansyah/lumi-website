"use client";

import React, { useEffect, useRef } from "react";
import "./GradientWaves.css";

export interface GradientWavesProps {
  horizonColor?: string;
  waveColor?: string;
  crestColor?: string;
  speed?: number;
  amplitude?: number;
  waveScale?: number;
  waveRatio?: number;
  swell?: number;
  turbulence?: number;
  tilt?: number;
  zoom?: number;
  height?: number;
  fogDepth?: number;
  detail?: "low" | "medium" | "high";
  brightness?: number;
  opacity?: number;
  mouseInteraction?: boolean;
  parallaxStrength?: number;
  grain?: boolean;
  grainIntensity?: number;
  className?: string;
}

export const GradientWaves: React.FC<GradientWavesProps> = ({
  horizonColor = "#F8F9FB",
  waveColor = "#2DD9A4",
  crestColor = "#818CF8",
  speed = 0.3,
  opacity = 0.45,
  mouseInteraction = true,
  parallaxStrength = 0.3,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let rafId = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!mouseInteraction || !container) return;
      const rect = container.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      targetMouseX = width / 2;
      targetMouseY = height / 2;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    let step = 0;

    const render = () => {
      if (!isVisible || !isPageVisible) return;

      step += speed * 0.02;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const parallaxX = ((mouseX - width / 2) / width) * 40 * parallaxStrength;
      const parallaxY = ((mouseY - height / 2) / height) * 30 * parallaxStrength;

      ctx.clearRect(0, 0, width, height);

      // Layer 1: Ambient Horizon Wash
      const gradBg = ctx.createLinearGradient(0, 0, 0, height);
      gradBg.addColorStop(0, "transparent");
      gradBg.addColorStop(0.6, `${waveColor}0A`);
      gradBg.addColorStop(1, `${crestColor}14`);
      ctx.fillStyle = gradBg;
      ctx.fillRect(0, 0, width, height);

      // Layer 2: Deep Silk Wave (Smooth Cubic Bezier curve, 120 FPS hardware blit)
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.moveTo(0, height);

      const yOffset1 = height * 0.55 + parallaxY * 0.5;
      const cp1x = width * 0.25 + parallaxX;
      const cp1y = yOffset1 + Math.sin(step) * 40;
      const cp2x = width * 0.75 - parallaxX;
      const cp2y = yOffset1 + Math.cos(step * 0.8) * 45;
      const endY1 = height * 0.65 - parallaxY * 0.3;

      ctx.lineTo(0, yOffset1);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width, endY1);
      ctx.lineTo(width, height);
      ctx.closePath();

      const waveGrad1 = ctx.createLinearGradient(0, yOffset1 - 50, width, height);
      waveGrad1.addColorStop(0, `${waveColor}33`);
      waveGrad1.addColorStop(0.5, `${crestColor}22`);
      waveGrad1.addColorStop(1, "transparent");
      ctx.fillStyle = waveGrad1;
      ctx.fill();
      ctx.restore();

      // Layer 3: High Crest Wave (Foreground Flow)
      ctx.save();
      ctx.globalAlpha = opacity * 0.85;
      ctx.beginPath();
      ctx.moveTo(0, height);

      const yOffset2 = height * 0.68 - parallaxY * 0.4;
      const cp3x = width * 0.35 - parallaxX * 1.2;
      const cp3y = yOffset2 + Math.cos(step * 1.2) * 35;
      const cp4x = width * 0.7 + parallaxX * 1.1;
      const cp4y = yOffset2 + Math.sin(step * 0.9) * 38;
      const endY2 = height * 0.72 + parallaxY * 0.2;

      ctx.lineTo(0, yOffset2);
      ctx.bezierCurveTo(cp3x, cp3y, cp4x, cp4y, width, endY2);
      ctx.lineTo(width, height);
      ctx.closePath();

      const waveGrad2 = ctx.createLinearGradient(0, yOffset2 - 40, width, height);
      waveGrad2.addColorStop(0, `${waveColor}44`);
      waveGrad2.addColorStop(0.6, `${crestColor}2B`);
      waveGrad2.addColorStop(1, "transparent");
      ctx.fillStyle = waveGrad2;
      ctx.fill();
      ctx.restore();

      rafId = requestAnimationFrame(render);
    };

    const tryStart = () => {
      if (isVisible && isPageVisible && rafId === 0) {
        rafId = requestAnimationFrame(render);
      }
    };

    const tryStop = () => {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        isVisible ? tryStart() : tryStop();
      },
      { threshold: 0 }
    );
    io.observe(container);

    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
      isPageVisible ? tryStart() : tryStop();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    tryStart();

    return () => {
      tryStop();
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      io.disconnect();
    };
  }, [horizonColor, waveColor, crestColor, speed, opacity, mouseInteraction, parallaxStrength]);

  return (
    <div
      ref={containerRef}
      className={`gradient-waves-container pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      style={{
        transform: "translate3d(0, 0, 0)",
        contain: "paint",
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
        style={{
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default GradientWaves;
