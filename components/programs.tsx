'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Activity, Cpu, Rocket, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    id: '01',
    title: 'Hypertrophy Lab',
    description: 'Focusing on skeletal muscle development and aesthetic refinement through volume-based tension.',
    icon: Rocket,
    color: 'text-primary',
  },
  {
    id: '02',
    title: 'Biomechanical Audit',
    description: 'Comprehensive assessment of your gait, posture, and movement patterns to identify hidden leaks.',
    icon: Activity,
    color: 'text-secondary',
  },
  {
    id: '03',
    title: 'Cognitive Fueling',
    description: 'Nutrition protocols specifically designed to eliminate brain fog and sustain mental peak performance.',
    icon: Cpu,
    color: 'text-tertiary',
  },
  {
    id: '04',
    title: 'Athletic Longevity',
    description: 'Pre-hab routines and joint integrity training to ensure your body performs at peak for decades.',
    icon: ShieldCheck,
    color: 'text-primary',
  },
];

export default function Programs() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-surface-container-low overflow-x-hidden" id="programs">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter mb-4">
            Services
          </h2>
          <p className="text-tertiary text-sm">Curated pathways for distinct physical objectives.</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors group"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors group"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 px-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 scroll-smooth"
      >
        {services.map((service, idx) => (
          <div
            key={idx}
            className="snap-start min-w-[280px] md:min-w-[350px] bg-surface-container p-6 md:p-8 rounded-sm group hover:bg-surface-container-high transition-all border border-outline-variant/10 shadow-lg"
          >
            <div className="flex justify-between items-start mb-8">
              <div className={cn('font-display font-black text-4xl md:text-6xl opacity-20 transition-opacity group-hover:opacity-40', service.color)}>
                {service.id}
              </div>
              <service.icon className={cn('w-6 h-6 md:w-8 md:h-8 transition-colors', service.color)} />
            </div>
            <h4 className="text-lg md:text-xl font-bold uppercase mb-4 font-display leading-tight">{service.title}</h4>
            <p className="text-tertiary text-sm mb-8 leading-relaxed">{service.description}</p>
            <button className="w-full py-3 md:py-4 border border-outline-variant text-[10px] md:text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
              <motion.span whileHover={{ scale: 1.1 }}>Explore Program</motion.span>
            </button>
          </div>
        ))}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="flex md:hidden justify-center items-center gap-4 mt-8 opacity-50 px-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <span className="text-[10px] uppercase font-bold tracking-[0.4em] whitespace-nowrap">Swipe Protocol</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </div>

      <div className="mt-20 relative h-32 overflow-hidden pointer-events-none opacity-[0.03] select-none">
        <h2 className="absolute top-0 left-1/2 -translate-x-1/2 text-[15vw] font-display font-black uppercase tracking-tighter whitespace-nowrap leading-none">
          PERFORMANCE PROTOCOL • PERFORMANCE PROTOCOL • PERFORMANCE PROTOCOL
        </h2>
      </div>
    </section>
  );
}
