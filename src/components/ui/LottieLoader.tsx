interface LottieLoaderProps {
  size?: number | string;
  className?: string;
  label?: string;
  fullscreen?: boolean;
}

export default function LottieLoader({
  size = 180,
  className = "",
  label = "Memuat...",
  fullscreen = false,
}: LottieLoaderProps) {
  const dim = typeof size === "number" ? `${size}px` : size;

  const content = (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="relative" style={{ width: dim, height: dim, maxWidth: "80px", maxHeight: "80px" }}>
        <div
          className="absolute inset-0 rounded-full border-[3px] border-[#2DD9A4]/20"
          style={{ borderTopColor: "#2DD9A4", animation: "lumi-spin 0.8s linear infinite" }}
        />
      </div>
      {label && (
        <p
          className="text-xs font-semibold text-gray-500 uppercase tracking-widest"
          style={{ fontFamily: "var(--font-rubik)", animation: "lumi-pulse 1.6s ease-in-out infinite" }}
        >
          {label}
        </p>
      )}
      <style>{`
        @keyframes lumi-spin { to { transform: rotate(360deg); } }
        @keyframes lumi-pulse { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
      `}</style>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white/95 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return content;
}
