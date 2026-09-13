import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import { StatusScreen } from "@/components/StatusScreen";
import { buildWaLink } from "@/lib/whatsapp";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan — Lumi Beta Works",
  description: "Halaman yang kamu cari tidak ditemukan.",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="id">
      <body className={`${bricolage.variable} ${jakarta.variable} font-sans antialiased`}>
        <StatusScreen
          eyebrow="404"
          title="Halaman Tidak Ditemukan"
          description="Sepertinya halaman yang kamu cari sudah pindah atau memang belum ada. Yuk balik ke beranda, atau hubungi kami kalau butuh bantuan."
          primary={{ label: "Kembali ke Beranda", href: "/" }}
          secondary={{
            label: "Hubungi Kami",
            href: buildWaLink("Halo Lumi Beta Works, saya coba akses salah satu halaman di website tapi sepertinya tidak ditemukan."),
            external: true,
          }}
        />
      </body>
    </html>
  );
}
