"use client";

import { StaggeredMenu } from "@/components/ui/StaggeredMenu";

const menuItems = [
  { label: "Home", ariaLabel: "Ke halaman utama", link: "/#home" },
  { label: "Layanan", ariaLabel: "Lihat layanan kami", link: "/layanan" },
  { label: "Solusi UMKM", ariaLabel: "Layanan IT khusus untuk UMKM", link: "/umkm" },
  { label: "Portfolio", ariaLabel: "Lihat portfolio proyek", link: "/portfolio" },
  { label: "About Us", ariaLabel: "Tentang Lumi Beta Works", link: "/about" },
];

interface NavbarClientProps {
  email?: string;
  whatsapp?: string;
}

export default function NavbarClient({
  email = "lumibetaworks@gmail.com",
  whatsapp = "62882015884006",
}: NavbarClientProps) {
  const socialItems = [
    { label: "WhatsApp", link: `https://wa.me/${whatsapp}` },
    { label: "Instagram", link: "https://instagram.com/lumibetaworks" },
    { label: "Email", link: `mailto:${email}` },
  ];

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#3D3E4A"
      openMenuButtonColor="#ffffff"
      changeMenuColorOnOpen={true}
      colors={["#2DD9A4", "#101828"]}
      logoUrl="/logo3_1920x1080.svg"
      accentColor="#2DD9A4"
      isFixed={true}
    />
  );
}
