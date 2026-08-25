"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import LottieLoader from "@/components/ui/LottieLoader";

export default function NavigationProgress() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const prevPathname = useRef(pathname);

  // When pathname changes (route transition completed), close the loader smoothly
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 350);
      return () => clearTimeout(timer);
    }
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
        setIsLoading(true);
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-white/95 backdrop-blur-md transition-all duration-300">
      <LottieLoader size={220} label="Memuat Halaman..." />
    </div>
  );
}
