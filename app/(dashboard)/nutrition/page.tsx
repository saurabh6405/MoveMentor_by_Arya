'use client';

import React from 'react';
import Image from 'next/image';
import Topbar from '@/components/topbar';
import { 
  PlusCircle, 
  Calendar, 
  Sliders, 
  Edit3, 
  Trash2, 
  Plus, 
  Brain,
  Droplets
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

import { useUserData } from '@/hooks/use-user-data';

export default function NutritionPage() {
  const { profile, updateProfile } = useUserData();

  const handleAddWater = () => {
    updateProfile({ hydration: profile.hydration + 0.25 });
  };

  return (
    <>
      <Topbar title="Nutrition Protocol" subtitle="Fueling Precision" />
      
      <main className="pt-20 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[400px] w-full mb-12 flex items-end p-12 overflow-hidden rounded-lg group border border-white/5 mt-8">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10"></div>
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBazpjkXrjThiQQT0yP_W0-jjPkGuw5yDPegKSrRCbP8rSVwzAkYb5MOYXFx4irc69OmhOkXMmKiai_1q2fYrAlLlFbWyVEWNj1B-7nXiUA3urnVCHSN3iUH5rdzDRko6fjs-KQw8ARFGQ0HJbEWUM8pIHfAM8NnAJ0spmiacYOcg_2HbLr6-59HpeSmIrFvhXB2f34CTBlKe7G5QMcidLzDyfVHTfmcX2BgFlyRZSoxVB0Fdw456WWQaJk35Z1JtuG-OnwiRp1X0"
            alt="Healthy Roast"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-20 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 bg-primary text-on-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">Performance Protocol</span>
              <h1 className="text-6xl md:text-8xl font-black font-display tracking-tighter leading-[0.9] text-white">
                FUELING<br /><span className="text-primary">PRECISION</span>
              </h1>
            </div>
            <div className="max-w-xs text-right">
              <p className="font-display italic text-sm text-tertiary uppercase tracking-widest mb-4">Every Rep. Every Meal. Every Win.</p>
              <button className="bg-primary text-on-primary font-bold px-8 py-4 rounded-sm flex items-center gap-3 hover:scale-105 transition-transform duration-300 active:scale-95 ml-auto">
                <PlusCircle className="w-5 h-5" />
                ASSIGN TO SELF
              </button>
            </div>
          </div>
        </section>

        {/* Macro Thresholds */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <MacroCard label="PROTEIN" target="TARGET: 210g" value={`${Math.round(profile.calories * 0.3 / 4)}g`} color="primary" percent={Math.round((profile.calories * 0.3 / 4) / 210 * 100)} description="Essential for muscle tissue repair post high-intensity interval sessions." />
          <MacroCard label="CARBS" target="TARGET: 345g" value={`${Math.round(profile.calories * 0.5 / 4)}g`} color="secondary" percent={Math.round((profile.calories * 0.5 / 4) / 345 * 100)} description="Glycogen restoration window optimized for tomorrow's endurance block." />
          <MacroCard label="FATS" target="TARGET: 68g" value={`${Math.round(profile.calories * 0.2 / 9)}g`} color="tertiary" percent={Math.round((profile.calories * 0.2 / 9) / 68 * 100)} description="Hormonal health support and steady-state energy maintenance." />
        </section>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: My Daily Fuel Plan */}
          <div className="flex-1 space-y-8">
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <div className="flex items-center gap-4">
                <div className="h-8 w-1 bg-primary"></div>
                <h2 className="text-2xl font-black font-display uppercase tracking-tight">My Daily Fuel Plan</h2>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-surface-container hover:bg-surface-container-high transition-colors rounded-sm border border-white/5"><Calendar className="w-4 h-4 text-tertiary" /></button>
                <button className="p-2 bg-surface-container hover:bg-surface-container-high transition-colors rounded-sm border border-white/5"><Sliders className="w-4 h-4 text-tertiary" /></button>
              </div>
            </div>

            <MealCard
              time="06:30 AM"
              title="Pre-Load"
              tags={['Fast Carbs', 'Hydration Focus']}
              description="Large banana, 30g oats with water, and black coffee. Focus on immediate glycogen availability."
              macros={{ p: '4g', c: '52g', f: '2g' }}
              color="primary"
            />

            <MealCard
              time="12:30 PM"
              title="Midday Fuel"
              tags={['High Protein', 'Complex Carbs']}
              description="200g Grilled Chicken, 150g Quinoa, roasted seasonal greens with lemon-tahini dressing."
              macros={{ p: '62g', c: '45g', f: '14g' }}
              color="secondary"
            />

            <button 
              onClick={() => updateProfile({ calories: profile.calories + 500 })}
              className="w-full py-8 border-2 border-dashed border-white/10 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all group flex flex-col items-center justify-center gap-2"
            >
              <Plus className="text-3xl text-tertiary group-hover:text-primary transition-colors" />
              <span className="text-xs font-bold tracking-[0.2em] text-tertiary uppercase group-hover:text-primary transition-colors">Log 500 KCAL Progress</span>
            </button>
          </div>

          {/* Right: Daily Fuel Summary & Insights */}
          <aside className="w-full lg:w-96 space-y-8">
            <div className="bg-surface-container-low border border-white/5 p-8 rounded-lg">
              <h3 className="text-lg font-black font-display uppercase tracking-tight mb-8">Daily Fuel Summary</h3>
              <div className="space-y-10">
                <div className="flex items-center gap-6">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="40" cy="40" fill="transparent" r="36" stroke="#1b1c1d" strokeWidth="8"></circle>
                      <circle 
                        cx="40" 
                        cy="40" 
                        fill="transparent" 
                        r="36" 
                        stroke="#bdd124" 
                        strokeDasharray="226.19" 
                        strokeDashoffset={226.19 - (226.19 * Math.min(1, profile.calories / 2500))} 
                        strokeWidth="8"
                      ></circle>
                    </svg>
                    <span className="absolute text-[10px] font-black text-white">{Math.round(Math.min(1, profile.calories / 2500) * 100)}%</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-tertiary uppercase tracking-widest">Total Intake</p>
                    <p className="text-2xl font-black font-display text-white">{profile.calories.toLocaleString()} <span className="text-xs text-tertiary/60">KCAL</span></p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-tertiary uppercase tracking-widest">Hydration Level</span>
                    <span className={cn("font-black", profile.hydration >= 2.5 ? "text-primary" : "text-secondary")}>
                      {profile.hydration >= 3.0 ? 'EXPERT' : profile.hydration >= 2.0 ? 'OPTIMAL' : 'CRITICAL'}
                    </span>
                  </div>
                  <div className="grid grid-cols-12 gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "h-4 rounded-sm transition-colors", 
                          (profile.hydration / 4) * 12 > i ? "bg-primary shadow-[0_0_8px_rgba(189,209,36,0.3)]" : "bg-white/5"
                        )}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-4">
                  <h4 className="text-xs font-bold text-secondary uppercase tracking-[0.2em]">Fuel Insights</h4>
                  <div className="bg-surface-container-high p-4 rounded-sm border-l-2 border-secondary shadow-lg">
                    <p className="text-[11px] text-tertiary leading-normal italic font-sans">
                      &quot;Your carb intake is perfectly timed for tonight&apos;s aerobic capacity run. Stay the course.&quot;
                    </p>
                    <p className="text-[10px] text-primary font-bold uppercase mt-2 font-display">— MoveMentor AI</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Water Tracker Card Extension */}
            <div className="bg-surface-container-low border border-white/5 p-8 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center">
                  <Droplets className="text-primary w-6 h-6" />
                </div>
                <div>
                   <p className="text-xs font-bold text-tertiary uppercase tracking-widest leading-none mb-1">Water Intake</p>
                   <p className="text-xl font-black font-display">{profile.hydration.toFixed(1)}L <span className="text-xs font-normal text-tertiary/40">/ 3.5L</span></p>
                </div>
              </div>
              <button 
                onClick={handleAddWater}
                className="bg-primary hover:bg-primary/80 transition-colors p-3 rounded-full text-on-primary shadow-lg shadow-primary/20 cursor-pointer active:scale-90"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

