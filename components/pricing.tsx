'use client';

import { Users, BookOpen, Utensils, User, Activity, CheckCircle, Apple, MousePointer2, Crown } from 'lucide-react';
import Link from 'next/link';

import { useAuthModal } from '@/lib/auth-context';

export default function Pricing() {
  const { openAuth } = useAuthModal();

  return (
    <section className="py-24 px-6 bg-surface-container-lowest overflow-x-hidden" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 px-4">
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter mb-4 text-on-background">Investment in Self</h2>
          <p className="text-tertiary max-w-sm mx-auto">Select your level of engagement. Precision metrics for elite outcome.</p>
        </div>

        <div className="flex overflow-x-auto pb-8 md:grid md:grid-cols-3 gap-6 snap-x snap-mandatory no-scrollbar -mx-6 px-6 scroll-smooth">
          {/* Group Access */}
          <div className="flex-shrink-0 w-[85vw] md:w-full snap-center bg-surface p-8 md:p-12 flex flex-col border border-white/5 group hover:border-white/10 transition-colors rounded-sm">
            <div className="mb-8">
              <h3 className="text-[10px] font-sans uppercase tracking-[0.3em] mb-4 text-tertiary">Group Access</h3>
              <div className="text-4xl md:text-5xl font-black font-display tracking-tighter">
                ₹5999<span className="text-sm font-normal text-tertiary">/mo</span>
              </div>
            </div>
            <ul className="space-y-4 mb-12 flex-grow text-tertiary text-xs md:text-sm">
              <li className="flex items-center gap-3"><Users className="text-primary w-4 h-4" /> Weekly Group Strategy Call</li>
              <li className="flex items-center gap-3"><BookOpen className="text-primary w-4 h-4" /> Movement Library Access</li>
              <li className="flex items-center gap-3"><Utensils className="text-primary w-4 h-4" /> Standard Nutrition Template</li>
            </ul>
            <button 
              onClick={() => openAuth('signup')}
              className="w-full py-4 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 rounded-sm cursor-pointer"
            >
              <Activity className="w-4 h-4" /> Select Plan
            </button>
          </div>

          {/* Personal Elite (Recommended) */}
          <div className="flex-shrink-0 w-[85vw] md:w-full snap-center bg-surface-container-high p-8 md:p-12 flex flex-col relative md:scale-105 z-10 border-2 border-primary shadow-2xl rounded-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary px-3 py-1 text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded-sm whitespace-nowrap">
              Recommended
            </div>
            <div className="mb-8">
              <h3 className="text-[10px] font-sans uppercase tracking-[0.3em] mb-4 text-primary">Personal Elite</h3>
              <div className="text-4xl md:text-5xl font-black font-display tracking-tighter text-on-background">
                ₹14999<span className="text-sm font-normal text-tertiary">/mo</span>
              </div>
            </div>
            <ul className="space-y-4 mb-12 flex-grow text-xs md:text-sm text-on-surface">
              <li className="flex items-center gap-3"><User className="text-primary w-4 h-4 fill-current" /> 1-on-1 Bi-Weekly Coaching</li>
              <li className="flex items-center gap-3"><Activity className="text-primary w-4 h-4 fill-current" /> Customized Macro Protocol</li>
              <li className="flex items-center gap-3"><Activity className="text-primary w-4 h-4 fill-current" /> Posture Alignment Sessions</li>
              <li className="flex items-center gap-3 text-[#25D366] font-bold">
                <CheckCircle className="w-4 h-4 fill-current" /> WhatsApp Direct Line
              </li>
            </ul>
            <button 
              onClick={() => openAuth('signup')}
              className="w-full py-4 bg-primary text-on-primary text-[10px] font-black uppercase tracking-widest hover:scale-95 transition-all flex items-center justify-center gap-3 rounded-sm shadow-xl shadow-primary/20 cursor-pointer"
            >
              <Crown className="w-4 h-4" /> Join Elite
            </button>
          </div>

          {/* The Basic */}
          <div className="flex-shrink-0 w-[85vw] md:w-full snap-center bg-surface p-8 md:p-12 flex flex-col border border-white/5 group hover:border-white/10 transition-colors rounded-sm">
            <div className="mb-8">
              <h3 className="text-[10px] font-sans uppercase tracking-[0.3em] mb-4 text-tertiary">The Basic</h3>
              <div className="text-4xl md:text-5xl font-black font-display tracking-tighter">
                ₹9999<span className="text-sm font-normal text-tertiary">/mo</span>
              </div>
            </div>
            <ul className="space-y-4 mb-12 flex-grow text-tertiary text-xs md:text-sm">
              <li className="flex items-center gap-3"><CheckCircle className="text-primary w-4 h-4" /> Personalized Program</li>
              <li className="flex items-center gap-3"><Apple className="text-primary w-4 h-4" /> App Integration</li>
              <li className="flex items-center gap-3"><Activity className="text-primary w-4 h-4" /> Monthly Progress Audit</li>
            </ul>
            <button 
              onClick={() => openAuth('signup')}
              className="w-full py-4 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 rounded-sm cursor-pointer"
            >
              <MousePointer2 className="w-4 h-4" /> Select Basic
            </button>
          </div>
        </div>
        
        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden justify-center items-center gap-4 mt-4 opacity-50">
          <div className="w-8 h-[2px] bg-primary"></div>
          <span className="text-[10px] uppercase font-bold tracking-widest px-2">Swipe to Compare</span>
          <div className="w-8 h-[2px] bg-primary"></div>
        </div>
      </div>
    </section>
  );
}
