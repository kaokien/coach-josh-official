'use client';

import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Tag, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string; // URL to product image
  isNew?: boolean;
  link: string; // Checkout link (Stripe/Shopify)
}

// Mock Data - Replace with real DB data or props
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Course Master Hoodie',
    price: 59.00,
    description: 'Heavyweight cotton blend, perfect for deep work sessions.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
    isNew: true,
    link: '#'
  },
  {
    id: '2',
    title: 'Focus Cap',
    price: 32.00,
    description: 'Low profile dad hat with embroidered logo.',
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
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  return (
    <div className="w-full bg-[#1A1A1A] py-16 px-6 md:px-12">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
            Available Gear
          </h2>
          <p className="font-body text-white/60 max-w-md">
            Exclusive merchandise and resources for students who have completed the coursework.
          </p>
        </div>
        <button className="group flex items-center gap-2 text-[#4A6FA5] hover:text-white transition-colors font-body text-sm font-medium">
          View all collection
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {MOCK_PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col bg-[#222] border border-white/5 hover:border-[#4A6FA5]/50 transition-all duration-300 rounded-lg overflow-hidden"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Image Area */}
            <div className="relative aspect-square overflow-hidden bg-[#2a2a2a]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              
              {/* Overlay Gradient (Matches VideoPlayer style) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-60" />

              {product.isNew && (
                <div className="absolute top-4 left-4 bg-[#4A6FA5] text-white text-xs font-bold px-2 py-1 rounded-sm shadow-lg flex items-center gap-1">
                  <Tag size={12} />
                  NEW DROP
                </div>
              )}

              {/* Quick Action Button (Appears on Hover) */}
              <div 
                className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-300 transform ${
                  hoveredProduct === product.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <a
                  href={product.link}
                  className="w-full bg-white text-[#1A1A1A] hover:bg-[#4A6FA5] hover:text-white py-3 px-4 rounded font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-xl"
                >
                  <ShoppingBag size={16} />
                  Buy Now
                </a>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display text-xl text-white group-hover:text-[#4A6FA5] transition-colors">
                  {product.title}
                </h3>
                <span className="font-body text-white/90 font-medium">
                  ${product.price}
                </span>
              </div>
              
              <p className="font-body text-sm text-white/50 mb-4 flex-1">
                {product.description}
              </p>

              <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-white/40 group-hover:text-white/60 transition-colors">
                <ExternalLink size={12} />
                <span>Instant delivery via email</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
