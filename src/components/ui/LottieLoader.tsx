"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

interface LottieLoaderProps {
  size?: number | string;
  className?: string;
  label?: string;
  fullscreen?: boolean;
}

export default function LottieLoader({
  size = 180,
  className = "",
  label = "Memuat...",
  fullscreen = false,
}: LottieLoaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className="flex items-center justify-center"
        style={{
          width: typeof size === "number" ? `${size}px` : size,
          height: typeof size === "number" ? `${size}px` : size,
        }}
      >
        {mounted && (
          <DotLottieReact
            src="/lottie/lottie_loading_bouncing.lottie"
            loop
            autoplay
          />
        )}
      </div>
      {label && (
        <p
          className="text-xs font-semibold text-gray-600 uppercase tracking-widest animate-pulse"
          style={{ fontFamily: "var(--font-rubik)" }}
        >
          {label}
        </p>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white/95 backdrop-blur-md transition-opacity duration-300">
        {content}
      </div>
    );
  }

  return content;
}
