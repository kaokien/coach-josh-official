'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Check, Loader2 } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'waitlist_cornerman' }),
      });

      if (!res.ok) throw new Error('Failed to join waitlist');

      setSuccess(true);
      setTimeout(() => {
        onClose();
        // Reset after close
        setTimeout(() => {
          setSuccess(false);
          setEmail('');
        }, 500);
      }, 3000);
    } catch (e) {
      console.error(e);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1A1A1A]/80 backdrop-blur-sm p-4">
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md overflow-hidden border-4 border-[#1A1A1A] bg-[#F2E8DC] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
      >
        <div className="flex items-center justify-between border-b-4 border-[#1A1A1A] bg-[#4A6FA5] px-6 py-4">
          <div className="font-display text-2xl text-white uppercase tracking-wider">
            Join The Waitlist
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#1A1A1A] font-bold font-body"
          >
            CLOSE [X]
          </button>
        </div>

        <div className="p-8">
          {success ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#4A6FA5] text-white">
                <Check size={32} />
              </div>
              <h3 className="font-display text-3xl uppercase text-[#1A1A1A]">You're In!</h3>
              <p className="font-body mt-2 text-[#1A1A1A]/80">
                We'll notify you when spots open up.
              </p>
            </motion.div>
          ) : (
            <>
              <p className="font-body mb-6 text-[#1A1A1A]/80">
                Corner Man spots are currently full. Enter your email to get priority access when we open new slots.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full border-2 border-[#1A1A1A] bg-white px-6 py-4 font-body text-[#1A1A1A] placeholder:text-[#1A1A1A]/50 focus:border-[#4A6FA5] focus:outline-none"
                  />
                </div>

                {error && (
                  <p className="text-sm font-bold text-[#D1495B]">{error}</p>
                )}

                <Button
                  type="submit"
                  variant="default"
                  disabled={loading}
                  isLoading={loading}
                  className="w-full"
                >
                  {loading ? 'Joining...' : 'Join Waitlist'} <ArrowUpRight size={18} />
                </Button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default WaitlistModal;
