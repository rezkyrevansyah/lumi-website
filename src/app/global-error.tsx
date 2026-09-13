"use client";

import { useEffect } from "react";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import { StatusScreen } from "@/components/StatusScreen";
import { buildWaLink } from "@/lib/whatsapp";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry?: () => void;
}

export default function GlobalError({ error, reset, unstable_retry }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="id">
      <body className={`${bricolage.variable} ${jakarta.variable} font-sans antialiased`}>
        <title>Terjadi Kesalahan — Lumi Beta Works</title>
        <StatusScreen
          eyebrow="Terjadi Kesalahan"
          title="Situs Sedang Bermasalah"
          description="Ada error teknis yang bikin seluruh halaman gagal dimuat. Tim kami sudah otomatis dapat notifikasi. Coba muat ulang beberapa saat lagi."
          primary={{ label: "Muat Ulang", onClick: unstable_retry ?? reset }}
          secondary={{
            label: "Hubungi Kami",
            href: buildWaLink("Halo Lumi Beta Works, website kalian sepertinya lagi down/error."),
            external: true,
          }}
          footnote={error.digest ? `Kode referensi: ${error.digest}` : undefined}
        />
      </body>
    </html>
  );
}
