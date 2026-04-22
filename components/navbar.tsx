'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAuthModal } from '@/lib/auth-context';
import { LogIn, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { authModalOpen, authMode, openAuth, closeAuth } = useAuthModal();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b',
        scrolled || mobileMenuOpen
          ? 'bg-[#121314]/95 backdrop-blur-xl border-white/5'
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-xl md:text-2xl font-black text-primary uppercase tracking-tighter font-display">
            MoveMentor
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center text-sm">
          <NavLink href="#programs">Programs</NavLink>
          <NavLink href="#about">About Coach</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#philosophy">Philosophy</NavLink>
        </div>

        <div className="flex items-center gap-3 xs:gap-4 md:gap-6">
          <a
            href="https://wa.me/918826838889"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#25D366] hover:scale-105 transition-transform group shrink-0"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.602 6.04L0 24l6.105-1.602a11.832 11.832 0 005.937 1.598h.005c6.637 0 12.032-5.395 12.035-12.03a11.837 11.837 0 00-3.417-8.435z" />
            </svg>
            <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">WHATSAPP</span>
          </a>
          
          <div className="flex items-center gap-2 xs:gap-3">
            <button
              onClick={() => openAuth('signin')}
              className="px-3 md:px-5 lg:px-6 py-2 bg-primary text-on-primary font-black text-[9px] xs:text-xs md:text-sm uppercase tracking-widest rounded-sm hover:scale-95 transition-transform flex items-center gap-1.5 md:gap-2 shrink-0 cursor-pointer shadow-lg active:scale-95"
            >
              <LogIn className="w-3 md:w-4 h-3 md:h-4" />
              <span>Sign In</span>
            </button>
            
            <button
              onClick={() => openAuth('signup')}
              className="hidden sm:flex px-4 md:px-6 py-2 border border-white/10 text-white font-bold text-[9px] xs:text-xs md:text-sm uppercase tracking-widest rounded-sm hover:bg-white/5 transition-all shrink-0 cursor-pointer"
            >
              Sign Up
            </button>
            
            <button 
              className="md:hidden p-1.5 xs:p-2 text-tertiary hover:text-primary transition-colors hover:bg-white/5 rounded-sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 xs:w-6 xs:h-6" /> : <Menu className="w-5 h-5 xs:w-6 xs:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden fixed inset-x-0 top-[65px] bg-[#121314] border-b border-white/5 transition-all duration-300 overflow-hidden z-40",
        mobileMenuOpen ? "max-h-[300px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"
      )}>
        <div className="flex flex-col gap-6 px-8 items-start">
          <NavLink href="#programs" onClick={() => setMobileMenuOpen(false)}>Programs</NavLink>
          <NavLink href="#about" onClick={() => setMobileMenuOpen(false)}>About Coach</NavLink>
          <NavLink href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</NavLink>
          <NavLink href="#philosophy" onClick={() => setMobileMenuOpen(false)}>Philosophy</NavLink>
          <button 
            onClick={() => openAuth('signin')}
            className="text-tertiary font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>


    </nav>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'font-sans tracking-tight font-bold text-tertiary hover:text-primary transition-colors duration-300 whitespace-nowrap'
      )}
    >
      {children}
    </Link>
  );
}
