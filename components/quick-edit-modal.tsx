'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, CloudUpload } from 'lucide-react';
import { motion } from 'motion/react';
import { useUserData } from '@/hooks/use-user-data';
import { cn } from '@/lib/utils';

interface QuickEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: string;
  label: string;
  initialValue: any;
  type?: 'number' | 'text' | 'select';
  options?: string[];
}

export default function QuickEditModal({ 
  isOpen, 
  onClose, 
  field, 
  label, 
  initialValue, 
  type = 'number',
  options = []
}: QuickEditModalProps) {
  const { updateProfile } = useUserData();
  const [value, setValue] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateProfile({ [field]: type === 'number' ? parseFloat(value) : value });
      setIsSaving(false);
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-surface-container-low border border-white/10 w-full max-w-md rounded-sm overflow-hidden relative z-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)]"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Secure Update</p>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter font-display leading-none">Modify {label}</h2>
            </div>
            <button onClick={onClose} className="p-2 text-tertiary hover:text-white transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-tertiary flex justify-between">
                <span>Value Input</span>
                {type === 'number' && <span className="text-primary">{value}</span>}
              </label>
              {type === 'select' ? (
                <select 
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full bg-surface-container-highest border-none focus:ring-1 focus:ring-primary py-4 px-6 text-white font-bold tracking-widest text-sm rounded-sm uppercase appearance-none cursor-pointer"
                >
                  {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : (
                <input 
                  type={type}
                  value={value}
                  step={type === 'number' ? '0.1' : undefined}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full bg-surface-container-highest border-none focus:ring-1 focus:ring-primary py-4 px-6 text-3xl font-black italic tracking-tighter text-white font-display rounded-sm underline underline-offset-8 decoration-primary/30 outline-none"
                  autoFocus
                />
              )}
            </div>

            <div className="pt-4 flex gap-4">
              <button 
                onClick={onClose}
                className="flex-1 bg-white/5 border border-white/10 text-white font-black py-5 text-[10px] uppercase tracking-widest rounded-sm hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 bg-primary text-on-primary font-black py-5 text-[10px] uppercase tracking-widest rounded-sm hover:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
              >
                {isSaving ? <CloudUpload className="w-4 h-4 animate-bounce" /> : <Save className="w-4 h-4" />}
                {isSaving ? 'Saving...' : 'Commit Change'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
