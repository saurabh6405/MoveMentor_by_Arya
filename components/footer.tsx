'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Scale } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-16 px-6 md:px-12 bg-[#0d0e0f] grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/5">
      <div className="col-span-1 md:col-span-1">
        <span className="text-xl font-black text-primary mb-4 block font-display uppercase tracking-tighter">
          MoveMentor
        </span>
        <p className="text-tertiary text-xs uppercase tracking-widest opacity-60">Elite Performance Protocol</p>
      </div>
      <div>
        <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Discovery</h4>
        <ul className="space-y-4">
          <li>
            <Link href="#programs" className="text-tertiary font-sans text-sm tracking-wide hover:text-white transition-colors flex items-center gap-2">
              <ChevronRight className="w-3 h-3" /> Programs
            </Link>
          </li>
          <li>
            <Link href="#about" className="text-tertiary font-sans text-sm tracking-wide hover:text-white transition-colors flex items-center gap-2">
              <ChevronRight className="w-3 h-3" /> Trainers
            </Link>
          </li>
          <li>
            <Link href="#pricing" className="text-tertiary font-sans text-sm tracking-wide hover:text-white transition-colors flex items-center gap-2">
              <ChevronRight className="w-3 h-3" /> Pricing
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Legal</h4>
        <ul className="space-y-4">
          <li>
            <Link href="#" className="text-tertiary font-sans text-sm tracking-wide hover:text-white transition-colors flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="#" className="text-tertiary font-sans text-sm tracking-wide hover:text-white transition-colors flex items-center gap-2">
              <Scale className="w-4 h-4" /> Terms of Service
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Contact</h4>
        <div className="space-y-4">
          <p className="text-tertiary text-sm">sa****6405@gmail.com</p>
          <a
            href="https://wa.me/918826838889"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] text-sm font-bold block"
          >
            +91-88******89
          </a>
        </div>
        <div className="mt-8 pt-8 border-t border-white/5 text-[10px] text-tertiary/40 uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} MoveMentor. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