function MacroCard({ label, target, value, color, percent, description }: { label: string; target: string; value: string; color: string; percent: number; description: string }) {
  const colorMap = {
    primary: 'bg-primary shadow-[0_0_12px_rgba(189,209,36,0.6)]',
    secondary: 'bg-secondary shadow-[0_0_12px_rgba(208,191,238,0.6)]',
    tertiary: 'bg-tertiary',
  };
  const textMap = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
  };

  return (
    <div className="bg-surface-container-low p-8 space-y-6 rounded-lg border border-white/5">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-bold text-tertiary uppercase tracking-widest mb-1">{label}</p>
          <h3 className="text-4xl font-black font-display">{value}</h3>
        </div>
        <span className={cn("text-xs font-bold uppercase", textMap[color as keyof typeof textMap])}>{label} {target}</span>
      </div>
      <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1 }}
          className={cn("h-full", colorMap[color as keyof typeof colorMap])}
        />
      </div>
      <p className="text-xs text-tertiary/60 leading-tight block">{description}</p>
    </div>
  );
}

function MealCard({ time, title, tags, description, macros, color }: { time: string; title: string, tags: string[], description: string, macros: any, color: string }) {
  const borderMap = {
    primary: 'hover:border-primary',
    secondary: 'hover:border-secondary',
    tertiary: 'hover:border-tertiary',
  };
  const textMap = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
  };

  return (
    <div className={cn(
      "group relative bg-surface-container-low p-6 flex flex-col md:flex-row gap-8 items-start hover:bg-surface-container transition-all duration-300 border-l-2 border-transparent rounded-lg border border-white/5",
      borderMap[color as keyof typeof borderMap]
    )}>
      <div className="w-full md:w-32 text-center md:text-left">
        <span className={cn("text-[10px] font-bold tracking-widest uppercase", textMap[color as keyof typeof textMap])}>{time}</span>
        <h4 className="text-xl font-bold font-display mt-1 tracking-tight uppercase">{title}</h4>
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-surface-container-highest text-[10px] font-bold text-tertiary rounded-sm uppercase tracking-tighter border border-white/5">{tag}</span>
          ))}
        </div>
        <p className="text-on-surface/80 text-sm leading-relaxed font-sans">{description}</p>
        <div className="flex gap-6 text-[10px] font-bold uppercase text-tertiary/60 tracking-wider">
          <span>P: {macros.p}</span>
          <span>C: {macros.c}</span>
          <span>F: {macros.f}</span>
        </div>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-tertiary hover:text-primary transition-colors"><Edit3 className="w-4 h-4" /></button>
        <button className="text-tertiary hover:text-error transition-colors"><Trash2 className="w-4 h-4" /></button>
      </div>
    </div>
  );
}
