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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = LayoutProps<"/[locale]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/brand/logo-square.png",
    },
    alternates: {
      languages: {
        id: "/",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${bricolage.variable} ${jakarta.variable} min-h-screen bg-background font-sans text-text-primary antialiased`}>
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
