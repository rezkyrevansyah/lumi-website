import AdminShell from "@/components/admin/layout/AdminShell";

export const metadata = {
  title: "Admin — Lumi Beta Works",
  description: "Admin panel for managing Lumi Beta Works website content.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
