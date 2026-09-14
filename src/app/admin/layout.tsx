import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Admin | Lumi Beta Works",
  robots: { index: false, follow: false },
  icons: {
    icon: "/logo_lumi_whitebg.png",
    apple: "/logo_lumi_whitebg.png",
  },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${bricolage.variable} ${jakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
