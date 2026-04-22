'use client';

import React from 'react';
import Image from 'next/image';
import { Verified, History, Stars, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WallOfImpact() {
  const [activeSlide, setActiveSlide] = React.useState(0);
  
  const transformations = [
    {
      before: "https://lh3.googleusercontent.com/aida-public/AB6AXuCz_2BFvHxwldWwm9H4h6Ykxap4qRYvZvhmwIMsrXg6UHdwJcZCOpCZgiy02jjYZTPKIwBYwayIthEWG1ZZjpWeahAV0v6l7LFre3FWPM7GFyP40A3vaYEfuiJuDAxJsCGPLBPiDtgyVmvK0t6iMnzmiWeG78XRhbTX4GmTyfCiokQG0_hK3TdkSknBPZo1psqDgw3DrkNAJPruHe3gWwsOOelHeqC0mQ98XkrIfjDkPfUUkdu0p-m56FHnlB2RFm9kwqliUluR5y4",
      after: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfEGGMm0zk_4yO8mkNprNY2EhC2OEIh1m4fkE9Usqj1N_cdn-N_q8SuvZgVGZNmDP0yAlU10EsJnm0Am3LYOuzKpodHFryM1m3qtpQebcQ4uWgICWrMQNfU_OmTMcBAeUmwLkQl-X4kNTYePF2vNbwMvcDCoaYiw22w_YS-Bc_lMMEapYJ0D5yrCS2R5-F34icxPawhzsUsNr4LvLkcvhG0gXvJQQAV9rSNPr6MxAQ840sBaHv7_aLY0s6nYaJdCoFeWKi7H2LKw8",
      label: "Fat Loss & Athleticism",
      duration: "12 Weeks"
    }
  ];

  const reviews = [
    {
      text: "The posture correction alone changed my life. I no longer finish my workdays with a dull ache in my neck.",
      author: "James K., CEO",
      color: "border-primary",
      iconColor: "text-primary"
    },
    {
      text: "A surgical approach to fitness. Every movement has a purpose. No wasted energy.",
      author: "Sarah L., Surgeon",
      color: "border-secondary",
      iconColor: "text-secondary"
    },
    {
      text: "Lost 12kg while feeling more energetic than I did in my 20s. The nutrition plan is legendary.",
      author: "Michael R., Architect",
      color: "border-tertiary",
      iconColor: "text-tertiary"
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-8 mb-20 text-center">
        <span className="text-primary text-[10px] uppercase font-black tracking-widest mb-4 block">Proven Protocols</span>
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">Wall of Impact</h2>
      </div>

      <div className="overflow-hidden mb-16 relative">
        <div className="animate-scroll-left flex gap-6 md:gap-8 whitespace-nowrap">
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <div key={i} className={`min-w-[300px] md:min-w-[400px] bg-surface-container p-8 md:p-10 rounded-sm border-l-4 ${review.color} shadow-xl whitespace-normal`}>
              <p className="italic mb-6 text-base md:text-lg text-on-surface line-clamp-4 md:line-clamp-none">&quot;{review.text}&quot;</p>
              <div className="flex items-center gap-3">
                <Verified className={`w-5 h-5 ${review.iconColor}`} />
                <div className="font-bold uppercase text-[10px] md:text-xs tracking-widest text-tertiary">— {review.author}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden justify-center items-center gap-4 mt-8 opacity-50">
          <div className="w-8 h-[2px] bg-primary"></div>
          <span className="text-[10px] uppercase font-bold tracking-widest px-2">Scroll for Impact</span>
          <div className="w-8 h-[2px] bg-primary"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-16 md:mt-24">
        <div className="relative group overflow-hidden rounded-sm border border-white/5">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeSlide}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-1 bg-white/5"
            >
              <div className="relative overflow-hidden group">
                <Image
                  src={transformations[activeSlide].before}
                  alt="Before"
                  width={500}
                  height={600}
                  className="w-full aspect-[4/5] md:aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-background/90 backdrop-blur px-2 md:px-4 py-1 md:py-2 text-[8px] md:text-[10px] uppercase font-black tracking-widest flex items-center gap-2">
                  <History className="w-2 md:w-3 md:h-3" />
                  Initial
                </div>
              </div>
              <div className="relative overflow-hidden group">
                <Image
                  src={transformations[activeSlide].after}
                  alt="After"
                  width={500}
                  height={600}
                  className="w-full aspect-[4/5] md:aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-primary text-on-primary px-2 md:px-4 py-1 md:py-2 text-[8px] md:text-[10px] uppercase font-black tracking-widest flex items-center gap-2 shadow-lg">
                  <Stars className="w-2 md:w-3 md:h-3 fill-current" />
                  Week 12
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center">
            <div className="text-white">
              <div className="text-[8px] uppercase tracking-widest font-black opacity-60">{transformations[activeSlide].duration} Transformation</div>
              <div className="text-[10px] font-bold uppercase tracking-wide">{transformations[activeSlide].label}</div>
            </div>
            <div className="flex gap-2">
              <button disabled className="p-2 bg-white/10 rounded-full opacity-30"><ChevronLeft className="w-4 h-4" /></button>
              <button disabled className="p-2 bg-white/10 rounded-full opacity-30"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
