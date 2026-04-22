'use client';

import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import Image from 'next/image';

import { useUI } from '@/lib/ui-context';

interface TopbarProps {
  title?: string;
  subtitle?: string;
}

import { useUserData } from '@/hooks/use-user-data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Topbar({ title = "Overview", subtitle = "" }: TopbarProps) {
  const { toggleSidebar } = useUI();
  const { profile, user } = useUserData();

  return (
    <header className="fixed top-0 left-0 md:left-72 right-0 z-40 bg-surface/70 backdrop-blur-xl h-20 flex justify-between items-center px-4 md:px-8 border-b border-white/5 transition-all">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 text-tertiary hover:text-primary transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col">
          <h1 className="font-display tracking-[0.2em] font-black uppercase text-white text-xs md:text-sm">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[8px] md:text-[9px] text-tertiary tracking-[0.35em] opacity-40 uppercase font-sans font-bold mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center bg-surface-container-lowest px-4 py-2 rounded-sm border border-white/5">
          <Search className="text-tertiary w-3 h-3 mr-3" />
          <input 
            className="bg-transparent border-none focus:ring-0 text-[0.7rem] uppercase tracking-widest text-on-surface w-48 placeholder:text-tertiary/30" 
            placeholder="QUERY SYSTEM..." 
            type="text"
          />
        </div>

        <Link 
          href="/messages"
          className="relative text-tertiary hover:text-primary transition-colors duration-300 group cursor-pointer"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full group-hover:animate-ping"></span>
        </Link>

        <Link 
          href="/settings"
          className="w-10 h-10 rounded-full overflow-hidden border border-white/10 relative hover:ring-2 hover:ring-primary transition-all cursor-pointer bg-surface-container block"
        >
          <Image
            src={user?.user_metadata?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuDDHkCT0-NXM80nT8D66Is8uqxxHRZ7Dix8RG_zYxobyqrCEZYWw0jJ_8KSVnzrtEDoWH4hKLqmqbPw47wlw3EJoxnvEzAgqRE9LGcG4Ec6qaY7LuLIvOioYGFGNbfIhOHnmsXYfTPIls258ZeJtEUwZPZXWiFpIVEfP-eXki1N3oJlCCWKRUXEhtMJfP2UdGQOgye6EOowfFxwE3OtUwpVvAgzJSDLuJEdtnzidFtOY-p4RQU_6fHz8pODZp8sVGr2ohIL4xi2yb0"}
            alt="User"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </Link>
      </div>
    </header>
  );
}
