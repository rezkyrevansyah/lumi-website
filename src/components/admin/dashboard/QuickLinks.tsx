import Link from "next/link";
import { FolderKanban, MessageSquareQuote, Wrench, Settings2, BarChart3, AtSign, ChevronRight } from "lucide-react";

const LINKS = [
  {
    href: "/admin/portfolio",
    label: "Portfolio",
    desc: "Manage project showcase items",
    icon: FolderKanban,
    color: "#2DD9A4",
  },
  {
    href: "/admin/testimonials",
    label: "Testimonials",
    desc: "Edit client quotes & ratings",
    icon: MessageSquareQuote,
    color: "#6C63FF",
  },
  {
    href: "/admin/services",
    label: "Services",
    desc: "Update service offerings",
    icon: Wrench,
    color: "#3BB5C5",
  },
  {
    href: "/admin/settings",
    label: "Stats & Numbers",
    desc: "Projects, clients, ratings",
    icon: BarChart3,
    color: "#F59E0B",
  },
  {
    href: "/admin/settings",
    label: "Contact Info",
    desc: "Email & WhatsApp number",
    icon: AtSign,
    color: "#EC4899",
  },
  {
    href: "/admin/settings",
    label: "Site Settings",
    desc: "Hero badges, trusted brands",
    icon: Settings2,
    color: "#8B5CF6",
  },
];

export default function QuickLinks() {
  return (
    <div>
      <h3
        className="text-sm font-semibold text-[#3D3E4A] mb-3"
        style={{ fontFamily: "var(--font-rubik)" }}
      >
        Quick Access
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="group bg-white rounded-2xl border border-border shadow-sm p-4 flex items-center gap-4 hover:border-[#2DD9A4]/40 hover:shadow-md transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${link.color}18` }}
              >
                <Icon size={18} style={{ color: link.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
                  {link.label}
                </p>
                <p className="text-xs text-muted-foreground truncate" style={{ fontFamily: "var(--font-opensans)" }}>
                  {link.desc}
                </p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground group-hover:text-[#2DD9A4] transition-colors shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
