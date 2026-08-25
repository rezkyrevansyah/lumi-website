import type { Metadata } from "next";
import { Rubik, Open_Sans } from "next/font/google";
import NavigationProgress from "@/components/NavigationProgress";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-rubik",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    default: "Vendor IT Perusahaan & Jasa Buat Website Terpercaya | Lumi Beta Works",
    template: "%s | Lumi Beta Works",
  },
  description:
    "Vendor IT Perusahaan & Instansi terpercaya. Pembuatan website perusahaan, aplikasi mobile custom, QA testing, dan konsultasi IT berkualitas tinggi & tepat waktu.",
  keywords: [
    "vendor IT",
    "vendor IT perusahaan",
    "vendor IT instansi",
    "jasa buat website",
    "jasa buat website perusahaan",
    "jasa pembuatan website perusahaan",
    "vendor pembuatan aplikasi",
    "vendor software house Jakarta",
    "software house Indonesia",
    "jasa buat website profesional",
    "web developer perusahaan",
    "vendor IT pemerintah",
    "jasa IT consulting perusahaan",
    "QA testing Indonesia",
  ],
  authors: [{ name: "Lumi Beta Works", url: "https://lumibetaworks.id" }],
  openGraph: {
    title: "Vendor IT Perusahaan & Jasa Buat Website Professional | Lumi Beta Works",
    description:
      "Mitra Vendor IT & Software House profesional untuk Perusahaan, Instansi, & Bisnis Berkembang di Indonesia.",
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
  alternateName: "Lumi IT Vendor",
  url: "https://lumibetaworks.id",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "Lumi Beta Works",
  url: "https://lumibetaworks.id",
  logo: "https://lumibetaworks.id/logo4_1080x1080.svg",
  description:
    "Vendor IT Perusahaan & Instansi terpercaya di Indonesia. Layanan jasa buat website perusahaan, aplikasi mobile, QA testing, dan konsultasi teknologi.",
  foundingDate: "2024",
  areaServed: "ID",
  telephone: "+62882015884006",
  address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales & customer support",
    telephone: "+62882015884006",
    email: "lumibetaworks@gmail.com",
    availableLanguage: ["Indonesian", "English"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Layanan Vendor IT & Web Development",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Jasa Buat Website Perusahaan & Instansi" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vendor Pembuatan Aplikasi Mobile Enterprise" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Software Quality Assurance & QA Testing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT Consulting & System Architecture" } },
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
