"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { cn } from "@/lib/utils";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecked(true);
      return;
    }
    const auth = sessionStorage.getItem("admin_auth");
    if (!auth) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [pathname, router]);

  // Login page renders without the shell
  if (pathname === "/admin/login") return <>{children}</>;

  // Wait for auth check to avoid flash
  if (!checked) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FB]">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <AdminHeader onMenuOpen={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
