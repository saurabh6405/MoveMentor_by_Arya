'use client';

import React from 'react';
import Image from 'next/image';
import { Send, MessageCircle } from 'lucide-react';

export default function LeadCapture() {
  return (
    <section className="py-24 px-8 bg-background relative overflow-hidden" id="contact">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvc8_afQBVaPwqp-Lh9y2aI01Vg4r_H7L-e-SUVPiAbZdCXBseabErrexbMclDVW0lt8vhyvaDP5W-ve5-SxwzVrAc5wVqpdGnQnr6fcyavs5yUoTn8G_D87OrnU2eHOihivQXKxnO2AsDl55Lb22LSCpZDhIyXK7jt6uZeM7j1gyUiIRAVERne0OpG32V0DFek431xNV9hzSUXkNkhXfqy7WZout1tjYGMPruCaETza_8oCTH7-5dZkRK-Oy3S1RK2W9Dy2Njq5E"
          alt="Texture"
          fill
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-4xl mx-auto relative z-10 bg-secondary-container/20 backdrop-blur-3xl p-6 xs:p-8 md:p-20 border border-white/5 shadow-2xl rounded-sm">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter mb-4 text-secondary">
            Request a Callback
          </h2>
          <p className="text-tertiary text-sm md:text-base">An elite specialist will contact you to discuss your objectives.</p>
        </div>
        <form className="space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-tertiary px-1">
                Legal Name
              </label>
              <input
                className="w-full bg-surface-container-highest border-none focus:ring-1 focus:ring-secondary py-3 px-5 md:py-4 md:px-6 text-white placeholder:opacity-30 rounded-sm text-sm"
                placeholder="John Doe"
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-tertiary px-1">
                Secure Phone
              </label>
              <input
                className="w-full bg-surface-container-highest border-none focus:ring-1 focus:ring-secondary py-3 px-5 md:py-4 md:px-6 text-white placeholder:opacity-30 rounded-sm text-sm"
                placeholder="+91-88******89"
                type="tel"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-tertiary px-1">
              Your Objective
            </label>
            <textarea
              className="w-full bg-surface-container-highest border-none focus:ring-1 focus:ring-secondary py-3 px-5 md:py-4 md:px-6 text-white placeholder:opacity-30 rounded-sm resize-none text-sm"
              placeholder="Tell us about your movement goals..."
              rows={4}
            />
          </div>
          <button
            className="w-full py-4 md:py-6 bg-secondary text-on-secondary font-black uppercase tracking-[0.3em] text-[10px] md:text-sm hover:scale-[0.98] transition-transform flex items-center justify-center gap-3 md:gap-4 rounded-sm shadow-xl"
            type="submit"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
            Submit Protocol Request
          </button>
          <div className="flex justify-center pt-8">
            <a
              href="https://wa.me/918826838889"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366] hover:bg-[#128C7E] px-8 py-4 rounded-sm transition-all cursor-pointer group shadow-xl shadow-[#25D366]/20 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 text-white fill-current" />
              <div className="text-left text-white">
                <div className="text-[9px] uppercase font-black tracking-widest opacity-80 leading-none mb-1">Consult via WhatsApp</div>
                <div className="text-xs font-bold uppercase tracking-wide">+91-88******89</div>
              </div>
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
