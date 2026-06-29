import type { Metadata } from "next";
import { Rubik, Open_Sans } from "next/font/google";
import NavigationProgress from "@/components/NavigationProgress";
import PageTransition from "@/components/PageTransition";
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
  metadataBase: new URL("https://lumibetaworks.id"),
  icons: {
    icon: "/logo4_1080x1080.svg",
    shortcut: "/logo4_1080x1080.svg",
  },
  title: {
    default: "Lumi Beta Works — Jasa Web, App, QA & Consulting",
    template: "%s — Lumi Beta Works",
  },
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
  authors: [{ name: "Lumi Beta Works", url: "https://lumibetaworks.id" }],
  openGraph: {
    title: "Lumi Beta Works — Build Digital Things That Matter",
    description:
      "Web, App, QA Testing & Tech Consulting — affordable quality for every scale of business.",
    type: "website",
    url: "https://lumibetaworks.id",
    siteName: "Lumi Beta Works",
    locale: "id_ID",
  },
  alternates: { canonical: "https://lumibetaworks.id" },
  verification: {
    google: "UNAKzPyiQr9kY8X-4bg3g3KQVP1kvkauxPpWWg-Yp1w",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Lumi Beta Works",
  alternateName: "Lumi",
  url: "https://lumibetaworks.id",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lumi Beta Works",
  url: "https://lumibetaworks.id",
  logo: "https://lumibetaworks.id/logo4_1080x1080.svg",
  description:
    "Jasa pembuatan web, app, QA testing, dan tech consulting untuk UMKM hingga enterprise.",
  foundingDate: "2024",
  areaServed: "ID",
  address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "hello@lumibetaworks.id",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX & Product Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "App Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "QA Testing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tech Consulting" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${rubik.variable} ${openSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <NavigationProgress />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
