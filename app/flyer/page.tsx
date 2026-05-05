import React from 'react';
import Image from 'next/image';
import { CalendarDays, MapPin, Check, Star } from 'lucide-react';

export const metadata = {
    title: 'Beginner Boxing Promo | Coach Josh Official',
    description: 'Start your boxing journey with Coach Josh — pro-level training for beginners in Hamden, CT. First 7 days free. All ages and skill levels welcome.',
    openGraph: {
        title: 'Beginner Boxing Class | Coach Josh Official',
        description: 'Pro-level boxing training for beginners. First 7 days free in Hamden, CT.',
        images: ['/og-image.jpg'],
    },
};

export default function PremiumFlyer() {
    return (
        <div className="relative min-h-screen bg-neutral-950 font-display flex justify-center p-0 md:p-8 overflow-hidden items-center">

            {/* Poster Container - locked to 4:5 aspect ratio for social media & print viability */}
            <div className="relative w-full max-w-[800px] aspect-[4/5] bg-neutral-950 overflow-hidden md:rounded-3xl md:shadow-[0_0_80px_rgba(0,0,0,1)] flex flex-col print:rounded-none print:shadow-none print:max-w-none print:w-[8.5in] print:h-[11in] print:aspect-auto border border-white/10 md:border-white/20">

                {/* 1. High-Energy Action Background */}
                <div className="absolute inset-0 z-0 bg-black pointer-events-none">
                    <Image
                        src="/action-bg.jpg"
                        alt="Boxing Action Background"
                        fill
                        className="object-cover object-center opacity-85 mix-blend-screen scale-105"
                        priority
                    />

                    {/* Aggressive Gradients for Depth & Readability */}
                    {/* Darken bottom heavily for text */}
                    <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                    {/* Vignette edges */}
                    <div className="absolute inset-0 ring-[150px] ring-inset ring-black/40 pointer-events-none"></div>
                </div>

                {/* Free Trial Floating Badge (Removed to emphasize main layout) */}

                {/* 2. Main Content Z-Layer */}
                <div className="relative z-10 flex flex-col h-full w-full p-6 sm:p-10 justify-between">

                    {/* TOP SECTION: Massive Typography */}
                    <div className="flex flex-col mt-4 sm:mt-10">
                        <div className="mb-3 sm:mb-4 bg-black/40 backdrop-blur-md self-start px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border-l-4 border-red-600 shadow-xl">
                            <p className="text-sm sm:text-lg font-bold uppercase tracking-widest text-white drop-shadow-md">
                                PRO TRAINING WITH <span className="text-red-400">@COACHJOSHOFFICIAL</span>
                            </p>
                        </div>
                        <h1 className="text-6xl sm:text-[7.5rem] md:text-[8.5rem] font-black italic uppercase leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] transform -skew-x-6">
                            BEGINNER
                        </h1>
                        <h2 className="text-4xl sm:text-6xl md:text-[5rem] font-black italic uppercase tracking-tighter leading-[0.9] text-red-600 mt-1 sm:mt-2 filter drop-shadow-[0_5px_15px_rgba(220,38,38,0.5)] transform -skew-x-6">
                            BOXING CLASS
                        </h2>
                    </div>

                    {/* BOTTOM HALF: Frosted Glass UI */}
                    <div className="flex flex-col gap-6 w-full mt-auto mb-2">

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">

                            {/* Glass Panel: Schedule & Location */}
                            <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col justify-center space-y-6">

                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-red-600/20 rounded-xl border border-red-500/30">
                                        <CalendarDays className="w-8 h-8 text-red-500" strokeWidth={2} />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Schedule</p>
                                        <p className="text-2xl sm:text-3xl font-black text-white tracking-wide">Mon. - Sat.</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-600/20 rounded-xl border border-blue-500/30">
                                        <MapPin className="w-8 h-8 text-blue-500" strokeWidth={2} />
                                    </div>
                                    <div className="flex flex-col leading-tight">
                                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-0.5">Location</p>
                                        <p className="text-xl sm:text-2xl font-black text-white">Bashta's Martial Art</p>
                                        <p className="text-sm sm:text-base text-gray-300 font-medium">55 Connelly Pkwy, Hamden</p>
                                    </div>
                                </div>
                            </div>

                            {/* Glass Panel: Core Focus */}
                            <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                                <h4 className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-4">Core Focus</h4>
                                <div className="flex flex-col space-y-4">
                                    {["Mobility & Footwork", "Strength & Power", "Elite Conditioning"].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 shrink-0">
                                                <Check className="w-4 h-4 text-green-400" strokeWidth={3} />
                                            </div>
                                            <span className="text-lg sm:text-xl font-bold text-white tracking-wide">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* MASSIVE CALL TO ACTION BLOCK (APPLE/NIKE STYLE HIGHLIGHT) */}
                        <div className="w-full relative overflow-hidden bg-gradient-to-r from-red-600 via-rose-600 to-red-800 border border-red-400/50 rounded-2xl p-[3px] shadow-[0_0_50px_rgba(220,38,38,0.4)] mt-4 group">
                            <div className="relative bg-neutral-950/40 backdrop-blur-2xl rounded-xl p-5 sm:p-6 flex justify-between items-center w-full z-10 transition-all group-hover:bg-neutral-950/30">

                                {/* CTA Text */}
                                <div className="flex flex-col w-2/3">
                                    <div className="inline-block bg-gradient-to-r from-red-600 to-red-500 text-white text-xs sm:text-xs font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full w-max mb-3 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                                        Limited Time Offer
                                    </div>
                                    <p className="text-3xl sm:text-[2.75rem] md:text-[3.25rem] font-black italic uppercase tracking-tighter text-white leading-[0.9] drop-shadow-2xl">
                                        FIRST <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-red-200 pr-2 pb-1">7 DAYS</span> FREE.
                                    </p>
                                    <p className="text-sm sm:text-base font-bold text-gray-300 mt-2 uppercase tracking-widest leading-snug">
                                        Your first step to becoming elite begins today.
                                    </p>
                                </div>

                                {/* QR Code Hero */}
                                <div className="flex flex-col items-center shrink-0">
                                    <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-red-100 mb-2 animate-pulse">
                                        SCAN TO JOIN
                                    </p>
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-2xl p-1.5 shadow-[0_0_30px_rgba(255,255,255,0.2)] border-2 border-white/50 relative overflow-hidden transform transition-transform group-hover:scale-105 duration-500">
                                        <Image
                                            src="/qr-code.png"
                                            alt="Scan QR code to join"
                                            fill
                                            className="object-contain p-1 rounded-xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SOCIAL PROOF & FOOTER MINIMAL BAR */}
                        <div className="w-full flex flex-col sm:flex-row justify-between items-center px-2 mt-4 space-y-2 sm:space-y-0">
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 border border-white/10 rounded-full">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />)}
                                </div>
                                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-200 ml-1">
                                    <span className="text-red-400">100M+ VIEWS,</span> COACHED BY <span className="text-red-400">TWO</span> WORLD CHAMPIONS
                                </span>
                            </div>

                            <p className="text-[10px] sm:text-xs font-bold text-gray-500 tracking-[0.2em] uppercase">
                                COACHJOSHOFFICIAL@PLAYERSCLUBLLC.COM | (203) 248-2274
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
