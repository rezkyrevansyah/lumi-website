"use client";

import { useEffect } from "react";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import { StatusScreen } from "@/components/StatusScreen";
import { buildWaLink } from "@/lib/whatsapp";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry?: () => void;
}

export default function ErrorPage({ error, reset, unstable_retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={`${bricolage.variable} ${jakarta.variable} font-sans`}>
      <StatusScreen
        eyebrow="Terjadi Kesalahan"
        title="Ada yang Salah di Sistem Kami"
        description="Halaman ini gagal dimuat karena error teknis. Coba muat ulang, atau hubungi kami kalau masalahnya masih berlanjut."
        primary={{ label: "Coba Lagi", onClick: unstable_retry ?? reset }}
        secondary={{
          label: "Hubungi Kami",
          href: buildWaLink("Halo Lumi Beta Works, saya nemu error waktu buka website kalian."),
          external: true,
        }}
        footnote={error.digest ? `Kode referensi: ${error.digest}` : undefined}
      />
    </div>
  );
}
