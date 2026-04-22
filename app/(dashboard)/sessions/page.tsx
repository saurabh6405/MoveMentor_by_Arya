'use client';

import React from 'react';
import Topbar from '@/components/topbar';
import { Calendar, Clock, MapPin, ChevronRight, Video, Users, User, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SessionsPage() {
  const sessions = [
    {
      id: 1,
      title: "1-on-1 Bi-Weekly Strategy",
      time: "10:30 AM",
      date: "Today, 15 Mon",
      type: "Virtual / Zoom",
      coach: "Coach Arya",
      status: "Upcoming",
      icon: Video
    },
    {
      id: 2,
      title: "Group Movement Audit",
      time: "06:00 PM",
      date: "Tomorrow, 16 Tue",
      type: "Community Hub",
      coach: "MoveMentor Team",
      status: "Scheduled",
      icon: Users
    },
    {
      id: 3,
      title: "Posture Alignment Check",
      time: "09:00 AM",
      date: "Friday, 19 Fri",
      type: "1-on-1 Private",
      coach: "Coach Arya",
      status: "Confirmed",
      icon: User
    }
  ];

  return (
    <>
      <Topbar title="Sessions & Strategy" subtitle="Elite Performance Alignment" />
      
      <main className="pt-24 pb-12 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Calendar View Placeholder */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-primary font-sans text-xs font-black uppercase tracking-[0.3em] mb-2">Schedule</p>
                <h2 className="text-4xl font-black text-white uppercase font-display tracking-tighter">Your Pipeline</h2>
              </div>
              <button className="bg-white/5 border border-white/10 text-white px-6 py-2 text-[10px] uppercase font-black tracking-widest rounded-sm hover:bg-white/10 transition-all">
                Request Slot
              </button>
            </div>

            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="bg-surface-container-low p-6 rounded-sm border border-white/5 hover:border-primary/20 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-sm bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <session.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white uppercase font-display tracking-tight">{session.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-1 text-[10px] text-tertiary uppercase tracking-widest font-bold">
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-primary" /> {session.time}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-primary" /> {session.date}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-primary" /> {session.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 justify-between md:justify-end border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-8">
                    <div className="text-right">
                      <p className="text-[9px] text-tertiary uppercase tracking-[0.2em] mb-1">Assigned Coach</p>
                      <p className="text-sm font-bold text-white">{session.coach}</p>
                    </div>
                    <button className="bg-primary/10 text-primary p-3 rounded-full hover:bg-primary hover:text-on-primary transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-12 border-2 border-dashed border-white/5 rounded-sm flex flex-col items-center justify-center gap-3 group hover:border-primary/30 transition-all opacity-40 hover:opacity-100">
              <Calendar className="w-10 h-10 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
              <p className="text-[10px] uppercase font-black tracking-[0.3em] font-display">Sync External Calendar</p>
            </button>
          </div>

          {/* Quick Actions / Tips */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-primary p-8 rounded-sm text-on-primary">
              <h3 className="font-display text-2xl font-black uppercase tracking-tighter mb-4">Preparation Checklist</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-xs uppercase tracking-widest font-bold">
                  <div className="w-4 h-4 rounded-sm border-2 border-on-primary shrink-0 mt-0.5"></div>
                  Review last 3 workouts
                </li>
                <li className="flex items-start gap-3 text-xs uppercase tracking-widest font-bold">
                  <div className="w-4 h-4 rounded-sm border-2 border-on-primary shrink-0 mt-0.5"></div>
                  Log sleep quality data
                </li>
                <li className="flex items-start gap-3 text-xs uppercase tracking-widest font-bold">
                  <div className="w-4 h-4 rounded-sm border-2 border-on-primary shrink-0 mt-0.5"></div>
                  Pre-session hydration (1.5L)
                </li>
              </ul>
              <button className="w-full mt-8 py-3 bg-on-primary text-primary font-black text-[10px] uppercase tracking-widest rounded-sm hover:scale-95 transition-transform">
                Open Prep Notes
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
