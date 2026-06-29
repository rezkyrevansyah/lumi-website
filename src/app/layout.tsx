import type { Metadata } from "next";
import { Rubik, Open_Sans } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-opensans",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo4_1080x1080.svg",
    shortcut: "/logo4_1080x1080.svg",
  },
  title: "Lumi Beta Works — Jasa Web, App, QA & Consulting",
  description:
    "Lumi Beta Works — Jasa pembuatan web, app, QA testing, dan tech consulting untuk UMKM hingga enterprise. Affordable, trustworthy, max effort.",
  keywords: [
    "jasa pembuatan website",
    "jasa pembuatan aplikasi",
    "QA testing",
    "tech consulting",
    "web developer Indonesia",
    "app developer Jakarta",
    "UMKM digital",
  ],
  authors: [{ name: "Lumi Beta Works" }],
  openGraph: {
    title: "Lumi Beta Works — Build Digital Things That Matter",
    description:
      "Web, App, QA Testing & Tech Consulting — affordable quality for every scale of business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${rubik.variable} ${openSans.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
