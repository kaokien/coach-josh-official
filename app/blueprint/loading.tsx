export default function BlueprintLoading() {
  return (
    <div className="min-h-screen bg-[#F2E8DC]">
      {/* Skeleton Nav */}
      <div className="flex items-center justify-between border-b-2 border-[#1A1A1A] px-6 py-4 md:px-12">
        <div className="h-8 w-40 animate-pulse rounded bg-[#1A1A1A]/10" />
        <div className="h-10 w-28 animate-pulse rounded border-2 border-[#1A1A1A]/10 bg-[#1A1A1A]/5" />
      </div>

      {/* Skeleton Content Area */}
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-12">
        {/* Title */}
        <div className="mb-4 h-12 w-[60%] animate-pulse rounded bg-[#1A1A1A]/10" />
        <div className="mb-12 h-6 w-[40%] animate-pulse rounded bg-[#1A1A1A]/8" />

        {/* Content blocks */}
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-5 w-full animate-pulse rounded bg-[#1A1A1A]/8" />
              <div className="h-5 w-[90%] animate-pulse rounded bg-[#1A1A1A]/6" />
              <div className="h-5 w-[80%] animate-pulse rounded bg-[#1A1A1A]/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
