// ── Types ──────────────────────────────────────────────────────────────

export type AdminPortfolioItem = {
  id: number;
  title: string;
  client: string;
  category: string;
  description: string;
  tags: string[] | null;
  platforms: string[] | null;
  accentColor: string | null;
  bgColor: string | null;
  imageUrl?: string | null;
  demoUrl?: string | null;
  isUmkmCaseStudy: boolean | null;
  isPublished: boolean | null;
  sortOrder: number | null;
};

export type AdminTestimonial = {
  id: number;
  quote: string;
  authorName: string;
  authorRole: string;
  rating: number | null;
  isFeatured: boolean | null;
  sortOrder: number | null;
};

export type AdminService = {
  id: number;
  title: string;
  shortDesc: string;
  summary?: string | null;
  badgeLabel?: string | null;
  badgeColor?: string | null;
  deliverables: string[] | null;
  techStack: string[] | null;
  slaLabel?: string | null;
  iconPath?: string | null;
  iconType: string | null;
  slug: string;
  waMessage?: string | null;
  tags: string[] | null;
  sortOrder: number | null;
};

export type AdminStat = {
  id: number;
  value: string;
  label: string;
  sortOrder: number | null;
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
  id: number;
  name: string;
  logoUrl?: string | null;
  sortOrder: number | null;
};

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
