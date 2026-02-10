export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F2E8DC]">
      {/* Skeleton Nav */}
      <div className="flex items-center justify-between border-b-2 border-[#1A1A1A] px-6 py-4 md:px-12">
        <div className="h-8 w-40 animate-pulse rounded bg-[#1A1A1A]/10" />
        <div className="hidden md:flex gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 w-20 animate-pulse rounded bg-[#1A1A1A]/10" />
          ))}
        </div>
        <div className="h-10 w-28 animate-pulse rounded border-2 border-[#1A1A1A]/10 bg-[#1A1A1A]/5" />
      </div>

      {/* Skeleton Hero */}
      <div className="relative min-h-[70vh] bg-[#1A1A1A]/5 px-6 py-24 md:px-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="mb-6 h-5 w-48 animate-pulse rounded bg-[#1A1A1A]/10" />
          {/* Heading lines */}
          <div className="mb-4 h-16 w-[80%] animate-pulse rounded bg-[#1A1A1A]/10" />
          <div className="mb-4 h-16 w-[60%] animate-pulse rounded bg-[#1A1A1A]/10" />
          <div className="mb-8 h-16 w-[70%] animate-pulse rounded bg-[#4A6FA5]/10" />
          {/* Description */}
          <div className="mb-3 h-6 w-[90%] animate-pulse rounded bg-[#1A1A1A]/8" />
          <div className="mb-8 h-6 w-[75%] animate-pulse rounded bg-[#1A1A1A]/8" />
          {/* CTA Buttons */}
          <div className="flex gap-4">
            <div className="h-14 w-44 animate-pulse rounded border-2 border-[#1A1A1A]/10 bg-[#D1495B]/20" />
            <div className="h-14 w-44 animate-pulse rounded border-2 border-[#1A1A1A]/10 bg-[#1A1A1A]/5" />
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 flex gap-12 border-t-2 border-[#1A1A1A]/10 pt-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto mb-2 h-10 w-20 animate-pulse rounded bg-[#1A1A1A]/10" />
              <div className="mx-auto h-3 w-14 animate-pulse rounded bg-[#1A1A1A]/8" />
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton Marquee */}
      <div className="h-12 w-full animate-pulse border-y-2 border-[#1A1A1A]/10 bg-[#1A1A1A]/5" />
    </div>
  );
}
