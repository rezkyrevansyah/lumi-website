import Image from "next/image";
import { FOOTER_SERVICE_LINKS } from "@/lib/data";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const DEFAULT_EMAIL = "hello@lumibetaworks.id";
const DEFAULT_WHATSAPP = "62XXXXXXXXXX";

export default async function Footer() {
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
    <footer className="bg-[#3D3E4A] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 md:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
          {/* Brand column */}
          <div className="sm:col-span-2">
            <div className="mb-5">
              <Image
                src="/logo1_white_1920x1080.svg"
                alt="Lumi Beta Works"
                width={160}
                height={54}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
            <p
              className="text-white/50 text-sm leading-relaxed max-w-xs mb-6"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              Studio digital terpercaya yang membangun produk berkualitas
              untuk bisnis dari semua skala di seluruh Indonesia.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${email}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#2DD9A4] transition-colors flex items-center justify-center"
                aria-label="Email"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#2DD9A4] transition-colors flex items-center justify-center"
                aria-label="WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4
              className="font-bold mb-4 text-sm uppercase tracking-wider text-white/80"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Layanan
            </h4>
            <ul className="space-y-3">
              {FOOTER_SERVICE_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-white/50 hover:text-[#2DD9A4] text-sm transition-colors"
                    style={{ fontFamily: "var(--font-opensans)" }}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4
              className="font-bold mb-4 text-sm uppercase tracking-wider text-white/80"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Kontak
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="text-white/50 hover:text-[#2DD9A4] text-sm transition-colors flex items-center gap-2"
                  style={{ fontFamily: "var(--font-opensans)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-[#2DD9A4] text-sm transition-colors flex items-center gap-2"
                  style={{ fontFamily: "var(--font-opensans)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-white/40 text-xs" style={{ fontFamily: "var(--font-opensans)" }}>
            © 2025 Lumi Beta Works. Hak cipta dilindungi.
          </p>
          <p className="text-white/40 text-xs" style={{ fontFamily: "var(--font-opensans)" }}>
            Crafted with max effort ✦ Jakarta
          </p>
        </div>
      </div>
    </footer>
  );
}
