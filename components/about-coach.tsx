'use client';

import React from 'react';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

export default function AboutCoach() {
  return (
    <section className="py-24 px-8 bg-background relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="relative group">
          <div className="relative overflow-hidden rounded-sm">
            <Image
              src="/founder.png"
              alt="Arya Chauhan"
              width={800}
              height={1000}
              className="w-full aspect-[4/5] object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-2xl scale-110 md:scale-100"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-primary text-on-primary p-6 md:p-8 shadow-2xl skew-x-[-12deg] z-10">
            <div className="text-4xl font-display font-black skew-x-[12deg]">12+</div>
            <div className="text-[10px] font-bold uppercase tracking-widest skew-x-[12deg]">Years of Expertise</div>
          </div>
        </div>
        <div>
          <span className="text-primary font-sans text-xs uppercase tracking-[0.3em] mb-6 block font-bold">The Founder</span>
          <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-8 leading-[1.1] text-white">
            Arya <span className="text-outline-variant italic">Chauhan</span>
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-zinc-300 font-medium max-w-xl">
            <p className="drop-shadow-sm">Movement is a language. Most of us have forgotten how to speak it. My mission is to help you rediscover the mechanical poetry of your own body.</p>
            <p className="drop-shadow-sm">With MoveMentor, we’ve combined top-level sports science with a personalized service to craft a unique physical transformation journey.</p>
          </div>
          <div className="mt-12 flex items-center justify-center md:justify-start">
            <a
              href="https://wa.me/918826838889"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366] hover:bg-[#128C7E] px-8 py-4 rounded-sm transition-all cursor-pointer group shadow-xl shadow-[#25D366]/20 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-6 h-6 text-white fill-current" />
              <div className="text-left text-white">
                <div className="text-[9px] uppercase font-black tracking-widest opacity-80 leading-none mb-1">Consult via WhatsApp</div>
                <div className="text-xs font-bold uppercase tracking-wide">+91-88******89</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
