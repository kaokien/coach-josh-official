'use client';

import React from 'react';
import { ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react'; // Added ArrowLeft
import Image from 'next/image';
import Link from 'next/link'; // Added Link

// --- TEXTURE COMPONENT ---
const PaperTexture = () => (
  <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.4] mix-blend-multiply">
    <svg className="h-full w-full">
      <filter id="paper">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper)" />
    </svg>
  </div>
);

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  isNew?: boolean;
  link: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Course Master Hoodie',
    price: 59.00,
    description: 'Heavyweight cotton blend. Perfect for cold starts.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
    isNew: true,
    link: '#'
  },
  {
    id: '2',
    title: 'Focus Cap',
    price: 32.00,
    description: 'Low profile dad hat. Embroidered logo.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop',
    link: '#'
  },
  {
    id: '3',
    title: 'System PDF Bundle',
    price: 15.00,
    description: 'The exact templates used in the course videos.',
    image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000&auto=format&fit=crop',
    link: '#'
  }
];

export default function MerchShowcase() {
  return (
    <div className="relative w-full min-h-screen bg-[#F2E8DC] font-sans overflow-hidden">
      
      {/* 1. Add Texture Background */}
      <PaperTexture />

      {/* --- NEW: NAVIGATION HEADER --- */}
      <div className="relative z-20 border-b-2 border-[#1A1A1A] bg-[#F2E8DC]/95 backdrop-blur-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Back Button */}
          <Link 
            href="/" 
            className="group flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#4A6FA5] transition-colors"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Training
          </Link>

          {/* Logo / Title (Optional) */}
          <div className="hidden md:block font-display text-xl uppercase tracking-wider text-[#1A1A1A]">
            Coach Josh <span className="text-[#4A6FA5]">Store</span>
          </div>

          {/* Cart Icon (Visual only for now) */}
          <button className="relative p-2 hover:bg-[#1A1A1A]/5 rounded-full transition-colors">
            <ShoppingBag size={24} className="text-[#1A1A1A]" />
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#D1495B] text-[10px] font-bold text-white">
              0
            </span>
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#1A1A1A] pb-6">
          <div>
            <h2 className="font-display text-4xl uppercase tracking-wider text-[#1A1A1A] mb-2">
              The Locker Room
            </h2>
            <p className="font-body text-sm font-bold text-[#1A1A1A]/60">
              Official gear for the Corner Man team.
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col bg-white border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
            >
              
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden border-b-2 border-[#1A1A1A] bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                
                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-[#4A6FA5] text-white font-display text-xs uppercase tracking-widest px-3 py-1 border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    New Drop
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display text-xl uppercase tracking-wide text-[#1A1A1A]">
                    {product.title}
                  </h3>
                  <span className="font-body font-bold text-[#1A1A1A] bg-[#F2E8DC] px-2 py-1 border border-[#1A1A1A]">
                    ${product.price}
                  </span>
                </div>
                
                <p className="font-body text-xs font-bold text-[#1A1A1A]/60 mb-6 flex-1 leading-relaxed">
                  {product.description}
                </p>

                <a
                  href={product.link}
                  className="w-full bg-[#1A1A1A] text-white font-display uppercase tracking-widest py-4 px-4 flex items-center justify-center gap-2 hover:bg-[#4A6FA5] transition-colors border-2 border-transparent hover:border-[#1A1A1A]"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
