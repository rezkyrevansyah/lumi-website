import { ImageIcon, Lock } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import { Button } from "@/components/ui/button";

export default function AdminMediaPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader title="Media" description="Manage image assets for the site." />

      <div className="bg-white rounded-2xl border border-border shadow-sm p-12 flex flex-col items-center text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: "linear-gradient(135deg, #2DD9A418 0%, #6C63FF18 100%)" }}
        >
          <ImageIcon size={28} className="text-[#6C63FF]" />
        </div>

        <h3 className="text-lg font-bold text-[#3D3E4A] mb-2" style={{ fontFamily: "var(--font-rubik)" }}>
          Media Library
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm mb-6" style={{ fontFamily: "var(--font-opensans)" }}>
          Image upload functionality will be available when backend integration is complete.
          For now, assets are served from the <code className="text-xs bg-muted px-1 py-0.5 rounded">/public</code> folder.
        </p>

        <Button disabled className="gap-2 opacity-50 cursor-not-allowed"
          style={{ fontFamily: "var(--font-opensans)" }}>
          <Lock size={14} />
          Upload Image
        </Button>

        <p className="mt-4 text-xs text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
          Coming soon — requires Supabase Storage integration
        </p>
      </div>
    </div>
  );
}
