"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, ExternalLink, Sparkles, Upload } from "lucide-react";
import Image from "next/image";
import { type AdminBrand } from "@/lib/admin-data";

interface TrustedBrandsEditorProps {
  initialBrands: AdminBrand[];
}

export default function TrustedBrandsEditor({ initialBrands }: TrustedBrandsEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3
              className="text-base font-bold text-[#101828]"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Logo Brand &amp; Klien Ternama
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#2DD9A4]/15 text-[#0E8B62]">
              {initialBrands.length} Logo
            </span>
          </div>
          <p
            className="text-sm text-gray-500 mt-0.5"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            Logo instansi pemerintah &amp; partner perusahaan untuk running marquee homepage.
          </p>
        </div>

        <Link href="/admin/brands">
          <Button
            size="sm"
            className="btn-primary gap-1.5 text-xs rounded-xl shadow-sm"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            <Building2 size={14} />
            Buka CMS Logo Lengkap
            <ExternalLink size={12} />
          </Button>
        </Link>
      </div>

      {/* Mini preview grid of current logos */}
      {initialBrands.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 pt-2">
          {initialBrands.slice(0, 12).map((brand) => (
            <div
              key={brand.id}
              className="relative aspect-video rounded-xl bg-gray-50 border border-gray-200 p-2 flex items-center justify-center overflow-hidden"
              title={brand.name}
            >
              {brand.logoUrl ? (
                <Image
                  src={brand.logoUrl}
                  alt={brand.name}
                  fill
                  className="object-contain p-1"
                  unoptimized
                />
              ) : (
                <span className="text-[10px] font-bold text-gray-400 text-center truncate px-1">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
          {initialBrands.length > 12 && (
            <Link
              href="/admin/brands"
              className="aspect-video rounded-xl bg-emerald-50/50 border border-emerald-200 text-[#0E8B62] font-semibold text-xs flex items-center justify-center hover:bg-emerald-100/60 transition-colors"
            >
              +{initialBrands.length - 12} Lainnya
            </Link>
          )}
        </div>
      ) : (
        <div className="p-6 rounded-2xl border border-dashed border-gray-200 text-center">
          <p className="text-xs text-gray-500">Belum ada logo brand.</p>
        </div>
      )}

      <div className="p-3.5 rounded-xl bg-[#2DD9A4]/8 border border-[#2DD9A4]/20 flex items-center justify-between gap-3 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#0E8B62] shrink-0" />
          <span>
            CMS Brand mendukung <strong>Drag &amp; Drop belasan logo</strong> resolusi <strong>1920×1080</strong> dengan <strong>Auto-Kompresi WebP</strong>.
          </span>
        </div>
        <Link
          href="/admin/brands"
          className="text-[#0E8B62] font-semibold underline underline-offset-2 hover:text-[#2DD9A4] whitespace-nowrap shrink-0"
        >
          Kelola Sekarang &rarr;
        </Link>
      </div>
    </div>
  );
}
