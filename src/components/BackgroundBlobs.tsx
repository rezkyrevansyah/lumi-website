export default function BackgroundBlobs() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        contain: "strict",
      }}
    >
      {/* Top-left: emerald */}
      <div
        className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(45, 217, 164, 0.09) 0%, rgba(45, 217, 164, 0.02) 50%, transparent 70%)",
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* Top-right: indigo */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(108, 99, 255, 0.08) 0%, rgba(108, 99, 255, 0.02) 50%, transparent 70%)",
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* Center: teal */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(59, 181, 197, 0.06) 0%, rgba(59, 181, 197, 0.01) 50%, transparent 70%)",
          transform: "translate3d(-50%, -50%, 0)",
        }}
      />

      {/* Bottom-left: indigo */}
      <div
        className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(108, 99, 255, 0.07) 0%, rgba(108, 99, 255, 0.01) 50%, transparent 70%)",
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* Bottom-right: emerald */}
      <div
        className="absolute -bottom-32 -right-32 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(45, 217, 164, 0.08) 0%, rgba(45, 217, 164, 0.01) 50%, transparent 70%)",
          transform: "translate3d(0, 0, 0)",
        }}
      />
    </div>
  );
}
