'use client';

import React from 'react';
import AuthModal from './auth-modal';
import { useAuthModal } from '@/lib/auth-context';

export default function AuthModalContainer() {
  const { authModalOpen, authMode, closeAuth } = useAuthModal();

  if (!authModalOpen) return null;

  return (
    <AuthModal 
      key={authModalOpen ? `open-${authMode}` : 'closed'}
      isOpen={authModalOpen} 
      onClose={closeAuth} 
      initialMode={authMode} 
    />
  );
}
