import {
  PORTFOLIO,
  TESTIMONIALS,
  SERVICES,
  STATS,
  HERO_BADGES,
  ACTIVE_PROJECTS,
  TRUSTED_BRANDS,
  type PortfolioItem,
  type Testimonial,
  type Service,
} from "./data";

// ── Types ──────────────────────────────────────────────────────────────

export type AdminPortfolioItem = PortfolioItem & { id: string; imageUrl?: string };
export type AdminTestimonial = Testimonial & { id: string };
export type AdminService = Service & { id: string };

export type AdminStat = {
  id: string;
  value: string;
  label: string;
};

export type AdminContact = {
  email: string;
  whatsapp: string;
};

export type AdminHeroBadge = {
  id: string;
  icon: string;
  label: string;
};

export type AdminActiveProject = {
  id: string;
  name: string;
  type: string;
  progress: number;
  color: string;
};

export type AdminBrand = {
  id: string;
  name: string;
  logoUrl?: string; // base64 or URL — optional, falls back to text
};

// ── Initial Data ───────────────────────────────────────────────────────

export const ADMIN_PORTFOLIO: AdminPortfolioItem[] = PORTFOLIO.map((p, i) => ({
  ...p,
  id: String(i + 1),
}));

export const ADMIN_TESTIMONIALS: AdminTestimonial[] = TESTIMONIALS.map((t, i) => ({
  ...t,
  id: String(i + 1),
}));

export const ADMIN_SERVICES: AdminService[] = SERVICES.map((s, i) => ({
  ...s,
  id: String(i + 1),
}));

export const ADMIN_STATS: AdminStat[] = STATS.map((s, i) => ({
  id: String(i + 1),
  value: s.value,
  label: s.label,
}));

export const ADMIN_CONTACT: AdminContact = {
  email: "hello@lumibetaworks.id",
  whatsapp: "62XXXXXXXXXX",
};

export const ADMIN_HERO_BADGES: AdminHeroBadge[] = HERO_BADGES.map((b, i) => ({
  id: String(i + 1),
  icon: b.icon,
  label: b.label,
}));

export const ADMIN_ACTIVE_PROJECTS: AdminActiveProject[] = ACTIVE_PROJECTS.map((p, i) => ({
  id: String(i + 1),
  name: p.name,
  type: p.type,
  progress: p.progress,
  color: p.color,
}));

export const ADMIN_BRANDS: AdminBrand[] = TRUSTED_BRANDS.map((name, i) => ({
  id: String(i + 1),
  name,
}));

// ── Mock Activity Feed ─────────────────────────────────────────────────

export type ActivityItem = {
  id: string;
  action: string;
  item: string;
  time: string;
  type: "add" | "edit" | "delete" | "settings";
};

export const MOCK_ACTIVITY: ActivityItem[] = [
  { id: "1", action: "Portfolio item added", item: "Telemedicine App", time: "2 days ago", type: "add" },
  { id: "2", action: "Testimonial updated", item: "Ahmad Fauzi", time: "5 days ago", type: "edit" },
  { id: "3", action: "Stats updated", item: "Projects count → 20+", time: "1 week ago", type: "settings" },
  { id: "4", action: "Service edited", item: "QA Testing", time: "2 weeks ago", type: "edit" },
  { id: "5", action: "Portfolio item added", item: "LMS Platform", time: "3 weeks ago", type: "add" },
];
