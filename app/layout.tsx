import type { Metadata } from 'next';
import { Epilogue, Manrope } from 'next/font/google';
import './globals.css';

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'MoveMentor | Elite Performance Coaching',
  description: 'Precision movement and fitness coaching for high-performers. Every rep, every meal, every win.',
};

import { AuthProvider } from '@/lib/auth-context';
import { UIProvider } from '@/lib/ui-context';
import AuthModalContainer from '@/components/auth-modal-container';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${epilogue.variable} ${manrope.variable} dark`}>
      <body className="font-sans antialiased bg-background text-on-background" suppressHydrationWarning>
        <AuthProvider>
          <UIProvider>
            {children}
            <AuthModalContainer />
          </UIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
