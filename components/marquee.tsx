'use client';

import React from 'react';
import { Zap } from 'lucide-react';

export default function Marquee() {
  const text = 'Every Rep Every Meal Every Win';
  
  return (
    <section className="w-full py-12 bg-background border-y border-white/5 overflow-hidden relative select-none" id="philosophy">
      <div className="flex whitespace-nowrap animate-scroll-left">
        <div className="flex items-center gap-12 px-6">
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter text-on-surface/20 hover:text-primary transition-colors duration-500 cursor-default">
                {text}
              </span>
              <Zap className="text-primary/30 w-10 h-10" />
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-12 px-6">
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter text-on-surface/20 hover:text-primary transition-colors duration-500 cursor-default">
                {text}
              </span>
              <Zap className="text-primary/30 w-10 h-10" />
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}
