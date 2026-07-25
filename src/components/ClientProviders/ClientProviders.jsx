'use client';

import dynamic from 'next/dynamic';
import './modelLoader.scss';
import SmoothScroll, { LenisProvider } from '@/components/SmoothScroll/SmoothScroll';
import { ThemeProvider } from '@/components/ThemeContext';
import { ModelProvider } from '@/components/ModelContext/ModelContext';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PageTransitionOverlay from '@/components/PageTransition/PageTransition';

const Cursor = dynamic(() => import('@/components/Cursor/Cursor'));

export default function ClientProviders({ children }) {
  return (
    <ModelProvider>
      <ThemeProvider>
        <LenisProvider>
          <Header />
          <SmoothScroll>
            {children}
            <Footer />
          </SmoothScroll>
          <PageTransitionOverlay />
        </LenisProvider>
        <Cursor />
      </ThemeProvider>
    </ModelProvider>
  );
}
