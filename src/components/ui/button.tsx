import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

import { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', isLoading, children, disabled, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Instant haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
      onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        disabled={disabled || isLoading}
        onClick={handleClick}
        className={cn(
          "group relative flex items-center justify-center gap-3 border-2 font-bold uppercase tracking-widest transition-all duration-300 px-8 py-5 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed",

          // Variants
          variant === 'default' && "bg-[#4A6FA5] border-[#1A1A1A] text-white hover:bg-[#4A6FA5]/90",
          variant === 'outline' && "bg-transparent border-[#1A1A1A] text-[#1A1A1A] hover:bg-white",
          variant === 'destructive' && "bg-[#D1495B] border-[#1A1A1A] text-white hover:bg-[#D1495B]/90",
          variant === 'secondary' && "bg-white border-white text-[#4A6FA5] hover:bg-[#F2E8DC]",
          variant === 'ghost' && "bg-white border-transparent text-[#4A6FA5] hover:bg-[#F2E8DC]",

          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {isLoading && <Loader2 className="animate-spin" size={18} />}
          {children}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
