"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    // Clear any running timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Start
    setProgress(0);
    setVisible(true);

    // Quickly jump to ~80% then slow down
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += current < 60 ? 12 : current < 80 ? 4 : 1;
      if (current >= 90) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        current = 90;
      }
      setProgress(current);
    }, 60);

    // Complete after a short delay (route has rendered)
    timerRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(100);
      setTimeout(() => setVisible(false), 300);
    }, 200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none"
      style={{ height: "3px" }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #2DD9A4, #6C63FF)",
          transition: progress === 100 ? "width 0.2s ease, opacity 0.3s ease" : "width 0.4s ease",
          opacity: visible ? 1 : 0,
          boxShadow: "0 0 8px rgba(45, 217, 164, 0.6)",
        }}
      />
    </div>
  );
}
