import LottieLoader from "@/components/ui/LottieLoader";

export default function PortfolioLoading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F9FB]">
      <LottieLoader size={200} label="Memuat Portofolio Lumi Beta Works..." />
    </div>
  );
}
