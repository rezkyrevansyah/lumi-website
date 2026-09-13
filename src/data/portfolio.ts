export type ServiceCategory = "web-dev" | "uiux" | "qa" | "consulting";

export interface PortfolioItem {
  slug: string;
  title: string;
  category: ServiceCategory;
  image: string;
}

export const portfolioItems: PortfolioItem[] = [
  { slug: "athro-barbershop", title: "Athro Barbershop", category: "web-dev", image: "/portfolio/athro-barbershop.png" },
  { slug: "bali-pass-website", title: "Bali Pass Website", category: "web-dev", image: "/portfolio/bali-pass-website.png" },
  { slug: "baznas-website", title: "BAZNAS Website", category: "qa", image: "/portfolio/baznas-website.png" },
  { slug: "cinta-zakat-baznas", title: "Cinta Zakat BAZNAS", category: "qa", image: "/portfolio/cinta-zakat-baznas.png" },
  { slug: "dapur-nusantara", title: "Dapur Nusantara", category: "web-dev", image: "/portfolio/dapur-nusantara.png" },
  { slug: "e-water", title: "E-Water", category: "web-dev", image: "/portfolio/e-water.png" },
  { slug: "ekraf-hub", title: "EKRAF HUB", category: "qa", image: "/portfolio/ekraf-hub.png" },
  { slug: "erafone-website", title: "Erafone Website", category: "qa", image: "/portfolio/erafone-website.png" },
  { slug: "masjid-al-arqam-website", title: "Masjid Al-Arqam Website", category: "web-dev", image: "/portfolio/masjid-al-arqam-website.png" },
  { slug: "monis-rent", title: "Monis Rent", category: "web-dev", image: "/portfolio/monis-rent.png" },
  { slug: "next-swimming-school", title: "Next Swimming School", category: "web-dev", image: "/portfolio/next-swimming-school.png" },
  { slug: "portal-intranet-ekraf", title: "Portal Intranet EKRAF", category: "qa", image: "/portfolio/portal-intranet-ekraf.png" },
  { slug: "primaya-app-revamp", title: "Primaya App Revamp", category: "uiux", image: "/portfolio/primaya-app-revamp.png" },
  { slug: "robux-indo-store", title: "Robux Indo Store", category: "web-dev", image: "/portfolio/robux-indo-store.png" },
  { slug: "safty", title: "SAFTY", category: "web-dev", image: "/portfolio/safty.png" },
  { slug: "tbig-mobile", title: "TBIG Mobile", category: "qa", image: "/portfolio/tbig-mobile.png" },
  { slug: "terra-scan", title: "Terra Scan", category: "consulting", image: "/portfolio/terra-scan.png" },
  { slug: "yoonjae-space-studio", title: "Yoonjae Space Studio", category: "web-dev", image: "/portfolio/yoonjae-space-studio.png" },
];
