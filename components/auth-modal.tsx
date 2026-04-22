'use client';

import React from 'react';
import Image from 'next/image';
import { Eye, EyeOff, Loader2, X } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [isLogin, setIsLogin] = React.useState(initialMode === 'signin');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
  });

  // Lock scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Prevent layout shift
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();
    if (!supabase) {
      setError('Connection to security protocol failed. Please try again.');
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        window.location.href = '/dashboard';
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            },
          },
        });
        if (error) throw error;
        setError('Initialization successful. Please check your email for verification.');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[850px] max-h-[min(540px,90vh)] bg-surface-container-lowest shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/5 rounded-sm overflow-hidden flex flex-col md:flex-row z-[1010]"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-[1200] p-1.5 bg-black/40 hover:bg-black/80 backdrop-blur-xl rounded-full transition-all text-white/70 hover:text-white border border-white/10 group cursor-pointer"
          >
            <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>

          {/* Visual Section */}
          <section className="hidden md:flex md:w-1/2 relative overflow-hidden bg-black shrink-0">
            <div className="absolute inset-0 grayscale contrast-125 opacity-40">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqTYSnrM_9rLrlysDDv-6cV3Jq0qQRDLXH16vAEFXwnIBqW-UDoKf5dY8ttnXHV-Px6t7JcLeRWqDY9DrmpmOS1bQJyp6K8y8mUsM5yCniNvoe-pB30jSxRCf9qVNmugSp0TIeWog8XaXl1cpEb52-8TbbVDEvCeQMWkB8il30Nql9RgZFa4xbBrnIJ4-JnK-Uss-XoQU4PHT10wsWwuEjRpExu_zsT5dPNuy6coQlSiyPr8D2zXP0um1e5Zt3Ocg7mMAqjcZRf_U"
                alt="MoveMentor Motivation"
                fill
                className="object-cover"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            <div className="relative z-10 p-12 flex flex-col justify-end h-full">
              <div className="max-w-xs">
                <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-3 leading-[1.1]">
                  Every Rep.<br />Every Meal.<br />Every Win.
                </h3>
                <p className="text-tertiary text-xs font-sans tracking-wide opacity-60">Join the MoveMentor movement and transform your future.</p>
              </div>
            </div>
          </section>

          {/* Form Section */}
          <section className="flex-1 bg-surface-container-lowest p-8 md:p-10 overflow-y-auto no-scrollbar">
            <div className="w-full max-w-sm flex flex-col mx-auto h-full justify-center">
              <header className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-on-surface tracking-tight mb-1 font-display uppercase">
                  {isLogin ? 'Access Protocol' : 'Join Protocol'}
                </h2>
                <p className="text-tertiary text-[9px] font-sans uppercase tracking-[0.25em] font-bold opacity-50">
                  {isLogin ? 'Enter security credentials' : 'Begin your movement journey'}
                </p>
              </header>

              <div className="mb-5">
                <button
                  onClick={signInWithGoogle}
                  className="flex items-center justify-center gap-4 w-full h-11 bg-surface-container-high border-white/5 border text-on-surface hover:bg-surface-container-highest transition-all duration-300 rounded-sm cursor-pointer hover:border-primary/30 group"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-[9px] font-black uppercase tracking-[0.25em]">Continue with Google</span>
                </button>
              </div>

              <div className="flex items-center gap-4 mb-5 text-tertiary">
                <div className="h-[1px] flex-1 bg-white/5"></div>
                <span className="text-[8px] font-sans uppercase tracking-[0.4em] font-black opacity-30">Or Secure Email</span>
                <div className="h-[1px] flex-1 bg-white/5"></div>
              </div>

              <form className="space-y-4" onSubmit={handleAuth}>
                {error && (
                  <div className="p-3 bg-error/5 border-l border-error text-error text-[9px] uppercase tracking-widest font-black leading-relaxed">
                    {error}
                  </div>
                )}

                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[8px] uppercase font-black tracking-widest text-tertiary px-1 opacity-50">Full Name</label>
                      <input
                        className="w-full bg-surface-container-highest/30 border-none focus:ring-1 focus:ring-primary py-2.5 px-4 text-white placeholder:opacity-20 rounded-sm text-xs transition-all"
                        placeholder="Arya Chauhan"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] uppercase font-black tracking-widest text-tertiary px-1 opacity-50">Phone</label>
                      <input
                        className="w-full bg-surface-container-highest/30 border-none focus:ring-1 focus:ring-primary py-2.5 px-4 text-white placeholder:opacity-20 rounded-sm text-xs transition-all"
                        placeholder="Verified Number"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[8px] uppercase font-black tracking-widest text-tertiary px-1 opacity-50">Secure Email Address</label>
                  <input
                    className="w-full bg-surface-container-highest/30 border-none focus:ring-1 focus:ring-primary py-2.5 px-4 text-white placeholder:opacity-20 rounded-sm text-xs transition-all"
                    placeholder="name@protocol.com"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-1 relative">
                  <label className="text-[8px] uppercase font-black tracking-widest text-tertiary px-1 opacity-50">Security Access Code</label>
                  <div className="relative">
                    <input
                      className="w-full bg-surface-container-highest/30 border-none focus:ring-1 focus:ring-primary py-2.5 px-4 text-white placeholder:opacity-20 rounded-sm text-xs transition-all"
                      placeholder="••••••••"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary/40 hover:text-primary transition-colors cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 space-y-4">
                  <button
                    disabled={isLoading}
                    className="w-full h-12 bg-primary text-on-primary font-black uppercase tracking-[0.3em] text-[10px] transition-all active:scale-[0.95] hover:scale-[0.98] shadow-lg shadow-primary/10 rounded-sm flex items-center justify-center cursor-pointer"
                    type="submit"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      isLogin ? 'Establish Access' : 'Initialize Protocol'
                    )}
                  </button>

                  <div className="flex flex-col items-center gap-1.5">
                    <p className="text-tertiary text-[8px] font-sans uppercase tracking-[0.2em] font-bold opacity-40">
                      {isLogin ? 'New to MoveMentor?' : 'Existing Member?'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-on-surface font-black text-[10px] uppercase tracking-[0.25em] hover:text-primary transition-colors underline underline-offset-4 cursor-pointer"
                    >
                      {isLogin ? 'Create Account' : 'Secure Login'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
