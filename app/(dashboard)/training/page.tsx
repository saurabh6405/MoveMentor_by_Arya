'use client';

import React from 'react';
import Image from 'next/image';
import Topbar from '@/components/topbar';
import { 
  Play, 
  Timer, 
  Zap, 
  Settings2, 
  PlayCircle, 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  Edit2, 
  Trash2, 
  PlusCircle, 
  Brain,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

import { useRouter } from 'next/navigation';

import { useUserData } from '@/hooks/use-user-data';

export default function TrainingPage() {
  const router = useRouter();
  const { profile } = useUserData();

  return (
    <>
      <Topbar title="Training Mission" subtitle="Status: High Intensity Phase" />
      
      <main className="pt-20 pb-12 min-h-screen max-w-[1600px] mx-auto overflow-y-auto">
        {/* Hero Section: Today's Mission */}
        <section className="px-8 mt-8">
          <div className="bg-surface-container-low p-1 rounded-sm overflow-hidden flex flex-col lg:flex-row gap-8 min-h-[400px]">
            {/* Video Preview */}
            <div className="lg:w-2/3 relative group cursor-pointer overflow-hidden rounded-sm">
              <Image
                src={profile.todayMission.imageUrl}
                alt="Workout Preview"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                  <Play className="text-on-primary w-10 h-10 fill-current" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary text-on-primary text-[0.65rem] font-black uppercase tracking-widest rounded-sm mb-2">Live Mission</span>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter font-display">{profile.todayMission.title}</h2>
                </div>
                <span className="text-white/60 font-sans text-xs uppercase tracking-widest">00:00 / {profile.todayMission.duration}</span>
              </div>
            </div>

            {/* Mission Details */}
            <div className="lg:w-1/3 flex flex-col justify-center p-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-primary font-sans text-[0.7rem] font-black uppercase tracking-[0.3em]">Current Objective</p>
                <button className="text-secondary hover:text-primary transition-colors cursor-pointer">
                  <Settings2 className="w-5 h-5" />
                </button>
              </div>
              <h1 className="text-5xl font-black text-on-surface uppercase font-display tracking-tighter leading-none mb-4">Today&apos;s Mission</h1>
              <p className="text-tertiary text-sm font-sans leading-relaxed mb-8 opacity-80">
                Focusing on {profile.todayMission.focus}. Precision and intensity are paramount for today&apos;s adaptation.
              </p>
              <div className="space-y-4">
                <MissionInfo icon={Timer} label="Duration" value={profile.todayMission.duration} />
                <MissionInfo icon={Zap} label="Focus" value={profile.todayMission.focus} />
              </div>
              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => alert('Mission sequence initiated. Calibrating load cells...')}
                  className="flex-1 bg-primary text-on-primary text-[0.7rem] font-black uppercase tracking-widest py-3 rounded-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/20"
                >
                  <PlayCircle className="w-4 h-4" /> Start Mission
                </button>
                <button className="p-3 bg-surface-container-highest text-on-surface rounded-sm hover:bg-outline-variant transition-colors cursor-pointer">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Section */}
        <section className="px-8 mt-12">
          <div className="w-full bg-primary/10 py-4 flex items-center justify-center overflow-hidden whitespace-nowrap border-y border-primary/20">
            <div className="flex gap-12 animate-scroll-left">
               {[...Array(4)].map((_, i) => (
                <span key={i} className="text-primary font-black italic text-xl uppercase tracking-widest opacity-80 font-display">
                  Every Rep. Every Meal. Every Win.
                </span>
               ))}
               {[...Array(4)].map((_, i) => (
                <span key={i + 4} className="text-primary font-black italic text-xl uppercase tracking-widest opacity-80 font-display">
                  Every Rep. Every Meal. Every Win.
                </span>
               ))}
            </div>
          </div>
        </section>

        {/* Movement Protocol & Analytics Grid */}
        <section className="px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
          {/* Movement Protocol (List) */}
          <div className="lg:col-span-7 bg-surface-container-low p-8 rounded-sm border border-white/5">
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-10">
              <div>
                <p className="text-secondary font-sans text-[0.7rem] font-black uppercase tracking-[0.3em] mb-1">Structure</p>
                <h3 className="text-3xl font-black text-on-surface uppercase font-display tracking-tight">Movement Protocol</h3>
              </div>
              <div className="flex mt-4 md:mt-0">
                <div className="flex items-center bg-surface-container-high/50 p-1.5 rounded-sm border border-white/5">
                  <button className="w-8 h-8 flex items-center justify-center text-tertiary hover:text-primary transition-colors hover:bg-surface-container-highest rounded-sm">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-3 px-2">
                    <DateNav label="Past" date="14 SUN" />
                    <DateNav label="Today" date="15 MON" active />
                    <DateNav label="Future" date="16 TUE" />
                  </div>
                  <button className="w-8 h-8 flex items-center justify-center text-tertiary hover:text-primary transition-colors hover:bg-surface-container-highest rounded-sm">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <ExerciseRow id="A1" title="Deficit Deadlifts" tempo="3-1-X-1" sets={4} reps={8} />
              <ExerciseRow id="B1" title="Barbell Hip Thrusts" tempo="2s Pause at Peak" sets={3} reps={12} />
              <ExerciseRow id="C1" title="Bulgarian Split Squats" tempo="Bodyweight / Loaded" sets={3} reps={10} />
              
              <button className="w-full py-8 border-2 border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center gap-2 group hover:border-primary/50 hover:bg-primary/5 transition-all">
                <PlusCircle className="text-primary w-8 h-8 transition-transform group-hover:scale-110" />
                <span className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-tertiary group-hover:text-primary transition-colors font-display">Add Movement to Protocol</span>
              </button>
            </div>
          </div>

          {/* Performance Velocity */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-surface-container p-8 rounded-sm flex-1 border border-white/5">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-primary font-sans text-[0.7rem] font-black uppercase tracking-[0.3em] mb-1">Metrics</p>
                  <h3 className="text-2xl font-black text-on-surface uppercase font-display tracking-tight">Performance Velocity</h3>
                </div>
                <div className="bg-surface-container-high p-2 rounded-sm text-[0.6rem] font-bold text-tertiary border border-white/5">LVL 14</div>
              </div>

              <div className="relative h-64 w-full flex items-end justify-between gap-2 px-2 mt-4">
                <div className="absolute inset-0 border-b border-white/10 flex flex-col justify-between pointer-events-none">
                  {[...Array(4)].map((_, i) => <div key={i} className="border-t border-white/5 w-full"></div>)}
                </div>
                <VelocityBar height="40%" label="7.2k" />
                <VelocityBar height="65%" label="11k" />
                <VelocityBar height="85%" label="14.5k" active />
                <VelocityBar height="55%" label="9k" />
                <VelocityBar height="70%" label="12k" />
                <VelocityBar height="45%" label="Intensity" color="bg-secondary" />
              </div>

              <div className="mt-8 flex justify-between items-start text-tertiary text-[0.65rem] font-black uppercase tracking-widest">
                <div className="flex flex-col gap-1">
                  <span>Lifting Volume (kg)</span>
                  <span className="text-[0.55rem] font-medium normal-case tracking-tight opacity-40">Total weight moved session.</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-primary">Vs Intensity (%)</span>
                  <span className="text-[0.55rem] font-medium normal-case tracking-tight opacity-40">Effort relative to max.</span>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <MetricSmall label="Total Work" value="14,250" unit="kg" color="primary" description="Sets × reps × weight." />
                <MetricSmall label="Efficiency" value="94.2" unit="%" color="secondary" description="Relative intensity potential." />
              </div>
            </div>

            {/* Session Context Card */}
            <div className="bg-secondary-container/10 p-6 rounded-sm flex items-start gap-4 border border-secondary/20">
              <Brain className="text-secondary w-8 h-8 shrink-0" />
              <div>
                <h4 className="text-secondary font-bold text-sm uppercase tracking-widest mb-1 font-display">Coach&apos;s Directive</h4>
                <p className="text-xs text-on-surface/80 leading-relaxed font-sans italic">
                  &quot;Arya, focus on the eccentric phase of the deadlift today. We need controlled tension to maximize muscular recruitment before your next deload week.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FAB */}
      <button className="fixed bottom-28 right-8 md:bottom-12 md:right-12 w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center group hover:scale-105 transition-transform z-40">
        <Plus className="w-8 h-8 font-bold" />
        <span className="absolute right-20 bg-primary-container text-on-primary-container px-4 py-2 rounded-sm text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Log Set
        </span>
      </button>
    </>
  );
}

