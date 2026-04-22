'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@/lib/supabase';

export type PackageTier = 'BASIC' | 'GROUP_ACCESS' | 'PERSONAL_ELITE';

export interface UserMetrics {
  steps: { current: number; target: number };
  hydration: { current: number; target: number; unit: string };
  calories: { current: number; target: number };
  workout: { current: number; target: number; unit: string };
}

export interface TodayMission {
  title: string;
  focus: string;
  duration: string;
  imageUrl: string;
}

export interface UserProfile {
  name: string;
  tier: PackageTier;
  weight: number;
  bodyFat: number;
  consistency: number;
  readiness: number;
  energy: 'LOW' | 'MEDIUM' | 'HIGH';
  sleep: string;
  steps: number;
  hydration: number;
  calories: number;
  workout_m: number;
  weightGoal: number;
  weightHistory: { day: string; weight: number }[];
  metrics: UserMetrics;
  todayMission: TodayMission;
  aiInsight: string;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Guest User',
  tier: 'BASIC',
  weight: 70.0,
  bodyFat: 15.0,
  consistency: 0,
  readiness: 50,
  energy: 'MEDIUM',
  sleep: '0H 0M',
  steps: 0,
  hydration: 0,
  calories: 0,
  workout_m: 0,
  weightGoal: 68.0,
  weightHistory: [
    { day: 'Mon', weight: 70.0 },
    { day: 'Today', weight: 70.0 },
  ],
  metrics: {
    steps: { current: 0, target: 10000 },
    hydration: { current: 0, target: 3.0, unit: 'L' },
    calories: { current: 0, target: 2200 },
    workout: { current: 0, target: 60, unit: 'm' },
  },
  todayMission: {
    title: 'Orientation Protocol',
    focus: 'Movement Assessment',
    duration: '20 Minutes',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPitQjVV-Uuqics5EQjraguMy5iG_SwyFO9OM8tpc1tHgkYbqklI3O8uQtpehA4xUmYa8mxyO9O91FSt5mk_ocXelfcxSZaQ96_mCw1E330sn9pGvLOcJgs0q8J8DI4jmMddFKNXLzMF6lYLY1PkO39VW2NFeada2V3rPjqF-2_-jLXR-1DtsICN2FXGNpE8lZY7ULRkDKmXGSNE9ocsuTJpfnUajRSANlakRJvBzeAZ4TTmOb8bD62PQKhGCAPI3J0fDqRRhngiQ',
  },
  aiInsight: 'Awaiting initial data entry to generate performance intelligence.',
};

export function useUserData() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function init() {
      if (!supabase) {
        // Fallback to local storage if keyboard config missing
        const saved = localStorage.getItem('move_mentor_profile');
        if (saved) {
          try {
            setProfile(JSON.parse(saved));
          } catch (e) {}
        }
        setLoading(false);
        return;
      }

      // Check current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setUser(session.user);
        // Fetch from Supabase
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (data && !error) {
          // Map snake_case from DB to camelCase in UI
          setProfile({
            name: data.name || DEFAULT_PROFILE.name,
            tier: data.tier as PackageTier,
            weight: data.weight,
            bodyFat: data.body_fat,
            consistency: data.consistency,
            readiness: data.readiness,
            energy: data.energy as any,
            sleep: data.sleep,
            steps: data.steps,
            hydration: data.hydration,
            calories: data.calories,
            workout_m: data.workout_m,
            weightGoal: data.weight_goal,
            weightHistory: data.weight_history,
            metrics: data.metrics,
            todayMission: data.today_mission,
            aiInsight: data.ai_insight || DEFAULT_PROFILE.aiInsight,
          });
        }
      } else {
        // Guest mode - Local Storage
        const saved = localStorage.getItem('move_mentor_profile');
        if (saved) {
          try {
            setProfile(JSON.parse(saved));
          } catch (e) {}
        }
      }
      setLoading(false);
    }

    init();

    // Listen for auth changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setUser(session.user);
          init();
        } else {
          setUser(null);
          setProfile(DEFAULT_PROFILE);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [supabase]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    const newProfile = { ...profile, ...updates };
    setProfile(newProfile);

    // Save locally
    localStorage.setItem('move_mentor_profile', JSON.stringify(newProfile));

    // Save to Supabase if logged in
    if (user && supabase) {
      const dbUpdates: any = {};
      
      // Map camelCase to snake_case for DB
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.tier !== undefined) dbUpdates.tier = updates.tier;
      if (updates.weight !== undefined) dbUpdates.weight = updates.weight;
      if (updates.bodyFat !== undefined) dbUpdates.body_fat = updates.bodyFat;
      if (updates.consistency !== undefined) dbUpdates.consistency = updates.consistency;
      if (updates.readiness !== undefined) dbUpdates.readiness = updates.readiness;
      if (updates.energy !== undefined) dbUpdates.energy = updates.energy;
      if (updates.sleep !== undefined) dbUpdates.sleep = updates.sleep;
      if (updates.steps !== undefined) dbUpdates.steps = updates.steps;
      if (updates.hydration !== undefined) dbUpdates.hydration = updates.hydration;
      if (updates.calories !== undefined) dbUpdates.calories = updates.calories;
      if (updates.workout_m !== undefined) dbUpdates.workout_m = updates.workout_m;
      if (updates.weightGoal !== undefined) dbUpdates.weight_goal = updates.weightGoal;
      if (updates.weightHistory !== undefined) dbUpdates.weight_history = updates.weightHistory;
      if (updates.metrics !== undefined) dbUpdates.metrics = updates.metrics;
      if (updates.todayMission !== undefined) dbUpdates.today_mission = updates.todayMission;
      if (updates.aiInsight !== undefined) dbUpdates.ai_insight = updates.aiInsight;

      const { error } = await supabase
        .from('profiles')
        .update(dbUpdates)
        .eq('id', user.id);

      if (error) {
        console.error('Error updating Supabase profile:', error);
      }
    }
  };

  const getTierLabel = (tier: PackageTier) => {
    switch (tier) {
      case 'BASIC': return 'The Basic';
      case 'GROUP_ACCESS': return 'Group Access';
      case 'PERSONAL_ELITE': return 'Personal Elite';
      default: return 'Elite Performance';
    }
  };

  const getDynamicAIInsight = () => {
    const { readiness, energy, sleep } = profile;
    const hours = parseInt(sleep.split('H')[0]);

    if (readiness < 40) return "Alert: System fatigue detected. Prioritize active recovery and structure tomorrow as a complete deload. High risk of mechanical failure.";
    if (readiness > 85 && hours >= 8 && energy === 'HIGH') return "Hyper-State Detected: Neural recovery is optimal. Protocol allows for PR attempts on primary lifts today. Intensity cap: 95%.";
    if (energy === 'LOW') return "Energy stores depleted. We recommend a 20% volume reduction for today's session to preserve systemic integrity.";
    
    return "Protocol Stable: Maintain current load parameters. Focus on eccentric control and structural alignment.";
  };

  return {
    profile,
    updateProfile,
    loading,
    user,
    tierLabel: getTierLabel(profile.tier),
    aiInsight: getDynamicAIInsight(),
  };
}
