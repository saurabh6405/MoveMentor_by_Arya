'use client';

import React from 'react';
import Topbar from '@/components/topbar';
import { Check, Shield, Zap, Star, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserData, PackageTier } from '@/hooks/use-user-data';
import { useRouter } from 'next/navigation';

export default function UpgradePage() {
  const { profile, updateProfile, tierLabel } = useUserData();
  const router = useRouter();

  const handleUpgrade = (tier: PackageTier) => {
    updateProfile({ tier });
    alert(`Success! Your protocol has been upgraded to ${tier}.`);
    router.push('/dashboard');
  };

  return (
    <>
      <Topbar title="Investment in Self" subtitle="Select your level of engagement" />
      
      <main className="pt-24 pb-20 px-8 max-w-7xl mx-auto min-h-screen">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tight text-white mb-4">
            Master Your <span className="text-primary italic">Movement</span>
          </h2>
          <p className="text-tertiary uppercase tracking-[0.2em] font-bold text-xs">
            Current Plan: <span className="text-primary">{tierLabel}</span>
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic */}
          <PricingCard 
            title="The Basic"
            price="9999"
            current={profile.tier === 'BASIC'}
            features={[
              "Personalized Program",
              "App Integration",
              "Monthly Progress Audit"
            ]}
            onSelect={() => handleUpgrade('BASIC')}
            icon={Layout}
          />

          {/* Elite */}
          <PricingCard 
            title="Personal Elite"
            price="14999"
            highlight
            current={profile.tier === 'PERSONAL_ELITE'}
            features={[
              "1-on-1 Bi-Weekly Coaching",
              "Customized Macro Protocol",
              "Posture Alignment Sessions",
              "WhatsApp Direct Line"
            ]}
            onSelect={() => handleUpgrade('PERSONAL_ELITE')}
            icon={Star}
          />

          {/* Group Access */}
          <PricingCard 
            title="Group Access"
            price="5999"
            current={profile.tier === 'GROUP_ACCESS'}
            features={[
              "Weekly Group Strategy Call",
              "Movement Library Access",
              "Standard Nutrition Template"
            ]}
            onSelect={() => handleUpgrade('GROUP_ACCESS')}
            icon={Shield}
          />
        </div>
      </main>
    </>
  );
}

function PricingCard({ 
  title, 
  price, 
  features, 
  highlight, 
  current, 
  onSelect, 
  icon: Icon 
}: { 
  title: string; 
  price: string; 
  features: string[]; 
  highlight?: boolean;
  current?: boolean;
  onSelect: () => void;
  icon: any;
}) {
  return (
    <div className={cn(
      "relative p-10 flex flex-col rounded-sm transition-all duration-500",
      highlight 
        ? "bg-surface-container-highest border-2 border-primary shadow-2xl scale-105 z-10" 
        : "bg-surface-container-low border border-white/5 hover:border-white/10"
    )}>
      {highlight && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary px-4 py-1 text-[10px] font-black uppercase tracking-widest">
          RECOMMENDED
        </div>
      )}

      <div className="mb-10">
        <div className="flex justify-between items-start mb-6">
          <h3 className={cn(
            "text-xs font-black uppercase tracking-[0.3em]",
            highlight ? "text-primary" : "text-tertiary"
          )}>{title}</h3>
          <Icon className={cn("w-5 h-5", highlight ? "text-primary" : "text-tertiary")} />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black font-display tracking-tighter text-white">₹{price}</span>
          <span className="text-tertiary text-sm tracking-tight">/mo</span>
        </div>
      </div>

      <ul className="space-y-4 mb-12 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-on-surface/70">
            <Check className="w-4 h-4 text-primary shrink-0" />
            <span className="font-medium">{feature}</span>
          </li>
        ))}
      </ul>

      <button 
        onClick={onSelect}
        disabled={current}
        className={cn(
          "w-full py-5 font-black uppercase tracking-[0.2em] text-[10px] rounded-sm transition-all",
          current
            ? "bg-white/5 text-tertiary cursor-not-allowed border border-white/10"
            : highlight
              ? "bg-primary text-on-primary hover:scale-[0.98] shadow-lg shadow-primary/20"
              : "border border-white/10 text-white hover:bg-white/5"
        )}
      >
        {current ? "CURRENT PROTOCOL" : "JOIN PROTOCOL"}
      </button>
    </div>
  );
}
