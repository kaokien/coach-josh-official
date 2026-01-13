'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingUrl: string;
}

const BookingModal = ({ isOpen, onClose, bookingUrl }: BookingModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1A1A1A]/80 backdrop-blur-sm p-4">
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative h-[80vh] w-full max-w-4xl overflow-hidden border-4 border-[#1A1A1A] bg-[#F2E8DC] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
      >
        <div className="flex items-center justify-between border-b-4 border-[#1A1A1A] bg-[#4A6FA5] px-6 py-4">
          <div className="font-display text-2xl text-white uppercase tracking-wider">
            Select Your Round
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#1A1A1A] font-bold font-body"
          >
            CLOSE [X]
          </button>
        </div>
        <iframe
          src={bookingUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          className="h-full w-full bg-white"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default BookingModal;
