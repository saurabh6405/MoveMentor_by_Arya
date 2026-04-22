'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { Suspense } from 'react';

function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = React.useState(searchParams.get('mode') !== 'signup');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    fullName: '',
  });

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
        router.push('/dashboard');
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

  return (
    <main className="flex min-h-screen flex-col lg:flex-row bg-background">
      {/* Visual Section */}
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black">
        <div className="absolute inset-0 grayscale opacity-60">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqTYSnrM_9rLrlysDDv-6cV3Jq0qQRDLXH16vAEFXwnIBqW-UDoKf5dY8ttnXHV-Px6t7JcLeRWqDY9DrmpmOS1bQJyp6K8y8mUsM5yCniNvoe-pB30jSxRCf9qVNmugSp0TIeWog8XaXl1cpEb52-8TbbVDEvCeQMWkB8il30Nql9RgZFa4xbBrnIJ4-JnK-Uss-XoQU4PHT10wsWwuEjRpExu_zsT5dPNuy6coQlSiyPr8D2zXP0um1e5Zt3Ocg7mMAqjcZRf_U"
            alt="Athlete Motivation"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
        <div className="relative z-10 p-12 flex flex-col justify-between h-full w-full">
          <Link href="/" className="text-primary text-xl font-black uppercase tracking-widest font-display">
            MoveMentor
          </Link>
          <div className="max-w-md">
            <h3 className="text-4xl font-display font-black uppercase tracking-tight text-white mb-4">
              &quot;Every Rep. Every Meal. Every Win.&quot;
            </h3>
            <p className="text-tertiary">Join the MoveMentor movement and transform your future.</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full lg:w-1/2 bg-surface-container-lowest flex items-center justify-center p-6 md:p-12 lg:p-20">
        <div className="w-full max-w-sm flex flex-col">
          <header className="mb-10">
            <h2 className="text-3xl font-black text-on-surface tracking-tight mb-2 font-display uppercase">
              {isLogin ? 'Access MoveMentor' : 'Join MoveMentor'}
            </h2>
            <p className="text-tertiary text-xs font-sans uppercase tracking-[0.2em]">
              {isLogin ? 'Enter your credentials' : 'Begin your movement journey'}
            </p>
          </header>

          <div className="mb-8">
            <button
              onClick={signInWithGoogle}
              className="flex items-center justify-center gap-3 w-full h-12 bg-surface-container-high border-white/5 border text-on-surface hover:bg-surface-container-highest transition-all duration-300 rounded-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-[0.7rem] font-bold uppercase tracking-widest">Continue with Google</span>
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-white/5"></div>
            <span className="text-tertiary text-[0.6rem] font-sans uppercase tracking-widest">Or email</span>
            <div className="h-[1px] flex-1 bg-white/5"></div>
          </div>

          <form className="space-y-6" onSubmit={handleAuth}>
            {error && (
              <div className="p-4 bg-error/10 border-l-2 border-error text-error text-xs uppercase tracking-widest font-bold">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="relative">
                <input
                  className="w-full bottom-line-input text-on-surface placeholder:text-outline/50 font-sans py-3 focus:outline-none bg-transparent border-b border-white/10"
                  placeholder="Full Name"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            )}

            <div className="relative">
              <input
                className="w-full bottom-line-input text-on-surface placeholder:text-outline/50 font-sans py-3 focus:outline-none bg-transparent border-b border-white/10"
                placeholder="Email Address"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <input
                className="w-full bottom-line-input text-on-surface placeholder:text-outline/50 font-sans py-3 focus:outline-none bg-transparent border-b border-white/10"
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-0 bottom-3 text-tertiary hover:text-primary transition-colors cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <Link href="#" className="text-[0.6rem] font-sans uppercase tracking-widest text-tertiary hover:text-primary transition-colors">
                  Forgot password?
                </Link>
              </div>
            )}

            <div className="pt-4 space-y-6">
              <button
                disabled={isLoading}
                className="w-full h-12 bg-primary text-on-primary font-black uppercase tracking-[0.2em] text-xs transition-transform active:scale-[0.98] shadow-lg rounded-sm flex items-center justify-center"
                type="submit"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  isLogin ? 'Initialize Session' : 'Create Account'
                )}
              </button>

              <div className="flex flex-col items-center gap-2">
                <p className="text-tertiary text-[0.65rem] font-sans uppercase tracking-widest">
                  {isLogin ? 'New to MoveMentor?' : 'Already a member?'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-on-surface font-black text-xs uppercase tracking-[0.1em] hover:text-primary transition-colors underline underline-offset-4"
                >
                  {isLogin ? 'Create Account' : 'Sign In'}
                </button>
              </div>
            </div>
          </form>

          <footer className="mt-16 flex justify-between items-center text-tertiary text-[0.55rem] font-sans uppercase tracking-[0.2em] opacity-40">
            <span>v4.2.0-Alpha</span>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-on-surface">Privacy</Link>
              <Link href="#" className="hover:text-on-surface">Terms</Link>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    }>
      <AuthPageContent />
    </Suspense>
  );
}
