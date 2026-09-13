import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lumibetaworks.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = LayoutProps<"/[locale]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s | Lumi Beta Works",
    },
    description,
    icons: {
      icon: "/brand/logo-square.png",
      apple: "/brand/logo-square.png",
    },
    alternates: {
      canonical: locale === "en" ? `${SITE_URL}/en` : SITE_URL,
      languages: {
        id: SITE_URL,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url: locale === "en" ? `${SITE_URL}/en` : SITE_URL,
      siteName: "Lumi Beta Works",
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/brand/logo-landscape.png`,
          width: 1200,
          height: 630,
          alt: "Lumi Beta Works",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/brand/logo-landscape.png`],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Lumi Beta Works",
        url: SITE_URL,
        logo: `${SITE_URL}/brand/logo-square.png`,
        description:
          locale === "id"
            ? "Software House & Partner Rekayasa Digital untuk UMKM hingga Enterprise"
            : "Software House & Digital Engineering Partner for MSMEs to Enterprise",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+62-812-8395-0403",
          contactType: "customer service",
          availableLanguage: ["Indonesian", "English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Lumi Beta Works",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "ItemList",
        name: "Main Navigation",
        itemListElement: [
          {
            "@type": "SiteNavigationElement",
            position: 1,
            name: locale === "id" ? "Portofolio" : "Portfolio",
            description:
              locale === "id"
                ? "Koleksi proyek website, aplikasi, dan hasil rekayasa digital nyata oleh Lumi Beta Works."
                : "Real-world web, mobile, UI/UX, and QA projects delivered by Lumi Beta Works.",
            url: `${SITE_URL}${locale === "en" ? "/en/portfolio" : "/portfolio"}`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 2,
            name: "Services",
            description:
              locale === "id"
                ? "Layanan Web & App Development, UI/UX Design, QA Testing, dan Konsultasi Arsitektur."
                : "Targeted digital engineering solutions across web development, design, and testing.",
            url: `${SITE_URL}${locale === "en" ? "/en/services" : "/services"}`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 3,
            name: "Pricelist",
            description:
              locale === "id"
                ? "Paket investasi transparan dan terjangkau mulai dari Landing Page hingga Custom Enterprise."
                : "Transparent packages from affordable landing pages to custom enterprise systems.",
            url: `${SITE_URL}${locale === "en" ? "/en/pricelist" : "/pricelist"}`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 4,
            name: "About",
            description:
              locale === "id"
                ? "Cerita, filosofi brand, dan komitmen Lumi Beta Works mendampingi UMKM dan korporasi."
                : "Brand origins, engineering values, and our commitment to businesses of all sizes.",
            url: `${SITE_URL}${locale === "en" ? "/en/about" : "/about"}`,
          },
        ],
      },
    ],
  };

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${bricolage.variable} ${jakarta.variable} min-h-screen bg-background font-sans text-text-primary antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
