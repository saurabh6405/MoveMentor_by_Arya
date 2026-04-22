'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Zap, Eye } from 'lucide-react';
import { useAuthModal } from '@/lib/auth-context';

export default function Hero() {
  const { openAuth } = useAuthModal();

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-x-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUuyEG6sCs3Dtlg2tiydJJ0ek8XirJjbCxjx4AwIjBV3SzfxfONGj4-kPZK9RWSYaIFWAcoZ4X3d9CiKqFEkxeiAXh9tGs8aH4eJ1QdDQOQNiedqizbY00IzFBGcnANCVJ1HTvB0saAtouNlOcSywA3n0yNWBtbtlGLWPpbsqlVUE0zk5wV146snRYiMWZCi3lw9BhvmeMQKMHiULs8JV7xeKb3Cc_qXxtEITT3-_56rvUyt7AsGgv6CWm2UQW2rasw6-8DBUtgBk"
          alt="Coach"
          fill
          className="object-cover opacity-50"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
      </div>

      <div className="relative z-10 px-6 md:px-20 w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-primary font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] mb-6 block drop-shadow-lg">
            Elite Performance Coaching
          </span>
          <h1 className="text-5xl md:text-9xl font-display font-black uppercase leading-[0.85] tracking-tighter mb-8 drop-shadow-2xl">
            Master Your<br />
            <span className="text-outline-variant italic">Movement</span>
          </h1>
          <p className="text-lg md:text-xl text-tertiary max-w-xl mb-10 leading-relaxed font-medium">
            Unlock your physical potential with precision-engineered training and nutrition. 
            MoveMentor is where strength meets science.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-start">
            <button 
              onClick={() => openAuth('signup')}
              className="bg-primary text-on-primary px-6 md:px-10 py-4 md:py-5 font-black uppercase tracking-widest text-[10px] md:text-sm rounded-sm hover:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-primary/20"
            >
              <Zap className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              Start Your Protocol
            </button>
            <Link 
              href="#pricing"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 md:px-10 py-4 md:py-5 font-black uppercase tracking-widest text-[10px] md:text-sm rounded-sm hover:scale-95 transition-all flex items-center justify-center gap-3 border border-white/5"
            >
              <Eye className="w-4 h-4 md:w-5 md:h-5" />
              View Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
