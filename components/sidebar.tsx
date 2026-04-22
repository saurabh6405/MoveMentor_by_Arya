'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Utensils, 
  Calendar, 
  Mail, 
  MessageSquare, 
  Activity, 
  Settings, 
  HelpCircle,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Training', href: '/training', icon: Dumbbell },
  { name: 'Nutrition', href: '/nutrition', icon: Utensils },
  { name: 'Sessions', href: '/sessions', icon: Calendar },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Analytics', href: '/analytics', icon: Activity },
];

import { useUserData } from '@/hooks/use-user-data';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, tierLabel, user } = useUserData();

  const handleNav = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full w-72 bg-[#0d0e0f] flex flex-col py-8 px-6 gap-8 z-[50] transition-all duration-500 ease-in-out border-r border-white/5 md:translate-x-0",
      isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
    )}>
      <div className="flex flex-col gap-1 mb-4 relative">
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="md:hidden absolute -right-2 -top-2 p-2 text-tertiary hover:text-primary transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <button 
          onClick={() => handleNav('/dashboard')}
          className="font-display font-black text-primary tracking-widest text-lg uppercase outline-none text-left cursor-pointer"
        >
          &nbsp;MOVEMENTOR
        </button>
        
        <div className="flex items-center gap-3 mt-6 p-4 bg-surface-container/20 rounded-sm">
          <div className="w-10 h-10 rounded-sm overflow-hidden bg-surface-container relative">
            <Image
              src={user?.user_metadata?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuDx1p83MrarvAijJntLm87L75B5ZiweHVUXa_QYHOqHm9d84bpHG4nzuDxFG171KxYGUN4Yi1ZdskQBL0vYRG5yCqqH3504WS6Mnq801JxbM0zVBhMJudnf5Umtkd3huO1VvuSXODNO59DlcdPM0ri2CelmXRQjbVyhMnAdtmdaL7oAWD3AElZp7MXxXiBJJqJPC7lTkxEI8EGUho9lw7G6y7GYsygvr8xTOZdCCSfgZ6ulUtCMOdrIz_JvjLRPfZiPTjdF8Q1bD0k"}
              alt="Avatar"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="overflow-hidden">
            <h3 className="font-display text-xs font-bold uppercase tracking-tight text-white truncate">
              {user ? `Welcome Back, ${profile.name.split(' ')[0]}` : 'Protocol Inactive'}
            </h3>
            <p className="text-[9px] text-tertiary opacity-60 uppercase tracking-widest font-sans truncate font-bold">
              {tierLabel}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-2 flex-grow">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-4 py-3 font-sans font-medium text-sm tracking-wide uppercase transition-all duration-300 cursor-pointer text-left',
                isActive
                  ? 'text-primary border-r-2 border-primary bg-gradient-to-r from-primary/10 to-transparent translate-x-1'
                  : 'text-tertiary opacity-60 hover:bg-surface-container/40 hover:opacity-100 hover:text-white'
              )}
            >
              <link.icon className={cn('w-4 h-4', isActive && 'fill-current')} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2 border-t border-white/5 pt-6">
        <Link 
          href="/upgrade"
          onClick={onClose}
          className="bg-primary text-on-primary font-black py-4 text-[10px] tracking-[0.3em] uppercase rounded-sm mb-4 hover:scale-95 active:scale-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center cursor-pointer"
        >
          UPGRADE PLAN
        </Link>
        <Link
          href="/settings"
          onClick={onClose}
          className={cn(
            'flex items-center gap-3 px-4 py-2 text-tertiary opacity-60 font-sans text-[10px] font-bold uppercase tracking-[0.2em] hover:text-white hover:opacity-100 transition-colors cursor-pointer text-left w-full',
            pathname === '/settings' && 'text-primary opacity-100'
          )}
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        <Link
          href="/support"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2 text-tertiary opacity-60 font-sans text-[10px] font-bold uppercase tracking-[0.2em] hover:text-white hover:opacity-100 transition-colors cursor-pointer text-left w-full"
        >
          <HelpCircle className="w-4 h-4" />
          Support
        </Link>
      </div>
    </aside>
  );
}
