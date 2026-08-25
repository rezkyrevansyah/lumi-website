"use client";

import { StaggeredMenu } from "@/components/ui/StaggeredMenu";

const menuItems = [
  { label: "Home", ariaLabel: "Ke halaman utama", link: "/#home" },
  { label: "Layanan", ariaLabel: "Lihat layanan kami", link: "/layanan" },
  { label: "Portfolio", ariaLabel: "Lihat portfolio proyek", link: "/portfolio" },
  { label: "About Us", ariaLabel: "Tentang Lumi Beta Works", link: "/about" },
  { label: "Konsultasi", ariaLabel: "Hubungi tim kami", link: "/#contact" },
];

const socialItems = [
  { label: "WhatsApp", link: "https://wa.me/62882015884006" },
  { label: "Instagram", link: "https://instagram.com/lumibetaworks" },
  { label: "Email", link: "mailto:lumibetaworks@gmail.com" },
];

export default function Navbar() {
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
