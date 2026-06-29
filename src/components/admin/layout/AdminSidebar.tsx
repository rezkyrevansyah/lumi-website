"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquareQuote,
  Wrench,
  Settings2,
  ImageIcon,
  ExternalLink,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const NAV_CONTENT = [
  { href: "/admin/portfolio",    label: "Portfolio",    icon: FolderKanban },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/services",     label: "Services",     icon: Wrench },
];

const NAV_GENERAL = [
  { href: "/admin/settings", label: "Site Settings", icon: Settings2 },
  { href: "/admin/media",    label: "Media",          icon: ImageIcon },
];

interface AdminSidebarProps {
  onClose?: () => void;
}

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    sessionStorage.removeItem("admin_auth");
    router.replace("/admin/login");
  }

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  function NavItem({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) {
    return (
      <li>
        <Link
          href={href}
          onClick={onClose}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
            isActive(href)
              ? "bg-[#2DD9A4]/10 text-[#2DD9A4]"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          <Icon size={17} className="shrink-0" />
          {label}
        </Link>
      </li>
    );
  }

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-border flex flex-col h-full">
      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-border">
        <Link href="/admin" onClick={onClose}>
          <Image
            src="/logo3_1920x1080.svg"
            alt="Lumi Beta Works"
            width={130}
            height={44}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-lg text-muted-foreground hover:bg-muted"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-5">
        {/* Dashboard */}
        <ul className="space-y-1">
          <li>
            <Link
              href="/admin"
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive("/admin")
                  ? "bg-[#2DD9A4]/10 text-[#2DD9A4]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              <LayoutDashboard size={17} className="shrink-0" />
              Dashboard
            </Link>
          </li>
        </ul>

        <div>
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60"
            style={{ fontFamily: "var(--font-rubik)" }}>
            Content
          </p>
          <ul className="space-y-1">
            {NAV_CONTENT.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </ul>
        </div>

        <div>
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60"
            style={{ fontFamily: "var(--font-rubik)" }}>
            General
          </p>
          <ul className="space-y-1">
            {NAV_GENERAL.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border">
        <Separator className="mb-3" />
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          <ExternalLink size={14} />
          Back to Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors mt-1"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          <LogOut size={14} />
          Sign Out
        </button>
        <p className="mt-2 px-3 text-[10px] text-muted-foreground/50" style={{ fontFamily: "var(--font-opensans)" }}>
          Admin v0.1 · Lumi Beta Works
        </p>
      </div>
    </aside>
  );
}
