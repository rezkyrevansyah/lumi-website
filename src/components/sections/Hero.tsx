"use client";

import GradientWaves from "@/components/ui/GradientWaves";
import TrueFocus from "@/components/ui/TrueFocus";

interface HeroProps {
  badges?: any[];
  activeProjects?: any[];
}

export default function Hero(_props: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-12 pt-24 md:pt-28 bg-[#F8F9FB] text-[#101828] overflow-hidden"
    >
      {/* Background Gradient Waves */}
      <GradientWaves
        horizonColor="#F8F9FB"
        waveColor="#2DD9A4"
        crestColor="#818CF8"
        speed={0.35}
        amplitude={2.0}
        waveScale={0.6}
        waveRatio={0.9}
        swell={25}
        turbulence={15}
        tilt={1.11}
        zoom={1.0}
        height={5.0}
        fogDepth={16}
        detail="medium"
        brightness={1.0}
        opacity={0.4}
        mouseInteraction={true}
        parallaxStrength={0.4}
        grain={true}
        grainIntensity={0.02}
        className="pointer-events-none"
      />

      {/* Centered Hero Content */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-6 max-w-4xl mx-auto text-center pointer-events-auto">
        {/* Animated Greeting via TrueFocus */}
        <TrueFocus
          sentence="Hello, Selamat Datang"
          blurAmount={4}
          borderColor="#2DD9A4"
          glowColor="rgba(45, 217, 164, 0.6)"
          animationDuration={0.6}
          pauseBetweenAnimations={1.2}
          className="my-1"
        />

        <span className="section-tag inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2DD9A4]/15 text-[#0E8B62] border border-[#2DD9A4]/30">
          <span className="w-2 h-2 rounded-full bg-[#2DD9A4] animate-pulse" />
          Mitra Vendor IT &amp; Software House Perusahaan
        </span>

        {/* Static Title Header */}
        <h1
          className="max-w-3xl text-center text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#101828] leading-[1.15]"
          style={{ fontFamily: "var(--font-rubik)" }}
        >
          Vendor IT &amp; Jasa Buat Website Perusahaan Terpercaya
        </h1>

        <p
          className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          Solusi terintegrasi untuk Perusahaan, Instansi, &amp; Bisnis Berkembang. Jasa pembuatan website corporate, aplikasi mobile custom, QA testing, dan konsultasi IT berkualitas tinggi &amp; tepat waktu.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2">
          <a
            href="https://wa.me/62882015884006?text=Halo+Lumi+Beta+Works,+saya+ingin+konsultasi+kebutuhan+Vendor+IT+/+Jasa+Buat+Website+Perusahaan."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Konsultasi Vendor IT (Free)
          </a>
          <a
            href="/portfolio"
            className="btn-outline inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold border-2 border-gray-300 text-[#3D3E4A] hover:bg-gray-100 transition-all"
          >
            Lihat Portfolio B2B
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
