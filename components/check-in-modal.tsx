'use client';

import React, { useState, useEffect } from 'react';
import { X, Smile, Meh, Frown, Zap, Battery, Brain, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import { useUserData } from '@/hooks/use-user-data';

export default function CheckInModal({ isOpen, onClose }: CheckInModalProps) {
  const { updateProfile } = useUserData();
  const [step, setStep] = useState(1);
  const [energy, setEnergy] = useState(5);
  const [mood, setMood] = useState<string | null>(null);
  const [sleep, setSleep] = useState(7);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Process values for history and profile update
    const energyLabel: 'LOW' | 'MEDIUM' | 'HIGH' = energy > 7 ? 'HIGH' : energy > 4 ? 'MEDIUM' : 'LOW';
    const sleepLabel = `${Math.floor(sleep)}H ${Math.round((sleep % 1) * 60)}M`;
    const readinessScore = Math.min(100, Math.round((energy / 10 * 40) + (sleep / 9 * 40) + 20));

    // Simulate API delay but actually update the local store
    setTimeout(() => {
      updateProfile({
        energy: energyLabel,
        sleep: sleepLabel,
        readiness: readinessScore,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`checkin_${today}`, 'true');
      
      setTimeout(() => {
        onClose();
        // Reset for next time
        setStep(1);
        setIsSuccess(false);
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="bg-surface-container-low border border-white/10 w-full max-w-lg rounded-sm overflow-hidden relative z-10 shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-tertiary hover:text-white transition-colors p-2"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter font-display mb-2">Protocol Updated</h3>
            <p className="text-sm text-tertiary uppercase tracking-widest font-bold">Data synced with Coach Arya.</p>
          </div>
        ) : (
          <>
            <div className="bg-primary/10 px-8 py-6 border-b border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="text-primary w-4 h-4 fill-current" />
                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Daily Readiness Audit</span>
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter font-display italic">Phase Check-in</h2>
              <div className="flex gap-1 mt-4">
                {[1, 2, 3].map(s => (
                  <div key={s} className={cn("h-1 flex-1 rounded-full", step >= s ? "bg-primary" : "bg-white/10")}></div>
                ))}
              </div>
            </div>

            <div className="p-8">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <p className="text-sm font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                    <Battery className="text-primary w-5 h-5" /> How is your energy today?
                  </p>
                  <div className="space-y-6">
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={energy} 
                      onChange={(e) => setEnergy(parseInt(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary" 
                    />
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-tertiary">
                      <span>Lethargic</span>
                      <span className="text-primary text-xl font-display italic">{energy} / 10</span>
                      <span>Explosive</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full mt-12 bg-primary text-on-primary font-black py-4 text-[10px] uppercase tracking-widest rounded-sm hover:scale-95 transition-transform"
                  >
                    Next Protocol
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <p className="text-sm font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                    <Brain className="text-primary w-5 h-5" /> Current mental state?
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <MoodButton 
                      active={mood === 'low'} 
                      onClick={() => setMood('low')} 
                      icon={Frown} 
                      label="Overtrained" 
                    />
                    <MoodButton 
                      active={mood === 'mid'} 
                      onClick={() => setMood('mid')} 
                      icon={Meh} 
                      label="Balanced" 
                    />
                    <MoodButton 
                      active={mood === 'high'} 
                      onClick={() => setMood('high')} 
                      icon={Smile} 
                      label="Elite Focus" 
                    />
                  </div>
                  <div className="flex gap-4 mt-12">
                    <button 
                      onClick={() => setStep(1)}
                      className="flex-1 border border-white/10 text-white font-black py-4 text-[10px] uppercase tracking-widest rounded-sm hover:bg-white/5 transition-all"
                    >
                      Back
                    </button>
                    <button 
                      disabled={!mood}
                      onClick={() => setStep(3)}
                      className="flex-1 bg-primary text-on-primary font-black py-4 text-[10px] uppercase tracking-widest rounded-sm hover:scale-95 transition-transform disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <p className="text-sm font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary animate-pulse"></div> Hours of Sleep?
                  </p>
                  <div className="flex items-center justify-center gap-8 mb-8">
                    <button 
                      onClick={() => setSleep(Math.max(0, sleep - 0.5))}
                      className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center text-2xl font-black hover:bg-primary hover:text-on-primary transition-all"
                    >
                      -
                    </button>
                    <div className="text-center">
                      <span className="text-6xl font-black font-display text-white tracking-tighter">{sleep}</span>
                      <span className="text-xs text-tertiary block font-bold uppercase tracking-widest">HOURS</span>
                    </div>
                    <button 
                      onClick={() => setSleep(Math.min(15, sleep + 0.5))}
                      className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center text-2xl font-black hover:bg-primary hover:text-on-primary transition-all"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="w-full bg-primary text-on-primary font-black py-5 text-[10px] uppercase tracking-widest rounded-sm hover:scale-95 transition-transform shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? 'Syncing...' : 'Complete Daily Audit'}
                  </button>
                </motion.div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

function MoodButton({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-4 border rounded-sm transition-all",
        active ? "bg-primary/20 border-primary text-primary" : "bg-white/5 border-white/5 text-tertiary hover:border-white/20"
      )}
    >
      <Icon className={cn("w-8 h-8", active ? "fill-current" : "opacity-40")} />
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
