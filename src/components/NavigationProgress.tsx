"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import LottieLoader from "@/components/ui/LottieLoader";

const MIN_DISPLAY_MS = 250;
const MAX_DISPLAY_MS = 5000;

export default function NavigationProgress() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const prevPathname = useRef(pathname);
  const shownAtRef = useRef<number | null>(null);
  const maxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideOverlay = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
    hideTimerRef.current = null;
    maxTimerRef.current = null;
    shownAtRef.current = null;
    setIsLoading(false);
  };

  // When pathname changes (destination route mounted), wait for the browser to
  // actually paint the new content before hiding the overlay, instead of guessing
  // with a fixed delay. A minimum display time avoids a flicker on very fast navigations.
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const elapsed = shownAtRef.current ? performance.now() - shownAtRef.current : MIN_DISPLAY_MS;
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
        hideTimerRef.current = setTimeout(hideOverlay, remaining);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [pathname]);

  // Intercept internal link clicks to trigger the Lottie loading overlay instantly
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external links, hash anchors, new tabs, and mailto/tel/whatsapp
      if (
        href.startsWith("#") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("https://wa.me") ||
        anchor.target === "_blank" ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      // Check if navigating to a different internal route
      const currentPath = window.location.pathname;
      const targetUrl = new URL(anchor.href, window.location.origin);
      if (targetUrl.pathname !== currentPath) {
        shownAtRef.current = performance.now();
        setIsLoading(true);
        // Safety net: never leave the overlay stuck forever if something goes wrong.
        if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
        maxTimerRef.current = setTimeout(hideOverlay, MAX_DISPLAY_MS);
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-white/95 backdrop-blur-md transition-all duration-300">
      <LottieLoader size={220} label="Memuat Halaman..." />
    </div>
  );
}
