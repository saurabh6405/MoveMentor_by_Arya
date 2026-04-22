'use client';

import React, { createContext, useContext, useState } from 'react';

interface UIContextType {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  isCheckInOpen: boolean;
  openCheckIn: () => void;
  closeCheckIn: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  
  const openCheckIn = () => setIsCheckInOpen(true);
  const closeCheckIn = () => setIsCheckInOpen(false);

  return (
    <UIContext.Provider value={{ 
      isSidebarOpen, 
      openSidebar, 
      closeSidebar, 
      toggleSidebar,
      isCheckInOpen,
      openCheckIn,
      closeCheckIn
    }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
