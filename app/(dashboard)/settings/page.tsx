'use client';

import React from 'react';
import Topbar from '@/components/topbar';
import { 
  User, 
  Shield, 
  CreditCard, 
  Watch, 
  Trash2,
  X,
  Check,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { useUserData } from '@/hooks/use-user-data';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('PROFILE');
  const { profile, updateProfile, user } = useUserData();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      router.push('/');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('displayName') as string;
    
    await updateProfile({ name });
    alert('Parameters updated successfully.');
  };

  return (
    <>
      <Topbar title="System Configuration" subtitle="MoveMentor Access Controls" />
      
      <main className="pt-24 pb-20 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 min-h-screen">
        {/* Settings Navigation */}
        <nav className="w-full md:w-64 flex flex-col gap-2 mt-8">
           <SettingsNavItem 
              active={activeTab === 'PROFILE'} 
              icon={User} 
              label="PROFILE" 
              onClick={() => setActiveTab('PROFILE')} 
           />
           <SettingsNavItem 
              active={activeTab === 'SUBSCRIPTION'} 
              icon={CreditCard} 
              label="SUBSCRIPTION" 
              onClick={() => setActiveTab('SUBSCRIPTION')} 
           />
           <SettingsNavItem 
              active={activeTab === 'HARDWARE'} 
              icon={Watch} 
              label="INTEGRATED HARDWARE" 
              onClick={() => setActiveTab('HARDWARE')} 
           />
           <SettingsNavItem 
              active={activeTab === 'PRIVACY'} 
              icon={Shield} 
              label="PRIVACY & PROTOCOL" 
              onClick={() => setActiveTab('PRIVACY')} 
           />
           
           <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-6 py-4 bg-white/5 text-tertiary rounded-sm border border-white/10 hover:bg-white/10 hover:text-white transition-all group cursor-pointer"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">DECRYPT SESSION</span>
              </button>

              <button className="w-full flex items-center justify-between px-6 py-4 bg-error/5 text-error rounded-sm border border-error/20 hover:bg-error hover:text-white transition-all group cursor-pointer">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">DECOMMISSION ACCOUNT</span>
                <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
           </div>
        </nav>

        {/* Content Area */}
        <section className="flex-1 bg-surface-container-low border border-white/5 rounded-sm p-10 md:p-16 mb-20">
          <header className="mb-12">
            <h2 className="text-3xl font-black font-display uppercase tracking-tight text-white mb-2">{activeTab}</h2>
            <p className="text-[10px] text-tertiary uppercase tracking-[0.2em] font-sans">Modify your MoveMentor parameters.</p>
          </header>

          <form className="max-w-xl space-y-12" onSubmit={handleUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-tertiary px-1">Display Name</label>
                <input 
                  name="displayName"
                  className="w-full bg-surface-container-highest border-none focus:ring-1 focus:ring-primary py-4 px-6 text-on-surface font-sans text-sm rounded-sm" 
                  defaultValue={profile.name} 
                  type="text" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-tertiary px-1">Secure Email</label>
                <input 
                  className="w-full bg-surface-container-highest border-none focus:ring-1 focus:ring-primary py-4 px-6 text-on-surface font-sans text-sm rounded-sm opacity-50 cursor-not-allowed" 
                  defaultValue={user?.email || 'arya@movementor.performance'} 
                  disabled 
                  type="email" 
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-tertiary px-1">Physical Bio</label>
              <textarea className="w-full bg-surface-container-highest border-none focus:ring-1 focus:ring-primary py-4 px-6 text-on-surface font-sans text-sm rounded-sm resize-none" rows={4} defaultValue="Current focus: Hypertrophy and structural realignment for endurance longevity." />
            </div>

            <div className="space-y-6 pt-6 border-t border-white/5">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary font-display flex items-center gap-2">
                 <Shield className="w-4 h-4" /> NOTIFICATION PROTOCOL
              </h3>
              <div className="space-y-4">
                 <Toggle label="Critical Mission Alerts" active />
                 <Toggle label="Weekly Performance Intelligence" active />
                 <Toggle label="MoveMentor Newsletter" />
              </div>
            </div>

            <div className="pt-8 flex gap-4">
              <button className="flex-1 bg-primary text-on-primary font-display font-bold py-5 text-xs tracking-widest rounded-sm scale-95 active:scale-90 transition-all hover:scale-100 uppercase neon-glow flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Update Parameters
              </button>
              <button className="px-10 py-5 border border-white/20 text-tertiary font-display font-bold text-xs tracking-widest rounded-sm hover:bg-white/5 hover:text-white transition-all uppercase">
                Reset
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

function SettingsNavItem({ active, icon: Icon, label, onClick }: { active?: boolean; icon: any; label: string; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "group flex items-center justify-between px-6 py-5 rounded-sm transition-all duration-300",
        active ? "bg-primary text-on-primary shadow-xl" : "bg-white/5 text-tertiary hover:bg-white/10 hover:text-white"
      )}
    >
      <div className="flex items-center gap-4">
        <Icon className={cn("w-5 h-5", active ? "transition-none" : "opacity-40 group-hover:opacity-100")} />
        <span className="text-[0.65rem] font-black uppercase tracking-[0.2em]">{label}</span>
      </div>
      <ChevronRight className={cn("w-4 h-4 transition-transform", active ? "rotate-90" : "opacity-0 group-hover:opacity-40 translate-x-4 group-hover:translate-x-0")} />
    </button>
  );
}

function Toggle({ label, active }: { label: string; active?: boolean }) {
  const [isOn, setIsOn] = React.useState(active);
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-sans text-on-surface opacity-80">{label}</span>
      <button 
        onClick={() => setIsOn(!isOn)}
        className={cn(
          "w-12 h-6 rounded-full relative transition-colors duration-500 border border-white/5",
          isOn ? "bg-primary" : "bg-surface-container-highest"
        )}
      >
        <div className={cn(
          "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300",
          isOn ? "left-7" : "left-1"
        )}></div>
      </button>
    </div>
  );
}
