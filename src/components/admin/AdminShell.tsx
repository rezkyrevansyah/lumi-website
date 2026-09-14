"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  CreditCard,
  Boxes,
  Award,
  Building2,
  MessageSquareQuote,
  Languages,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { logout } from "@/actions/admin/auth";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "Ikhtisar",
    items: [
      { href: "/admin", label: "Dasbor", icon: LayoutDashboard },
    ],
  },
  {
    title: "Katalog & Layanan",
    items: [
      { href: "/admin/portfolio", label: "Portofolio", icon: FolderKanban },
      { href: "/admin/pricing", label: "Paket & Harga", icon: CreditCard },
      { href: "/admin/testimonials", label: "Testimoni", icon: MessageSquareQuote },
    ],
  },
  {
    title: "Kredibilitas & Stack",
    items: [
      { href: "/admin/client-logos", label: "Logo Klien", icon: Building2 },
      { href: "/admin/certifications", label: "Sertifikasi", icon: Award },
      { href: "/admin/tech-stack", label: "Teknologi", icon: Boxes },
    ],
  },
  {
    title: "Bahasa & Teks",
    items: [
      { href: "/admin/translations", label: "Teks Statis", icon: Languages },
    ],
  },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentNav = NAV_GROUPS.flatMap((g) => g.items).find((item) =>
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(item.href)
  );

  const navContent = (
    <div className="flex h-full flex-col justify-between">
        <div className="space-y-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs">
              <Image
                src="/brand/logo-square.png"
                alt="Lumi Beta Works"
                fill
                className="object-cover p-0.5"
                priority
              />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-zinc-900">
                Lumi Beta Works
              </div>
              <div className="text-[11px] font-medium text-emerald-700">
                Admin Console
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-5">
            {NAV_GROUPS.map((group) => (
              <div key={group.title} className="space-y-1">
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  {group.title}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      item.href === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-150 ${
                          isActive
                            ? "bg-zinc-900 text-white shadow-xs"
                            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 shrink-0 transition-colors ${
                            isActive
                              ? "text-emerald-400"
                              : "text-zinc-400 group-hover:text-zinc-700"
                          }`}
                        />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="space-y-3 pt-6">
          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50 p-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-medium text-zinc-600">
                Sistem Terhubung
              </span>
            </div>
            <div className="mt-1 text-[10px] text-zinc-600">
              Supabase PostgreSQL
            </div>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 active:scale-[0.98]"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Keluar Sesi</span>
            </button>
          </form>
        </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-zinc-50/75 text-zinc-900">
      {/* Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-zinc-200 bg-white p-5 lg:flex">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 border-r border-zinc-200 bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Navigasi Menu
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100"
                aria-label="Tutup menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {navContent}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200/80 bg-white/80 px-4 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-xl border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-100 lg:hidden"
              aria-label="Buka menu navigasi"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs">
              <Link
                href="/admin"
                className="font-medium text-zinc-600 hover:text-zinc-900"
              >
                Admin
              </Link>
              {currentNav && currentNav.href !== "/admin" && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="font-semibold text-zinc-900">
                    {currentNav.label}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Quick Actions / External View Link */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.98]"
            >
              <span>Lihat Website</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-600" />
            </Link>
          </div>
        </header>

        {/* Page Children Container */}
        <main className="flex-1 px-4 py-8 sm:px-8 sm:py-10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
