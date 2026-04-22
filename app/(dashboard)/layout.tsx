'use client';

import React from 'react';
import Sidebar from '@/components/sidebar';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { useUI } from '@/lib/ui-context';
import CheckInModal from '@/components/check-in-modal';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarOpen, openSidebar, closeSidebar, isCheckInOpen, openCheckIn, closeCheckIn } = useUI();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const hasCheckedIn = localStorage.getItem(`checkin_${today}`);
    if (!hasCheckedIn) {
      // Delay slightly for better UX
      const timer = setTimeout(() => {
        openCheckIn();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [openCheckIn]);

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <div className={cn(
        "transition-all duration-300 md:pl-72 min-h-screen relative",
        isSidebarOpen ? "blur-sm md:blur-none h-screen overflow-hidden md:h-auto md:overflow-visible" : ""
      )}>
        <main className="min-h-screen relative">
          {/* Overlay for mobile when sidebar is open */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/60 z-[45] md:hidden backdrop-blur-sm cursor-pointer"
              onClick={closeSidebar}
            />
          )}

          {children}
        </main>
      </div>

      <CheckInModal 
        isOpen={isCheckInOpen} 
        onClose={closeCheckIn} 
      />
    </div>
  );
}
