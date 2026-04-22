'use client';

import React from 'react';
import Topbar from '@/components/topbar';
import { HelpCircle, MessageSquare, Book, FileText, Send, ArrowRight, Activity, Zap, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SupportPage() {
  return (
    <>
      <Topbar title="Support Intelligence" subtitle="24/7 Elite Assistance Feed" />
      
      <main className="pt-24 pb-12 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <section>
              <p className="text-secondary font-sans text-xs font-black uppercase tracking-[0.3em] mb-4">Direct Access</p>
              <h2 className="text-4xl font-black text-white uppercase font-display tracking-tighter mb-8">How can we optimize you today?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SupportCard 
                  icon={MessageSquare} 
                  title="Priority Messaging" 
                  description="Direct line to Coach Arya and the technical team. Average response: < 2 hours." 
                  action="Start Thread"
                />
                <SupportCard 
                  icon={HelpCircle} 
                  title="Technical Audit" 
                  description="Issues with app sync, device integration, or billing protocols." 
                  action="Request Fix"
                />
              </div>
            </section>

            <section className="pt-8 border-t border-white/5">
              <h3 className="text-xl font-black text-white uppercase font-display tracking-tight mb-6">Knowledge Protocol</h3>
              <div className="space-y-3">
                <KnowledgeItem title="Mastering the Metric Stack: Understanding Performance Velocity" />
                <KnowledgeItem title="Optimal Nutrition: Macro Partitioning for High Intensity" />
                <KnowledgeItem title="The Science of Recovery: Sleep Protocols for Elite Output" />
                <KnowledgeItem title="App Sync Guide: Connecting Garmin, Fitbit, and Apple Health" />
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-container-low border border-white/5 p-8 rounded-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-[10px] uppercase font-black tracking-widest text-primary">System Status: Optimal</span>
              </div>
              <h4 className="text-lg font-bold text-white uppercase font-display mb-4">Urgent Recovery Request?</h4>
              <p className="text-xs text-tertiary mb-6 leading-relaxed">
                If you are experiencing sudden injury or acute fatigue, please trigger an immediate audit for protocol adjustment.
              </p>
              <button className="w-full py-4 bg-primary text-on-primary font-black text-[10px] uppercase tracking-widest rounded-sm hover:scale-95 transition-transform flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 fill-current" /> Trigger Audit
              </button>
            </div>

            <div className="bg-surface-container/30 border border-white/5 p-8 rounded-sm">
              <h4 className="text-[10px] uppercase font-black tracking-[0.3em] text-tertiary mb-6">Mission Support Hours</h4>
              <div className="space-y-4">
                <div className="flex justify-between text-xs">
                  <span className="text-tertiary">Mon - Fri</span>
                  <span className="text-white font-bold font-display">06:00 - 22:00</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-tertiary">Sat - Sun</span>
                  <span className="text-white font-bold font-display">08:00 - 18:00</span>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-[9px] text-tertiary italic text-center opacity-40">All times are in IST (Indian Standard Time)</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function SupportCard({ icon: Icon, title, description, action }: { icon: any, title: string, description: string, action: string }) {
  return (
    <div className="bg-surface-container-low border border-white/5 p-6 rounded-sm group hover:border-primary/30 transition-all cursor-pointer">
      <div className="w-12 h-12 rounded-sm bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-6">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-white uppercase font-display mb-2">{title}</h3>
      <p className="text-xs text-tertiary mb-6 leading-relaxed opacity-70">{description}</p>
      <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
        {action} <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  );
}

function KnowledgeItem({ title }: { title: string }) {
  return (
    <div className="w-full flex items-center justify-between p-4 bg-surface-container/20 border border-white/5 rounded-sm hover:bg-surface-container-low hover:border-primary/20 transition-all cursor-pointer group">
      <div className="flex items-center gap-4">
        <Book className="w-4 h-4 text-tertiary opacity-40 group-hover:text-primary group-hover:opacity-100" />
        <span className="text-sm font-medium text-tertiary group-hover:text-white transition-colors">{title}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-tertiary group-hover:translate-x-1 transition-transform" />
    </div>
  );
}
