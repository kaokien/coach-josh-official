import React from 'react';
import Link from 'next/link';

const Footer = () => (
  <footer className="border-t-2 border-[#0F172A] bg-[#0F172A]">
    <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h3 className="font-display text-4xl uppercase tracking-wider text-white">Coach Josh Official</h3>
          <p className="font-body mt-4 text-white/60 max-w-md">
            Stop throwing arm punches. Master the slip, the shift, and the science of striking.
          </p>
          <div className="mt-6 flex gap-4">
            <a href="https://www.tiktok.com/@coachjoshofficial" target="_blank" rel="noopener noreferrer" className="h-10 w-10 border-2 border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0F172A] transition-colors">
              <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>TikTok</title><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            </a>
            <a href="https://www.instagram.com/coachjoshofficial" target="_blank" rel="noopener noreferrer" className="h-10 w-10 border-2 border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0F172A] transition-colors">
              <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.757 6.162 6.162 6.162 3.405 0 6.162-2.757 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
            </a>
            <a href="https://www.youtube.com/@coachjoshofficial" target="_blank" rel="noopener noreferrer" className="h-10 w-10 border-2 border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0F172A] transition-colors">
              <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg uppercase text-white mb-4">Programs</h4>
          <ul className="space-y-2 font-body text-white/60">
            <li><a href="https://www.youtube.com/watch?v=M4uyfBR7H1I" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Free Training</a></li>
            <li><Link href="#programs" className="hover:text-white transition-colors">Striking Blueprint</Link></li>
            <li><a href="https://coachjosh1.gumroad.com/l/opdee" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Video Course</a></li>
            <li><a href="https://kbg1xshf.typeform.com/to/kBg1xSHF" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Elite 1:1 Coaching</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg uppercase text-white mb-4">Support</h4>
          <ul className="space-y-2 font-body text-white/60">
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/refunds" className="hover:text-white transition-colors">Refund Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-center md:gap-4 items-center">
        <p className="font-body text-sm text-white/40">© 2026 Coach Josh Official. All Rights Reserved.</p>
        <span className="hidden md:inline font-body text-sm text-white/40">|</span>
        <span className="font-body text-sm text-white/40 mt-2 md:mt-0">
          Train in person in Hamden, CT &rarr;{' '}
          <a href="https://coachjoshboxing.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">CoachJoshBoxing.com</a>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
