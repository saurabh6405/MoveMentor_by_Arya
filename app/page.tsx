'use client';

import React from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Marquee from '@/components/marquee';
import Pillars from '@/components/pillars';
import Programs from '@/components/programs';
import AboutCoach from '@/components/about-coach';
import WallOfImpact from '@/components/wall-of-impact';
import Pricing from '@/components/pricing';
import LeadCapture from '@/components/lead-capture';
import Footer from '@/components/footer';
import { Footprints, Moon, Utensils, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <main className="bg-background text-on-surface overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <Pillars />
      
      {/* Features Bar */}
      <section className="bg-surface py-12 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 md:gap-8">
            <FeatureItem
              icon={Footprints}
              label="Daily Goal"
              value="10k Steps"
              color="text-primary"
            />
            <FeatureItem
              icon={Moon}
              label="Rest Cycle"
              value="Sleep Mastery"
              color="text-secondary"
            />
            <FeatureItem
              icon={Utensils}
              label="Fuel Intake"
              value="Precision Macros"
              color="text-tertiary"
            />
            <FeatureItem
              icon={Zap}
              label="Vitality"
              value="Energy Mgmt"
              color="text-error"
            />
          </div>
        </div>
      </section>

      <Programs />
      <AboutCoach />
      <WallOfImpact />
      <Pricing />
      <LeadCapture />
      <Footer />
    </main>
  );
}

function FeatureItem({ icon: Icon, label, value, color }: {
  icon: any;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-surface-container flex items-center justify-center rounded-sm shrink-0">
        <Icon className={cn("w-5 h-5 md:w-6 md:h-6", color)} />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] md:text-xs font-sans uppercase text-tertiary tracking-widest leading-none mb-1 truncate">{label}</div>
        <div className="font-bold text-on-surface text-sm md:text-base break-words leading-tight">{value}</div>
      </div>
    </div>
  );
}
