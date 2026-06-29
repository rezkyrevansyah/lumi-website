"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

const PAGE_TITLES: Record<string, { title: string; crumb: string }> = {
  "/admin":              { title: "Dashboard",    crumb: "Admin / Dashboard" },
  "/admin/portfolio":    { title: "Portfolio",    crumb: "Admin / Content / Portfolio" },
  "/admin/testimonials": { title: "Testimonials", crumb: "Admin / Content / Testimonials" },
  "/admin/services":     { title: "Services",     crumb: "Admin / Content / Services" },
  "/admin/settings":     { title: "Site Settings",crumb: "Admin / General / Site Settings" },
  "/admin/media":        { title: "Media",        crumb: "Admin / General / Media" },
};

interface AdminHeaderProps {
  onMenuOpen: () => void;
}

export default function AdminHeader({ onMenuOpen }: AdminHeaderProps) {
  const pathname = usePathname();
  const page = PAGE_TITLES[pathname] ?? { title: "Admin", crumb: "Admin" };

  return (
    <header className="h-14 shrink-0 bg-white border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuOpen}
          className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1
            className="text-base font-bold text-[#3D3E4A] leading-tight"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            {page.title}
          </h1>
          <p
            className="text-[11px] text-muted-foreground hidden sm:block"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            {page.crumb}
          </p>
        </div>
      </div>

      {/* Right side — user badge */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8F9FB] border border-border">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2DD9A4] to-[#6C63FF] flex items-center justify-center text-white text-[10px] font-bold"
            style={{ fontFamily: "var(--font-rubik)" }}>
            A
          </div>
          <span className="text-xs font-medium text-[#3D3E4A] hidden sm:block" style={{ fontFamily: "var(--font-opensans)" }}>
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