function MissionInfo({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-surface-container-high rounded-sm group hover:bg-surface-container-highest transition-colors cursor-pointer border border-white/5 hover:border-primary/20">
      <Icon className="text-primary w-5 h-5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-[0.65rem] uppercase tracking-widest text-tertiary font-bold">{label}</p>
        <p className="text-sm font-bold text-on-surface">{value}</p>
      </div>
      <Edit2 className="w-3 h-3 text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

function DateNav({ label, date, active }: { label: string; date: string; active?: boolean }) {
  return (
    <div className={cn(
      "flex flex-col items-center px-4 py-1 transition-all duration-300",
      active ? "bg-primary/10 border-b-2 border-primary" : "opacity-40"
    )}>
      <span className={cn("text-[0.6rem] font-black uppercase tracking-[0.2em]", active && "text-primary")}>{label}</span>
      <span className={cn("text-sm font-black font-display", active && "text-primary")}>{date}</span>
    </div>
  );
}

function ExerciseRow({ id, title, tempo, sets, reps }: { id: string; title: string, tempo: string, sets: number, reps: number }) {
  return (
    <div className="group bg-surface-container-high p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-container-highest transition-colors relative border-l-4 border-transparent hover:border-primary border border-white/5">
      <div className="flex gap-6 items-center">
        <span className="text-4xl font-black text-primary opacity-20 group-hover:opacity-100 transition-opacity font-display">{id}</span>
        <div>
          <h4 className="text-lg font-bold text-on-surface uppercase font-display tracking-tight">{title}</h4>
          <p className="text-xs text-tertiary font-sans uppercase tracking-widest">{tempo}</p>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex gap-8 items-center border-l border-white/10 pl-8 h-10">
          <div className="text-center">
            <p className="text-[0.6rem] text-tertiary uppercase tracking-widest font-bold">Sets</p>
            <p className="text-xl font-black text-on-surface font-display">{sets}</p>
          </div>
          <div className="text-center">
            <p className="text-[0.6rem] text-tertiary uppercase tracking-widest font-bold">Reps</p>
            <p className="text-xl font-black text-on-surface hover:text-primary transition-colors cursor-pointer flex items-center justify-center gap-1 font-display">
              {reps} <Edit2 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-50" />
            </p>
          </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface hover:text-primary transition-colors border border-white/5"><Edit2 className="w-3 h-3" /></button>
          <button className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface hover:text-error transition-colors border border-white/5"><Trash2 className="w-3 h-3" /></button>
        </div>
      </div>
    </div>
  );
}

function VelocityBar({ height, label, active, color = "bg-primary" }: { height: string; label: string, active?: boolean, color?: string }) {
  return (
    <div className={cn("relative group flex-1 transition-all duration-500", color, active ? "bg-opacity-100" : "bg-opacity-20 hover:bg-opacity-40")} style={{ height }}>
      <div className={cn(
        "absolute -top-8 left-1/2 -translate-x-1/2 text-[0.6rem] font-bold text-primary transition-opacity",
        active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )}>
        {label}
      </div>
    </div>
  );
}

function MetricSmall({ label, value, unit, color, description }: { label: string; value: string; unit: string; color: 'primary' | 'secondary'; description: string }) {
  return (
    <div className={cn("bg-surface-container-high p-4 border-l-2", color === 'primary' ? 'border-primary' : 'border-secondary')}>
      <p className="text-[0.6rem] text-tertiary uppercase tracking-widest font-bold mb-1">{label}</p>
      <p className="text-2xl font-black text-on-surface mb-2 font-display">
        {value}<span className="text-[0.65rem] text-tertiary ml-1">{unit}</span>
      </p>
      <p className="text-[0.55rem] font-medium text-tertiary leading-tight opacity-50 font-sans">{description}</p>
    </div>
  );
}
