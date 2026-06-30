import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const DEFAULT_EMAIL = "hello@lumibetaworks.id";
const DEFAULT_WHATSAPP = "62XXXXXXXXXX";

export default async function ContactCTA() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "contact")
    .single();

  const contact = data?.value as { email?: string; whatsapp?: string } | null;
  const email = contact?.email ?? DEFAULT_EMAIL;
  const whatsapp = contact?.whatsapp ?? DEFAULT_WHATSAPP;

  return (
    <section
      id="contact"
      className="py-20 md:py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a1b24 0%, #0d0e14 100%)" }}
    >
      {/* Glow accents */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] md:w-[600px] md:h-[300px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, #2DD9A4 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-48 h-48 md:w-72 md:h-72 opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)" }}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <p className="section-tag mb-6">Siap membangun sesuatu?</p>

        <h2
          className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: "var(--font-rubik)" }}
        >
          Wujudkan{" "}
          <span className="gradient-text">Ide Bisnis Kamu.</span>
        </h2>

        <p
          className="text-white/50 text-base md:text-lg max-w-xl mx-auto mb-10"
          style={{ fontFamily: "var(--font-opensans)" }}
        >
          Ceritakan proyekmu kepada kami. Konsultasi awal gratis, tanpa komitmen.
          Jika jadwal penuh, kami sediakan waiting list — karena kami lebih
          memilih mengerjakan proyekmu dengan benar daripada terburu-buru.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/${whatsapp}?text=Halo+Lumi+Beta+Works!+Saya+tertarik+untuk+konsultasi+proyek.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat via WhatsApp
          </a>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base border-2 border-white/20 text-white hover:bg-white hover:text-[#3D3E4A] transition-all duration-200 font-semibold"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Kirim Email
          </a>
        </div>
      </div>
    </section>
  );
}
