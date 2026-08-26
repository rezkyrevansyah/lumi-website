"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

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

const LOTTIE_URL = "/lottie/lottie_loading_bouncing.lottie";

// Module-level in-memory cache for the .lottie binary data
let cachedBuffer: ArrayBuffer | null = null;
let activeFetchPromise: Promise<ArrayBuffer | null> | null = null;

function loadLottieBuffer(): Promise<ArrayBuffer | null> {
  if (cachedBuffer) return Promise.resolve(cachedBuffer);
  if (!activeFetchPromise) {
    activeFetchPromise = fetch(LOTTIE_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load lottie file");
        return res.arrayBuffer();
      })
      .then((buffer) => {
        cachedBuffer = buffer;
        return buffer;
      })
      .catch((err) => {
        activeFetchPromise = null;
        return null;
      });
  }
  return activeFetchPromise;
}

export default function LottieLoader({
  size = 180,
  className = "",
  label = "Memuat...",
  fullscreen = false,
}: LottieLoaderProps) {
  const [data, setData] = useState<ArrayBuffer | null>(cachedBuffer);

  useEffect(() => {
    let isMounted = true;
    if (!cachedBuffer) {
      loadLottieBuffer().then((buf) => {
        if (isMounted && buf) {
          setData(buf);
        }
      });
    } else if (!data) {
      setData(cachedBuffer);
    }

    return () => {
      isMounted = false;
    };
  }, [data]);

  const dimensionStyle = {
    width: typeof size === "number" ? `${size}px` : size,
    height: typeof size === "number" ? `${size}px` : size,
  };

  const content = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div className="flex items-center justify-center relative" style={dimensionStyle}>
        {data ? (
          <DotLottieReact
            data={data}
            loop
            autoplay
          />
        ) : (
          <div className="w-10 h-10 rounded-full border-2 border-[#2DD9A4]/30 border-t-[#2DD9A4] animate-spin" />
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
