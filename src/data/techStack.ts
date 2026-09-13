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
  icon: "cloud" | "cloud-check" | "refresh-cw" | "bug" | "database";
  label: string;
}

export const certifications: Certification[] = [
  { key: "aws", icon: "cloud", label: "AWS Certified" },
  { key: "gcp", icon: "cloud-check", label: "Google Cloud" },
  { key: "scrum", icon: "refresh-cw", label: "Scrum Master" },
  { key: "istqb", icon: "bug", label: "ISTQB QA" },
  { key: "oracle", icon: "database", label: "Oracle Cert" },
];
