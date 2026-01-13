'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useUser, UserButton } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a utility for cn, or copy the function from your original file

// Button Component for Login (internal use)
const NavButton = ({ children, variant = 'primary', size = 'default', className, ...props }: any) => (
  <button
    className={cn(
      "group relative flex items-center justify-center gap-3 border-2 font-bold uppercase tracking-widest transition-all duration-300",
      "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      size === 'default' && "px-8 py-5 text-lg",
      size === 'small' && "px-4 py-3 text-sm",
      variant === 'primary' && "bg-[#4A6FA5] border-[#1A1A1A] text-white hover:bg-[#4A6FA5]/90",
      variant === 'outline' && "bg-transparent border-[#1A1A1A] text-[#1A1A1A] hover:bg-white",
      className
    )}
    {...props}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </button>
);

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, isLoaded, user } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b-2 border-[#1A1A1A] bg-[#F2E8DC]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl uppercase tracking-wider text-[#1A1A1A]">
          Coach Josh
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#programs" className="font-body text-sm font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#4A6FA5] transition-colors">
            Programs
          </Link>
          <Link href="/#community" className="font-body text-sm font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#4A6FA5] transition-colors">
            Community
          </Link>
          <Link href="/merch" className="font-body text-sm font-bold uppercase tracking-widest text-[#4A6FA5] hover:text-[#1A1A1A] transition-colors">
            Merch
          </Link>
          <Link href="/#training" className="font-body text-sm font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#4A6FA5] transition-colors">
            1-on-1
          </Link>

          {/* Conditional Login/User Button */}
          {!isLoaded ? (
            <div className="w-20 h-10 bg-[#1A1A1A]/10 animate-pulse border-2 border-[#1A1A1A]" />
          ) : isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link
                href="/cornerman"
                className="font-body text-sm font-bold uppercase tracking-widest text-[#4A6FA5] hover:text-[#D1495B] transition-colors"
              >
                My Training
              </Link>
              <div className="border-2 border-[#1A1A1A] rounded-full p-0.5 bg-white">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          ) : (
            <Link href="/sign-in">
              <NavButton variant="outline" size="small">
                Login
              </NavButton>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 border-2 border-[#1A1A1A] bg-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t-2 border-[#1A1A1A] bg-[#F2E8DC] px-6 py-8"
        >
          <nav className="flex flex-col gap-6">
            <Link href="/#programs" className="font-display text-2xl uppercase text-[#1A1A1A]" onClick={() => setIsOpen(false)}>
              Programs
            </Link>
            <Link href="/#community" className="font-display text-2xl uppercase text-[#1A1A1A]" onClick={() => setIsOpen(false)}>
              Community
            </Link>
            <Link href="/merch" className="font-display text-2xl uppercase text-[#4A6FA5]" onClick={() => setIsOpen(false)}>
              Merch Store
            </Link>
            <Link href="/#training" className="font-display text-2xl uppercase text-[#1A1A1A]" onClick={() => setIsOpen(false)}>
              1-on-1 Training
            </Link>

            {isSignedIn ? (
              <div className="flex flex-col gap-4 mt-4 pt-4 border-t-2 border-[#1A1A1A]/20">
                <Link
                  href="/cornerman"
                  className="font-display text-2xl uppercase text-[#4A6FA5]"
                  onClick={() => setIsOpen(false)}
                >
                  My Training
                </Link>
                <div className="flex items-center gap-3">
                  <div className="border-2 border-[#1A1A1A] rounded-full p-0.5 bg-white">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                  <span className="font-body text-sm text-[#1A1A1A]/60">
                    {user?.firstName || 'Account'}
                  </span>
                </div>
              </div>
            ) : (
              <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                <NavButton variant="primary" className="w-full mt-4">
                  Login / Sign Up
                </NavButton>
              </Link>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navigation;
