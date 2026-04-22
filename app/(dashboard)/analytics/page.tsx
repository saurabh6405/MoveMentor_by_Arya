'use client';

import React from 'react';
import Topbar from '@/components/topbar';
import Image from 'next/image';
import { 
  Activity, 
  Search, 
  TrendingDown, 
  CheckCircle,
  Menu,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

import { useUserData } from '@/hooks/use-user-data';

export default function AnalyticsPage() {
  const { profile } = useUserData();

  return (
    <>
      <Topbar title="Performance Intelligence" subtitle="Live Performance Feed" />
      
      <div className="pt-24 pb-12 px-8 max-w-7xl mx-auto overflow-y-auto min-h-screen">
        {/* Hero Header Section */}
        <section className="relative mb-12 overflow-hidden bg-surface-container-low p-10 rounded-sm border-l-8 border-primary border border-white/5">
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-primary text-on-primary text-[0.65rem] font-black uppercase tracking-[0.2em] mb-4">Live Performance Feed</span>
            <h2 className="text-5xl md:text-7xl font-black font-display tracking-tighter mb-4 text-on-surface uppercase">
              PERFORMANCE <span className="text-primary italic">INTELLIGENCE</span>
            </h2>
            <p className="text-tertiary-fixed-dim max-w-xl font-medium text-lg leading-relaxed italic font-sans">
              &quot;EVERY REP. EVERY MEAL. EVERY WIN.&quot;
            </p>
          </div>
        </section>

        {/* Bento Grid Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Chart: Strength Progression */}
          <div className="md:col-span-8 bg-surface-container rounded-sm p-8 flex flex-col relative overflow-hidden border border-white/5">
            <div className="flex justify-between items-end mb-8 relative z-10">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-tertiary mb-1">Telemetry 01</p>
                <h3 className="text-2xl font-bold font-display uppercase tracking-tight">Strength Progression</h3>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-surface-container-highest text-[0.6rem] text-primary rounded-sm font-bold border border-white/5">1 Rep Max</span>
                <span className="px-2 py-1 bg-surface-container-highest text-[0.6rem] text-tertiary rounded-sm font-bold border border-white/5">LIFETIME</span>
              </div>
            </div>
            
            <div className="h-64 relative rounded-sm border border-white/5 flex items-end px-4 pb-4 bg-white/5">
              <div className="absolute inset-0 grid grid-cols-1 grid-rows-4 pointer-events-none">
                 <div className="border-b border-white/5 w-full"></div>
                 <div className="border-b border-white/5 w-full"></div>
                 <div className="border-b border-white/5 w-full"></div>
                 <div className="border-b border-white/5 w-full"></div>
              </div>
              <div className="w-full flex items-end justify-between gap-2 h-full relative z-10">
                <VelocityBar height="30%" label="140KG" />
                <VelocityBar height="45%" label="155KG" />
                <VelocityBar height="40%" label="150KG" />
                <VelocityBar height="55%" label="165KG" />
                <VelocityBar height="65%" label="175KG" />
                <VelocityBar height="60%" label="170KG" />
                <div className="flex-1 bg-primary h-[85%] relative rounded-t-sm group">
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-on-surface text-background text-[0.6rem] font-bold px-2 py-1 opacity-100 transition-opacity">185KG</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 mt-6 gap-4 border-t border-white/10 pt-6">
              <SmallMetric label="Squat Max" value="185" unit="KG" />
              <SmallMetric label="Deadlift Max" value="220" unit="KG" />
              <SmallMetric label="Bench Max" value="125" unit="KG" />
              <SmallMetric label="Power Clean" value="95" unit="KG" />
            </div>
          </div>

          {/* Consistency Score */}
          <div className="md:col-span-4 bg-surface-container rounded-sm p-8 flex flex-col items-center justify-center text-center border border-white/5">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-tertiary mb-6">Telemetry 02</p>
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle className="text-surface-container-highest" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12"></circle>
                <circle 
                  className="text-primary" 
                  cx="96" 
                  cy="96" 
                  fill="transparent" 
                  r="88" 
                  stroke="currentColor" 
                  strokeDasharray="552.9" 
                  strokeDashoffset={552.9 - (552.9 * profile.consistency / 100)} 
                  strokeWidth="12" 
                  strokeLinecap="round"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-on-surface font-display">{profile.consistency}<span className="text-xl text-primary font-sans">%</span></span>
                <span className="text-[0.6rem] uppercase tracking-widest text-tertiary mt-1">Consistency</span>
              </div>
            </div>
            <div className="mt-8 w-full flex justify-between px-4">
              <div className="text-left">
                <p className="text-[0.6rem] uppercase tracking-widest text-tertiary">STREAK</p>
                <p className="text-lg font-bold font-display">{Math.floor(profile.consistency / 4)} DAYS</p>
              </div>
              <div className="text-right">
                <p className="text-[0.6rem] uppercase tracking-widest text-tertiary">RANKING</p>
                <p className="text-lg font-bold text-secondary font-display font-display">
                  {profile.consistency > 90 ? 'ELITE' : profile.consistency > 70 ? 'STABLE' : 'RECOVERY'}
                </p>
              </div>
            </div>
          </div>

          {/* Body Composition */}
          <div className="md:col-span-6 bg-surface-container rounded-sm p-8 relative overflow-hidden border border-white/5">
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-tertiary mb-1">Telemetry 03</p>
                <h3 className="text-xl font-bold font-display uppercase tracking-tight">Body Composition</h3>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-secondary font-display">14.2<span className="text-sm font-medium ml-1">%</span></p>
                <p className="text-[0.6rem] text-secondary/60 uppercase tracking-widest">-1.4% FROM OCT</p>
              </div>
            </div>
            <div className="space-y-6">
              <StatBar label="Muscle Mass" value="78.5 KG" percent={82} color="bg-secondary" />
              <StatBar label="Pinchable Fat" value="9.2 KG" percent={14} color="bg-primary" />
              <StatBar label="Water Retention" value="62.1%" percent={62} color="bg-tertiary" />
            </div>
          </div>

          {/* Weight Variance Line Chart */}
          <div className="md:col-span-6 bg-surface-container-lowest border border-white/5 rounded-sm p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-tertiary mb-1">Telemetry 04</p>
                <h3 className="text-xl font-bold font-display uppercase tracking-tight">Weight Variance</h3>
              </div>
              <div className="bg-surface-container px-3 py-1 text-[0.6rem] text-tertiary rounded-full border border-white/5 uppercase font-bold">
                TARGET: 88.0 KG
              </div>
            </div>
            <div className="h-40 flex items-center justify-center relative">
              <svg className="w-full h-full text-primary opacity-80" viewBox="0 0 400 100" fill="none" preserveAspectRatio="none">
                <path d="M0,80 L50,75 L100,85 L150,60 L200,65 L250,40 L300,45 L350,20 L400,25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="350" cy="20" r="4" fill="white" className="shadow-lg" />
              </svg>
              <div className="absolute bottom-0 left-0 w-full flex justify-between text-[0.5rem] text-tertiary uppercase tracking-widest font-bold">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
                <span>SUN</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu8M0aqDY0rhiKg8UDWXiO3cnCH_bKHhtJ_Hb4qrD4lpqk5MtUbe1aGHDMoMRCRE_yXMonqGzv-XOnXOlKctYhIx0LOq6hHgGolixOaUFEoFvJL-hoSxGnQTDogvnprJIm2jLqkpi2uCxhWbJYSsW_qx5PRPAXHAHprz3xK6PvswmMcssuEr5EEIIuFfBZmpMHTF3pNZz6onsYfejmQTmyyYnjN3Zueyiu4JwJOt6ZIU4sODC2ObEFKsbJ1N67E1DBYwK49OBzeX4" 
                alt="Gym Equipment" 
                width={100} 
                height={60} 
                className="w-24 h-16 object-cover rounded-sm grayscale opacity-30 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <p className="text-[0.7rem] leading-relaxed text-tertiary italic font-sans">
                Weight variance is within <span className="text-primary font-bold">OPTIMAL</span> range for the current hypertrophy phase. Metabolic adaptation confirmed.
              </p>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="md:col-span-12 bg-surface-container rounded-sm p-8 border border-white/5">
            <h3 className="text-[0.65rem] uppercase tracking-[0.3em] text-tertiary mb-8 font-bold">Performance Logs / Vitals</h3>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left font-sans">
                <thead>
                  <tr className="text-[0.6rem] uppercase tracking-[0.2em] text-tertiary border-b border-white/5">
                    <th className="pb-4 font-normal">Event Descriptor</th>
                    <th className="pb-4 font-normal">Metric Load</th>
                    <th className="pb-4 font-normal">HR Velocity</th>
                    <th className="pb-4 font-normal">System Status</th>
                    <th className="pb-4 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-[0.75rem] uppercase font-bold tracking-tight">
                  <TableRow name="Max Effort Pull Day" load="12,450 KG" change="+4%" hr="164 BPM" status="NOMINAL" />
                  <TableRow name="Zone 2 Metabolic Conditioning" load="45:00 MIN" hr="138 BPM" status="RECOVERY" color="secondary" />
                  <TableRow name="Neural Drive Leg Session" load="18,200 KG" change="+8%" hr="172 BPM" status="NOMINAL" />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SmallMetric({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div>
      <p className="text-[0.6rem] uppercase tracking-widest text-tertiary mb-1 font-bold">{label}</p>
      <p className="text-xl font-black text-on-surface font-display">
        {value}<span className="text-xs text-tertiary ml-1 font-sans">{unit}</span>
      </p>
    </div>
  );
}

function VelocityBar({ height, label }: { height: string; label: string }) {
  return (
    <div className="w-full bg-primary/20 hover:bg-primary/40 transition-all cursor-pointer relative group rounded-t-sm" style={{ height }}>
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface text-background text-[0.6rem] font-bold px-2 py-1 rounded-sm whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}

function StatBar({ label, value, percent, color }: { label: string; value: string; percent: number; color: string }) {
  return (
    <div className="relative">
      <div className="flex justify-between text-[0.6rem] uppercase tracking-widest text-tertiary mb-2 font-bold">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.2 }}
          className={cn("h-full", color)}
        />
      </div>
    </div>
  );
}

function TableRow({ name, load, change, hr, status, color = "primary" }: { name: string; load: string; change?: string; hr: string; status: string; color?: string }) {
  return (
    <tr className="border-b border-white/5 group hover:bg-surface-container-high transition-colors">
      <td className="py-4 text-on-surface">{name}</td>
      <td className="py-4 text-on-surface">
        {load} {change && <span className={cn("text-[0.6rem] ml-1", color === 'primary' ? 'text-primary' : 'text-secondary')}>{change}</span>}
      </td>
      <td className="py-4 text-on-surface">{hr}</td>
      <td className="py-4">
        <span className={cn("flex items-center gap-2", color === 'primary' ? 'text-primary' : 'text-secondary')}>
          <span className={cn("w-1.5 h-1.5 rounded-full", color === 'primary' ? 'bg-primary' : 'bg-secondary')}></span> 
          {status}
        </span>
      </td>
      <td className="py-4 text-right">
        <button className="text-tertiary hover:text-primary transition-colors uppercase text-[0.6rem] tracking-widest underline font-black">Inspect</button>
      </td>
    </tr>
  );
}
