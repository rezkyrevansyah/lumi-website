import Link from "next/link";
import { logout } from "@/actions/admin/auth";

const NAV = [
  { href: "/admin", label: "Dasbor" },
  { href: "/admin/translations", label: "Teks Statis" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/pricing", label: "Paket & Harga" },
  { href: "/admin/tech-stack", label: "Teknologi" },
  { href: "/admin/certifications", label: "Sertifikasi" },
  { href: "/admin/client-logos", label: "Logo Klien" },
  { href: "/admin/testimonials", label: "Testimoni" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <aside className="w-60 shrink-0 border-r border-zinc-200 bg-white p-5">
        <div className="mb-6 text-lg font-bold text-zinc-900">Lumi Admin</div>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="mt-6">
          <button type="submit" className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-100">
            Keluar
          </button>
        </form>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
