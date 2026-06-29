export default function BackgroundBlobs() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Top-left — emerald */}
      <div
        className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #2DD9A4 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Top-right — indigo */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Center — teal */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(ellipse, #3BB5C5 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Bottom-left — indigo */}
      <div
        className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Bottom-right — emerald */}
      <div
        className="absolute -bottom-32 -right-32 w-[550px] h-[550px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #2DD9A4 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
