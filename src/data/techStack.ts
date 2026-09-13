export interface TechStackGroup {
  key: string;
  items: string[];
}

export const techStackGroups: TechStackGroup[] = [
  {
    key: "frontend",
    items: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Angular"],
  },
  {
    key: "backend",
    items: ["Laravel / PHP", "Go (Golang)", "Python", ".NET Core", "Node.js"],
  },
  {
    key: "mobileDb",
    items: ["Flutter", "React Native", "PostgreSQL", "Redis", "MySQL"],
  },
  {
    key: "cloudDevops",
    items: ["Docker", "AWS", "Google Cloud", "CI/CD"],
  },
];

export interface Certification {
  key: string;
  name: string;
  logo: string;
  alt: string;
}

export const certifications: Certification[] = [
  {
    key: "google",
    name: "Google",
    logo: "/certificate/4-optimized.png",
    alt: "Google",
  },
  {
    key: "bangkit",
    name: "Bangkit Academy",
    logo: "/certificate/2-optimized.png",
    alt: "Bangkit Academy (Google, GoTo, Traveloka)",
  },
  {
    key: "laskar-ai",
    name: "Laskar AI",
    logo: "/certificate/3-light-bg.png",
    alt: "Laskar AI (Indosat, Lintasarta, NVIDIA, Dicoding)",
  },
  {
    key: "dicoding",
    name: "Dicoding Indonesia",
    logo: "/certificate/1-optimized.png",
    alt: "Dicoding Indonesia",
  },
];
