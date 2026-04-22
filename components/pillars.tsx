'use client';

import React from 'react';
import Image from 'next/image';
import { Dumbbell, Utensils, Accessibility } from 'lucide-react';

export default function Pillars() {
  const pillars = [
    {
      title: 'Personal Training',
      description: 'Biometric-driven strength programming designed for your unique skeletal structure.',
      icon: Dumbbell,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDheDeC1b5leLlJGchyyGgWWJA2iY1j-yW_w1wA1l80x6j5_ZwrJaKAkiYJQ0VauuizstMz6e95QnB-Pn_viV5lL3qxGNloBJy1_oJ6w0_8bfCjf0S3nokz7OKYQFu3f25n0iApqLoLSxvv7Tga4uv5PmMD9KwGd3tDeWsR75Bi_yuwai4cVRfzRD8kIJod8VBm6aryWDzAcP9bGtlVvE2GYfWcVUJLYvQrR2nPLz9RTXugul4cNbWyrO6xf55Hw5BREgrbV3iJnL8',
      color: 'text-primary',
    },
    {
      title: 'Nutrition',
      description: 'Metabolic fuel strategies that prioritize hormonal health and cognitive clarity.',
      icon: Utensils,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmeuz1OKKgWY0nQ30fjlWcxqU17fpN8O__fAVE8B23ANl7UEugG_wA0HDr7EtVl3j2hx1XLKduyzApFO_sjfp5I5lBRP28pwkAjcNGZMxsWMbmzXrU2o-GiW-0DCLRbmYogHLGnZXZLYEB1n2GZY35dqwL_ksd073RQ4vyPhUdouHySTAi3MN_uiBi_93aP-BqPTAPqxQgWFip3d4TIV5V7Uh1ZCdcKFYjN5_nKdx_ap3dCSjOHKGShorczfSG7RqSq7bwf1vn8Qk',
      color: 'text-secondary',
    },
    {
      title: 'Posture Correction',
      description: 'Structural realignment to eliminate pain and project an aura of effortless command.',
      icon: Accessibility,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVxan9AG6ZRU1irzGq7NwGPeA0uV-1JL6OA2wAw1KNX7G-NT9YCWHy2_Csl_UBgPkp84iskU1hk5TRsAC_anOlljY8u2X1GyeY7Tr6XfneTPvIQDXobo4VMbmpfAVpOH-vHFs4Mgur3ePvlpfO_xH_wY0BaSwisdb5s3MYMzCeyCqaRS5tQtE8ONfwfQJ21wC34-WDUiu9oKXNup01bnhxlj6VER7nig0-gHVq2ZVtV-XO1qF7HHSssAeX63jCDp-MHUSLD-Jz9h8',
      color: 'text-tertiary',
    },
  ];

  return (
    <section className="py-24 px-6 bg-surface-container-lowest overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-outline-variant/20">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-outline-variant/10 group hover:bg-surface transition-colors cursor-default"
            >
              <div className="mb-12 relative overflow-hidden">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  width={400}
                  height={500}
                  className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4">
                  <pillar.icon className={`w-10 h-10 ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <pillar.icon className={`w-5 h-5 md:w-6 md:h-6 ${pillar.color}`} />
                <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight">{pillar.title}</h3>
              </div>
              <p className="text-tertiary leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
