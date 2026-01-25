// Server component - uses CSS-only animations

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F2E8DC] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#1A1A1A] border-t-[#4A6FA5] rounded-full animate-spin mx-auto mb-4" />
        <p className="font-display text-xl uppercase animate-pulse text-[#1A1A1A]">
          Preparing Your Training...
        </p>
      </div>
    </div>
  );
}
