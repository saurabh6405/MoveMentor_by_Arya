'use client';

import React from 'react';
import Topbar from '@/components/topbar';
import Image from 'next/image';
import { 
  Zap, 
  BarChart2, 
  History, 
  PlayCircle, 
  Lock, 
  Watch, 
  ArrowRight, 
  CheckCircle,
  Bolt,
  Smile,
  Meh,
  Frown,
  TrendingDown,
  Activity,
  Edit3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUI } from '@/lib/ui-context';

import { useUserData } from '@/hooks/use-user-data';
import QuickEditModal from '@/components/quick-edit-modal';

export default function DashboardPage() {
  const router = useRouter();
  const { openCheckIn } = useUI();
  const { profile, aiInsight } = useUserData();

  const [editState, setEditState] = React.useState<{
    isOpen: boolean;
    field: string;
    label: string;
    value: any;
    type?: 'number' | 'text' | 'select';
  }>({
    isOpen: false,
    field: '',
    label: '',
    value: '',
  });

  const openEdit = (field: string, label: string, value: any, type: 'number' | 'text' | 'select' = 'number') => {
    setEditState({ isOpen: true, field, label, value, type });
  };

  return (
    <>
      <Topbar title="Overview" subtitle="Master your progress" />
      
      <QuickEditModal 
        key={`${editState.field}-${editState.isOpen}`}
        isOpen={editState.isOpen}
        onClose={() => setEditState(prev => ({ ...prev, isOpen: false }))}
        field={editState.field}
        label={editState.label}
        initialValue={editState.value}
        type={editState.type}
      />
      
      <div className="pt-24 pb-12 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div className="lg:col-span-8 relative overflow-hidden bg-surface-container-low rounded-lg p-8 md:p-12 border border-white/5 min-h-[400px] flex flex-col justify-end group">
            <div className="absolute inset-0 opacity-40 transition-transform duration-1000 group-hover:scale-105">
              <Image
                src={profile.todayMission.imageUrl}
                alt="Gym"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
            <div className="relative z-10">
              <span className="font-sans text-primary font-bold tracking-[0.3em] text-xs uppercase mb-4 block">
                Welcome back, {profile.name}
              </span>
              <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter leading-none mb-6">
                MASTER YOUR<br />PROGRESS
              </h2>
              <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8 font-sans text-xs text-tertiary tracking-widest font-bold">
                <div className="flex items-center gap-2 text-[10px]"><div className="w-1 h-1 bg-primary"></div> READINESS: <span className="text-white">{profile.readiness}%</span></div>
                <div className="flex items-center gap-2 text-[10px]"><div className="w-1 h-1 bg-primary"></div> ENERGY: <span className="text-white">{profile.energy}</span></div>
                <div className="flex items-center gap-2 text-[10px]"><div className="w-1 h-1 bg-primary"></div> SLEEP: <span className="text-white">{profile.sleep}</span></div>
                <div className="flex items-center gap-2 text-[10px]"><div className="w-1 h-1 bg-primary"></div> STEPS: <span className="text-white">{profile.steps.toLocaleString()}</span></div>
              </div>
              <div className="bg-primary/10 border-l-4 border-primary px-4 py-2 mb-8 inline-block">
                <p className="font-sans text-[10px] tracking-[0.4em] text-primary font-black uppercase">
                  EVERY REP EVERY MEAL EVERY WIN
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/training"
                  className="bg-primary text-on-primary font-black px-8 py-5 text-[10px] md:text-xs tracking-[0.3em] uppercase rounded-sm hover:scale-95 transition-all shadow-xl shadow-primary/20 cursor-pointer flex items-center"
                >
                  START TODAY&apos;S WORKOUT
                </Link>
                <button 
                  onClick={openCheckIn}
                  className="border border-white/10 text-white font-black px-8 py-5 text-[10px] md:text-xs tracking-[0.3em] uppercase rounded-sm hover:bg-white/5 hover:scale-95 transition-all cursor-pointer"
                >
                  ENTER DAILY CHECK-IN
                </button>
              </div>
            </div>
          </div>

          {/* Performance Panel */}
          <div className="lg:col-span-4 bg-surface-container-highest rounded-lg p-8 flex flex-col justify-between border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 select-none pointer-events-none">
              <span className="font-display text-8xl font-black italic tracking-tighter leading-none">MK.IV</span>
            </div>
            <div>
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-sans text-xs tracking-[0.2em] text-tertiary opacity-60 uppercase">Performance Panel</h3>
                <button 
                  onClick={() => openEdit('name', 'Client Identity', profile.name, 'text')}
                  className="text-primary/40 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest cursor-pointer"
                >
                  Edit Profile
                </button>
              </div>
              <div className="grid grid-cols-2 gap-y-8">
                <MetricBlock 
                  label="Weight" 
                  value={profile.weight.toFixed(1)} 
                  unit="KG" 
                  onEdit={() => openEdit('weight', 'System Weight', profile.weight)}
                />
                <MetricBlock 
                  label="Body Fat" 
                  value={profile.bodyFat.toFixed(1)} 
                  unit="%" 
                  onEdit={() => openEdit('bodyFat', 'Body Fat Ratio', profile.bodyFat)}
                />
                <MetricBlock 
                  label="Consistency" 
                  value={profile.consistency.toString()} 
                  unit="%" 
                  color="text-primary" 
                  onEdit={() => openEdit('consistency', 'Consistency Score', profile.consistency)}
                />
                <MetricBlock 
                  label="Tier" 
                  value={profile.tier.replace('_', ' ')} 
                  color="text-secondary" 
                />
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="flex justify-between items-center">
                <span className="font-sans text-[10px] tracking-[0.2em] text-tertiary uppercase">
                  Status: <span className="text-primary">ON TRACK</span>
                </span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Main Content */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Neon Progress Bars */}
          <div className="bg-surface-container-low rounded-lg p-8 border border-white/5">
            <h3 className="font-sans text-xs tracking-[0.2em] text-tertiary uppercase mb-8 flex items-center gap-2">
              <BarChart2 className="w-4 h-4" /> Metrics Vitals
            </h3>
            <div className="space-y-6">
              <ProgressBar label="Steps" current={profile.metrics.steps.current.toLocaleString()} target={profile.metrics.steps.target.toLocaleString()} percent={(profile.metrics.steps.current / profile.metrics.steps.target) * 100} />
              <ProgressBar label="Hydration" current={`${profile.metrics.hydration.current}${profile.metrics.hydration.unit}`} target={`${profile.metrics.hydration.target}${profile.metrics.hydration.unit}`} percent={(profile.metrics.hydration.current / profile.metrics.hydration.target) * 100} />
              <ProgressBar label="Calories" current={profile.metrics.calories.current.toString()} target={profile.metrics.calories.target.toString()} percent={(profile.metrics.calories.current / profile.metrics.calories.target) * 100} />
              <ProgressBar label="Workout" current={`${profile.metrics.workout.current}${profile.metrics.workout.unit}`} target={`${profile.metrics.workout.target}${profile.metrics.workout.unit}`} percent={(profile.metrics.workout.current / profile.metrics.workout.target) * 100} />
            </div>
          </div>

          {/* Today's Mission */}
          <div className="bg-surface-container-low rounded-lg overflow-hidden border border-white/5 relative group">
            <div className="h-48 relative">
              <Image
                src={profile.todayMission.imageUrl}
                alt="Workout"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-surface/40 flex items-center justify-center">
                <PlayCircle className="text-white text-5xl opacity-80 group-hover:scale-110 transition-transform cursor-pointer" />
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-sans text-[10px] tracking-[0.3em] text-tertiary uppercase mb-2 font-bold opacity-60">Today&apos;s Mission</h3>
              <h4 className="font-display text-2xl font-black mb-4 tracking-tight uppercase">{profile.todayMission.title}</h4>
              <p className="text-sm text-tertiary opacity-70 mb-8 leading-relaxed font-medium">
                Focus: {profile.todayMission.focus}. Duration: {profile.todayMission.duration}.
              </p>
              <Link 
                href="/training"
                className="w-full bg-surface-container-highest text-white font-black py-4 text-[10px] tracking-[0.3em] rounded-sm hover:bg-primary hover:text-on-primary transition-all uppercase cursor-pointer flex items-center justify-center"
              >
                WATCH SESSION
              </Link>
            </div>
          </div>

          {/* Goal Lock System */}
          <div className="bg-surface-container-low rounded-lg p-8 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-8">
                <h3 className="font-sans text-xs tracking-[0.2em] text-tertiary uppercase">Goal Lock System</h3>
                <Lock className="text-primary w-5 h-5 fill-current" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between font-display text-lg">
                  <span className="text-white">Weight Goal</span>
                  <span className="text-primary italic">{profile.weightGoal.toFixed(1)}KG</span>
                </div>
                <div className="bg-surface-container-highest h-8 relative rounded-sm flex items-center px-4 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20" style={{ width: `${Math.min(100, (1 - (profile.weight - profile.weightGoal) / 10) * 100)}%` }}></div>
                  <span className="relative z-10 text-[10px] font-black tracking-widest uppercase">PROGRESS: {Math.max(0, Math.min(100, Math.round((1 - (profile.weight - profile.weightGoal) / 10) * 100)))}%</span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="font-sans text-xs tracking-[0.2em] text-tertiary uppercase mb-4">Device Sync</h3>
              <div className="flex gap-4">
                <DeviceIcon icon={Watch} title="Apple Health" active />
                <DeviceIcon icon={Activity} title="Garmin" />
                <DeviceIcon icon={Bolt} title="Fitbit" />
              </div>
            </div>
          </div>

          {/* AI Coach Insight */}
          <div className="bg-surface-container-low rounded-lg p-8 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
            <h3 className="font-sans text-xs tracking-[0.2em] text-tertiary uppercase mb-6 flex items-center gap-2">
              <Bolt className="text-secondary w-4 h-4" /> AI INSIGHT
            </h3>
            <div className="mb-8">
              <p className="text-xs text-tertiary uppercase tracking-widest mb-1">Consistency Score</p>
              <p className="font-display text-4xl font-black text-secondary italic tracking-tighter">
                {profile.consistency > 90 ? 'ELITE' : profile.consistency > 70 ? 'STABLE' : 'RECOVERY'}
              </p>
            </div>
            <p className="text-sm text-on-surface mb-8 leading-relaxed font-medium">
              {aiInsight}
            </p>
            <button 
              onClick={() => router.push('/training')}
              className="w-full bg-secondary text-on-secondary font-black py-4 text-[10px] tracking-[0.3em] rounded-sm hover:scale-95 transition-all uppercase cursor-pointer shadow-lg shadow-secondary/20"
            >
              OPTIMIZE TODAY
            </button>
          </div>

          {/* Daily Status */}
          <div className="bg-surface-container-low rounded-lg p-8 border border-white/5 flex flex-col justify-between">
            <h3 className="font-sans text-xs tracking-[0.2em] text-tertiary uppercase mb-8">Daily Check-in Status</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-sm border border-white/5">
                <div className="flex items-center gap-3">
                  <div className={cn("w-2 h-2 rounded-full", profile.readiness > 0 ? "bg-primary animate-pulse" : "bg-tertiary")}></div>
                  <span className="text-[10px] font-black tracking-widest uppercase">Protocol Check</span>
                </div>
                <span className="text-[10px] font-bold text-tertiary uppercase">
                  {profile.readiness > 0 ? 'SYNCHRONIZED' : 'PENDING'}
                </span>
              </div>
              
              <div className="text-center py-4">
                <p className="text-xs text-tertiary font-sans mb-6 italic">
                  Complete your daily audit to unlock personalized movement intelligence.
                </p>
                <button 
                  onClick={openCheckIn}
                  className="w-full bg-surface-container-highest text-white font-black py-4 text-[10px] tracking-[0.3em] rounded-sm hover:bg-primary hover:text-on-primary transition-all uppercase cursor-pointer border border-white/10"
                >
                  RE-RUN AUDIT
                </button>
              </div>
            </div>
          </div>

          {/* History Graph */}
          <div className="bg-surface-container-low rounded-lg p-8 border border-white/5">
            <h3 className="font-sans text-xs tracking-[0.2em] text-tertiary uppercase mb-6 flex justify-between items-center">
              Weight History
              <TrendingDown className="w-4 h-4 text-primary" />
            </h3>
            <div className="h-32 flex items-end gap-2">
              {profile.weightHistory.map((entry, idx) => (
                <HistoryBar 
                  key={idx} 
                  height={`${(entry.weight / 100) * 100}%`} 
                  label={`${entry.weight} KG`}
                  isToday={entry.day === 'Today'}
                />
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[9px] font-sans text-tertiary uppercase tracking-tighter">
              {profile.weightHistory.map((entry, idx) => (
                <span key={idx} className={cn(entry.day === 'Today' && "text-primary font-bold")}>{entry.day}</span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2">
              <CheckCircle className="text-primary w-4 h-4" />
              <p className="text-[10px] text-tertiary uppercase tracking-widest">-0.4kg since last week</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function MetricBlock({ label, value, unit, color = "text-white", onEdit }: { label: string; value: string; unit?: string; color?: string; onEdit?: () => void }) {
  return (
    <div 
      className={cn(
        "group relative p-3 -m-3 rounded-md transition-colors",
        onEdit && "hover:bg-white/5 cursor-pointer"
      )}
      onClick={onEdit}
    >
      <div className="flex justify-between items-center mb-1">
        <p className="font-sans text-[10px] tracking-widest text-tertiary uppercase">{label}</p>
        {onEdit && (
          <div className="opacity-40 group-hover:opacity-100 transition-opacity text-primary p-1">
            <Edit3 className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
      <p className={cn("font-display text-3xl font-bold transition-transform group-hover:translate-x-1 duration-300", color)}>
        {value}{unit && <span className="text-sm text-tertiary ml-1">{unit}</span>}
      </p>
    </div>
  );
}

function ProgressBar({ label, current, target, percent }: { label: string; current: string; target: string; percent: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-sans tracking-widest uppercase">
        <span>{label}</span>
        <span className="text-primary">{current} / {target}</span>
      </div>
      <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-primary neon-glow"
        />
      </div>
    </div>
  );
}

function DeviceIcon({ icon: Icon, title, active }: { icon: any; title: string, active?: boolean }) {
  return (
    <div className={cn("w-10 h-10 rounded-sm bg-surface-container-highest flex items-center justify-center transition-colors", active ? 'text-primary' : 'text-primary/40')} title={title}>
      <Icon className="w-5 h-5" />
    </div>
  );
}

function HistoryBar({ height, label, isToday }: { height: string; label: string; isToday?: boolean }) {
  return (
    <div 
      className={cn(
        "flex-1 transition-all cursor-pointer relative group",
        isToday ? "bg-primary neon-glow" : "bg-primary/20 hover:bg-primary"
      )} 
      style={{ height }}
    >
       <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-on-surface text-background text-[8px] font-bold px-1 rounded-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
         {label}
       </div>
    </div>
  );
}
