import { cn } from '@/lib/utils';

// Skeleton base component with Apple-style shimmer
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-shimmer bg-[#1A1A1A]/10 rounded-sm',
        className
      )}
    />
  );
}

// Video card skeleton
export function VideoCardSkeleton() {
  return (
    <div className="border-2 border-[#1A1A1A]/20 bg-white">
      <Skeleton className="w-full aspect-video" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

// Audio workout card skeleton
export function AudioCardSkeleton() {
  return (
    <div className="border-2 border-[#1A1A1A]/20 bg-white p-4 space-y-3">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
}

// Stat card skeleton
export function StatCardSkeleton() {
  return (
    <div className="border-2 border-[#1A1A1A]/20 bg-white p-6 space-y-4">
      <Skeleton className="w-10 h-10 mx-auto" />
      <Skeleton className="h-3 w-1/2 mx-auto" />
      <Skeleton className="h-8 w-3/4 mx-auto" />
    </div>
  );
}

// Chat message skeleton
export function ChatMessageSkeleton({ isUser = false }: { isUser?: boolean }) {
  return (
    <div className={cn('flex gap-3', isUser ? 'flex-row-reverse' : '')}>
      <Skeleton className="w-8 h-8 rounded-full shrink-0" />
      <div className={cn('space-y-2', isUser ? 'items-end' : '')}>
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}

// Video vault loading state
export function VideoVaultSkeleton() {
  return (
    <div className="space-y-6">
      {/* Category filters */}
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-10 w-24" />
        ))}
      </div>
      {/* Video grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

// Full page loading skeleton for Corner Man
export function CornerManSkeleton() {
  return (
    <div className="min-h-screen bg-[#F2E8DC] animate-in fade-in duration-500">
      {/* Header skeleton */}
      <header className="sticky top-0 z-50 bg-[#1A1A1A] border-b-4 border-[#4A6FA5]">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Skeleton className="h-10 w-48 bg-white/10" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        {/* Tabs skeleton */}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-12 w-28" />
          ))}
        </div>

        {/* Content skeleton */}
        <VideoVaultSkeleton />
      </main>
    </div>
  );
}
