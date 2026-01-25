'use client';

import { AlertCircle, WifiOff, RefreshCw, Inbox, Video, Volume2, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

// Generic Empty State Component
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-6 text-center',
      className
    )}>
      {icon && (
        <div className="mb-4 text-[#1A1A1A]/30">
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl uppercase text-[#1A1A1A] mb-2">
        {title}
      </h3>
      {description && (
        <p className="font-body text-[#1A1A1A]/60 max-w-sm mb-4">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="bg-[#1A1A1A] text-white font-display uppercase px-6 py-3 flex items-center gap-2 hover:bg-[#1A1A1A]/90 transition-colors"
        >
          <RefreshCw size={16} />
          {action.label}
        </button>
      )}
    </div>
  );
}

// Error State Component
interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Hit a Wall',
  message = 'Training content unavailable. Let\'s try that again.',
  onRetry,
  className
}: ErrorStateProps) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-6 text-center border-2 border-[#D1495B]/30 bg-[#D1495B]/5',
      className
    )}>
      <div className="mb-4 text-[#D1495B]">
        <AlertCircle size={48} />
      </div>
      <h3 className="font-display text-xl uppercase text-[#D1495B] mb-2">
        {title}
      </h3>
      <p className="font-body text-[#1A1A1A]/60 max-w-sm mb-4">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-[#D1495B] text-white font-display uppercase px-6 py-3 flex items-center gap-2 hover:bg-[#D1495B]/90 transition-colors"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}

// Offline State Component
export function OfflineState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center border-2 border-[#1A1A1A]/20">
      <div className="mb-4 text-[#1A1A1A]/40">
        <WifiOff size={48} />
      </div>
      <h3 className="font-display text-xl uppercase text-[#1A1A1A] mb-2">
        You&apos;re Offline
      </h3>
      <p className="font-body text-[#1A1A1A]/60 max-w-sm mb-4">
        Check your internet connection and try again.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-[#1A1A1A] text-white font-display uppercase px-6 py-3 flex items-center gap-2 hover:bg-[#1A1A1A]/90 transition-colors"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      )}
    </div>
  );
}

// Specific Empty States for each section
export function NoVideosState() {
  return (
    <EmptyState
      icon={<Video size={48} />}
      title="No Videos Found"
      description="Check back soon for new training videos from Coach Josh."
    />
  );
}

export function NoAudiosState() {
  return (
    <EmptyState
      icon={<Volume2 size={48} />}
      title="No Audio Workouts"
      description="Audio training sessions are on the way."
    />
  );
}

export function NoStatsState() {
  return (
    <EmptyState
      icon={<BarChart size={48} />}
      title="No Stats Yet"
      description="Complete your first workout to start tracking your progress."
    />
  );
}

export function NoChatHistoryState() {
  return (
    <EmptyState
      icon={<Inbox size={48} />}
      title="Corner Man Ready"
      description="Ask about combinations, defense, or fight strategy. I'm ready."
    />
  );
}
